import { Database } from "@/integrations/supabase/types";

export type Organization = Database["public"]["Tables"]["organizations"]["Row"];
export type OrganizationInsert = Database["public"]["Tables"]["organizations"]["Insert"];
export type OrganizationUpdate = Database["public"]["Tables"]["organizations"]["Update"];

export type OrganizationMember = Database["public"]["Tables"]["organization_members"]["Row"];
export type OrganizationMemberInsert = Database["public"]["Tables"]["organization_members"]["Insert"];

export interface OrganizationWithMembers extends Organization {
  members?: OrganizationMember[];
}

