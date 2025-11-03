/**
 * Serviço de Diagnóstico
 * Coleta e armazena informações sobre erros e problemas no sistema
 */

export interface DiagnosticLog {
  id: string;
  timestamp: string;
  type: "error" | "warning" | "info";
  category: "render" | "api" | "network" | "auth" | "query" | "other";
  message: string;
  stack?: string;
  componentStack?: string;
  metadata?: Record<string, unknown>;
  userAgent?: string;
  url?: string;
}

class DiagnosticsService {
  private logs: DiagnosticLog[] = [];
  private readonly maxLogs = 100;

  constructor() {
    this.setupGlobalErrorHandlers();
  }

  /**
   * Configura handlers globais para capturar erros
   */
  private setupGlobalErrorHandlers() {
    // Capturar erros JavaScript não tratados
    window.addEventListener("error", (event) => {
      this.log({
        type: "error",
        category: "render",
        message: event.message || "Erro JavaScript não tratado",
        stack: event.error?.stack,
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    });

    // Capturar promessas rejeitadas não tratadas
    window.addEventListener("unhandledrejection", (event) => {
      this.log({
        type: "error",
        category: "api",
        message: `Promise rejeitada: ${event.reason?.message || String(event.reason)}`,
        stack: event.reason?.stack,
        metadata: {
          reason: event.reason,
        },
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    });
  }

  /**
   * Adiciona um log de diagnóstico
   */
  log(logData: Omit<DiagnosticLog, "id" | "timestamp">): void {
    const diagnosticLog: DiagnosticLog = {
      ...logData,
      id: `diag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      userAgent: logData.userAgent || navigator.userAgent,
      url: logData.url || window.location.href,
    };

    this.logs.push(diagnosticLog);

    // Manter apenas os últimos N logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Salvar no localStorage para persistência
    try {
      localStorage.setItem("app-diagnostics", JSON.stringify(this.logs));
    } catch (e) {
      console.warn("Não foi possível salvar diagnóstico no localStorage:", e);
    }

    // Log no console em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.group(`🔍 [${diagnosticLog.category.toUpperCase()}] ${diagnosticLog.type}`);
      console.log("Mensagem:", diagnosticLog.message);
      if (diagnosticLog.stack) {
        console.log("Stack:", diagnosticLog.stack);
      }
      if (diagnosticLog.metadata) {
        console.log("Metadata:", diagnosticLog.metadata);
      }
      console.groupEnd();
    }
  }

  /**
   * Retorna todos os logs
   */
  getLogs(): DiagnosticLog[] {
    // Tentar carregar do localStorage se estiver vazio
    if (this.logs.length === 0) {
      try {
        const stored = localStorage.getItem("app-diagnostics");
        if (stored) {
          this.logs = JSON.parse(stored);
        }
      } catch (e) {
        console.warn("Não foi possível carregar diagnósticos do localStorage:", e);
      }
    }
    return [...this.logs];
  }

  /**
   * Retorna logs filtrados por categoria
   */
  getLogsByCategory(category: DiagnosticLog["category"]): DiagnosticLog[] {
    return this.getLogs().filter((log) => log.category === category);
  }

  /**
   * Retorna logs filtrados por tipo
   */
  getLogsByType(type: DiagnosticLog["type"]): DiagnosticLog[] {
    return this.getLogs().filter((log) => log.type === type);
  }

  /**
   * Retorna os últimos N logs
   */
  getRecentLogs(count: number = 10): DiagnosticLog[] {
    return this.getLogs().slice(-count);
  }

  /**
   * Limpa todos os logs
   */
  clearLogs(): void {
    this.logs = [];
    try {
      localStorage.removeItem("app-diagnostics");
    } catch (e) {
      console.warn("Não foi possível limpar diagnósticos do localStorage:", e);
    }
  }

  /**
   * Gera relatório de diagnóstico completo
   */
  generateReport(): string {
    const logs = this.getLogs();
    const errors = logs.filter((log) => log.type === "error");
    const warnings = logs.filter((log) => log.type === "warning");
    
    const categoryCounts = logs.reduce((acc, log) => {
      acc[log.category] = (acc[log.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return JSON.stringify(
      {
        summary: {
          total: logs.length,
          errors: errors.length,
          warnings: warnings.length,
          categories: categoryCounts,
        },
        recentErrors: errors.slice(-10),
        allLogs: logs,
        environment: {
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        },
      },
      null,
      2
    );
  }

  /**
   * Verifica saúde geral do sistema
   */
  getHealthStatus(): {
    status: "healthy" | "warning" | "critical";
    errors: number;
    warnings: number;
    recentErrors: DiagnosticLog[];
  } {
    const errors = this.getLogsByType("error");
    const warnings = this.getLogsByType("warning");
    const recentErrors = errors.slice(-5);

    let status: "healthy" | "warning" | "critical" = "healthy";
    if (errors.length > 10) {
      status = "critical";
    } else if (errors.length > 5 || warnings.length > 20) {
      status = "warning";
    }

    return {
      status,
      errors: errors.length,
      warnings: warnings.length,
      recentErrors,
    };
  }
}

// Instância singleton
export const diagnosticsService = new DiagnosticsService();

// Exportar para uso global em desenvolvimento
if (process.env.NODE_ENV === "development") {
  (window as any).__DIAGNOSTICS__ = diagnosticsService;
}

