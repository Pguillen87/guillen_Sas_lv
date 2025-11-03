// Shared types for Edge Functions

export interface EvolutionWebhookPayload {
  event: string;
  instance: string;
  data: {
    key?: {
      remoteJid?: string;
      fromMe?: boolean;
      id?: string;
    };
    message?: {
      conversation?: string;
      extendedTextMessage?: {
        text: string;
      };
    };
    messageType?: string;
    timestamp?: number;
    pushName?: string;
  };
}

export interface AgentResponse {
  agentId: string;
  conversationId: string;
  message: string;
}

