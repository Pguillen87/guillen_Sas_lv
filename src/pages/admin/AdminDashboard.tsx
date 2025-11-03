import { useEffect } from "react";
import { AdminRoute } from "@/components/admin/AdminRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Bot,
  MessageSquare,
  TrendingUp,
  Users,
  AlertCircle,
  ArrowRight,
  Plug,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGlobalStats } from "@/hooks/admin/useGlobalStats";
import { useAllOrganizations } from "@/hooks/admin/useOrganizations";

const AdminDashboardContent = () => {
  const navigate = useNavigate();

  // Fetch global stats
  const { data: stats, isLoading, refetch: refetchStats } = useGlobalStats();
  
  // Fetch recent organizations
  const { data: recentOrgs, refetch: refetchOrgs } = useAllOrganizations();
  
  // Habilitar queries quando o componente monta (já dentro do AdminRoute)
  useEffect(() => {
    refetchStats();
    refetchOrgs();
  }, [refetchStats, refetchOrgs]);
  
  const recentOrganizations = recentOrgs?.slice(0, 5) || [];

  const statCards = [
    {
      title: "Organizações",
      value: stats?.totalOrganizations || 0,
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      path: "/admin/organizations",
    },
    {
      title: "Total de Agentes",
      value: stats?.totalAgents || 0,
      icon: Bot,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      path: "/admin/agents",
      subtitle: `${stats?.activeAgents || 0} ativos`,
    },
    {
      title: "Mensagens Hoje",
      value: stats?.messagesToday || 0,
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Conversas Ativas",
      value: stats?.activeConversations || 0,
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const quickActions = [
    {
      title: "Gerenciar Organizações",
      description: "Ver e gerenciar todas as organizações",
      icon: Building2,
      path: "/admin/organizations",
      color: "text-blue-500",
    },
    {
      title: "Ver Todos os Agentes",
      description: "Listar todos os agentes do sistema",
      icon: Bot,
      path: "/admin/agents",
      color: "text-purple-500",
    },
    {
      title: "Estatísticas Globais",
      description: "Analisar métricas e performance",
      icon: TrendingUp,
      path: "/admin/stats",
      color: "text-green-500",
    },
    {
      title: "Gerenciar Integrações",
      description: "Configurar APIs e conexões",
      icon: Plug,
      path: "/admin/integrations",
      color: "text-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary animate-float" />
              <div>
                <h1 className="text-3xl font-bold gradient-text">Dashboard Administrativo</h1>
                <p className="text-muted-foreground">
                  Visão geral do sistema e gerenciamento centralizado
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          {isLoading ? (
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
                  className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer"
                  onClick={() => stat.path && navigate(stat.path)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      {stat.subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.subtitle}
                        </p>
                      )}
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(action.path)}
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

          {/* Recent Organizations */}
          {recentOrganizations && recentOrganizations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg sm:text-xl font-bold">Organizações Recentes</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/admin/organizations")}
                >
                  Ver Todas
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
              <Card className="glass p-4 shadow-elevated">
                <div className="space-y-2">
                  {recentOrganizations.map((org: any) => (
                    <div
                      key={org.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/organizations/${org.id}`)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{org.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {org.slug}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {new Date(org.created_at).toLocaleDateString("pt-BR")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Info/Alerts Section */}
          <Card className="glass p-4 shadow-elevated border-blue-500/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold mb-0.5">Painel Administrativo</h3>
                <p className="text-xs text-muted-foreground">
                  Você tem acesso completo ao sistema. Use o menu lateral para
                  navegar entre as diferentes seções administrativas. Todas as
                  ações realizadas serão registradas nos logs de auditoria.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminDashboard = () => {
  return (
    <AdminRoute>
      <AdminDashboardContent />
    </AdminRoute>
  );
};

export default AdminDashboard;

