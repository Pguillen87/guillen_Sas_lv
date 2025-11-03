import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/services/api/admin";
import type { GlobalStats } from "@/services/supabase/admin";

/**
 * Hook to get global statistics (admin only)
 */
export function useGlobalStats() {
  return useQuery({
    queryKey: ["admin", "globalStats"],
    queryFn: async () => {
      try {
        return await adminApi.getGlobalStats();
      } catch (error: any) {
        console.error("Error fetching global stats:", error);
        // Return default stats instead of throwing to prevent app breakage
        return {
          totalOrganizations: 0,
          activeOrganizations: 0,
          totalAgents: 0,
          activeAgents: 0,
          totalMessages: 0,
          messagesToday: 0,
          messagesThisMonth: 0,
          activeConversations: 0,
          totalUsers: 0,
          totalAppointments: 0,
          appointmentsToday: 0,
        };
      }
    },
    staleTime: 60 * 1000, // 1 minute
    retry: false,
    enabled: false, // Desabilitado por padrão - será habilitado via refetch no AdminDashboard
  });
}

