"use client";

import { useEffect, useRef, useCallback } from "react";

interface DataGridHeroProps {
  background?: string;
  color?: string;
  opacityMin?: number;
  opacityMax?: number;
  animationType?: "pulse" | "wave" | "random";
  pulseEffect?: boolean;
  mouseGlow?: boolean;
  cellSize?: number;
  className?: string;
}

export function DataGridHero({
  background = "transparent",
  color = "rgba(255,255,255,0.8)",
  opacityMin = 0.03,
  opacityMax = 0.18,
  pulseEffect = true,
  mouseGlow = true,
  cellSize = 40,
  className = "",
}: DataGridHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const cellsRef = useRef<{ x: number; y: number; phase: number; speed: number }[]>([]);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cols = Math.ceil(canvas.width / cellSize) + 1;
    const rows = Math.ceil(canvas.height / cellSize) + 1;
    cellsRef.current = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cellsRef.current.push({
          x: c * cellSize,
          y: r * cellSize,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.8,
        });
      }
    }
  }, [cellSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      buildGrid();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const cell of cellsRef.current) {
        let opacity = opacityMin;
        if (pulseEffect) {
          opacity = opacityMin + (Math.sin(t * cell.speed + cell.phase) * 0.5 + 0.5) * (opacityMax - opacityMin);
        }

        if (mouseGlow) {
          const dx = cell.x + cellSize / 2 - mouseRef.current.x;
          const dy = cell.y + cellSize / 2 - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glowRadius = 150;
          if (dist < glowRadius) {
            const glow = (1 - dist / glowRadius) * opacityMax * 2;
            opacity = Math.min(opacityMax * 2.5, opacity + glow);
          }
        }

        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(cell.x + 0.5, cell.y + 0.5, cellSize - 1, cellSize - 1);
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [color, opacityMin, opacityMax, pulseEffect, mouseGlow, cellSize, buildGrid]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ background }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block", pointerEvents: "none" }}
      />
    </div>
  );
}
