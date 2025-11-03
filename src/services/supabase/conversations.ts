import { supabase } from "@/integrations/supabase/client";
import type {
  Conversation,
  ConversationInsert,
  ConversationUpdate,
  Message,
  MessageInsert,
  ConversationListFilters,
} from "@/types";

export const conversationService = {
  /**
   * Get all conversations for organization with filters
   */
  async getAll(organizationId: string, filters?: ConversationListFilters) {
    // Get agents from this organization first
    const { data: agents } = await supabase
      .from("agents")
      .select("id")
      .eq("organization_id", organizationId);
    
    const agentIds = agents?.map(a => a.id) || [];
    
    if (agentIds.length === 0) {
      return [];
    }

    let query = supabase
      .from("conversations")
      .select(`
        *,
        agent:agents(id, name)
      `)
      .in("agent_id", agentIds)
      .order("updated_at", { ascending: false });

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    if (filters?.agentId) {
      query = query.eq("agent_id", filters.agentId);
    }

    if (filters?.startDate) {
      query = query.gte("created_at", filters.startDate.toISOString());
    }

    if (filters?.endDate) {
      query = query.lte("created_at", filters.endDate.toISOString());
    }

    if (filters?.searchTerm) {
      query = query.or(`participant_name.ilike.%${filters.searchTerm}%,participant_phone.ilike.%${filters.searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  /**
   * Get conversation by ID with messages
   */
  async getById(conversationId: string, organizationId: string) {
    const { data: conversation, error: convError } = await supabase
      .from("conversations")
      .select(`
        *,
        agent:agents!inner(id, name, organization_id)
      `)
      .eq("id", conversationId)
      .eq("agent.organization_id", organizationId)
      .single();

    if (convError) throw convError;

    // Get messages
    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("sent_at", { ascending: true });

    if (messagesError) throw messagesError;

    return {
      ...conversation,
      messages: messages || [],
    };
  },

  /**
   * Create conversation
   */
  async create(conversation: ConversationInsert) {
    const { data, error } = await supabase
      .from("conversations")
      .insert(conversation)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update conversation
   */
  async update(
    conversationId: string,
    updates: ConversationUpdate,
    organizationId: string
  ) {
    // Verify conversation belongs to organization's agent
    const { data: conv } = await supabase
      .from("conversations")
      .select("agent:agents!inner(organization_id)")
      .eq("id", conversationId)
      .single();

    if (!conv || (conv.agent as any)?.organization_id !== organizationId) {
      throw new Error("Conversation not found or unauthorized");
    }

    const { data, error } = await supabase
      .from("conversations")
      .update(updates)
      .eq("id", conversationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get or create conversation by participant phone
   */
  async getOrCreate(
    agentId: string,
    participantPhone: string,
    organizationId: string,
    participantName?: string
  ) {
    // Try to find existing active conversation
    const { data: existing } = await supabase
      .from("conversations")
      .select("*")
      .eq("agent_id", agentId)
      .eq("whatsapp_number", participantPhone)
      .eq("status", "active")
      .maybeSingle();

    if (existing) {
      return existing;
    }

    // Create new conversation
    const { data: newConv, error } = await supabase
      .from("conversations")
      .insert({
        agent_id: agentId,
        whatsapp_number: participantPhone,
        contact_name: participantName || null,
        status: "active",
      })
      .select()
      .single();

    if (error) throw error;
    return newConv;
  },

  /**
   * Get messages for conversation
   */
  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("sent_at", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Add message to conversation
   */
  async addMessage(message: MessageInsert) {
    const { data, error } = await supabase
      .from("messages")
      .insert(message)
      .select()
      .single();

    if (error) throw error;

    // Update conversation updated_at
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", message.conversation_id);

    return data;
  },
};

