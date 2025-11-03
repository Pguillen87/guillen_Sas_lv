import { agentService } from "../supabase/agents";
import { organizationService } from "../supabase/organizations";
import type {
  Agent,
  CreateAgentFormData,
  AgentUpdate,
  AgentConfiguration,
  AgentConnection,
} from "@/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * API layer for agents - handles authentication and organization context
 */
export const agentsApi = {
  /**
   * Get all agents for current user's organization
   */
  async getAll(): Promise<Agent[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return agentService.getAll(membership.organization_id);
  },

  /**
   * Get agent by ID
   */
  async getById(agentId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return agentService.getById(agentId, membership.organization_id);
  },

  /**
   * Create agent
   */
  async create(formData: CreateAgentFormData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization. Please create one first.");
    }

    return agentService.create(formData, membership.organization_id);
  },

  /**
   * Update agent
   */
  async update(agentId: string, updates: AgentUpdate) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return agentService.update(agentId, updates, membership.organization_id);
  },

  /**
   * Update agent configuration
   */
  async updateConfiguration(
    agentId: string,
    updates: Partial<AgentConfiguration>
  ) {
    // Verify agent belongs to user's organization
    await this.getById(agentId);
    return agentService.updateConfiguration(agentId, updates);
  },

  /**
   * Toggle agent active status
   */
  async toggleActive(agentId: string, currentStatus: boolean) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return agentService.toggleActive(
      agentId,
      membership.organization_id,
      currentStatus
    );
  },

  /**
   * Delete agent
   */
  async delete(agentId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return agentService.delete(agentId, membership.organization_id);
  },

  /**
   * Get agent connection (e.g., WhatsApp)
   */
  async getConnection(
    agentId: string,
    connectionType: string = "whatsapp"
  ): Promise<AgentConnection | null> {
    // Verify agent belongs to user's organization
    await this.getById(agentId);
    return agentService.getConnection(agentId, connectionType);
  },

  /**
   * Save agent connection (credentials encrypted)
   */
  async saveConnection(
    agentId: string,
    connectionType: string,
    credentialsEncrypted: string,
    metadata?: any
  ) {
    // Verify agent belongs to user's organization
    await this.getById(agentId);

    return agentService.upsertConnection({
      agent_id: agentId,
      connection_type: connectionType,
      credentials_encrypted: credentialsEncrypted,
      metadata,
    });
  },
};

