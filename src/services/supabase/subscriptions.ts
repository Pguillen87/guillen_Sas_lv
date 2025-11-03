import { supabase } from "@/integrations/supabase/client";

export interface PlanLimits {
  maxAgents: number | null; // null means unlimited
  maxMessagesPerMonth: number | null; // null means unlimited
  planName: string;
  planSlug: string;
}

export interface UsageStats {
  currentAgents: number;
  messagesThisMonth: number;
}

export interface LimitCheckResult {
  canCreate: boolean;
  reason?: string;
  limits: PlanLimits;
  usage: UsageStats;
  warning?: string; // Warning if close to limit
}

/**
 * Service for subscription and plan limit management
 */
export const subscriptionService = {
  /**
   * Get current plan limits for an organization
   */
  async getPlanLimits(organizationId: string): Promise<PlanLimits | null> {
    try {
      // First, try to get from subscriptions table (active subscription)
      const { data: subscription, error: subError } = await supabase
        .from("subscriptions")
        .select("plan_id, status, subscription_plans(*)")
        .eq("organization_id", organizationId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!subError && subscription?.plan_id) {
        const plan = (subscription as any).subscription_plans as any;
        if (plan) {
          return {
            maxAgents: plan.max_agents,
            maxMessagesPerMonth: plan.max_messages_per_month,
            planName: plan.name,
            planSlug: plan.slug,
          };
        }
      }

      // Fallback: get from organization.subscription_plan_id
      const { data: organization, error: orgError } = await supabase
        .from("organizations")
        .select("subscription_plan_id, subscription_plans(*)")
        .eq("id", organizationId)
        .single();

      if (orgError) {
        console.error("Error loading organization:", orgError);
        return null;
      }

      if (organization?.subscription_plan_id) {
        const plan = (organization as any).subscription_plans as any;
        if (plan) {
          return {
            maxAgents: plan.max_agents,
            maxMessagesPerMonth: plan.max_messages_per_month,
            planName: plan.name,
            planSlug: plan.slug,
          };
        }
      }

      // Default: Free plan
      return {
        maxAgents: 1,
        maxMessagesPerMonth: 100,
        planName: "Free",
        planSlug: "free",
      };
    } catch (error) {
      console.error("Error getting plan limits:", error);
      // Default to Free plan on error
      return {
        maxAgents: 1,
        maxMessagesPerMonth: 100,
        planName: "Free",
        planSlug: "free",
      };
    }
  },

  /**
   * Get current usage stats for an organization
   */
  async getUsageStats(organizationId: string): Promise<UsageStats> {
    try {
      // Count current agents
      const { count: agentsCount, error: agentsError } = await supabase
        .from("agents")
        .select("*", { count: "exact", head: true })
        .eq("organization_id", organizationId);

      if (agentsError) {
        console.error("Error counting agents:", agentsError);
      }

      // Count messages this month
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

      // Get agent IDs for this organization
      const { data: agents } = await supabase
        .from("agents")
        .select("id")
        .eq("organization_id", organizationId);

      const agentIds = agents?.map((a) => a.id) || [];

      let messagesCount = 0;
      if (agentIds.length > 0) {
        const { count, error: messagesError } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .in("agent_id", agentIds)
          .gte("sent_at", firstDayOfMonth.toISOString())
          .lte("sent_at", lastDayOfMonth.toISOString());

        if (messagesError) {
          console.error("Error counting messages:", messagesError);
        }
        messagesCount = count || 0;
      }

      return {
        currentAgents: agentsCount || 0,
        messagesThisMonth: messagesCount,
      };
    } catch (error) {
      console.error("Error getting usage stats:", error);
      return {
        currentAgents: 0,
        messagesThisMonth: 0,
      };
    }
  },

  /**
   * Check if organization can create a new agent
   */
  async checkAgentLimit(organizationId: string): Promise<LimitCheckResult> {
    const limits = await this.getPlanLimits(organizationId);
    const usage = await this.getUsageStats(organizationId);

    if (!limits) {
      return {
        canCreate: false,
        reason: "Não foi possível carregar informações do plano",
        limits: {
          maxAgents: 1,
          maxMessagesPerMonth: 100,
          planName: "Free",
          planSlug: "free",
        },
        usage,
      };
    }

    // Check if unlimited
    if (limits.maxAgents === null || limits.maxAgents === -1) {
      return {
        canCreate: true,
        limits,
        usage,
      };
    }

    // Check if at limit
    if (usage.currentAgents >= limits.maxAgents) {
      return {
        canCreate: false,
        reason: `Limite de ${limits.maxAgents} agente(s) atingido para o plano ${limits.planName}. Faça upgrade para criar mais agentes.`,
        limits,
        usage,
      };
    }

    // Check if close to limit (80% and 90% warnings)
    const percentage = (usage.currentAgents / limits.maxAgents) * 100;
    let warning: string | undefined;

    if (percentage >= 90) {
      warning = `Você está usando ${usage.currentAgents} de ${limits.maxAgents} agentes (${Math.round(percentage)}%). Considere fazer upgrade do plano.`;
    } else if (percentage >= 80) {
      warning = `Você está usando ${usage.currentAgents} de ${limits.maxAgents} agentes (${Math.round(percentage)}%).`;
    }

    return {
      canCreate: true,
      limits,
      usage,
      warning,
    };
  },

  /**
   * Check if organization can send more messages this month
   */
  async checkMessageLimit(organizationId: string): Promise<LimitCheckResult> {
    const limits = await this.getPlanLimits(organizationId);
    const usage = await this.getUsageStats(organizationId);

    if (!limits) {
      return {
        canCreate: false,
        reason: "Não foi possível carregar informações do plano",
        limits: {
          maxAgents: 1,
          maxMessagesPerMonth: 100,
          planName: "Free",
          planSlug: "free",
        },
        usage,
      };
    }

    // Check if unlimited
    if (limits.maxMessagesPerMonth === null || limits.maxMessagesPerMonth === -1) {
      return {
        canCreate: true,
        limits,
        usage,
      };
    }

    // Check if at limit
    if (usage.messagesThisMonth >= limits.maxMessagesPerMonth) {
      return {
        canCreate: false,
        reason: `Limite de ${limits.maxMessagesPerMonth} mensagens/mês atingido para o plano ${limits.planName}. O envio de mensagens foi bloqueado. Faça upgrade para continuar.`,
        limits,
        usage,
      };
    }

    // Check if close to limit (80% and 90% warnings)
    const percentage = (usage.messagesThisMonth / limits.maxMessagesPerMonth) * 100;
    let warning: string | undefined;

    if (percentage >= 90) {
      warning = `Você usou ${usage.messagesThisMonth} de ${limits.maxMessagesPerMonth} mensagens este mês (${Math.round(percentage)}%). Considere fazer upgrade do plano.`;
    } else if (percentage >= 80) {
      warning = `Você usou ${usage.messagesThisMonth} de ${limits.maxMessagesPerMonth} mensagens este mês (${Math.round(percentage)}%).`;
    }

    return {
      canCreate: true,
      limits,
      usage,
      warning,
    };
  },
};

