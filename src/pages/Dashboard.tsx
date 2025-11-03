import { useEffect, useState } from "react";
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
        <div className="p-4 sm:p-6 lg:p-8 w-full">
        <div className="w-full space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary animate-float" />
              <div>
                <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
                <p className="text-muted-foreground">
                  Bem-vindo ao seu portal de gestão
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card
                  key={i}
                  className="glass p-6 shadow-card animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                      <div className="h-8 bg-muted rounded w-16"></div>
                    </div>
                    <div className="w-12 h-12 bg-muted rounded-xl"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <Card
                  key={index}
                  className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Charts */}
          <DashboardCharts data={chartData} />

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
                  onClick={action.action}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <action.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
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
