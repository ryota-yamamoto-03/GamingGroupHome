"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * SAO-style boot sequence:
 * "GG" logo -> Loading... -> rotating blue rings -> LINK START flash -> site
 * Shown once per browser session (sessionStorage).
 */
export default function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [booted, setBooted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("gg-haven-booted")) {
      setVisible(false);
      return;
    }
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!booted || !rootRef.current) return;

    document.body.style.overflow = "hidden";

    // particles on the boot screen
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const parts = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (Math.random() * 2 + 0.6) * dpr,
      vx: (Math.random() - 0.5) * 0.35 * dpr,
      vy: (-Math.random() * 0.5 - 0.15) * dpr,
      a: Math.random() * 0.6 + 0.2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103, 232, 249, ${p.a})`;
        ctx.shadowColor = "rgba(34, 211, 238, 0.9)";
        ctx.shadowBlur = 8 * dpr;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const q = gsap.utils.selector(rootRef);
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("gg-haven-booted", "1");
        document.body.style.overflow = "";
        setVisible(false);
      },
    });

    tl.fromTo(
      q(".boot-logo"),
      { opacity: 0, scale: 0.8, filter: "blur(12px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
    )
      .fromTo(
        q(".boot-loading"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      )
      .fromTo(
        q(".boot-ring"),
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
        "-=0.1"
      )
      .to(q(".boot-progress-bar"), {
        width: "100%",
        duration: 1.6,
        ease: "power1.inOut",
      })
      .to(q(".boot-loading"), { opacity: 0, duration: 0.25 })
      .fromTo(
        q(".boot-link"),
        { opacity: 0, letterSpacing: "0.2em" },
        { opacity: 1, letterSpacing: "0.5em", duration: 0.6, ease: "power2.out" }
      )
      .to(q(".boot-flash"), {
        opacity: 1,
        duration: 0.35,
        ease: "power2.in",
      })
      .to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" });

    return () => {
      tl.kill();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.body.style.overflow = "";
    };
  }, [booted]);

  const skip = () => {
    sessionStorage.setItem("gg-haven-booted", "1");
    document.body.style.overflow = "";
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#eaf6ff] via-[#dff0ff] to-[#cfe8ff]"
      aria-label="起動画面"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* holographic grid floor */}
      <div className="holo-grid absolute inset-x-[-20%] bottom-[-10%] top-1/2" />

      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        {/* rotating rings */}
        <div className="boot-ring relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
          <svg
            viewBox="0 0 200 200"
            className="ring-pulse absolute inset-0 h-full w-full animate-spin-slow"
          >
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="rgba(56,189,248,0.9)"
              strokeWidth="1.5"
              strokeDasharray="40 18 90 18"
              strokeLinecap="round"
            />
          </svg>
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] animate-spin-slower [animation-direction:reverse]"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(139,92,246,0.55)"
              strokeWidth="1"
              strokeDasharray="8 14"
            />
          </svg>
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-10 h-[calc(100%-5rem)] w-[calc(100%-5rem)] animate-spin-slow [animation-duration:5s]"
          >
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="rgba(34,211,238,0.8)"
              strokeWidth="2.5"
              strokeDasharray="120 160"
              strokeLinecap="round"
            />
          </svg>

          {/* GG logo */}
          <div className="boot-logo relative">
            <span
              className="gradient-text text-glow text-6xl font-black sm:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              GG
            </span>
          </div>
        </div>

        <div className="boot-loading flex flex-col items-center gap-3">
          <span
            className="text-sm tracking-[0.4em] text-sky-600"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LOADING...
          </span>
          <div className="h-1 w-56 overflow-hidden rounded-full bg-sky-200/70 sm:w-72">
            <div className="boot-progress-bar h-full w-0 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
          </div>
        </div>

        <span
          className="boot-link absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-xl font-bold text-cyan-500 text-glow opacity-0 sm:text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          LINK START
        </span>
      </div>

      {/* white flash before transition */}
      <div className="boot-flash pointer-events-none absolute inset-0 bg-white opacity-0" />

      <button
        onClick={skip}
        className="absolute bottom-6 right-6 rounded-full border border-sky-300/70 bg-white/50 px-4 py-1.5 text-xs tracking-widest text-sky-600 backdrop-blur-md transition hover:bg-white/80 cursor-pointer"
        style={{ fontFamily: "var(--font-display)" }}
      >
        SKIP →
      </button>
    </div>
  );
}
