import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Building2, Loader2, Sparkles } from "lucide-react";

const CreateOrganization = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Create organization
      const { data: org, error: orgError } = await supabase
        .from("organizations")
        .insert({
          name: formData.name,
          slug: formData.slug,
          owner_id: user.id,
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // Add user as owner member
      const { error: memberError } = await supabase
        .from("organization_members")
        .insert({
          organization_id: org.id,
          user_id: user.id,
          role: "owner",
        });

      if (memberError) throw memberError;

      toast.success("Organização criada com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar organização");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlugChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData({ ...formData, name, slug });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-float" />
            <h1 className="text-4xl font-bold gradient-text">GuillenIA</h1>
          </div>
          <p className="text-muted-foreground">
            Crie sua primeira organização para começar
          </p>
        </div>

        <Card className="glass p-8 shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Organização *</Label>
              <Input
                id="name"
                placeholder="Minha Empresa"
                value={formData.name}
                onChange={(e) => handleSlugChange(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL amigável) *</Label>
              <Input
                id="slug"
                placeholder="minha-empresa"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Usado para identificar sua organização na URL
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
                  Criando...
                </>
              ) : (
                <>
                  <Building2 className="mr-2 h-4 w-4" />
                  Criar Organização
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateOrganization;
