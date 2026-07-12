"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide ambient particle field with mouse-follow attraction.
 * Fixed behind all content, pointer-events disabled.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    window.addEventListener("mousemove", onMove);

    const COLORS = [
      "rgba(56, 189, 248, A)", // sky
      "rgba(34, 211, 238, A)", // cyan
      "rgba(139, 92, 246, A)", // violet
      "rgba(52, 211, 153, A)", // emerald
    ];
    const count = window.innerWidth < 640 ? 36 : 64;
    const parts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (Math.random() * 1.8 + 0.7) * dpr,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      a: Math.random() * 0.35 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of parts) {
        // gentle attraction toward cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220 * dpr && dist > 1) {
          p.vx += (dx / dist) * 0.012 * dpr;
          p.vy += (dy / dist) * 0.012 * dpr;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c.replace("A", String(p.a));
        ctx.fill();
      }

      // connecting lines between nearby particles
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const max = 130 * dpr;
          if (d < max) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - d / max)})`;
            ctx.lineWidth = dpr;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
