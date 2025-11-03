import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, Plus, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Layout from "@/components/layout/Layout";
import { ClientRoute } from "@/components/routes/ClientRoute";

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  status: string | null;
  attendee_name: string;
  attendee_phone: string;
  attendee_email: string | null;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("start_time", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar agendamentos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "scheduled":
        return "default";
      case "confirmed":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string | null) => {
    switch (status) {
      case "scheduled":
        return "Agendado";
      case "confirmed":
        return "Confirmado";
      case "completed":
        return "Concluído";
      case "cancelled":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
  };

  return (
    <ClientRoute>
      <Layout>
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Agendamentos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie todos os seus agendamentos
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando agendamentos...</p>
          </div>
        ) : appointments.length === 0 ? (
          <Card className="glass p-12 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Nenhum agendamento encontrado
            </h3>
            <p className="text-muted-foreground mb-6">
              Crie seu primeiro agendamento para começar
            </p>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Criar Agendamento
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">
                        {appointment.title}
                      </h3>
                      <Badge variant={getStatusColor(appointment.status)}>
                        {getStatusLabel(appointment.status)}
                      </Badge>
                    </div>

                    {appointment.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {appointment.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(new Date(appointment.start_time), "PPp", {
                            locale: ptBR,
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {appointment.attendee_name} ({appointment.attendee_phone})
                        </span>
                      </div>
                    </div>
                  </div>
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

export default Appointments;
