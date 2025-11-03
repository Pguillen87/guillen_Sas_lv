import { supabase } from "@/integrations/supabase/client";
import type { Organization } from "@/types";

/**
 * Admin service - queries without organization filter
 * These functions should only be accessible by super_admin users
 */

export interface OrganizationWithStats extends Organization {
  stats?: {
    totalAgents: number;
    activeAgents: number;
    totalMessages: number;
    activeConversations: number;
    totalAppointments: number;
  };
  subscription?: {
    planName: string | null;
    status: string | null;
  };
  owner?: {
    email: string;
    full_name: string | null;
  };
}

export interface AgentWithOrganization {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
  message_count?: number;
  last_activity?: string;
}

export interface GlobalStats {
  totalOrganizations: number;
  activeOrganizations: number;
  totalAgents: number;
  activeAgents: number;
  totalMessages: number;
  messagesToday: number;
  messagesThisMonth: number;
  activeConversations: number;
  totalUsers: number;
  totalAppointments: number;
  appointmentsToday: number;
}

export interface OrganizationStats {
  totalAgents: number;
  activeAgents: number;
  totalMessages: number;
  messagesToday: number;
  messagesThisMonth: number;
  activeConversations: number;
  totalConversations: number;
  totalAppointments: number;
  appointmentsToday: number;
  lastActivity: string | null;
}

export const adminService = {
  /**
   * Get all organizations (no filter)
   */
  async getAllOrganizations(): Promise<Organization[]> {
    try {
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching organizations:", error);
        // Return empty array on error instead of throwing to prevent app breakage
        return [];
      }
      return data || [];
    } catch (err) {
      console.error("Exception fetching organizations:", err);
      return [];
    }
  },

  /**
   * Get organization by ID with stats and owner info
   */
  async getOrganizationWithDetails(organizationId: string): Promise<OrganizationWithStats | null> {
    // Get organization
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .select(`
        *,
        owner:users!organizations_owner_id_fkey(email, full_name)
      `)
      .eq("id", organizationId)
      .single();

    if (orgError) throw orgError;
    if (!org) return null;

    // Get stats
    const stats = await this.getOrganizationStats(organizationId);

    // Get subscription info
    const { data: subscriptionData } = await supabase
      .from("subscriptions")
      .select("status, plan_id")
      .eq("organization_id", organizationId)
      .maybeSingle();

    let planName: string | null = null;
    if (subscriptionData?.plan_id) {
      const { data: plan } = await supabase
        .from("subscription_plans")
        .select("name")
        .eq("id", subscriptionData.plan_id)
        .single();
      planName = plan?.name || null;
    }

    return {
      ...org,
      stats,
      subscription: {
        planName,
        status: subscriptionData?.status || null,
      },
      owner: org.owner as any,
    };
  },

  /**
   * Get statistics for an organization
   */
  async getOrganizationStats(organizationId: string): Promise<OrganizationStats> {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Count agents
    const { count: totalAgents } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId);

    const { count: activeAgents } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .eq("is_active", true);

    // Get agent IDs for this organization
    const { data: agents } = await supabase
      .from("agents")
      .select("id")
      .eq("organization_id", organizationId);

    const agentIds = agents?.map((a) => a.id) || [];

    // Count messages
    let totalMessages = 0;
    let messagesToday = 0;
    let messagesThisMonth = 0;

    if (agentIds.length > 0) {
      const { count: total } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds);

      const { count: today } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds)
        .gte("sent_at", today.toISOString());

      const { count: thisMonth } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds)
        .gte("sent_at", firstDayOfMonth.toISOString());

      totalMessages = total || 0;
      messagesToday = today || 0;
      messagesThisMonth = thisMonth || 0;
    }

    // Count conversations
    const { count: totalConversations } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId);

    const { count: activeConversations } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .eq("status", "active");

    // Count appointments
    let totalAppointments = 0;
    let appointmentsToday = 0;

    if (agentIds.length > 0) {
      const { count: total } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds);

      const { count: today } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .in("agent_id", agentIds)
        .gte("start_time", today.toISOString());

      totalAppointments = total || 0;
      appointmentsToday = today || 0;
    }

    // Get last activity
    let lastActivity: string | null = null;
    if (agentIds.length > 0) {
      const { data: lastMessage } = await supabase
        .from("messages")
        .select("sent_at")
        .in("agent_id", agentIds)
        .order("sent_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      lastActivity = lastMessage?.sent_at || null;
    }

    return {
      totalAgents: totalAgents || 0,
      activeAgents: activeAgents || 0,
      totalMessages: totalMessages || 0,
      messagesToday: messagesToday || 0,
      messagesThisMonth: messagesThisMonth || 0,
      activeConversations: activeConversations || 0,
      totalConversations: totalConversations || 0,
      totalAppointments,
      appointmentsToday,
      lastActivity,
    };
  },

  /**
   * Get all agents from all organizations
   */
  async getAllAgents(filters?: {
    organizationId?: string;
    isActive?: boolean;
    searchTerm?: string;
  }): Promise<AgentWithOrganization[]> {
    let query = supabase
      .from("agents")
      .select(`
        id,
        name,
        description,
        is_active,
        created_at,
        updated_at,
        organization:organizations(id, name, slug)
      `)
      .order("created_at", { ascending: false });

    if (filters?.organizationId) {
      query = query.eq("organization_id", filters.organizationId);
    }

    if (filters?.isActive !== undefined) {
      query = query.eq("is_active", filters.isActive);
    }

    if (filters?.searchTerm) {
      query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Enhance with message counts and last activity
    const agentsWithStats = await Promise.all(
      (data || []).map(async (agent) => {
        // Count messages
        const { count: messageCount } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("agent_id", agent.id);

        // Get last activity
        const { data: lastMessage } = await supabase
          .from("messages")
          .select("sent_at")
          .eq("agent_id", agent.id)
          .order("sent_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        return {
          ...agent,
          message_count: messageCount || 0,
          last_activity: lastMessage?.sent_at || null,
        };
      })
    );

    return agentsWithStats as AgentWithOrganization[];
  },

  /**
   * Get global statistics
   */
  async getGlobalStats(): Promise<GlobalStats> {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Helper function to safely execute queries
    const safeQuery = async (
      queryFn: () => Promise<{ count: number | null; error: any }>,
      defaultValue: number = 0
    ): Promise<number> => {
      try {
        const result = await queryFn();
        if (result.error) {
          console.error("Query error:", result.error);
          return defaultValue;
        }
        return result.count || defaultValue;
      } catch (err) {
        console.error("Query exception:", err);
        return defaultValue;
      }
    };

    // Execute all queries in parallel with error handling
    const [
      totalOrganizations,
      activeOrganizations,
      totalAgents,
      activeAgents,
      totalMessages,
      messagesToday,
      messagesThisMonth,
      activeConversations,
      totalUsers,
      totalAppointments,
      appointmentsToday,
    ] = await Promise.all([
      safeQuery(() => supabase.from("organizations").select("*", { count: "exact", head: true })),
      safeQuery(() => supabase.from("organizations").select("*", { count: "exact", head: true }).eq("status", "active")),
      safeQuery(() => supabase.from("agents").select("*", { count: "exact", head: true })),
      safeQuery(() => supabase.from("agents").select("*", { count: "exact", head: true }).eq("is_active", true)),
      safeQuery(() => supabase.from("messages").select("*", { count: "exact", head: true })),
      safeQuery(() => supabase.from("messages").select("*", { count: "exact", head: true }).gte("sent_at", today.toISOString())),
      safeQuery(() => supabase.from("messages").select("*", { count: "exact", head: true }).gte("sent_at", firstDayOfMonth.toISOString())),
      safeQuery(() => supabase.from("conversations").select("*", { count: "exact", head: true }).eq("status", "active")),
      safeQuery(() => supabase.from("users").select("*", { count: "exact", head: true })),
      safeQuery(() => supabase.from("appointments").select("*", { count: "exact", head: true })),
      safeQuery(() => supabase.from("appointments").select("*", { count: "exact", head: true }).gte("start_time", today.toISOString())),
    ]);

    return {
      totalOrganizations,
      activeOrganizations,
      totalAgents,
      activeAgents,
      totalMessages,
      messagesToday,
      messagesThisMonth,
      activeConversations,
      totalUsers,
      totalAppointments,
      appointmentsToday,
    };
  },

  /**
   * Update organization status
   */
  async updateOrganizationStatus(
    organizationId: string,
    status: "active" | "inactive" | "suspended"
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", organizationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get all users
   */
  async getAllUsers(filters?: {
    role?: string;
    searchTerm?: string;
  }) {
    let query = supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.role) {
      query = query.eq("role", filters.role);
    }

    if (filters?.searchTerm) {
      query = query.or(`email.ilike.%${filters.searchTerm}%,full_name.ilike.%${filters.searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  /**
   * Update user role
   */
  async updateUserRole(userId: string, role: string | null) {
    const { data, error } = await supabase
      .from("users")
      .update({ role, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get audit logs
   */
  async getAuditLogs(filters?: {
    action?: string;
    userId?: string;
    organizationId?: string;
    resourceType?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }) {
    let query = supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.action) {
      query = query.eq("action", filters.action);
    }

    if (filters?.userId) {
      query = query.eq("user_id", filters.userId);
    }

    if (filters?.organizationId) {
      query = query.eq("organization_id", filters.organizationId);
    }

    if (filters?.resourceType) {
      query = query.eq("resource_type", filters.resourceType);
    }

    if (filters?.startDate) {
      query = query.gte("created_at", filters.startDate.toISOString());
    }

    if (filters?.endDate) {
      query = query.lte("created_at", filters.endDate.toISOString());
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    } else {
      query = query.limit(100); // Default limit
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },
};

