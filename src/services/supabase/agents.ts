import { supabase } from "@/integrations/supabase/client";
import type {
  Agent,
  AgentInsert,
  AgentUpdate,
  AgentConfiguration,
  AgentConfigurationInsert,
  AgentConnection,
  CreateAgentFormData,
} from "@/types";

export const agentService = {
  /**
   * Get all agents for user's organization
   */
  async getAll(organizationId: string) {
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get agent by ID with configuration and connection
   */
  async getById(agentId: string, organizationId: string) {
    const { data, error } = await supabase
      .from("agents")
      .select(`
        *,
        configuration:agent_configurations(*),
        connection:agent_connections(*)
      `)
      .eq("id", agentId)
      .eq("organization_id", organizationId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create agent with configuration
   */
  async create(formData: CreateAgentFormData, organizationId: string) {
    // Create agent
    const agentData: AgentInsert = {
      name: formData.name.trim(),
      description: formData.description?.trim() || null,
      organization_id: organizationId,
      is_active: false,
      template_id: formData.templateId || null,
    };

    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .insert(agentData)
      .select()
      .single();

    if (agentError) throw agentError;
    if (!agent) throw new Error("Failed to create agent");

    // Create configuration
    const configData: AgentConfigurationInsert = {
      agent_id: agent.id,
      custom_prompt: formData.customPrompt?.trim() || null,
      temperature: formData.temperature,
      max_tokens: formData.maxTokens,
    };

    const { error: configError } = await supabase
      .from("agent_configurations")
      .insert(configData);

    if (configError) {
      // Rollback: delete agent if config creation fails
      await supabase.from("agents").delete().eq("id", agent.id);
      throw configError;
    }

    return agent;
  },

  /**
   * Update agent
   */
  async update(agentId: string, updates: AgentUpdate, organizationId: string) {
    const { data, error } = await supabase
      .from("agents")
      .update(updates)
      .eq("id", agentId)
      .eq("organization_id", organizationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update agent configuration
   */
  async updateConfiguration(
    agentId: string,
    updates: Partial<AgentConfiguration>
  ) {
    const { data, error } = await supabase
      .from("agent_configurations")
      .update({
        custom_prompt: updates.custom_prompt,
        temperature: updates.temperature,
        max_tokens: updates.max_tokens,
        updated_at: new Date().toISOString(),
      })
      .eq("agent_id", agentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Toggle agent active status
   */
  async toggleActive(agentId: string, organizationId: string, currentStatus: boolean) {
    const { data, error } = await supabase
      .from("agents")
      .update({ is_active: !currentStatus })
      .eq("id", agentId)
      .eq("organization_id", organizationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete agent
   */
  async delete(agentId: string, organizationId: string) {
    const { error } = await supabase
      .from("agents")
      .delete()
      .eq("id", agentId)
      .eq("organization_id", organizationId);

    if (error) throw error;
  },

  /**
   * Get agent connection
   */
  async getConnection(agentId: string, connectionType: string = "whatsapp") {
    const { data, error } = await supabase
      .from("agent_connections")
      .select("*")
      .eq("agent_id", agentId)
      .eq("connection_type", connectionType)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Create or update agent connection
   */
  async upsertConnection(connection: {
    agent_id: string;
    connection_type: string;
    credentials_encrypted: string;
    metadata?: any;
  }) {
    const { data, error } = await supabase
      .from("agent_connections")
      .upsert({
        ...connection,
        updated_at: new Date().toISOString(),
        last_tested_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

