import { Database } from "@/integrations/supabase/types";

export type Agent = Database["public"]["Tables"]["agents"]["Row"];
export type AgentInsert = Database["public"]["Tables"]["agents"]["Insert"];
export type AgentUpdate = Database["public"]["Tables"]["agents"]["Update"];

export type AgentConfiguration = Database["public"]["Tables"]["agent_configurations"]["Row"];
export type AgentConfigurationInsert = Database["public"]["Tables"]["agent_configurations"]["Insert"];
export type AgentConfigurationUpdate = Database["public"]["Tables"]["agent_configurations"]["Update"];

export type AgentConnection = Database["public"]["Tables"]["agent_connections"]["Row"];
export type AgentConnectionInsert = Database["public"]["Tables"]["agent_connections"]["Insert"];

export type AgentTemplate = Database["public"]["Tables"]["agent_templates"]["Row"];

export interface AgentWithConfig extends Agent {
  configuration?: AgentConfiguration;
  connection?: AgentConnection;
}

export interface CreateAgentFormData {
  name: string;
  description?: string;
  customPrompt?: string;
  temperature: number;
  maxTokens: number;
  templateId?: string;
}

export interface UpdateAgentFormData {
  name?: string;
  description?: string;
  customPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  isActive?: boolean;
}

