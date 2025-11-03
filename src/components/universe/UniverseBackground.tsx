import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface UniverseBackgroundProps {
  children?: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  showNebula?: boolean;
  variant?: "default" | "expansive" | "deep" | "formation" | "observatory" | "constellations" | "communication" | "admin";
}

export function UniverseBackground({
  children,
  className,
  intensity = "medium",
  showNebula = true,
  variant = "default",
}: UniverseBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const stars: HTMLElement[] = [];

    // Criar estrelas baseado na intensidade (mais estrelas, mas discretas)
    const starCount = intensity === "low" ? 30 : intensity === "medium" ? 80 : 150;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      
      // Tamanhos variados: maioria pequena (1-2px), algumas médias (2-3px), poucas grandes (3-4px)
      const rand = Math.random();
      const size = rand < 0.7 ? Math.random() * 1 + 1 : rand < 0.95 ? Math.random() * 1 + 2 : Math.random() * 1 + 3;
      
      // Cores inspiradas no JWST: branco, dourado, azul suave
      const colorRand = Math.random();
      let starColor = "white";
      if (colorRand > 0.85) {
        starColor = "gold";
      } else if (colorRand > 0.75) {
        starColor = "blue";
      }

      star.className = cn(
        "jwst-star absolute rounded-full",
        starColor === "gold" ? "star-gold" : starColor === "blue" ? "star-blue" : "star-white"
      );
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${3 + Math.random() * 4}s`;
      star.style.opacity = `${0.4 + Math.random() * 0.6}`;

      container.appendChild(star);
      stars.push(star);
    }

    // Criar algumas estrelas brilhantes especiais (estrelas de primeira magnitude)
    const brightStarCount = intensity === "low" ? 2 : intensity === "medium" ? 5 : 8;
    for (let i = 0; i < brightStarCount; i++) {
      const brightStar = document.createElement("div");
      const size = 2 + Math.random() * 2;
      
      brightStar.className = "jwst-star-bright absolute rounded-full star-gold";
      brightStar.style.width = `${size}px`;
      brightStar.style.height = `${size}px`;
      brightStar.style.left = `${Math.random() * 100}%`;
      brightStar.style.top = `${Math.random() * 100}%`;
      brightStar.style.animationDelay = `${Math.random() * 3}s`;
      brightStar.style.animationDuration = `${2 + Math.random() * 2}s`;
      brightStar.style.opacity = "0.8";

      container.appendChild(brightStar);
      stars.push(brightStar);
    }

    return () => {
      stars.forEach((star) => star.remove());
    };
  }, [intensity, variant]);

  const variantClasses = {
    default: "",
    expansive: "relative",
    deep: "relative",
    formation: "relative overflow-hidden",
    observatory: "relative",
    constellations: "relative",
    communication: "relative",
    admin: "relative",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "universe-bg fixed inset-0 -z-10 pointer-events-none",
        variantClasses[variant],
        className
      )}
    >
      {showNebula && (
        <>
          {/* Nebulosa dourada inspirada no JWST - Carina Nebula */}
          <div
            className="jwst-nebula jwst-nebula-gold"
            style={{
              top: "5%",
              left: "10%",
              width: "600px",
              height: "600px",
              animationDelay: "0s",
            }}
          />
          
          {/* Nebulosa azul profunda - Pillars of Creation style */}
          <div
            className="jwst-nebula jwst-nebula-blue"
            style={{
              top: "40%",
              right: "8%",
              width: "500px",
              height: "500px",
              animationDelay: "15s",
            }}
          />
          
          {/* Nebulosa roxa suave - distante e discreta */}
          <div
            className="jwst-nebula jwst-nebula-purple"
            style={{
              bottom: "10%",
              left: "15%",
              width: "450px",
              height: "450px",
              animationDelay: "30s",
            }}
          />
          
          {/* Nebulosa dourada secundária - mais discreta */}
          <div
            className="jwst-nebula jwst-nebula-gold-subtle"
            style={{
              top: "60%",
              right: "25%",
              width: "400px",
              height: "400px",
              animationDelay: "45s",
            }}
          />
        </>
      )}
      {children}
    </div>
  );
}

