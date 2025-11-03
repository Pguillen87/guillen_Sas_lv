import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UniverseBackground } from "@/components/universe/UniverseBackground";
import {
  LayoutDashboard,
  Building2,
  Bot,
  BarChart3,
  Plug,
  Users,
  FileText,
  LogOut,
  Settings,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
    toast.success("Logout realizado com sucesso");
  };

  const adminNavItems = [
    {
      label: "Dashboard Admin",
      icon: LayoutDashboard,
      path: "/admin",
      description: "Visão geral do sistema",
    },
    {
      label: "Organizações",
      icon: Building2,
      path: "/admin/organizations",
      description: "Gerenciar todas as organizações",
    },
    {
      label: "Todos os Agentes",
      icon: Bot,
      path: "/admin/agents",
      description: "Ver todos os agentes",
    },
    {
      label: "Estatísticas Globais",
      icon: BarChart3,
      path: "/admin/stats",
      description: "Métricas e análises",
    },
    {
      label: "Integrações",
      icon: Plug,
      path: "/admin/integrations",
      description: "APIs e configurações",
    },
    {
      label: "Usuários",
      icon: Users,
      path: "/admin/users",
      description: "Gerenciar usuários",
    },
    {
      label: "Logs de Auditoria",
      icon: FileText,
      path: "/admin/logs",
      description: "Registros e eventos",
    },
  ];

  return (
    <div className="min-h-screen flex bg-background relative">
      <UniverseBackground variant="admin" intensity="low" showNebula={true} />
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-card border border-border"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo and Admin Badge */}
          <div className="mb-8">
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <Sparkles className="h-8 w-8 text-primary animate-float" />
              <span className="text-2xl font-bold gradient-text">GuillenIA</span>
            </div>
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
              Modo Administrador
            </Badge>
          </div>

          {/* Admin Navigation */}
          <nav className="flex-1 space-y-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  )}
                  title={item.description}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.label}</div>
                    <div
                      className={cn(
                        "text-xs truncate",
                        isActive
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground group-hover:text-sidebar-foreground/70"
                      )}
                    >
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/admin/settings")}
            >
              <Settings className="mr-3 h-5 w-5" />
              Configurações Admin
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10">{children}</main>
    </div>
  );
};

export default AdminLayout;

