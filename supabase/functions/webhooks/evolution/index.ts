// Evolution API Webhook Handler
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../../shared/supabase.ts";
import { encryption } from "../../shared/encryption.ts";
import { callOpenAI } from "../../shared/openai.ts";
import { sendEvolutionMessage, type EvolutionAPIConfig } from "../../shared/evolution.ts";
import { checkMessageLimit } from "../../shared/subscription-limits.ts";

interface EvolutionWebhookPayload {
  event: string;
  instance: string;
  data: any;
}

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        },
      });
    }

    const payload: EvolutionWebhookPayload = await req.json();
    
    console.log("Webhook received:", JSON.stringify(payload, null, 2));

    // Only process message events
    if (payload.event !== "messages.upsert") {
      return new Response(JSON.stringify({ received: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const { instance, data } = payload;
    const remoteJid = data.key?.remoteJid;
    const fromMe = data.key?.fromMe;
    const messageText = data.message?.conversation || data.message?.extendedTextMessage?.text;

    // Ignore messages sent by us
    if (fromMe || !messageText || !remoteJid) {
      return new Response(JSON.stringify({ processed: false }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract phone number from remoteJid (format: 5511999999999@s.whatsapp.net)
    const phoneNumber = remoteJid.split("@")[0];

    // Find agent by instance name
    const { data: connection, error: connError } = await supabase
      .from("agent_connections")
      .select("agent_id, metadata, credentials_encrypted")
      .eq("connection_type", "whatsapp")
      .eq("metadata->>instanceName", instance)
      .eq("is_active", true)
      .single();

    if (connError || !connection) {
      console.error("Agent not found for instance:", instance);
      return new Response(JSON.stringify({ error: "Agent not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get agent and configuration
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("id, organization_id, is_active")
      .eq("id", connection.agent_id)
      .single();

    if (agentError || !agent) {
      return new Response(JSON.stringify({ error: "Agent not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if agent is active
    if (!agent.is_active) {
      console.log("Agent is not active, ignoring message");
      return new Response(JSON.stringify({ processed: false, reason: "Agent inactive" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check message limit before processing
    const limitCheck = await checkMessageLimit(agent.organization_id);
    if (!limitCheck.canSend) {
      console.warn("Message limit reached for organization:", agent.organization_id);
      // Still save the incoming message but don't respond
      // The limit check reason will be logged
    }

    // Get or create conversation
    const { data: existingConv } = await supabase
      .from("conversations")
      .select("id")
      .eq("agent_id", connection.agent_id)
      .eq("whatsapp_number", phoneNumber)
      .eq("status", "active")
      .maybeSingle();

    let conversationId: string;
    if (existingConv) {
      conversationId = existingConv.id;
    } else {
      const { data: newConv, error: convError } = await supabase
        .from("conversations")
        .insert({
          agent_id: connection.agent_id,
          whatsapp_number: phoneNumber,
          contact_name: data.pushName || null,
          status: "active",
        })
        .select("id")
        .single();

      if (convError || !newConv) {
        console.error("Error creating conversation:", convError);
        return new Response(JSON.stringify({ error: "Failed to create conversation" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      conversationId = newConv.id;
    }

    // Get agent configuration
    const { data: agentConfig, error: configError } = await supabase
      .from("agent_configurations")
      .select("custom_prompt, temperature, max_tokens")
      .eq("agent_id", agent.id)
      .single();

    if (configError || !agentConfig) {
      console.error("Agent configuration not found:", configError);
      return new Response(JSON.stringify({ 
        received: true,
        conversationId,
        processed: false,
        error: "Agent configuration not found",
      }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get conversation history BEFORE saving new message (last 10 messages for context)
    const { data: historyMessages } = await supabase
      .from("messages")
      .select("content, direction, sent_at")
      .eq("conversation_id", conversationId)
      .order("sent_at", { ascending: false })
      .limit(10);

    // Save incoming message
    const { error: msgError, data: savedMessage } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        agent_id: agent.id,
        content: messageText,
        direction: "inbound",
        sent_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (msgError) {
      console.error("Error saving message:", msgError);
    }

    // If message limit reached, don't process response
    if (!limitCheck.canSend) {
      return new Response(JSON.stringify({ 
        received: true,
        conversationId,
        messageSaved: !msgError,
        processed: false,
        reason: limitCheck.reason,
      }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build conversation history for OpenAI
    const conversationHistory = historyMessages
      ?.reverse()
      .map((msg) => ({
        role: msg.direction === "inbound" ? "user" as const : "assistant" as const,
        content: msg.content || "",
      })) || [];

    // Generate response using OpenAI
    let aiResponse: string;
    try {
      const openaiResult = await callOpenAI({
        prompt: messageText,
        systemPrompt: agentConfig.custom_prompt || "Você é um assistente útil e prestativo.",
        temperature: agentConfig.temperature ?? 0.7,
        maxTokens: agentConfig.max_tokens ?? 1000,
        conversationHistory: conversationHistory.slice(-10), // Last 10 messages
      });

      aiResponse = openaiResult.content;
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);
      aiResponse = "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.";
    }

    // Save AI response message
    const { error: responseMsgError, data: savedResponse } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        agent_id: agent.id,
        content: aiResponse,
        direction: "outbound",
        sent_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (responseMsgError) {
      console.error("Error saving AI response:", responseMsgError);
    }

    // Decrypt Evolution API credentials
    let evolutionConfig: EvolutionAPIConfig;
    try {
      const decryptedCredentials = await encryption.decrypt(connection.credentials_encrypted);
      const credentials = JSON.parse(decryptedCredentials);
      
      const metadata = connection.metadata as any;
      evolutionConfig = {
        baseUrl: credentials.baseUrl || metadata?.baseUrl || "",
        apiKey: credentials.apiKey || metadata?.apiKey || "",
        instanceName: instance,
      };
    } catch (decryptError) {
      console.error("Error decrypting credentials:", decryptError);
      return new Response(JSON.stringify({ 
        received: true,
        conversationId,
        messageSaved: !msgError,
        responseSaved: !responseMsgError,
        processed: false,
        error: "Failed to decrypt Evolution API credentials",
      }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Send response via Evolution API
    const sendResult = await sendEvolutionMessage(evolutionConfig, {
      number: phoneNumber,
      text: aiResponse,
    });

    if (!sendResult.success) {
      console.error("Failed to send message via Evolution API:", sendResult.error);
      // Message is already saved, so we still return success
      return new Response(JSON.stringify({ 
        received: true,
        conversationId,
        messageSaved: !msgError,
        responseSaved: !responseMsgError,
        sent: false,
        error: sendResult.error,
      }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update message with Evolution message ID if available
    if (sendResult.messageId && savedResponse?.id) {
      await supabase
        .from("messages")
        .update({ 
          metadata: { evolutionMessageId: sendResult.messageId },
        })
        .eq("id", savedResponse.id);
    }
    
    return new Response(JSON.stringify({ 
      received: true,
      conversationId,
      messageSaved: !msgError,
      responseSaved: !responseMsgError,
      sent: true,
      messageId: sendResult.messageId,
    }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

