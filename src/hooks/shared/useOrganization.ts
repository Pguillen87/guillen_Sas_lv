import { useQuery } from "@tanstack/react-query";
import { organizationService } from "@/services/supabase/organizations";
import { supabase } from "@/integrations/supabase/client";

export function useOrganization() {
  return useQuery({
    queryKey: ["organization"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const membership = await organizationService.getMembership(user.id);
      if (!membership?.organization_id) {
        return null;
      }

      return organizationService.getById(membership.organization_id);
    },
  });
}

export function useOrganizationMembership() {
  return useQuery({
    queryKey: ["organization", "membership"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      return organizationService.getMembership(user.id);
    },
  });
}

