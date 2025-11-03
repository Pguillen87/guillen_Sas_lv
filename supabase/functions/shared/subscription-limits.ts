// Shared subscription limits helper for Edge Functions
import { supabase } from "./supabase.ts";

export interface LimitCheckResult {
  canSend: boolean;
  reason?: string;
}

/**
 * Check if organization can send more messages this month
 */
export async function checkMessageLimit(organizationId: string): Promise<LimitCheckResult> {
  try {
    // Get current plan limits
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("plan_id, status, subscription_plans(max_messages_per_month)")
      .eq("organization_id", organizationId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let maxMessages: number | null = 100; // Default to Free plan

    if (!subError && subscription?.plan_id) {
      const plan = (subscription as any).subscription_plans as any;
      if (plan?.max_messages_per_month !== undefined) {
        maxMessages = plan.max_messages_per_month;
      } else {
        // Fallback: get from organization.subscription_plan_id
        const { data: organization } = await supabase
          .from("organizations")
          .select("subscription_plan_id, subscription_plans(max_messages_per_month)")
          .eq("id", organizationId)
          .single();

        if (organization?.subscription_plan_id) {
          const plan = (organization as any).subscription_plans as any;
          maxMessages = plan?.max_messages_per_month ?? 100;
        }
      }
    } else {
      // Fallback: get from organization.subscription_plan_id
      const { data: organization } = await supabase
        .from("organizations")
        .select("subscription_plan_id, subscription_plans(max_messages_per_month)")
        .eq("id", organizationId)
        .single();

      if (organization?.subscription_plan_id) {
        const plan = (organization as any).subscription_plans as any;
        maxMessages = plan?.max_messages_per_month ?? 100;
      }
    }

    // Check if unlimited
    if (maxMessages === null || maxMessages === -1) {
      return { canSend: true };
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

    if (agentIds.length === 0) {
      return { canSend: true };
    }

    const { count, error: messagesError } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .in("agent_id", agentIds)
      .gte("sent_at", firstDayOfMonth.toISOString())
      .lte("sent_at", lastDayOfMonth.toISOString());

    if (messagesError) {
      console.error("Error counting messages:", messagesError);
      // Allow sending on error to avoid blocking messages
      return { canSend: true };
    }

    const messagesCount = count || 0;

    // Check if at limit
    if (messagesCount >= maxMessages) {
      return {
        canSend: false,
        reason: `Limite de ${maxMessages} mensagens/mês atingido. Faça upgrade do plano para continuar enviando mensagens.`,
      };
    }

    return { canSend: true };
  } catch (error) {
    console.error("Error checking message limit:", error);
    // Allow sending on error to avoid blocking messages
    return { canSend: true };
  }
}

