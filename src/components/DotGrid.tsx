"use client";

import { useEffect, useRef } from "react";

interface Props {
  color?: [number, number, number];
  secondaryColor?: [number, number, number];
  className?: string;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function DotGrid({
  color = [232, 168, 0],
  secondaryColor = [140, 120, 200],
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spacing = 18;
    const dotRadius = 1;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.ceil(canvas.offsetWidth / spacing) + 1;
    const rows = Math.ceil(canvas.offsetHeight / spacing) + 1;
    const total = cols * rows;

    // Pre-compute per-dot properties (seeded for consistency)
    const dotData = new Float32Array(total * 3); // duration, delay, colorMix
    for (let i = 0; i < total; i++) {
      dotData[i * 3] = 1.5 + seededRandom(i * 7 + 3) * 2; // duration
      dotData[i * 3 + 1] = seededRandom(i * 13 + 7) * 3; // delay
      dotData[i * 3 + 2] = seededRandom(i * 23 + 17); // color mix (0=primary, 1=secondary)
    }

    function draw(time: number) {
      const t = time / 1000;
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < total; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * spacing;
        const y = row * spacing;

        const dur = dotData[i * 3];
        const del = dotData[i * 3 + 1];
        const mix = dotData[i * 3 + 2];

        // Sine-based pulse
        const phase = ((t - del) / dur) * Math.PI * 2;
        const pulse = (Math.sin(phase) + 1) / 2; // 0 to 1
        const opacity = 0.04 + pulse * 0.35;

        // Blend colors
        const r = Math.round(color[0] + (secondaryColor[0] - color[0]) * mix);
        const g = Math.round(color[1] + (secondaryColor[1] - color[1]) * mix);
        const b = Math.round(color[2] + (secondaryColor[2] - color[2]) * mix);

        ctx!.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx!.beginPath();
        ctx!.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color, secondaryColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
