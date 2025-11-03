import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  TrendingUp,
  MessageSquare,
  Users,
  Calendar,
  Download,
  Filter,
  Loader2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { ClientRoute } from "@/components/routes/ClientRoute";
import { reportsService, type ReportFilters } from "@/services/supabase/reports";
import { organizationService } from "@/services/supabase/organizations";
import { useAgents } from "@/hooks/agents/useAgents";
import { downloadCSV, generateCSVFilename } from "@/lib/csv";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [filters, setFilters] = useState<ReportFilters>({});
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalConversations: 0,
    totalAgents: 0,
    totalAppointments: 0,
    messagesByAgent: [] as Array<{ agentId: string; agentName: string; count: number }>,
    messagesByDate: [] as Array<{ date: string; count: number }>,
  });

  const { data: agents = [] } = useAgents();

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.startDate, filters.endDate, filters.agentId]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const membership = await organizationService.getMembership(user.id);
      if (!membership?.organization_id) return;

      const reportStats = await reportsService.getStats(membership.organization_id, filters);

      setStats({
        totalMessages: reportStats.totalMessages,
        totalConversations: reportStats.totalConversations,
        totalAgents: reportStats.totalAgents,
        totalAppointments: reportStats.totalAppointments,
        messagesByAgent: reportStats.messagesByAgent,
        messagesByDate: reportStats.messagesByDate,
      });
    } catch (error: any) {
      toast.error("Erro ao carregar estatísticas");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      const membership = await organizationService.getMembership(user.id);
      if (!membership?.organization_id) {
        toast.error("Organização não encontrada");
        return;
      }

      const csvContent = await reportsService.exportToCSV(membership.organization_id, filters);
      const filename = generateCSVFilename("relatorio");
      downloadCSV(csvContent, filename);
      toast.success("Relatório exportado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao exportar relatório: " + (error.message || "Erro desconhecido"));
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  const handleFilterChange = (key: keyof ReportFilters, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
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
    <ClientRoute>
      <Layout>
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Relatórios</h1>
            <p className="text-muted-foreground mt-1">
              Visualize métricas e análises detalhadas
            </p>
          </div>
          <Button 
            className="bg-gradient-primary hover:opacity-90"
            onClick={handleExportCSV}
            disabled={exporting || loading}
          >
            {exporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar CSV
              </>
            )}
          </Button>
        </div>

        {/* Filters */}
        <Card className="glass p-6 shadow-elevated">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Inicial</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate || ""}
                onChange={(e) => handleFilterChange("startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate || ""}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent">Agente</Label>
              <Select
                value={filters.agentId || "all"}
                onValueChange={(value) => handleFilterChange("agentId", value === "all" ? undefined : value)}
              >
                <SelectTrigger id="agent">
                  <SelectValue placeholder="Todos os agentes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os agentes</SelectItem>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
                disabled={!filters.startDate && !filters.endDate && !filters.agentId}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </Card>

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
      </Layout>
    </ClientRoute>
  );
};

export default Reports;
