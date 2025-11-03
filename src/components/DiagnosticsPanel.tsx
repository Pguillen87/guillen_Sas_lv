import { useState, useEffect } from "react";
import { useDiagnostics } from "@/hooks/useDiagnostics";
import { diagnosticsService } from "@/services/diagnostics";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bug,
  X,
  Copy,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Activity,
  User,
  Globe,
  Database,
} from "lucide-react";
import { toast } from "sonner";

interface DiagnosticsPanelProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DiagnosticsPanel({ open: controlledOpen, onOpenChange }: DiagnosticsPanelProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { diagnostics, isLoading } = useDiagnostics();

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  // Atalho de teclado: Ctrl+Shift+D ou Cmd+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setIsOpen((prev: boolean) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  const handleCopyReport = () => {
    if (!diagnostics) return;

    const report = diagnosticsService.generateReport();
    navigator.clipboard.writeText(report);
    toast.success("Relatório copiado para a área de transferência!");
  };

  const handleDownloadReport = () => {
    if (!diagnostics) return;

    const report = diagnosticsService.generateReport();
    const blob = new Blob([report], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnostico-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Relatório baixado com sucesso!");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "healthy":
        return "default";
      case "warning":
        return "secondary";
      case "critical":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <>
      {/* Botão flutuante para abrir (se não controlado) */}
      {controlledOpen === undefined && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
          title="Painel de Diagnóstico (Ctrl+Shift+D)"
        >
          <Bug className="h-6 w-6" />
        </button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bug className="h-6 w-6 text-primary" />
                <DialogTitle>Painel de Diagnóstico</DialogTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DialogDescription>
              Informações de diagnóstico do sistema. Atalho: Ctrl+Shift+D (ou Cmd+Shift+D)
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3">Carregando diagnósticos...</span>
            </div>
          ) : diagnostics ? (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="queries">Queries</TabsTrigger>
                <TabsTrigger value="environment">Ambiente</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Status de Saúde */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(diagnostics.healthStatus.status)}
                      <h3 className="font-semibold">Status de Saúde</h3>
                    </div>
                    <Badge variant={getStatusBadgeVariant(diagnostics.healthStatus.status)}>
                      {diagnostics.healthStatus.status === "healthy"
                        ? "Saudável"
                        : diagnostics.healthStatus.status === "warning"
                          ? "Atenção"
                          : "Crítico"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Erros</p>
                      <p className="text-2xl font-bold text-red-500">
                        {diagnostics.healthStatus.errors}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avisos</p>
                      <p className="text-2xl font-bold text-yellow-500">
                        {diagnostics.healthStatus.warnings}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Logs</p>
                      <p className="text-2xl font-bold">{diagnostics.logs.length}</p>
                    </div>
                  </div>
                </Card>

                {/* Erros Recentes */}
                {diagnostics.healthStatus.recentErrors.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Erros Recentes</h3>
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {diagnostics.healthStatus.recentErrors.map((error) => (
                          <div
                            key={error.id}
                            className="p-3 bg-destructive/10 rounded-lg border border-destructive/20"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium">{error.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {error.category} • {new Date(error.timestamp).toLocaleString("pt-BR")}
                                </p>
                              </div>
                              <Badge variant="destructive" className="ml-2">
                                {error.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                )}

                {/* Ações */}
                <div className="flex gap-2">
                  <Button onClick={handleCopyReport} variant="outline" className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Relatório
                  </Button>
                  <Button onClick={handleDownloadReport} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Relatório
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="logs" className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Todos os Logs ({diagnostics.logs.length})</h3>
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {diagnostics.logs.slice().reverse().map((log) => (
                        <div
                          key={log.id}
                          className="p-3 bg-muted rounded-lg border border-border"
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
                          <p className="text-sm mb-1">{log.message}</p>
                          {log.stack && (
                            <details className="mt-2">
                              <summary className="text-xs text-muted-foreground cursor-pointer">
                                Ver stack trace
                              </summary>
                              <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto max-h-32">
                                {log.stack}
                              </pre>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </TabsContent>

              <TabsContent value="queries" className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="h-5 w-5" />
                    <h3 className="font-semibold">Estado do React Query</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{diagnostics.queryState.totalQueries}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ativas</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {diagnostics.queryState.activeQueries}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Com Erro</p>
                      <p className="text-2xl font-bold text-red-500">
                        {diagnostics.queryState.errorQueries}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5" />
                    <h3 className="font-semibold">Estado de Autenticação</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Autenticado:</span>
                      <Badge variant={diagnostics.authState.isAuthenticated ? "default" : "secondary"}>
                        {diagnostics.authState.isAuthenticated ? "Sim" : "Não"}
                      </Badge>
                    </div>
                    {diagnostics.authState.userId && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">User ID:</span>
                        <span className="text-sm font-mono">{diagnostics.authState.userId.slice(0, 8)}...</span>
                      </div>
                    )}
                    {diagnostics.authState.email && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Email:</span>
                        <span className="text-sm">{diagnostics.authState.email}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="environment" className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5" />
                    <h3 className="font-semibold">Informações do Ambiente</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">URL:</span>
                      <span className="font-mono text-xs">{diagnostics.environment.url}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Viewport:</span>
                      <span>
                        {diagnostics.environment.viewport.width} ×{" "}
                        {diagnostics.environment.viewport.height}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">User Agent:</span>
                      <span className="font-mono text-xs max-w-md truncate">
                        {diagnostics.environment.userAgent}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timestamp:</span>
                      <span className="text-xs">
                        {new Date(diagnostics.environment.timestamp).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Não foi possível carregar os diagnósticos.</p>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

