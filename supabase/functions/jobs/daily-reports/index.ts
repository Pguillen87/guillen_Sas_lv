// Daily Reports Generation Job
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../../shared/supabase.ts";

serve(async (req) => {
  try {
    // This function should be called by a cron job
    const authHeader = req.headers.get("Authorization");
    if (authHeader !== `Bearer ${Deno.env.get("CRON_SECRET")}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(23, 59, 59, 999);

    // Get all organizations
    const { data: organizations, error: orgsError } = await supabase
      .from("organizations")
      .select("id");

    if (orgsError) throw orgsError;

    const reports = [];

    for (const org of organizations || []) {
      // Get agents for this organization
      const { data: agents } = await supabase
        .from("agents")
        .select("id")
        .eq("organization_id", org.id);

      const agentIds = agents?.map((a) => a.id) || [];

      let messagesCount = 0;
      let conversationsCount = 0;
      let appointmentsCount = 0;

      if (agentIds.length > 0) {
        // Count messages by agent_ids
        const { count: msgCount } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .in("agent_id", agentIds)
          .gte("sent_at", yesterday.toISOString())
          .lte("sent_at", yesterdayEnd.toISOString());

        messagesCount = msgCount || 0;

        // Count conversations by agent_ids
        const { count: convCount } = await supabase
          .from("conversations")
          .select("*", { count: "exact", head: true })
          .in("agent_id", agentIds)
          .gte("created_at", yesterday.toISOString())
          .lte("created_at", yesterdayEnd.toISOString());

        conversationsCount = convCount || 0;

        // Count appointments by agent_ids
        const { count: aptCount } = await supabase
          .from("appointments")
          .select("*", { count: "exact", head: true })
          .in("agent_id", agentIds)
          .gte("start_time", yesterday.toISOString())
          .lte("start_time", yesterdayEnd.toISOString());

        appointmentsCount = aptCount || 0;
      }

      // Prepare metrics JSON
      const metrics = {
        total_messages: messagesCount,
        total_conversations: conversationsCount,
        total_appointments: appointmentsCount,
        agents_count: agentIds.length,
      };

      // Save report (using metrics JSON field)
      const { error: reportError } = await supabase
        .from("daily_reports")
        .insert({
          organization_id: org.id,
          report_date: yesterday.toISOString().split("T")[0],
          metrics: metrics,
        });

      if (!reportError) {
        reports.push({
          organizationId: org.id,
          date: yesterday.toISOString().split("T")[0],
          success: true,
        });
      } else {
        console.error(`Error saving report for org ${org.id}:`, reportError);
        reports.push({
          organizationId: org.id,
          date: yesterday.toISOString().split("T")[0],
          success: false,
          error: reportError.message,
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      reportsGenerated: reports.length,
      reports,
    }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Daily reports error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

