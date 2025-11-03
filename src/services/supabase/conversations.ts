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
    let query = supabase
      .from("conversations")
      .select(`
        *,
        agent:agents(id, name)
      `)
      .eq("organization_id", organizationId)
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
        agent:agents(id, name)
      `)
      .eq("id", conversationId)
      .eq("organization_id", organizationId)
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
    const { data, error } = await supabase
      .from("conversations")
      .update(updates)
      .eq("id", conversationId)
      .eq("organization_id", organizationId)
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
      .eq("participant_phone", participantPhone)
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
        organization_id: organizationId,
        participant_phone: participantPhone,
        participant_name: participantName || null,
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

