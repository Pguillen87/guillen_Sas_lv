import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, Search, Settings, Power, PowerOff, Trash2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { ClientRoute } from "@/components/routes/ClientRoute";
import { useAgents, useToggleAgent, useDeleteAgent } from "@/hooks/agents/useAgents";
import type { Agent } from "@/types";

const Agents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: agents = [], isLoading, error } = useAgents();
  const toggleAgent = useToggleAgent();
  const deleteAgent = useDeleteAgent();

  const handleToggleAgent = async (id: string, currentStatus: boolean) => {
    if (!window.confirm(`Deseja ${currentStatus ? "desativar" : "ativar"} este agente?`)) {
      return;
    }
    toggleAgent.mutate({ agentId: id, currentStatus });
  };

  const handleDeleteAgent = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este agente?")) return;
    deleteAgent.mutate(id);
  };

  const filteredAgents = agents.filter((agent: Agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <ClientRoute>
        <Layout>
          <div className="p-4 md:p-8 w-full">
            <div className="w-full">
            <Card className="glass p-8 shadow-elevated">
              <p className="text-destructive">Erro ao carregar agentes. Tente recarregar a página.</p>
            </Card>
          </div>
        </div>
        </Layout>
      </ClientRoute>
    );
  }

  return (
    <ClientRoute>
      <Layout>
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="w-full space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Agentes</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie seus agentes de IA
              </p>
            </div>
            <Button
              onClick={() => navigate("/agents/new")}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Agente
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar agentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Agents Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass p-6 shadow-card animate-pulse">
                  <div className="h-32 bg-muted rounded"></div>
                </Card>
              ))}
            </div>
          ) : filteredAgents.length === 0 ? (
            <Card className="glass p-12 shadow-elevated text-center">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? "Nenhum agente encontrado" : "Nenhum agente ainda"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm
                  ? "Tente buscar com outros termos"
                  : "Crie seu primeiro agente para começar"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => navigate("/agents/new")}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeiro Agente
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent: Agent) => (
                <Card
                  key={agent.id}
                  className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Bot className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{agent.name}</h3>
                        <Badge
                          variant={agent.is_active ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {agent.is_active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {agent.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {agent.description}
                    </p>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleToggleAgent(agent.id, agent.is_active || false)}
                      disabled={toggleAgent.isPending}
                    >
                      {agent.is_active ? (
                        <>
                          <PowerOff className="mr-2 h-4 w-4" />
                          Desativar
                        </>
                      ) : (
                        <>
                          <Power className="mr-2 h-4 w-4" />
                          Ativar
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/agents/${agent.id}/settings`)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAgent(agent.id)}
                      disabled={deleteAgent.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          </div>
        </div>
      </Layout>
    </ClientRoute>
  );
};

export default Agents;
