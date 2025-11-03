import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { UniverseBackground } from "@/components/universe/UniverseBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ height: '100vh', maxHeight: '100vh' }}>
      <UniverseBackground variant="deep" intensity="medium" showNebula={true} />
      <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-float" />
            <h1 className="text-6xl font-bold gradient-text">404</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Página não encontrada
          </p>
          <p className="text-sm text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link to="/">
            <Button className="bg-gradient-primary hover:opacity-90">
              Voltar para o Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
