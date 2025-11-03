import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GoldenGlowProps {
  children: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function GoldenGlow({ children, className, intensity = "medium" }: GoldenGlowProps) {
  const intensityClasses = {
    low: "shadow-[0_0_5px_var(--gold-glow)]",
    medium: "shadow-[0_0_10px_var(--gold-glow),0_0_20px_var(--gold-glow)]",
    high: "shadow-[0_0_15px_var(--gold-glow),0_0_30px_var(--gold-glow),0_0_45px_var(--gold-primary)]",
  };

  return (
    <div
      className={cn(
        "golden-glow relative",
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  );
}

