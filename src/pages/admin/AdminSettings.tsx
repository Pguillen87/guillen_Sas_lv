import { AdminRoute } from "@/components/admin/AdminRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

const AdminSettingsContent = () => {
  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <div className="w-full space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Configurações Admin</h1>
            <p className="text-muted-foreground">
              Configure as opções administrativas do sistema
            </p>
          </div>
          <Card className="glass p-6 shadow-elevated">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Settings className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Página em Desenvolvimento</h3>
              <p className="text-sm text-muted-foreground">
                Esta funcionalidade estará disponível em breve.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

const AdminSettings = () => {
  return (
    <AdminRoute>
      <AdminSettingsContent />
    </AdminRoute>
  );
};

export default AdminSettings;

