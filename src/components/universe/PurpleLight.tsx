import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PurpleLightProps {
  children?: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  pulse?: boolean;
}

export function PurpleLight({
  children,
  className,
  intensity = "medium",
  pulse = true,
}: PurpleLightProps) {
  const intensityClasses = {
    low: "shadow-[0_0_5px_var(--purple-glow)]",
    medium: "shadow-[0_0_10px_var(--purple-glow),0_0_20px_var(--purple-glow)]",
    high: "shadow-[0_0_15px_var(--purple-glow),0_0_30px_var(--purple-glow),0_0_45px_var(--purple-primary)]",
  };

  return (
    <div
      className={cn(
        pulse && "purple-glow",
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  );
}

