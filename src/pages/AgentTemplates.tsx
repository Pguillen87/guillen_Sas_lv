import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  ShoppingCart,
  Scissors,
  UtensilsCrossed,
  Store,
  GraduationCap,
  Heart,
  Briefcase,
} from "lucide-react";
import Layout from "@/components/Layout";

const AgentTemplates = () => {
  const navigate = useNavigate();

  const templates = [
    {
      icon: Stethoscope,
      name: "Clínica Veterinária",
      category: "Saúde",
      description: "Agendamento de consultas e orientações sobre cuidados com animais",
      prompt:
        "Você é um assistente virtual de uma clínica veterinária. Ajude com agendamentos, tire dúvidas sobre cuidados com animais e forneça informações sobre serviços.",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      icon: ShoppingCart,
      name: "E-commerce",
      category: "Varejo",
      description: "Atendimento ao cliente, status de pedidos e sugestões de produtos",
      prompt:
        "Você é um assistente de e-commerce. Ajude clientes com informações sobre produtos, status de pedidos, políticas de troca e devolução.",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      icon: Scissors,
      name: "Salão de Beleza",
      category: "Beleza",
      description: "Agendamentos, serviços disponíveis e dicas de beleza",
      prompt:
        "Você é um assistente de salão de beleza. Ajude com agendamentos, informações sobre serviços e dê dicas de cuidados com cabelo e pele.",
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
    },
    {
      icon: UtensilsCrossed,
      name: "Restaurante",
      category: "Alimentação",
      description: "Cardápio, reservas e pedidos delivery",
      prompt:
        "Você é um assistente de restaurante. Ajude com informações do cardápio, faça reservas e auxilie com pedidos para delivery.",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
    {
      icon: Store,
      name: "Loja Física",
      category: "Varejo",
      description: "Horários, produtos disponíveis e promoções",
      prompt:
        "Você é um assistente de loja física. Informe sobre horários de funcionamento, produtos disponíveis, promoções e como chegar à loja.",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      icon: GraduationCap,
      name: "Escola/Curso",
      category: "Educação",
      description: "Informações sobre cursos, matrículas e suporte ao aluno",
      prompt:
        "Você é um assistente educacional. Ajude com informações sobre cursos, processo de matrícula, calendário acadêmico e suporte ao aluno.",
      color: "text-indigo-400",
      bgColor: "bg-indigo-400/10",
    },
    {
      icon: Heart,
      name: "Clínica Médica",
      category: "Saúde",
      description: "Agendamentos de consultas e orientações gerais",
      prompt:
        "Você é um assistente de clínica médica. Ajude com agendamento de consultas, tire dúvidas gerais sobre saúde e forneça informações sobre a clínica.",
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      icon: Briefcase,
      name: "Consultoria",
      category: "Serviços",
      description: "Atendimento profissional e agendamento de reuniões",
      prompt:
        "Você é um assistente de consultoria profissional. Ajude a agendar reuniões, forneça informações sobre serviços e qualifique leads.",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
    },
  ];

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Templates de Agentes</h1>
            <p className="text-muted-foreground mt-1">
              Escolha um template e comece rapidamente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => {
              const Icon = template.icon;
              return (
                <Card
                  key={index}
                  className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
                  onClick={() =>
                    navigate("/agents/new", {
                      state: { template },
                    })
                  }
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${template.bgColor}`}>
                      <Icon className={`h-6 w-6 ${template.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{template.name}</h3>
                      <Badge variant="secondary">{template.category}</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>

                  <Button
                    className="w-full bg-gradient-primary hover:opacity-90"
                    size="sm"
                  >
                    Usar Template
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentTemplates;
