import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import { UniverseBackground } from "@/components/universe/UniverseBackground";

const REMEMBER_ME_KEY = "guillenia_remember_me";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Carregar preferência de "lembrar senha" ao montar o componente
  useEffect(() => {
    const savedRememberMe = localStorage.getItem(REMEMBER_ME_KEY);
    if (savedRememberMe === "true") {
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validação básica antes de enviar
      if (!email || !password) {
        toast.error("Por favor, preencha todos os campos");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      // Verificar explicitamente se há erro
      if (error) {
        console.error("Login error:", error);
        toast.error(error.message || "Email ou senha incorretos");
        setLoading(false);
        return;
      }

      // Verificar se realmente temos um usuário autenticado
      if (!data?.user || !data?.session) {
        toast.error("Falha na autenticação. Por favor, tente novamente.");
        setLoading(false);
        return;
      }

      // Confirmar sessão antes de redirecionar
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Sessão não pôde ser estabelecida");
        setLoading(false);
        return;
      }

      // Salvar preferência de "lembrar senha"
      localStorage.setItem(REMEMBER_ME_KEY, rememberMe.toString());

      // Verificar se usuário é admin
      const { checkAdminAccess } = await import("@/lib/admin");
      const isAdmin = await checkAdminAccess(data.user.id);

      toast.success("Login realizado com sucesso!");
      
      // Se for admin, oferecer escolha ou redirecionar automaticamente
      if (isAdmin) {
        // Por enquanto, redirecionar direto para admin dashboard
        // Futuramente pode mostrar um diálogo de escolha
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login exception:", error);
      toast.error(error.message || "Erro ao fazer login. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ height: '100vh', maxHeight: '100vh' }}>
      <UniverseBackground variant="deep" intensity="medium" showNebula={true} />
      <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="text-center space-y-2 mb-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="h-7 w-7 text-primary animate-float" />
              <h1 className="text-3xl font-bold gradient-text">GuillenIA</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Portal de Gestão de Agentes de IA
            </p>
          </div>

          <Card className="glass p-6 shadow-elevated">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  disabled={loading}
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm font-normal cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lembrar senha
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="mt-4 text-center space-y-2">
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Esqueceu sua senha?
              </Link>
              <div className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
