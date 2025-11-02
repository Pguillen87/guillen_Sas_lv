import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Para começar e testar",
      features: [
        "1 agente",
        "100 mensagens/mês",
        "Suporte por email",
        "Dashboard básico",
      ],
      cta: "Plano Atual",
      popular: false,
    },
    {
      name: "Starter",
      price: { monthly: 97, yearly: 970 },
      description: "Para pequenas empresas",
      features: [
        "3 agentes",
        "1.000 mensagens/mês",
        "Suporte prioritário",
        "Relatórios diários",
        "Integração WhatsApp",
        "Integração Google Calendar",
      ],
      cta: "Começar Agora",
      popular: true,
    },
    {
      name: "Business",
      price: { monthly: 297, yearly: 2970 },
      description: "Para empresas em crescimento",
      features: [
        "10 agentes",
        "5.000 mensagens/mês",
        "Suporte 24/7",
        "Relatórios avançados",
        "Agente supervisor",
        "Templates personalizados",
        "Webhooks customizados",
      ],
      cta: "Começar Agora",
      popular: false,
    },
    {
      name: "Enterprise",
      price: { monthly: 997, yearly: 9970 },
      description: "Para grandes operações",
      features: [
        "Agentes ilimitados",
        "Mensagens ilimitadas",
        "Suporte dedicado",
        "Customizações",
        "API access",
        "White-label (em breve)",
        "SLA garantido",
        "Treinamento personalizado",
      ],
      cta: "Falar com Vendas",
      popular: false,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    const price = billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
    return billingCycle === "yearly" ? (price / 12).toFixed(2) : price;
  };

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">
              Planos e Preços
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio e comece a automatizar
              seu atendimento com IA
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Anual
                <Badge className="ml-2" variant="secondary">
                  -20%
                </Badge>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`glass p-6 shadow-card transition-all duration-300 relative ${
                  plan.popular
                    ? "border-primary shadow-glow scale-105"
                    : "hover:shadow-glow"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary">Mais Popular</Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold gradient-text">
                      R$ {getPrice(plan)}
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  {billingCycle === "yearly" && plan.price.yearly > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      R$ {plan.price.yearly}/ano (economize 20%)
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-primary hover:opacity-90"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Dúvidas sobre os planos?</h2>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco para tirar suas dúvidas
            </p>
            <Button variant="outline" size="lg">
              Falar com Suporte
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
