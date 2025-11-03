import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Bot,
  MessageSquare,
  Calendar,
  TrendingUp,
  Users,
  Plus,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { ClientRoute } from "@/components/routes/ClientRoute";
import DashboardCharts from "@/components/DashboardCharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { dashboardApi } from "@/services/api/dashboard";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => dashboardApi.getStats(),
  });

  const {
    data: chartDataPoints,
    isLoading: chartLoading,
  } = useQuery({
    queryKey: ["dashboard", "chart"],
    queryFn: () => dashboardApi.getChartData(7),
  });

  // Transform chart data for DashboardCharts component
  const chartData = chartDataPoints
    ? {
        messages: chartDataPoints.map((point) => point.messages),
        conversations: chartDataPoints.map((point) => point.conversations),
        labels: chartDataPoints.map((point) => {
          const date = new Date(point.date);
          return format(date, "EEE", { locale: ptBR });
        }),
      }
    : {
        messages: [0, 0, 0, 0, 0, 0, 0],
        conversations: [0, 0, 0, 0, 0, 0, 0],
        labels: [] as string[],
      };

  const loading = statsLoading || chartLoading;

  useEffect(() => {
    if (statsError) {
      toast.error("Erro ao carregar estatísticas. Tente recarregar a página.");
    }
  }, [statsError]);

  const statCards = [
    {
      title: "Agentes Ativos",
      value: stats?.activeAgents || 0,
      icon: Bot,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Mensagens Hoje",
      value: stats?.messagesToday || 0,
      icon: MessageSquare,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Conversas Ativas",
      value: stats?.activeConversations || 0,
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Agendamentos Hoje",
      value: stats?.appointmentsToday || 0,
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
  ];

  const quickActions = [
    {
      title: "Criar Agente",
      description: "Configure um novo agente de IA",
      icon: Plus,
      action: () => navigate("/agents/new"),
    },
    {
      title: "Ver Conversas",
      description: "Acompanhe suas conversas ativas",
      icon: MessageSquare,
      action: () => navigate("/conversations"),
    },
    {
      title: "Agendamentos",
      description: "Gerencie seus agendamentos",
      icon: Calendar,
      action: () => navigate("/appointments"),
    },
    {
      title: "Relatórios",
      description: "Visualize métricas e relatórios",
      icon: TrendingUp,
      action: () => navigate("/reports"),
    },
  ];

  return (
    <ClientRoute>
      <Layout>
        <div className="p-6 sm:p-8 lg:p-10 xl:p-12 w-full">
          <div className="w-full max-w-[1920px] mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
            {/* Header - Enhanced with better spacing and visual hierarchy */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-50"></div>
                  <Sparkles className="relative h-10 w-10 sm:h-12 sm:w-12 text-primary animate-float" />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
                    Dashboard
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1.5">
                    Bem-vindo ao seu portal de gestão
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid - Enhanced glassmorphism with better proportions */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card
                    key={i}
                    className="glass p-6 sm:p-7 lg:p-8 shadow-card animate-pulse rounded-2xl border-white/5 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-muted/50 rounded-lg w-28"></div>
                        <div className="h-10 bg-muted/50 rounded-lg w-20"></div>
                      </div>
                      <div className="w-14 h-14 bg-muted/50 rounded-2xl"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {statCards.map((stat, index) => (
                  <Card
                    key={index}
                    className="glass p-6 sm:p-7 lg:p-8 shadow-card hover:shadow-glow hover:scale-[1.02] transition-all duration-500 rounded-2xl border-white/5 backdrop-blur-xl group cursor-default"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider mb-3">
                          {stat.title}
                        </p>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-3 sm:p-3.5 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <stat.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.color}`} />
                      </div>
                    </div>
                    {/* Subtle gradient border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 pointer-events-none -z-10"></div>
                  </Card>
                ))}
              </div>
            )}

            {/* Charts - Enhanced container */}
            <div className="glass rounded-2xl border-white/5 backdrop-blur-xl shadow-card p-6 sm:p-8 lg:p-10">
              <DashboardCharts data={chartData} />
            </div>

            {/* Quick Actions - Enhanced with better glassmorphism */}
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text whitespace-nowrap">
                  Ações Rápidas
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {quickActions.map((action, index) => (
                  <Card
                    key={index}
                    className="glass p-6 sm:p-7 lg:p-8 shadow-card hover:shadow-glow hover:scale-[1.02] transition-all duration-500 cursor-pointer group rounded-2xl border-white/5 backdrop-blur-xl relative overflow-hidden"
                    onClick={action.action}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-primary/15 group-hover:to-accent/10 transition-all duration-500"></div>
                    
                    <div className="relative flex flex-col items-center text-center space-y-4 sm:space-y-5">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-colors duration-500"></div>
                        <div className="relative p-4 sm:p-5 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                          <action.icon className="h-8 w-8 sm:h-9 sm:w-9 text-primary relative z-10" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
                          {action.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ClientRoute>
  );
};

export default Dashboard;
