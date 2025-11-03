import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import { UniverseBackground } from "@/components/universe/UniverseBackground";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  // Verificar se há hash de recuperação na URL e processar
  useEffect(() => {
    // O Supabase processa automaticamente o hash quando o usuário chega via link de email
    // Verificamos se há sessão válida após o processamento
    const checkSession = async () => {
      // Aguardar um pouco para o Supabase processar o hash
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // Não há sessão válida, pode ser link inválido ou expirado
        const hash = window.location.hash;
        const hasRecoveryToken = hash && (hash.includes("access_token") || hash.includes("type=recovery"));
        
        if (!hasRecoveryToken) {
          toast.error("Link de recuperação inválido ou expirado");
          navigate("/forgot-password");
        }
        // Se há token mas não há sessão ainda, o Supabase pode estar processando
        // Deixamos o usuário tentar redefinir a senha
      }
    };

    checkSession();
  }, [navigate]);

  // Validar senha em tempo real
  useEffect(() => {
    const minLength = password.length >= 6;
    const hasMatch = password === confirmPassword && confirmPassword.length > 0;
    setPasswordValid(minLength && hasMatch);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validações
      if (!password || !confirmPassword) {
        toast.error("Por favor, preencha todos os campos");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        toast.error("A senha deve ter no mínimo 6 caracteres");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem");
        setLoading(false);
        return;
      }

      // Atualizar senha
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("Update password error:", error);
        toast.error(error.message || "Erro ao redefinir senha");
        setLoading(false);
        return;
      }

      // Sucesso
      toast.success("Senha redefinida com sucesso! Redirecionando...");
      
      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.error("Update password exception:", error);
      toast.error(error.message || "Erro ao redefinir senha");
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
            Redefinir Senha
          </p>
        </div>

        <Card className="glass p-6 shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                  autoFocus
                  className="pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Mínimo de 6 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                  className="pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">
                  As senhas não coincidem
                </p>
              )}
              {confirmPassword && password === confirmPassword && password.length >= 6 && (
                <p className="text-xs text-success inline-flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Senhas coincidem
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={loading || !passwordValid}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redefinindo...
                </>
              ) : (
                "Redefinir Senha"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Lembrou sua senha?{" "}
              <a
                href="/login"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Fazer login
              </a>
            </p>
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

