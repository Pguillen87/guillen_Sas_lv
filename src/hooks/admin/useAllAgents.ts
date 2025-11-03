import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/services/api/admin";
import type { AgentWithOrganization } from "@/services/supabase/admin";

interface AgentFilters {
  organizationId?: string;
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * Hook to get all agents from all organizations (admin only)
 */
export function useAllAgents(filters?: AgentFilters) {
  return useQuery({
    queryKey: ["admin", "agents", filters],
    queryFn: () => adminApi.getAllAgents(filters),
    staleTime: 30 * 1000, // 30 seconds
  });
}

