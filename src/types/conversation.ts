import { Database } from "@/integrations/supabase/types";

export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type ConversationInsert = Database["public"]["Tables"]["conversations"]["Insert"];
export type ConversationUpdate = Database["public"]["Tables"]["conversations"]["Update"];

export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];

export interface ConversationWithMessages extends Conversation {
  messages?: Message[];
  agent?: {
    id: string;
    name: string;
  };
}

export interface ConversationListFilters {
  status?: "active" | "closed" | "archived";
  agentId?: string;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
}

