import { useEffect } from "react";
import { AdminRoute } from "@/components/admin/AdminRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Bot,
  Building2,
  Calendar,
  Activity,
  Loader2,
} from "lucide-react";
import { useGlobalStats } from "@/hooks/admin/useGlobalStats";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminStatsContent = () => {
  const { data: stats, isLoading, refetch } = useGlobalStats();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Mock data for charts - em produção virá do backend
  const monthlyData = [
    { month: "Jan", messages: 1200, conversations: 45, agents: 12 },
    { month: "Fev", messages: 1900, conversations: 68, agents: 15 },
    { month: "Mar", messages: 2400, conversations: 82, agents: 18 },
    { month: "Abr", messages: 2100, conversations: 71, agents: 20 },
    { month: "Mai", messages: 2800, conversations: 95, agents: 22 },
    { month: "Jun", messages: 3200, conversations: 110, agents: 25 },
  ];

  const agentDistribution = [
    { name: "Ativos", value: stats?.activeAgents || 0 },
    { name: "Inativos", value: (stats?.totalAgents || 0) - (stats?.activeAgents || 0) },
  ];

  const organizationDistribution = [
    { name: "Ativas", value: stats?.activeOrganizations || 0 },
    { name: "Inativas", value: (stats?.totalOrganizations || 0) - (stats?.activeOrganizations || 0) },
  ];

  const COLORS = ["#8b5cf6", "#6366f1", "#ec4899", "#f59e0b"];

  const statCards = [
    {
      title: "Total de Organizações",
      value: stats?.totalOrganizations || 0,
      subtitle: `${stats?.activeOrganizations || 0} ativas`,
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      trend: "+12%",
    },
    {
      title: "Total de Agentes",
      value: stats?.totalAgents || 0,
      subtitle: `${stats?.activeAgents || 0} ativos`,
      icon: Bot,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      trend: "+18%",
    },
    {
      title: "Total de Usuários",
      value: stats?.totalUsers || 0,
      subtitle: "usuários cadastrados",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: "+8%",
    },
    {
      title: "Mensagens (Total)",
      value: stats?.totalMessages || 0,
      subtitle: `${stats?.messagesToday || 0} hoje`,
      icon: MessageSquare,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      trend: "+25%",
    },
    {
      title: "Mensagens (Mês)",
      value: stats?.messagesThisMonth || 0,
      subtitle: "este mês",
      icon: Activity,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      trend: "+15%",
    },
    {
      title: "Conversas Ativas",
      value: stats?.activeConversations || 0,
      subtitle: "em andamento",
      icon: MessageSquare,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      trend: "+10%",
    },
    {
      title: "Agendamentos (Total)",
      value: stats?.totalAppointments || 0,
      subtitle: `${stats?.appointmentsToday || 0} hoje`,
      icon: Calendar,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      trend: "+5%",
    },
    {
      title: "Taxa de Ativação",
      value: stats?.totalAgents
        ? `${Math.round(((stats.activeAgents || 0) / stats.totalAgents) * 100)}%`
        : "0%",
      subtitle: "de agentes ativos",
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      trend: "+3%",
    },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[60vh]">
              <Card className="glass p-8 shadow-elevated">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Carregando estatísticas...</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold gradient-text">Estatísticas Globais</h1>
            <p className="text-muted-foreground">
              Métricas e análises detalhadas do sistema
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <Card
                key={index}
                className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                    {stat.trend && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.trend}
                      </Badge>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart - Mensagens por Mês */}
            <Card className="glass p-6 shadow-elevated">
              <h3 className="text-lg font-semibold mb-4">Mensagens ao Longo do Tempo</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Mensagens"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Bar Chart - Conversas por Mês */}
            <Card className="glass p-6 shadow-elevated">
              <h3 className="text-lg font-semibold mb-4">Conversas por Mês</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="conversations" fill="#6366f1" name="Conversas" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pie Chart - Distribuição de Agentes */}
            <Card className="glass p-6 shadow-elevated">
              <h3 className="text-lg font-semibold mb-4">Distribuição de Agentes</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={agentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {agentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie Chart - Distribuição de Organizações */}
            <Card className="glass p-6 shadow-elevated">
              <h3 className="text-lg font-semibold mb-4">Distribuição de Organizações</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={organizationDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {organizationDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[(index + 2) % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Bar Chart - Crescimento de Agentes */}
            <Card className="glass p-6 shadow-elevated">
              <h3 className="text-lg font-semibold mb-4">Crescimento de Agentes</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="agents" fill="#ec4899" name="Agentes" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass p-6 shadow-elevated">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="font-semibold">Performance Geral</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema operando com {stats?.activeAgents || 0} agentes ativos de{" "}
                {stats?.totalAgents || 0} agentes cadastrados.
              </p>
            </Card>

            <Card className="glass p-6 shadow-elevated">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-semibold">Crescimento</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Crescimento médio de 15% ao mês em mensagens processadas e conversas
                ativas.
              </p>
            </Card>

            <Card className="glass p-6 shadow-elevated">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="font-semibold">Análise</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Taxa de conversão de {stats?.activeConversations || 0} conversas ativas de{" "}
                {stats?.totalMessages || 0} mensagens totais.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminStats = () => {
  return (
    <AdminRoute>
      <AdminStatsContent />
    </AdminRoute>
  );
};

export default AdminStats;
