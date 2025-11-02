import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import Layout from "@/components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeAgents: 0,
    messagesToday: 0,
    activeConversations: 0,
    appointmentsToday: 0,
  });

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  };

  const loadStats = async () => {
    try {
      // Load active agents
      const { count: agentsCount } = await supabase
        .from("agents")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Load messages today
      const today = new Date().toISOString().split("T")[0];
      const { count: messagesCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .gte("sent_at", today);

      // Load active conversations
      const { count: conversationsCount } = await supabase
        .from("conversations")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Load appointments today
      const { count: appointmentsCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .gte("start_time", today)
        .eq("status", "scheduled");

      setStats({
        activeAgents: agentsCount || 0,
        messagesToday: messagesCount || 0,
        activeConversations: conversationsCount || 0,
        appointmentsToday: appointmentsCount || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
    toast.success("Logout realizado com sucesso");
  };

  const statCards = [
    {
      title: "Agentes Ativos",
      value: stats.activeAgents,
      icon: Bot,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Mensagens Hoje",
      value: stats.messagesToday,
      icon: MessageSquare,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Conversas Ativas",
      value: stats.activeConversations,
      icon: Users,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Agendamentos Hoje",
      value: stats.appointmentsToday,
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
    <Layout>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
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
  );
};

export default Dashboard;
