import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkAdminAccess, getCurrentUserRole, isSuperAdmin } from "@/lib/admin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Hook to check if current user is super admin
 * Returns loading state, admin status, and error
 */
export function useIsAdmin() {
  const { data: isAdmin, isLoading, error } = useQuery({
    queryKey: ["admin", "isAdmin"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      return checkAdminAccess(user.id);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    isAdmin: isAdmin ?? false,
    isLoading,
    error,
  };
}

/**
 * Hook to get current user role
 */
export function useUserRole() {
  return useQuery({
    queryKey: ["admin", "userRole"],
    queryFn: getCurrentUserRole,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

/**
 * Hook that redirects to dashboard if user is not admin
 * Use this in admin pages/components
 */
export function useRequireAdmin(redirectTo: string = "/dashboard") {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useIsAdmin();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast.error("Acesso negado. Apenas administradores podem acessar esta página.");
      navigate(redirectTo);
    }
  }, [isAdmin, isLoading, navigate, redirectTo]);

  return {
    isAdmin: isAdmin ?? false,
    isLoading,
  };
}

/**
 * Hook to check admin status synchronously (from user_metadata only)
 * Useful for immediate checks without async query
 */
export function useAdminCheck() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Quick check from user_metadata
        const roleFromMetadata = user.user_metadata?.role;
        if (roleFromMetadata === "super_admin") {
          setIsAdmin(true);
          setLoading(false);
          return;
        }

        // Full check including users table
        const adminStatus = await checkAdminAccess(user.id);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error checking admin:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, loading };
}

