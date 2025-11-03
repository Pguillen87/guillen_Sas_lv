// Evolution API Webhook Handler
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../shared/supabase.ts";
import type { EvolutionWebhookPayload } from "../shared/types.ts";

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
      .select("agent_id, metadata")
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

    // Get or create conversation
    const { data: agent } = await supabase
      .from("agents")
      .select("organization_id")
      .eq("id", connection.agent_id)
      .single();

    if (!agent) {
      return new Response(JSON.stringify({ error: "Agent not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get or create conversation
    const { data: existingConv } = await supabase
      .from("conversations")
      .select("id")
      .eq("agent_id", connection.agent_id)
      .eq("participant_phone", phoneNumber)
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
          organization_id: agent.organization_id,
          participant_phone: phoneNumber,
          participant_name: data.pushName || null,
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

    // Save incoming message
    const { error: msgError } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        content: messageText,
        direction: "inbound",
        sent_at: new Date().toISOString(),
      });

    if (msgError) {
      console.error("Error saving message:", msgError);
    }

    // TODO: Call OpenAI to generate response
    // TODO: Send response via Evolution API
    // For now, just acknowledge receipt
    
    return new Response(JSON.stringify({ 
      received: true,
      conversationId,
      messageSaved: !msgError,
    }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

