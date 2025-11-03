import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  activeAgents: number;
  messagesToday: number;
  activeConversations: number;
  appointmentsToday: number;
}

export interface ChartDataPoint {
  date: string;
  messages: number;
  conversations: number;
}

export const dashboardService = {
  /**
   * Get dashboard statistics for organization
   */
  async getStats(organizationId: string): Promise<DashboardStats> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString();

    // Get agents for this organization
    const { data: agents } = await supabase
      .from("agents")
      .select("id")
      .eq("organization_id", organizationId);

    const agentIds = agents?.map(a => a.id) || [];

    // Load active agents
    const { count: agentsCount, error: agentsError } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .eq("organization_id", organizationId);

    if (agentsError) {
      console.error("Error loading agents:", agentsError);
    }

    // Load messages today (filtered by agent_ids)
    let messagesCount = 0;
    if (agentIds.length > 0) {
      const { count, error: messagesError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds)
        .gte("sent_at", todayStr);

      if (messagesError) {
        console.error("Error loading messages:", messagesError);
      }
      messagesCount = count || 0;
    }

    // Load active conversations (filtered by agent_ids)
    let conversationsCount = 0;
    if (agentIds.length > 0) {
      const { count, error: conversationsError } = await supabase
        .from("conversations")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds)
        .eq("status", "active");

      if (conversationsError) {
        console.error("Error loading conversations:", conversationsError);
      }
      conversationsCount = count || 0;
    }

    // Load appointments today (filtered by agent_ids)
    let appointmentsCount = 0;
    if (agentIds.length > 0) {
      const { count, error: appointmentsError } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds)
        .gte("start_time", todayStr)
        .eq("status", "scheduled");

      if (appointmentsError) {
        console.error("Error loading appointments:", appointmentsError);
      }
      appointmentsCount = count || 0;
    }

    return {
      activeAgents: agentsCount || 0,
      messagesToday: messagesCount,
      activeConversations: conversationsCount,
      appointmentsToday: appointmentsCount,
    };
  },

  /**
   * Get chart data for last N days
   */
  async getChartData(organizationId: string, days: number = 7): Promise<ChartDataPoint[]> {
    const dataPoints: ChartDataPoint[] = [];
    const today = new Date();

    // Get agents for this organization
    const { data: agents } = await supabase
      .from("agents")
      .select("id")
      .eq("organization_id", organizationId);

    const agentIds = agents?.map(a => a.id) || [];

    if (agentIds.length === 0) {
      // Return empty data if no agents
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStart = new Date(date);
        dateStart.setHours(0, 0, 0, 0);
        dataPoints.push({
          date: dateStart.toISOString().split("T")[0],
          messages: 0,
          conversations: 0,
        });
      }
      return dataPoints;
    }

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);

      // Count messages (filtered by agent_ids)
      const { count: msgCount, error: msgError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds)
        .gte("sent_at", dateStart.toISOString())
        .lte("sent_at", dateEnd.toISOString());

      if (msgError) {
        console.error("Error loading messages for chart:", msgError);
      }

      // Count conversations (filtered by agent_ids)
      const { count: convCount, error: convError } = await supabase
        .from("conversations")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds)
        .gte("created_at", dateStart.toISOString())
        .lte("created_at", dateEnd.toISOString());

      if (convError) {
        console.error("Error loading conversations for chart:", convError);
      }

      dataPoints.push({
        date: dateStart.toISOString().split("T")[0],
        messages: msgCount || 0,
        conversations: convCount || 0,
      });
    }

    return dataPoints;
  },
};

