import { supabase } from "@/integrations/supabase/client";
import type { Organization, OrganizationMember, OrganizationInsert } from "@/types";

export const organizationService = {
  /**
   * Get user's organization membership
   */
  async getMembership(userId: string) {
    const { data, error } = await supabase
      .from("organization_members")
      .select("organization_id, role")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Get organization by ID
   */
  async getById(organizationId: string) {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", organizationId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Create organization
   */
  async create(organization: OrganizationInsert, userId: string) {
    // Create organization
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .insert(organization)
      .select()
      .single();

    if (orgError) throw orgError;
    if (!org) throw new Error("Failed to create organization");

    // Add user as owner member
    const { error: memberError } = await supabase
      .from("organization_members")
      .insert({
        organization_id: org.id,
        user_id: userId,
        role: "owner",
      });

    if (memberError) {
      // Rollback: delete organization if member creation fails
      await supabase.from("organizations").delete().eq("id", org.id);
      throw memberError;
    }

    return org;
  },

  /**
   * Get all organizations for a user
   */
  async getUserOrganizations(userId: string) {
    const { data, error } = await supabase
      .from("organization_members")
      .select("organization:organizations(*)")
      .eq("user_id", userId);

    if (error) throw error;
    return data?.map((item: any) => item.organization) as Organization[];
  },
};

