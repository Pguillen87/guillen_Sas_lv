import { supabase } from "@/integrations/supabase/client";
import { organizationService } from "./organizations";

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  agentId?: string;
}

export interface ReportData {
  date: string;
  agentName: string;
  agentId: string;
  messagesCount: number;
  conversationsCount: number;
  appointmentsCount: number;
}

export interface ReportStats {
  totalMessages: number;
  totalConversations: number;
  totalAgents: number;
  totalAppointments: number;
  messagesByAgent: Array<{
    agentId: string;
    agentName: string;
    count: number;
  }>;
  messagesByDate: Array<{
    date: string;
    count: number;
  }>;
}

export const reportsService = {
  /**
   * Get report stats for organization
   */
  async getStats(organizationId: string, filters?: ReportFilters): Promise<ReportStats> {
    // Get agents for this organization
    const { data: agents } = await supabase
      .from("agents")
      .select("id, name")
      .eq("organization_id", organizationId);

    const agentIds = agents?.map((a) => a.id) || [];
    const agentMap = new Map(agents?.map((a) => [a.id, a.name]) || []);

    // Build date filter
    let startDateFilter: string | undefined;
    let endDateFilter: string | undefined;

    if (filters?.startDate) {
      startDateFilter = new Date(filters.startDate).toISOString();
    }
    if (filters?.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      endDateFilter = endDate.toISOString();
    }

    // Filter by agent if specified
    const filteredAgentIds = filters?.agentId ? [filters.agentId] : agentIds;

    // Count messages
    let messagesQuery = supabase
      .from("messages")
      .select("agent_id, sent_at", { count: "exact", head: false })
      .in("agent_id", filteredAgentIds);

    if (startDateFilter) {
      messagesQuery = messagesQuery.gte("sent_at", startDateFilter);
    }
    if (endDateFilter) {
      messagesQuery = messagesQuery.lte("sent_at", endDateFilter);
    }

    const { data: messages, count: totalMessages } = await messagesQuery;

    // Count conversations
    let conversationsQuery = supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId);

    if (filters?.agentId) {
      conversationsQuery = conversationsQuery.eq("agent_id", filters.agentId);
    }
    if (startDateFilter) {
      conversationsQuery = conversationsQuery.gte("created_at", startDateFilter);
    }
    if (endDateFilter) {
      conversationsQuery = conversationsQuery.lte("created_at", endDateFilter);
    }

    const { count: totalConversations } = await conversationsQuery;

    // Count appointments
    let appointmentsQuery = supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .in("agent_id", filteredAgentIds);

    if (startDateFilter) {
      appointmentsQuery = appointmentsQuery.gte("start_time", startDateFilter);
    }
    if (endDateFilter) {
      appointmentsQuery = appointmentsQuery.lte("start_time", endDateFilter);
    }

    const { count: totalAppointments } = await appointmentsQuery;

    // Count agents
    const { count: totalAgents } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId);

    // Group messages by agent
    const messagesByAgentMap = new Map<string, number>();
    messages?.forEach((msg) => {
      const agentId = msg.agent_id;
      if (agentId) {
        messagesByAgentMap.set(agentId, (messagesByAgentMap.get(agentId) || 0) + 1);
      }
    });

    const messagesByAgent = Array.from(messagesByAgentMap.entries()).map(([agentId, count]) => ({
      agentId,
      agentName: agentMap.get(agentId) || "Desconhecido",
      count,
    }));

    // Group messages by date
    const messagesByDateMap = new Map<string, number>();
    messages?.forEach((msg) => {
      if (msg.sent_at) {
        const date = new Date(msg.sent_at).toISOString().split("T")[0];
        messagesByDateMap.set(date, (messagesByDateMap.get(date) || 0) + 1);
      }
    });

    const messagesByDate = Array.from(messagesByDateMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalMessages: totalMessages || 0,
      totalConversations: totalConversations || 0,
      totalAgents: totalAgents || 0,
      totalAppointments: totalAppointments || 0,
      messagesByAgent,
      messagesByDate,
    };
  },

  /**
   * Get detailed report data for CSV export
   */
  async getDetailedReportData(
    organizationId: string,
    filters?: ReportFilters
  ): Promise<ReportData[]> {
    // Get agents for this organization
    const { data: agents } = await supabase
      .from("agents")
      .select("id, name")
      .eq("organization_id", organizationId);

    const agentIds = agents?.map((a) => a.id) || [];
    const agentMap = new Map(agents?.map((a) => [a.id, a.name]) || []);

    // Filter by agent if specified
    const filteredAgentIds = filters?.agentId ? [filters.agentId] : agentIds;

    // Build date filter
    let startDateFilter: string | undefined;
    let endDateFilter: string | undefined;

    if (filters?.startDate) {
      startDateFilter = new Date(filters.startDate).toISOString();
    }
    if (filters?.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      endDateFilter = endDate.toISOString();
    }

    const reportData: ReportData[] = [];
    const dateMap = new Map<string, Map<string, ReportData>>();

    // Get all messages in range
    let messagesQuery = supabase
      .from("messages")
      .select("agent_id, sent_at")
      .in("agent_id", filteredAgentIds);

    if (startDateFilter) {
      messagesQuery = messagesQuery.gte("sent_at", startDateFilter);
    }
    if (endDateFilter) {
      messagesQuery = messagesQuery.lte("sent_at", endDateFilter);
    }

    const { data: messages } = await messagesQuery;

    // Process messages
    messages?.forEach((msg) => {
      if (msg.agent_id && msg.sent_at) {
        const date = new Date(msg.sent_at).toISOString().split("T")[0];
        const key = `${date}_${msg.agent_id}`;

        if (!dateMap.has(date)) {
          dateMap.set(date, new Map());
        }

        const agentMapForDate = dateMap.get(date)!;

        if (!agentMapForDate.has(msg.agent_id)) {
          agentMapForDate.set(msg.agent_id, {
            date,
            agentName: agentMap.get(msg.agent_id) || "Desconhecido",
            agentId: msg.agent_id,
            messagesCount: 0,
            conversationsCount: 0,
            appointmentsCount: 0,
          });
        }

        agentMapForDate.get(msg.agent_id)!.messagesCount++;
      }
    });

    // Get conversations
    for (const date of dateMap.keys()) {
      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);

      let conversationsQuery = supabase
        .from("conversations")
        .select("agent_id")
        .eq("organization_id", organizationId)
        .gte("created_at", dateStart.toISOString())
        .lte("created_at", dateEnd.toISOString());

      if (filters?.agentId) {
        conversationsQuery = conversationsQuery.eq("agent_id", filters.agentId);
      }

      const { data: conversations } = await conversationsQuery;

      conversations?.forEach((conv) => {
        if (conv.agent_id && dateMap.has(date)) {
          const agentMapForDate = dateMap.get(date)!;
          if (agentMapForDate.has(conv.agent_id)) {
            agentMapForDate.get(conv.agent_id)!.conversationsCount++;
          }
        }
      });

      // Get appointments
      let appointmentsQuery = supabase
        .from("appointments")
        .select("agent_id")
        .in("agent_id", filteredAgentIds)
        .gte("start_time", dateStart.toISOString())
        .lte("start_time", dateEnd.toISOString());

      const { data: appointments } = await appointmentsQuery;

      appointments?.forEach((apt) => {
        if (apt.agent_id && dateMap.has(date)) {
          const agentMapForDate = dateMap.get(date)!;
          if (agentMapForDate.has(apt.agent_id)) {
            agentMapForDate.get(apt.agent_id)!.appointmentsCount++;
          }
        }
      });
    }

    // Flatten map to array
    for (const [date, agentMapForDate] of dateMap.entries()) {
      for (const data of agentMapForDate.values()) {
        reportData.push(data);
      }
    }

    // Sort by date and agent name
    reportData.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.agentName.localeCompare(b.agentName);
    });

    return reportData;
  },

  /**
   * Export report data to CSV
   */
  async exportToCSV(organizationId: string, filters?: ReportFilters): Promise<string> {
    const data = await this.getDetailedReportData(organizationId, filters);

    // CSV Headers
    const headers = [
      "Data",
      "Agente",
      "ID do Agente",
      "Mensagens",
      "Conversas",
      "Agendamentos",
    ];

    // CSV Rows
    const rows = data.map((row) => [
      row.date,
      row.agentName,
      row.agentId,
      row.messagesCount.toString(),
      row.conversationsCount.toString(),
      row.appointmentsCount.toString(),
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    return csvContent;
  },
};

