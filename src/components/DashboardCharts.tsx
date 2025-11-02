import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ChartData {
  messages: number[];
  conversations: number[];
  labels: string[];
}

interface DashboardChartsProps {
  data: ChartData;
}

const DashboardCharts = ({ data }: DashboardChartsProps) => {
  const maxMessages = Math.max(...data.messages);
  const maxConversations = Math.max(...data.conversations);

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const messagesGrowth = calculateGrowth(
    data.messages[data.messages.length - 1],
    data.messages[data.messages.length - 2]
  );

  const conversationsGrowth = calculateGrowth(
    data.conversations[data.conversations.length - 1],
    data.conversations[data.conversations.length - 2]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Messages Chart */}
      <Card className="glass p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Mensagens por Dia</h3>
            <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
          </div>
          <div
            className={`flex items-center gap-1 text-sm ${
              messagesGrowth >= 0 ? "text-success" : "text-destructive"
            }`}
          >
            {messagesGrowth >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(messagesGrowth).toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-4">
          {data.labels.map((label, index) => (
            <div key={index}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold">{data.messages[index]}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${(data.messages[index] / maxMessages) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Conversations Chart */}
      <Card className="glass p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Conversas por Dia</h3>
            <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
          </div>
          <div
            className={`flex items-center gap-1 text-sm ${
              conversationsGrowth >= 0 ? "text-success" : "text-destructive"
            }`}
          >
            {conversationsGrowth >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(conversationsGrowth).toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-4">
          {data.labels.map((label, index) => (
            <div key={index}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold">
                  {data.conversations[index]}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (data.conversations[index] / maxConversations) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardCharts;
