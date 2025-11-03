/**
 * Test page to verify admin authentication system
 * This is a temporary page for testing Fase 1
 */
import { AdminRoute } from "@/components/admin/AdminRoute";
import { useIsAdmin, useUserRole } from "@/hooks/admin/useAdminAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const TestAdminContent = () => {
  const { isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: userRole, isLoading: roleLoading } = useUserRole();

  if (adminLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Teste de Autenticação Admin</h1>
        <p className="text-muted-foreground">
          Esta página testa o sistema de autenticação administrativa da Fase 1
        </p>
      </div>

      <Card className="glass p-6 shadow-elevated">
        <h2 className="text-xl font-semibold mb-4">Status do Sistema</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">É Super Admin?</span>
            <Badge variant={isAdmin ? "default" : "secondary"} className="gap-2">
              {isAdmin ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Sim
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Não
                </>
              )}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Role do Usuário:</span>
            <Badge variant="outline">{userRole || "Nenhuma"}</Badge>
          </div>
        </div>
      </Card>

      <Card className="glass p-6 shadow-elevated">
        <h2 className="text-xl font-semibold mb-4">Instruções de Teste</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>1. Teste de Proteção de Rota:</strong> Se você não é admin, esta página
            não deveria ser visível (AdminRoute redireciona).
          </p>
          <p>
            <strong>2. Teste de Hooks:</strong> Os hooks useIsAdmin e useUserRole estão
            funcionando corretamente acima.
          </p>
          <p>
            <strong>3. Para marcar como admin:</strong>
          </p>
          <pre className="bg-muted p-3 rounded mt-2 text-xs overflow-x-auto">
{`-- No Supabase Dashboard SQL Editor:
UPDATE users 
SET role = 'super_admin' 
WHERE email = 'seu-email@exemplo.com';`}
          </pre>
        </div>
      </Card>

      {isAdmin && (
        <Card className="glass p-6 shadow-elevated border-green-500">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">
              Você tem acesso de administrador! A Fase 1 está funcionando.
            </span>
          </div>
        </Card>
      )}

      {!isAdmin && (
        <Card className="glass p-6 shadow-elevated border-yellow-500">
          <div className="flex items-center gap-2 text-yellow-600">
            <XCircle className="h-5 w-5" />
            <span className="font-semibold">
              Você não é um administrador. Marque seu usuário como super_admin para testar.
            </span>
          </div>
        </Card>
      )}
      </div>
    </div>
  );
};

const TestAdmin = () => {
  return (
    <AdminRoute>
      <TestAdminContent />
    </AdminRoute>
  );
};

export default TestAdmin;

