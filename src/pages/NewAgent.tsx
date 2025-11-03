import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bot, Loader2, ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { ClientRoute } from "@/components/routes/ClientRoute";
import { useCreateAgent } from "@/hooks/agents/useAgents";
import { createAgentSchema } from "@/lib/validations";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { organizationService } from "@/services/supabase/organizations";
import { subscriptionService } from "@/services/supabase/subscriptions";
import type { CreateAgentFormData } from "@/types";

const NewAgent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const createAgent = useCreateAgent();
  const [formData, setFormData] = useState<CreateAgentFormData>({
    name: "",
    description: "",
    customPrompt: "",
    temperature: 0.7,
    maxTokens: 1000,
  });

  // Fetch limit check
  const { data: limitCheck, isLoading: limitCheckLoading } = useQuery({
    queryKey: ["agent-limit-check"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const membership = await organizationService.getMembership(user.id);
      if (!membership?.organization_id) return null;

      return subscriptionService.checkAgentLimit(membership.organization_id);
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  useEffect(() => {
    // Load template if coming from templates page
    const template = (location.state as any)?.template;
    if (template) {
      setFormData({
        name: template.name,
        description: template.description,
        customPrompt: template.prompt || template.base_prompt,
        temperature: 0.7,
        maxTokens: 1000,
        templateId: template.id,
      });
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationResult = createAgentSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      // Error will be shown by toast in the mutation
      return;
    }

    createAgent.mutate(formData, {
      onSuccess: () => {
        navigate("/agents");
      },
      onError: (error: any) => {
        if (error.message?.includes("organização")) {
          navigate("/create-organization");
        }
      },
    });
  };

  return (
    <ClientRoute>
      <Layout>
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/agents")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold gradient-text">Criar Novo Agente</h1>
            <p className="text-muted-foreground mt-1">
              Configure seu agente de IA personalizado
            </p>
          </div>

          {/* Limit Warning/Info */}
          {!limitCheckLoading && limitCheck && (
            <Card className="glass p-4 shadow-elevated">
              {!limitCheck.canCreate ? (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold mb-1">Limite atingido</div>
                    <div>{limitCheck.reason}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => navigate("/pricing")}
                    >
                      Ver Planos
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : limitCheck.warning ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold mb-1">Atenção: Próximo do limite</div>
                    <div>{limitCheck.warning}</div>
                    <div className="mt-2 text-sm">
                      Plano atual: <strong>{limitCheck.limits.planName}</strong> ({limitCheck.usage.currentAgents}/{limitCheck.limits.maxAgents === null ? "∞" : limitCheck.limits.maxAgents} agentes)
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <div className="text-sm">
                      Plano atual: <strong>{limitCheck.limits.planName}</strong> ({limitCheck.usage.currentAgents}/{limitCheck.limits.maxAgents === null ? "∞" : limitCheck.limits.maxAgents} agentes)
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </Card>
          )}

          {/* Form */}
          <Card className="glass p-8 shadow-elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Agente *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Assistente de Vendas"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={createAgent.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva a função deste agente..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  disabled={createAgent.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt Personalizado</Label>
                <Textarea
                  id="prompt"
                  placeholder="Ex: Você é um assistente de vendas especializado em..."
                  value={formData.customPrompt}
                  onChange={(e) =>
                    setFormData({ ...formData, customPrompt: e.target.value })
                  }
                  rows={6}
                  disabled={createAgent.isPending}
                />
                <p className="text-sm text-muted-foreground">
                  Defina o comportamento e personalidade do seu agente
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="temperature">
                    Temperatura ({formData.temperature})
                  </Label>
                  <Input
                    id="temperature"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        temperature: parseFloat(e.target.value),
                      })
                    }
                    disabled={createAgent.isPending}
                  />
                  <p className="text-xs text-muted-foreground">
                    Controla a criatividade das respostas (0 = preciso, 1 = criativo)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Tokens Máximos</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    min="100"
                    max="4000"
                    value={formData.maxTokens}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxTokens: parseInt(e.target.value),
                      })
                    }
                    disabled={createAgent.isPending}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tamanho máximo das respostas
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/agents")}
                  disabled={createAgent.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  disabled={createAgent.isPending || (!limitCheckLoading && limitCheck && !limitCheck.canCreate)}
                >
                  {createAgent.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Bot className="mr-2 h-4 w-4" />
                      Criar Agente
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      </Layout>
    </ClientRoute>
  );
};

export default NewAgent;
