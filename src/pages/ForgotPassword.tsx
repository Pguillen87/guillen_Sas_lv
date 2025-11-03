import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, Loader2, ArrowLeft, Mail } from "lucide-react";
import { UniverseBackground } from "@/components/universe/UniverseBackground";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        toast.error("Por favor, insira seu email");
        setLoading(false);
        return;
      }

      // Validar formato de email básico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        toast.error("Por favor, insira um email válido");
        setLoading(false);
        return;
      }

      // Enviar email de recuperação de senha
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("Reset password error:", error);
        toast.error(error.message || "Erro ao enviar email de recuperação");
        setLoading(false);
        return;
      }

      // Sucesso - email enviado
      setEmailSent(true);
      toast.success("Email de recuperação enviado! Verifique sua caixa de entrada.");
    } catch (error: any) {
      console.error("Reset password exception:", error);
      toast.error(error.message || "Erro ao enviar email de recuperação");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
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
            </div>

            <Card className="glass p-6 shadow-elevated">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Email Enviado!</h2>
                  <p className="text-sm text-muted-foreground">
                    Enviamos um link de recuperação de senha para:
                  </p>
                  <p className="font-semibold text-primary text-sm">{email}</p>
                </div>

                <div className="space-y-3 p-3 bg-muted/50 rounded-lg text-sm">
                  <p className="text-xs text-muted-foreground">
                    📧 Verifique sua caixa de entrada (e a pasta de spam)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    🔗 Clique no link no email para redefinir sua senha
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ⏱️ O link expira em 1 hora
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEmailSent(false);
                      setEmail("");
                    }}
                  >
                    Enviar para outro email
                  </Button>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar para o login
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            Recuperação de Senha
          </p>
        </div>

        <Card className="glass p-6 shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                autoFocus
                autoComplete="email"
              />
              <p className="text-xs text-muted-foreground">
                Digite o email associado à sua conta. Enviaremos um link para redefinir sua senha.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Link de Recuperação
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o login
            </Link>
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

