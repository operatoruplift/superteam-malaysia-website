"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on touch devices
    if ("ontouchstart" in window) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.current.length > 30) trail.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail
      for (let i = 0; i < trail.current.length; i++) {
        const p = trail.current[i];
        p.age += 1;
        const life = 1 - p.age / 40;
        if (life <= 0) continue;

        const size = life * 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 168, 0, ${life * 0.3})`;
        ctx.fill();
      }

      // Remove dead particles
      trail.current = trail.current.filter((p) => p.age < 40);

      // Outer glow ring
      const { x, y } = mouse.current;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 28);
      gradient.addColorStop(0, "rgba(232, 168, 0, 0.08)");
      gradient.addColorStop(0.5, "rgba(232, 168, 0, 0.03)");
      gradient.addColorStop(1, "rgba(232, 168, 0, 0)");
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner dot
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 201, 64, 0.6)";
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none hidden lg:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
