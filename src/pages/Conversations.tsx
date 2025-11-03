import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MessageSquare, Search, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Layout from "@/components/layout/Layout";
import { ClientRoute } from "@/components/routes/ClientRoute";

interface Conversation {
  id: string;
  whatsapp_number: string;
  contact_name: string | null;
  status: string | null;
  last_message_at: string | null;
  created_at: string;
}

const Conversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .order("last_message_at", { ascending: false, nullsFirst: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar conversas");
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.whatsapp_number.includes(searchTerm) ||
      conv.contact_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ClientRoute>
      <Layout>
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="w-full space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Conversas</h1>
            <p className="text-muted-foreground mt-1">Acompanhe todas as conversas do WhatsApp</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por número ou nome..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando conversas...</p>
            </div>
          ) : filteredConversations.length === 0 ? (
            <Card className="glass p-12 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma conversa encontrada</h3>
              <p className="text-muted-foreground">As conversas aparecerão aqui assim que seus agentes receberem mensagens</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredConversations.map((conversation) => (
                <Card key={conversation.id} className="glass p-6 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{conversation.contact_name || conversation.whatsapp_number}</h3>
                        <Badge variant={conversation.status === "active" ? "default" : "secondary"}>
                          {conversation.status === "active" ? "Ativa" : "Arquivada"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{conversation.whatsapp_number}</p>
                      {conversation.last_message_at && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Última mensagem: {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true, locale: ptBR })}
                        </p>
                      )}
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

export default Conversations;
