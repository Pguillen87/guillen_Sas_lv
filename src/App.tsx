import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { DiagnosticsPanel } from "@/components/DiagnosticsPanel";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateOrganization from "./pages/CreateOrganization";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import NewAgent from "./pages/NewAgent";
import AgentTemplates from "./pages/AgentTemplates";
import Conversations from "./pages/Conversations";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import TestAdmin from "./pages/admin/TestAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Diagnostics from "./pages/admin/Diagnostics";
import AdminOrganizations from "./pages/admin/AdminOrganizations";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminStats from "./pages/admin/AdminStats";
import AdminIntegrations from "./pages/admin/AdminIntegrations";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log("🔄 App component renderizando...");
  
  try {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/create-organization" element={<CreateOrganization />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/agents/new" element={<NewAgent />} />
                <Route path="/agents/templates" element={<AgentTemplates />} />
                <Route path="/conversations" element={<Conversations />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/pricing" element={<Pricing />} />
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/test" element={<TestAdmin />} />
                <Route path="/admin/diagnostics" element={<Diagnostics />} />
                <Route path="/admin/organizations" element={<AdminOrganizations />} />
                <Route path="/admin/organizations/:id" element={<AdminOrganizations />} />
                <Route path="/admin/agents" element={<AdminAgents />} />
                <Route path="/admin/stats" element={<AdminStats />} />
                <Route path="/admin/integrations" element={<AdminIntegrations />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/logs" element={<AdminLogs />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <DiagnosticsPanel />
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("❌ ERRO no componente App:", error);
    throw error; // Re-throw para o ErrorBoundary capturar
  }
};

export default App;
