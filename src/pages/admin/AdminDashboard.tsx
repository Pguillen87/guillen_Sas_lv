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
      <div className="p-6 sm:p-8 lg:p-10 xl:p-12 w-full h-full">
        <div className="w-full space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Header - Enhanced with better spacing and visual hierarchy */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-50"></div>
                <Sparkles className="relative h-10 w-10 sm:h-12 sm:w-12 text-primary animate-float flex-shrink-0" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
                  Dashboard Administrativo
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1.5">
                  Visão geral do sistema e gerenciamento centralizado
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid - Enhanced glassmorphism with better proportions */}
          {isLoading ? (
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
                  className="glass p-6 sm:p-7 lg:p-8 shadow-card hover:shadow-glow hover:scale-[1.02] transition-all duration-500 rounded-2xl border-white/5 backdrop-blur-xl group cursor-pointer relative overflow-hidden"
                  onClick={() => stat.path && navigate(stat.path)}
                >
                  {/* Subtle gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 pointer-events-none -z-10"></div>
                  
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider mb-3">
                        {stat.title}
                      </p>
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      {stat.subtitle && (
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
                          {stat.subtitle}
                        </p>
                      )}
                    </div>
                    <div className={`p-3 sm:p-3.5 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                      <stat.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

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
                  onClick={() => navigate(action.path)}
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

          {/* Recent Organizations - Enhanced */}
          {recentOrganizations && recentOrganizations.length > 0 && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent max-w-[100px]"></div>
                  <h2 className="text-xl sm:text-2xl font-bold gradient-text whitespace-nowrap">
                    Organizações Recentes
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/admin/organizations")}
                  className="self-start sm:self-auto glass border-white/10 hover:border-primary/30"
                >
                  Ver Todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <Card className="glass p-6 sm:p-7 shadow-elevated rounded-2xl border-white/5 backdrop-blur-xl">
                <div className="space-y-3">
                  {recentOrganizations.map((org: any) => (
                    <div
                      key={org.id}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group border border-transparent hover:border-primary/10"
                      onClick={() => navigate(`/admin/organizations/${org.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-semibold group-hover:text-primary transition-colors">
                            {org.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {org.slug}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs glass border-white/10">
                        {new Date(org.created_at).toLocaleDateString("pt-BR")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Info/Alerts Section - Enhanced */}
          <Card className="glass p-6 sm:p-7 shadow-elevated border-blue-500/20 rounded-2xl backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 rounded-xl flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-2">Painel Administrativo</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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

