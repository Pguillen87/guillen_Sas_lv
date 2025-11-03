import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkAdminAccess } from "@/lib/admin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface ClientRouteProps {
  children: ReactNode;
}

/**
 * Component that protects client routes
 * Redirects admins to admin dashboard
 */
export function ClientRoute({ children }: ClientRouteProps) {
  const navigate = useNavigate();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["client", "isAdmin"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      return checkAdminAccess(user.id);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  useEffect(() => {
    if (!isLoading && isAdmin) {
      toast.error("Administradores não podem acessar o painel cliente. Faça login com uma conta de cliente.");
      navigate("/admin");
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass p-8 shadow-elevated">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Verificando permissões...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (isAdmin) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

