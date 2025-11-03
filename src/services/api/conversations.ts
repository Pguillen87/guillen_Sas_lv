import { conversationService } from "../supabase/conversations";
import { organizationService } from "../supabase/organizations";
import type {
  Conversation,
  ConversationInsert,
  ConversationUpdate,
  MessageInsert,
  ConversationListFilters,
} from "@/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * API layer for conversations
 */
export const conversationsApi = {
  /**
   * Get all conversations for current user's organization
   */
  async getAll(filters?: ConversationListFilters): Promise<Conversation[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return conversationService.getAll(membership.organization_id, filters);
  },

  /**
   * Get conversation by ID with messages
   */
  async getById(conversationId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return conversationService.getById(conversationId, membership.organization_id);
  },

  /**
   * Create conversation
   */
  async create(conversation: Omit<ConversationInsert, "organization_id">) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return conversationService.create({
      ...conversation,
      organization_id: membership.organization_id,
    });
  },

  /**
   * Update conversation
   */
  async update(conversationId: string, updates: ConversationUpdate) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return conversationService.update(
      conversationId,
      updates,
      membership.organization_id
    );
  },

  /**
   * Get or create conversation by participant phone
   */
  async getOrCreate(
    agentId: string,
    participantPhone: string,
    participantName?: string
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return conversationService.getOrCreate(
      agentId,
      participantPhone,
      membership.organization_id,
      participantName
    );
  },

  /**
   * Get messages for conversation
   */
  async getMessages(conversationId: string) {
    // Verify conversation belongs to user's organization
    await this.getById(conversationId);
    return conversationService.getMessages(conversationId);
  },

  /**
   * Add message to conversation
   */
  async addMessage(message: MessageInsert) {
    // Verify conversation belongs to user's organization
    await this.getById(message.conversation_id);
    return conversationService.addMessage(message);
  },
};

