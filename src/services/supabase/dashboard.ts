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

    // Load active agents
    const { count: agentsCount, error: agentsError } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .eq("organization_id", organizationId);

    if (agentsError) {
      console.error("Error loading agents:", agentsError);
    }

    // Load messages today
    const { count: messagesCount, error: messagesError } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .gte("sent_at", todayStr);

    if (messagesError) {
      console.error("Error loading messages:", messagesError);
    }

    // Load active conversations
    const { count: conversationsCount, error: conversationsError } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")
      .eq("organization_id", organizationId);

    if (conversationsError) {
      console.error("Error loading conversations:", conversationsError);
    }

    // Load appointments today
    const { count: appointmentsCount, error: appointmentsError } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .gte("start_time", todayStr)
      .eq("status", "scheduled")
      .eq("organization_id", organizationId);

    if (appointmentsError) {
      console.error("Error loading appointments:", appointmentsError);
    }

    return {
      activeAgents: agentsCount || 0,
      messagesToday: messagesCount || 0,
      activeConversations: conversationsCount || 0,
      appointmentsToday: appointmentsCount || 0,
    };
  },

  /**
   * Get chart data for last N days
   */
  async getChartData(organizationId: string, days: number = 7): Promise<ChartDataPoint[]> {
    const dataPoints: ChartDataPoint[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);

      // Count messages
      const { count: msgCount, error: msgError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .gte("sent_at", dateStart.toISOString())
        .lte("sent_at", dateEnd.toISOString());

      if (msgError) {
        console.error("Error loading messages for chart:", msgError);
      }

      // Count conversations
      const { count: convCount, error: convError } = await supabase
        .from("conversations")
        .select("*", { count: "exact", head: true })
        .gte("created_at", dateStart.toISOString())
        .lte("created_at", dateEnd.toISOString())
        .eq("organization_id", organizationId);

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

