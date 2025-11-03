import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("❌ ErrorBoundary capturou um erro:", error);
    console.error("📋 Error Info:", errorInfo);
    console.error("📍 Component Stack:", errorInfo.componentStack);
    
    // Logar no serviço de diagnóstico
    diagnosticsService.log({
      type: "error",
      category: "render",
      message: `ErrorBoundary: ${error.message}`,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      metadata: {
        errorName: error.name,
        errorMessage: error.message,
      },
    });
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    this.handleReset();
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo } = this.state;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="glass p-8 shadow-elevated max-w-2xl w-full">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-destructive/10 rounded-full">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Ops! Algo deu errado</h1>
                <p className="text-muted-foreground">
                  Ocorreu um erro inesperado. Por favor, tente novamente.
                </p>
              </div>

              {process.env.NODE_ENV === "development" && error && (
                <div className="w-full mt-4 p-4 bg-muted rounded-lg text-left">
                  <p className="font-semibold text-sm mb-2">Detalhes do erro (modo desenvolvimento):</p>
                  <pre className="text-xs text-muted-foreground overflow-auto max-h-48">
                    {error.toString()}
                    {errorInfo?.componentStack && (
                      <>
                        {"\n\n"}
                        {errorInfo.componentStack}
                      </>
                    )}
                  </pre>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  onClick={this.handleReset}
                  className="w-full sm:w-auto"
                  variant="default"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Tentar Novamente
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  className="w-full sm:w-auto"
                  variant="outline"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para Início
                </Button>
                <Button
                  onClick={() => {
                    const report = diagnosticsService.generateReport();
                    navigator.clipboard.writeText(report);
                    alert("Relatório de diagnóstico copiado para a área de transferência!");
                  }}
                  className="w-full sm:w-auto"
                  variant="outline"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar Diagnóstico
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                💡 Dica: Pressione Ctrl+Shift+D (ou Cmd+Shift+D no Mac) para abrir o painel de diagnóstico completo.
              </p>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

