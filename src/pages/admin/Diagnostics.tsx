import { AdminRoute } from "@/components/admin/AdminRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDiagnostics } from "@/hooks/useDiagnostics";
import { diagnosticsService } from "@/services/diagnostics";
import {
  Bug,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Activity,
  Download,
  RefreshCw,
  Filter,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DiagnosticsPage = () => {
  const { diagnostics, isLoading } = useDiagnostics();
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const handleDownloadReport = () => {
    if (!diagnostics) return;

    const report = diagnosticsService.generateReport();
    const blob = new Blob([report], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnostico-completo-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Relatório completo baixado!");
  };

  const filteredLogs = diagnostics?.logs.filter((log) => {
    if (filterCategory !== "all" && log.category !== filterCategory) return false;
    if (filterType !== "all" && log.type !== filterType) return false;
    return true;
  }) || [];

  const categoryCounts = diagnostics?.logs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="w-full space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">
                  Diagnóstico do Sistema
                </h1>
                <p className="text-muted-foreground">
                  Monitoramento de erros e saúde do sistema
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => window.location.reload()} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar
                </Button>
                <Button onClick={handleDownloadReport} variant="default">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Relatório
                </Button>
              </div>
            </div>

            {isLoading ? (
              <Card className="p-8 text-center">
                <Activity className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Carregando diagnósticos...</p>
              </Card>
            ) : diagnostics ? (
              <>
                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="glass p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        Status Geral
                      </h3>
                      {diagnostics.healthStatus.status === "healthy" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : diagnostics.healthStatus.status === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <p className="text-2xl font-bold capitalize">
                      {diagnostics.healthStatus.status === "healthy"
                        ? "Saudável"
                        : diagnostics.healthStatus.status === "warning"
                          ? "Atenção"
                          : "Crítico"}
                    </p>
                  </Card>

                  <Card className="glass p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        Total de Erros
                      </h3>
                      <Bug className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-2xl font-bold text-red-500">
                      {diagnostics.healthStatus.errors}
                    </p>
                  </Card>

                  <Card className="glass p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        Total de Avisos
                      </h3>
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-500">
                      {diagnostics.healthStatus.warnings}
                    </p>
                  </Card>

                  <Card className="glass p-6 shadow-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm text-muted-foreground">
                        Total de Logs
                      </h3>
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">{diagnostics.logs.length}</p>
                  </Card>
                </div>

                {/* Filtros */}
                <Card className="glass p-6 shadow-card">
                  <div className="flex items-center gap-4 mb-4">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Filtros</h3>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Categoria
                      </label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md"
                      >
                        <option value="all">Todas</option>
                        <option value="render">Renderização</option>
                        <option value="api">API</option>
                        <option value="network">Rede</option>
                        <option value="auth">Autenticação</option>
                        <option value="query">Query</option>
                        <option value="other">Outros</option>
                      </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Tipo
                      </label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md"
                      >
                        <option value="all">Todos</option>
                        <option value="error">Erros</option>
                        <option value="warning">Avisos</option>
                        <option value="info">Info</option>
                      </select>
                    </div>
                  </div>
                </Card>

                {/* Estatísticas por Categoria */}
                <Card className="glass p-6 shadow-card">
                  <h3 className="font-semibold mb-4">Estatísticas por Categoria</h3>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {Object.entries(categoryCounts).map(([category, count]) => (
                      <div key={category} className="text-center">
                        <p className="text-2xl font-bold">{count}</p>
                        <p className="text-sm text-muted-foreground capitalize">{category}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Logs */}
                <Card className="glass p-6 shadow-card">
                  <h3 className="font-semibold mb-4">
                    Logs ({filteredLogs.length})
                  </h3>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {filteredLogs.slice().reverse().map((log) => (
                        <div
                          key={log.id}
                          className="p-4 bg-muted rounded-lg border border-border hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  log.type === "error"
                                    ? "destructive"
                                    : log.type === "warning"
                                      ? "secondary"
                                      : "default"
                                }
                              >
                                {log.type}
                              </Badge>
                              <Badge variant="outline">{log.category}</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(log.timestamp).toLocaleString("pt-BR")}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{log.message}</p>
                          {log.stack && (
                            <details className="mt-2">
                              <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                                Ver stack trace
                              </summary>
                              <pre className="text-xs bg-background p-3 rounded mt-2 overflow-auto max-h-48 border border-border">
                                {log.stack}
                              </pre>
                            </details>
                          )}
                          {log.componentStack && (
                            <details className="mt-2">
                              <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                                Ver component stack
                              </summary>
                              <pre className="text-xs bg-background p-3 rounded mt-2 overflow-auto max-h-48 border border-border">
                                {log.componentStack}
                              </pre>
                            </details>
                          )}
                        </div>
                      ))}
                      {filteredLogs.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          Nenhum log encontrado com os filtros selecionados.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </Card>

                {/* Informações do Ambiente */}
                <Card className="glass p-6 shadow-card">
                  <h3 className="font-semibold mb-4">Estado do Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">React Query</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total de Queries:</span>
                          <span className="font-medium">{diagnostics.queryState.totalQueries}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ativas:</span>
                          <span className="font-medium text-blue-500">
                            {diagnostics.queryState.activeQueries}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Com Erro:</span>
                          <span className="font-medium text-red-500">
                            {diagnostics.queryState.errorQueries}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Autenticação</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge
                            variant={
                              diagnostics.authState.isAuthenticated ? "default" : "secondary"
                            }
                          >
                            {diagnostics.authState.isAuthenticated ? "Autenticado" : "Não Autenticado"}
                          </Badge>
                        </div>
                        {diagnostics.authState.email && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{diagnostics.authState.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Não foi possível carregar os diagnósticos.
                </p>
              </Card>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminRoute>
  );
};

export default DiagnosticsPage;

