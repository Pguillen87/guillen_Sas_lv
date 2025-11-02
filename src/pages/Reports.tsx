import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  TrendingUp,
  MessageSquare,
  Users,
  Calendar,
  Download,
} from "lucide-react";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalConversations: 0,
    totalAgents: 0,
    totalAppointments: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [messages, conversations, agents, appointments] = await Promise.all([
        supabase.from("messages").select("*", { count: "exact", head: true }),
        supabase.from("conversations").select("*", { count: "exact", head: true }),
        supabase.from("agents").select("*", { count: "exact", head: true }),
        supabase.from("appointments").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        totalMessages: messages.count || 0,
        totalConversations: conversations.count || 0,
        totalAgents: agents.count || 0,
        totalAppointments: appointments.count || 0,
      });
    } catch (error: any) {
      toast.error("Erro ao carregar estatísticas");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total de Mensagens",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "Total de Conversas",
      value: stats.totalConversations,
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Total de Agentes",
      value: stats.totalAgents,
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Total de Agendamentos",
      value: stats.totalAppointments,
      icon: Calendar,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Relatórios</h1>
            <p className="text-muted-foreground mt-1">
              Visualize métricas e análises detalhadas
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
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
                  <p className="text-3xl font-bold mt-2">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Report Sections */}
        <Card className="glass p-8 shadow-card">
          <h2 className="text-2xl font-bold mb-4">Desempenho Geral</h2>
          <p className="text-muted-foreground">
            Aqui você terá acesso a gráficos e relatórios detalhados sobre o
            desempenho dos seus agentes, conversas e muito mais.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-primary/5 rounded-xl">
              <p className="text-2xl font-bold gradient-text">85%</p>
              <p className="text-sm text-muted-foreground mt-2">
                Taxa de Satisfação
              </p>
            </div>
            <div className="text-center p-6 bg-accent/5 rounded-xl">
              <p className="text-2xl font-bold gradient-text">2.5min</p>
              <p className="text-sm text-muted-foreground mt-2">
                Tempo Médio de Resposta
              </p>
            </div>
            <div className="text-center p-6 bg-success/5 rounded-xl">
              <p className="text-2xl font-bold gradient-text">92%</p>
              <p className="text-sm text-muted-foreground mt-2">
                Taxa de Resolução
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
