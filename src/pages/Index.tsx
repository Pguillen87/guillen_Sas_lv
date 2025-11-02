import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot, Zap, Shield, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "Agentes Inteligentes",
      description: "Crie agentes de IA personalizados com OpenAI",
    },
    {
      icon: Zap,
      title: "Integração WhatsApp",
      description: "Conecte-se instantaneamente ao WhatsApp Business",
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Dados criptografados e infraestrutura robusta",
    },
    {
      icon: TrendingUp,
      title: "Métricas em Tempo Real",
      description: "Acompanhe o desempenho dos seus agentes",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <Sparkles className="h-12 w-12 text-primary animate-float" />
              <h1 className="text-6xl font-bold gradient-text">GuillenIA</h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Plataforma completa para criação e gestão de{" "}
              <span className="text-primary font-semibold">agentes de IA</span>{" "}
              conversacionais integrados ao WhatsApp
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 animate-glow"
                onClick={() => navigate("/register")}
              >
                Começar Gratuitamente
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                onClick={() => navigate("/login")}
              >
                Fazer Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tudo que você precisa para{" "}
          <span className="gradient-text">automatizar seu atendimento</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl shadow-card hover:shadow-glow transition-all duration-300"
            >
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="glass p-12 rounded-2xl shadow-elevated">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para transformar seu atendimento?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Junte-se a centenas de empresas que já automatizaram seu atendimento
            com IA
          </p>
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-lg px-12"
            onClick={() => navigate("/register")}
          >
            Criar Conta Grátis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
