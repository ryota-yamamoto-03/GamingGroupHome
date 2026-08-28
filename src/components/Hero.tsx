"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Eye, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* ---- futuristic gaming-living background (parallax layer 1) ---- */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6fbff] via-[#e3f3ff] to-[#cfe9ff]" />
        {/* glowing orbs */}
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-cyan-300/40 blur-[100px]" />
        <div className="absolute right-[10%] top-[30%] h-80 w-80 rounded-full bg-violet-300/40 blur-[110px]" />
        <div className="absolute bottom-[8%] left-[35%] h-64 w-64 rounded-full bg-emerald-200/50 blur-[90px]" />
        {/* future city silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-[0.14]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#0284c7"
            d="M0 320V210h60v-60h40v60h50V120h70v90h40v-40h60v40h50V90h30V60h40v30h30v120h60v-70h80v70h40V150h70v100h50v-60h60v60h50V110h70v140h60v-90h70v90h50V170h60v150z"
          />
          {/* antenna lights */}
          <circle cx="255" cy="115" r="4" fill="#22d3ee" />
          <circle cx="475" cy="85" r="4" fill="#8b5cf6" />
          <circle cx="905" cy="105" r="4" fill="#22d3ee" />
          <circle cx="1245" cy="165" r="4" fill="#34d399" />
        </svg>
        {/* holographic grid floor */}
        <div className="holo-grid absolute inset-x-[-30%] bottom-[-14%] top-[58%]" />
      </motion.div>

      {/* ---- floating glass holo-panels (parallax layer 2) ---- */}
      <motion.div
        style={{ y: midY, opacity: fade }}
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden
      >
        <div className="glass animate-float absolute left-[6%] top-[26%] rounded-2xl px-5 py-4 [animation-delay:0.5s]">
          <p className="eyebrow text-[10px] text-cyan-600">PLAYERS ONLINE</p>
          <p
            className="mt-1 text-2xl font-bold text-sky-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            20 / 20
          </p>
          <p className="text-[10px] text-slate-500">みんなでゲーム中…</p>
        </div>
        <div className="glass animate-float absolute right-[7%] top-[22%] rounded-2xl px-5 py-4">
          <p className="eyebrow text-[10px] text-violet-500">QUEST</p>
          <p className="mt-1 text-sm font-bold text-sky-900">
            今日のクエスト：みんなで夕食 🍛
          </p>
          <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-sky-100">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
          </div>
        </div>
        <div className="glass animate-float absolute bottom-[24%] right-[12%] rounded-2xl px-5 py-4 [animation-delay:1.2s]">
          <p className="eyebrow text-[10px] text-emerald-500">COMFORT LV</p>
          <p
            className="mt-1 text-2xl font-bold text-sky-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MAX
          </p>
        </div>
      </motion.div>

      {/* ---- headline (parallax layer 3) ---- */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 text-center sm:pt-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]" />
          <span className="eyebrow text-[10px] font-bold text-sky-700 sm:text-xs">
            Gaming Group Home Haven — Concept Model
          </span>
        </motion.div>

        <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-sky-950 sm:text-6xl lg:text-7xl">
          {["好きなゲームが、", "あなたの居場所になる。"].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {i === 1 ? (
                <span className="gradient-text text-glow">{line}</span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          ゲームを通じて、安心して暮らせる。
          <br className="hidden sm:block" />
          精神障害を持つ方のための、新しいかたちのゲーミンググループホーム。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="btn-shine w-full sm:w-auto">
            <a href="#living">
              <Eye className="!size-5" />
              施設を見る
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="glass"
            className="btn-shine w-full sm:w-auto"
          >
            <a href="#contact">
              <CalendarCheck className="!size-5" />
              内覧予約
            </a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-8 text-xs text-slate-400"
        >
          ※ 本サイトは実在の施設ではなく、コンセプトモデル（デモサイト）です。
        </motion.p>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#concept"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-label="下へスクロール"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-cyan-500"
        >
          <span className="eyebrow text-[10px]">SCROLL</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.a>

      {/* SAO scanline sweep */}
      <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-40" />
    </section>
  );
}
