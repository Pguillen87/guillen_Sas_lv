import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { diagnosticsService, type DiagnosticLog } from "@/services/diagnostics";
import { supabase } from "@/integrations/supabase/client";

export interface DiagnosticsInfo {
  logs: DiagnosticLog[];
  healthStatus: {
    status: "healthy" | "warning" | "critical";
    errors: number;
    warnings: number;
    recentErrors: DiagnosticLog[];
  };
  queryState: {
    totalQueries: number;
    activeQueries: number;
    errorQueries: number;
  };
  authState: {
    isAuthenticated: boolean;
    userId: string | null;
    email: string | null;
  };
  environment: {
    userAgent: string;
    url: string;
    viewport: { width: number; height: number };
    timestamp: string;
  };
}

/**
 * Hook para obter informações de diagnóstico do sistema
 */
export function useDiagnostics() {
  const queryClient = useQueryClient();
  const [diagnostics, setDiagnostics] = useState<DiagnosticsInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const collectDiagnostics = async () => {
      try {
        // Coletar logs do serviço
        const logs = diagnosticsService.getLogs();
        const healthStatus = diagnosticsService.getHealthStatus();

        // Coletar estado do React Query
        const queryCache = queryClient.getQueryCache();
        const allQueries = queryCache.getAll();
        const queryState = {
          totalQueries: allQueries.length,
          activeQueries: allQueries.filter((q) => q.state.status === "pending").length,
          errorQueries: allQueries.filter((q) => q.state.status === "error").length,
        };

        // Coletar estado de autenticação
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const authState = {
          isAuthenticated: !!user,
          userId: user?.id || null,
          email: user?.email || null,
        };

        // Informações do ambiente
        const environment = {
          userAgent: navigator.userAgent,
          url: window.location.href,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
          timestamp: new Date().toISOString(),
        };

        setDiagnostics({
          logs,
          healthStatus,
          queryState,
          authState,
          environment,
        });
      } catch (error) {
        console.error("Erro ao coletar diagnósticos:", error);
        diagnosticsService.log({
          type: "error",
          category: "other",
          message: `Erro ao coletar diagnósticos: ${error instanceof Error ? error.message : String(error)}`,
          stack: error instanceof Error ? error.stack : undefined,
        });
      } finally {
        setIsLoading(false);
      }
    };

    collectDiagnostics();

    // Atualizar diagnósticos periodicamente
    const interval = setInterval(collectDiagnostics, 5000); // A cada 5 segundos

    return () => clearInterval(interval);
  }, [queryClient]);

  return { diagnostics, isLoading };
}

/**
 * Hook simplificado para verificar saúde do sistema
 */
export function useSystemHealth() {
  const [health, setHealth] = useState(diagnosticsService.getHealthStatus());

  useEffect(() => {
    const updateHealth = () => {
      setHealth(diagnosticsService.getHealthStatus());
    };

    updateHealth();
    const interval = setInterval(updateHealth, 3000);

    return () => clearInterval(interval);
  }, []);

  return health;
}

