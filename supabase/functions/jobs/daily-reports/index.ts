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
      // Count messages
      const { count: messagesCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .gte("sent_at", yesterday.toISOString())
        .lte("sent_at", yesterdayEnd.toISOString());

      // Count conversations
      const { count: conversationsCount } = await supabase
        .from("conversations")
        .select("*", { count: "exact", head: true })
        .gte("created_at", yesterday.toISOString())
        .lte("created_at", yesterdayEnd.toISOString())
        .eq("organization_id", org.id);

      // Count appointments
      const { count: appointmentsCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .gte("created_at", yesterday.toISOString())
        .lte("created_at", yesterdayEnd.toISOString());

      // Save report
      const { error: reportError } = await supabase
        .from("daily_reports")
        .insert({
          organization_id: org.id,
          report_date: yesterday.toISOString().split("T")[0],
          total_messages: messagesCount || 0,
          total_conversations: conversationsCount || 0,
          total_appointments: appointmentsCount || 0,
        });

      if (!reportError) {
        reports.push({
          organizationId: org.id,
          date: yesterday.toISOString().split("T")[0],
          success: true,
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

