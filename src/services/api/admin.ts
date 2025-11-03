import { adminService } from "../supabase/admin";
import { checkAdminAccess } from "@/lib/admin";
import { supabase } from "@/integrations/supabase/client";
import type {
  OrganizationWithStats,
  AgentWithOrganization,
  GlobalStats,
  OrganizationStats,
} from "../supabase/admin";

/**
 * Admin API layer - handles authentication and admin permissions
 * All functions verify admin access before executing
 */

export const adminApi = {
  /**
   * Get all organizations (admin only)
   */
  async getAllOrganizations(): Promise<OrganizationWithStats[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    const orgs = await adminService.getAllOrganizations();

    // Enhance with stats for each organization (with error handling)
    const orgsWithStats = await Promise.allSettled(
      orgs.map(async (org) => {
        try {
          const [stats, details] = await Promise.allSettled([
            adminService.getOrganizationStats(org.id),
            adminService.getOrganizationWithDetails(org.id),
          ]);
          
          return {
            ...org,
            stats: stats.status === "fulfilled" ? stats.value : undefined,
            subscription: details.status === "fulfilled" ? details.value?.subscription : undefined,
            owner: details.status === "fulfilled" ? details.value?.owner : undefined,
          };
        } catch (err) {
          console.error(`Error enhancing org ${org.id}:`, err);
          return org;
        }
      })
    );

    return orgsWithStats
      .filter((result): result is PromiseFulfilledResult<OrganizationWithStats> => result.status === "fulfilled")
      .map((result) => result.value);
  },

  /**
   * Get organization with full details (admin only)
   */
  async getOrganizationDetails(organizationId: string): Promise<OrganizationWithStats | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    return adminService.getOrganizationWithDetails(organizationId);
  },

  /**
   * Get organization statistics (admin only)
   */
  async getOrganizationStats(organizationId: string): Promise<OrganizationStats> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    return adminService.getOrganizationStats(organizationId);
  },

  /**
   * Get all agents from all organizations (admin only)
   */
  async getAllAgents(filters?: {
    organizationId?: string;
    isActive?: boolean;
    searchTerm?: string;
  }): Promise<AgentWithOrganization[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    return adminService.getAllAgents(filters);
  },

  /**
   * Get global statistics (admin only)
   */
  async getGlobalStats(): Promise<GlobalStats> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    return adminService.getGlobalStats();
  },

  /**
   * Update organization status (admin only)
   */
  async updateOrganizationStatus(
    organizationId: string,
    status: "active" | "inactive" | "suspended"
  ) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    return adminService.updateOrganizationStatus(organizationId, status);
  },

  /**
   * Get all users (admin only)
   */
  async getAllUsers(filters?: {
    role?: string;
    searchTerm?: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    return adminService.getAllUsers(filters);
  },

  /**
   * Update user role (admin only)
   */
  async updateUserRole(userId: string, role: string | null) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    // Prevent removing last super_admin
    if (role !== "super_admin") {
      const userToUpdate = await adminService.getAllUsers({ role: "super_admin" });
      if (userToUpdate && userToUpdate.length === 1 && userToUpdate[0].id === userId) {
        throw new Error("Cannot remove the last super admin");
      }
    }

    return adminService.updateUserRole(userId, role);
  },

  /**
   * Get audit logs (admin only)
   */
  async getAuditLogs(filters?: {
    action?: string;
    userId?: string;
    organizationId?: string;
    resourceType?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const isAdmin = await checkAdminAccess(user.id);
    if (!isAdmin) {
      throw new Error("Access denied. Admin privileges required.");
    }

    return adminService.getAuditLogs(filters);
  },
};

