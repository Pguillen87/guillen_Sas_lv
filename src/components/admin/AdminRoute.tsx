import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useRequireAdmin } from "@/hooks/admin/useAdminAuth";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AdminRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Component that protects admin routes
 * Redirects to dashboard if user is not admin
 */
export function AdminRoute({ children, redirectTo = "/dashboard" }: AdminRouteProps) {
  const { isAdmin, isLoading } = useRequireAdmin(redirectTo);

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

  if (!isAdmin) {
    return null; // useRequireAdmin already redirects
  }

  return <>{children}</>;
}

