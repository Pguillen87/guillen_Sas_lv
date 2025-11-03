import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsApi } from "@/services/api/agents";
import { toast } from "sonner";
import type { Agent, CreateAgentFormData, AgentUpdate } from "@/types";

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: () => agentsApi.getAll(),
  });
}

export function useAgent(agentId: string | null) {
  return useQuery({
    queryKey: ["agents", agentId],
    queryFn: () => {
      if (!agentId) throw new Error("Agent ID is required");
      return agentsApi.getById(agentId);
    },
    enabled: !!agentId,
  });
}

export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: CreateAgentFormData) => agentsApi.create(formData),
    onSuccess: (agent: any) => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      toast.success("Agente criado com sucesso!");
      
      // Show warning if close to limit
      if (agent?.__warning) {
        toast.warning(agent.__warning, { duration: 6000 });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao criar agente");
    },
  });
}

export function useUpdateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agentId, updates }: { agentId: string; updates: AgentUpdate }) =>
      agentsApi.update(agentId, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({ queryKey: ["agents", variables.agentId] });
      toast.success("Agente atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao atualizar agente");
    },
  });
}

export function useToggleAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agentId, currentStatus }: { agentId: string; currentStatus: boolean }) =>
      agentsApi.toggleActive(agentId, currentStatus),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({ queryKey: ["agents", variables.agentId] });
      toast.success(`Agente ${variables.currentStatus ? "desativado" : "ativado"} com sucesso!`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao atualizar agente");
    },
  });
}

export function useDeleteAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (agentId: string) => agentsApi.delete(agentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      toast.success("Agente deletado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao deletar agente");
    },
  });
}

