import { supabase } from "@/integrations/supabase/client";

/**
 * Admin role constant
 */
export const SUPER_ADMIN_ROLE = "super_admin";

/**
 * Check if a user role is super admin
 */
export function isSuperAdmin(userRole: string | null | undefined): boolean {
  return userRole === SUPER_ADMIN_ROLE;
}

/**
 * Check if current authenticated user is super admin
 * This function checks both the users table and user_metadata
 */
export async function checkAdminAccess(userId?: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;

    const userIdToCheck = userId || user.id;

    // Check user_metadata first (from Supabase Auth)
    if (user.user_metadata?.role === SUPER_ADMIN_ROLE) {
      return true;
    }

    // Check users table role field
    const { data: userData, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", userIdToCheck)
      .single();

    if (error) {
      console.error("Error checking admin access:", error);
      return false;
    }

    return isSuperAdmin(userData?.role);
  } catch (error) {
    console.error("Error in checkAdminAccess:", error);
    return false;
  }
}

/**
 * Get current user's role
 */
export async function getCurrentUserRole(): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    // Check user_metadata first
    if (user.user_metadata?.role) {
      return user.user_metadata.role;
    }

    // Check users table
    const { data: userData, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || !userData) {
      return null;
    }

    return userData.role || null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}

