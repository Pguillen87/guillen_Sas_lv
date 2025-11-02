import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Bot, Plus, Search, Settings, Power, PowerOff, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";

interface Agent {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  avatar_url: string | null;
  created_at: string;
}

const Agents = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar agentes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAgent = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("agents")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Agente ${!currentStatus ? "ativado" : "desativado"}`);
      loadAgents();
    } catch (error: any) {
      toast.error("Erro ao atualizar agente");
    }
  };

  const deleteAgent = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este agente?")) return;

    try {
      const { error } = await supabase.from("agents").delete().eq("id", id);
      if (error) throw error;
      toast.success("Agente deletado");
      loadAgents();
    } catch (error: any) {
      toast.error("Erro ao deletar agente");
    }
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Agentes de IA</h1>
              <p className="text-muted-foreground mt-1">Gerencie seus agentes conversacionais</p>
            </div>
            <Button onClick={() => navigate("/agents/new")} className="bg-gradient-primary hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Novo Agente
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar agentes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando agentes...</p>
            </div>
          ) : filteredAgents.length === 0 ? (
            <Card className="glass p-12 text-center">
              <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum agente encontrado</h3>
              <p className="text-muted-foreground mb-6">Crie seu primeiro agente para começar</p>
              <Button onClick={() => navigate("/agents/new")} className="bg-gradient-primary hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Criar Agente
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Bot className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{agent.name}</h3>
                        <Badge variant={agent.is_active ? "default" : "secondary"} className="mt-1">
                          {agent.is_active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {agent.description || "Sem descrição"}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/agents/${agent.id}`)} className="flex-1">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => toggleAgent(agent.id, agent.is_active)}>
                      {agent.is_active ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => deleteAgent(agent.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Agents;
