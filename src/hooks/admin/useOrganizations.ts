import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/services/api/admin";
import { toast } from "sonner";
import type { OrganizationWithStats } from "@/services/supabase/admin";

/**
 * Hook to get all organizations (admin only)
 */
export function useAllOrganizations() {
  return useQuery({
    queryKey: ["admin", "organizations"],
    queryFn: async () => {
      try {
        return await adminApi.getAllOrganizations();
      } catch (error: any) {
        console.error("Error fetching organizations:", error);
        // Return empty array instead of throwing to prevent app breakage
        return [];
      }
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: false,
    enabled: false, // Desabilitado por padrão - será habilitado via refetch no AdminDashboard
  });
}

/**
 * Hook to get organization details with stats (admin only)
 */
export function useOrganizationDetails(organizationId: string | null) {
  return useQuery({
    queryKey: ["admin", "organizations", organizationId],
    queryFn: () => {
      if (!organizationId) throw new Error("Organization ID is required");
      return adminApi.getOrganizationDetails(organizationId);
    },
    enabled: !!organizationId,
    staleTime: 30 * 1000,
  });
}

/**
 * Hook to update organization status (admin only)
 */
export function useUpdateOrganizationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      status,
    }: {
      organizationId: string;
      status: "active" | "inactive" | "suspended";
    }) => adminApi.updateOrganizationStatus(organizationId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "organizations"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "organizations", variables.organizationId],
      });
      toast.success(`Organização ${variables.status === "active" ? "ativada" : variables.status === "inactive" ? "desativada" : "suspensa"} com sucesso!`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao atualizar status da organização");
    },
  });
}

