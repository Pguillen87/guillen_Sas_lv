import { useEffect, useRef } from "react";

interface ConstellationLinesProps {
  points: Array<{ x: number; y: number }>;
  className?: string;
}

export function ConstellationLines({ points, className }: ConstellationLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar linhas conectando pontos
      ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const distance = Math.sqrt(
            Math.pow(points[i].x - points[j].x, 2) +
            Math.pow(points[i].y - points[j].y, 2)
          );

          // Conectar apenas pontos próximos
          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(
              (points[i].x / 100) * canvas.width,
              (points[i].y / 100) * canvas.height
            );
            ctx.lineTo(
              (points[j].x / 100) * canvas.width,
              (points[j].y / 100) * canvas.height
            );
            ctx.stroke();
          }
        }
      }

      // Desenhar estrelas nos pontos
      points.forEach((point) => {
        ctx.fillStyle = "rgba(251, 191, 36, 0.8)";
        ctx.beginPath();
        ctx.arc(
          (point.x / 100) * canvas.width,
          (point.y / 100) * canvas.height,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
    };

    draw();
    const interval = setInterval(draw, 100);

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(interval);
    };
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className || ""}`}
      style={{ opacity: 0.6 }}
    />
  );
}

