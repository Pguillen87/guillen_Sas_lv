// Create OpenAI Agent Edge Function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../../shared/supabase.ts";

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

    const { agentId, instructions, name } = await req.json();

    if (!agentId || !instructions) {
      return new Response(
        JSON.stringify({ error: "agentId and instructions are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get OpenAI API key from secrets
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get agent configuration
    const { data: agentConfig, error: configError } = await supabase
      .from("agent_configurations")
      .select("*")
      .eq("agent_id", agentId)
      .single();

    if (configError || !agentConfig) {
      return new Response(
        JSON.stringify({ error: "Agent configuration not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create agent in OpenAI using Agent Builder API
    // TODO: Replace with actual OpenAI Agent Builder API call
    // For now, using a placeholder response
    const openaiAgentResponse = await fetch(
      "https://api.openai.com/v1/beta/assistants",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({
          name: name || "AI Agent",
          instructions: instructions || agentConfig.custom_prompt || "",
          model: "gpt-4",
          temperature: agentConfig.temperature || 0.7,
          max_tokens: agentConfig.max_tokens || 1000,
        }),
      }
    );

    if (!openaiAgentResponse.ok) {
      const errorData = await openaiAgentResponse.json();
      console.error("OpenAI API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to create OpenAI agent", details: errorData }),
        { status: openaiAgentResponse.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const openaiAgent = await openaiAgentResponse.json();

    // Update agent with OpenAI agent ID
    const { error: updateError } = await supabase
      .from("agents")
      .update({ openai_agent_id: openaiAgent.id })
      .eq("id", agentId);

    if (updateError) {
      console.error("Error updating agent:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update agent" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        agentId,
        openaiAgentId: openaiAgent.id,
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Create OpenAI agent error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

