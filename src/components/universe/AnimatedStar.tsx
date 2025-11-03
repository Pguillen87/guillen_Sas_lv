import { cn } from "@/lib/utils";

interface AnimatedStarProps {
  size?: number;
  color?: "gold" | "purple" | "white";
  speed?: number;
  className?: string;
  delay?: number;
}

export function AnimatedStar({
  size = 2,
  color = "white",
  speed = 3,
  className,
  delay = 0,
}: AnimatedStarProps) {
  return (
    <div
      className={cn(
        "star rounded-full",
        color === "gold" ? "gold" : color === "purple" ? "purple" : "",
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

