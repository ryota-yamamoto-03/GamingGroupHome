"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

type Area = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  href?: string;
  accent: string;
};

const AREAS: Area[] = [
  { id: "r1", label: "居室 1", sub: "洋室 6帖", x: 20, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r2", label: "居室 2", sub: "洋室 6帖", x: 205, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r3", label: "居室 3", sub: "洋室 6帖", x: 410, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r4", label: "居室 4", sub: "洋室 6帖", x: 595, y: 20, w: 185, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "ldk", label: "ゲーミングリビング", sub: "LDK 16帖", x: 20, y: 255, w: 420, h: 245, href: "#living", accent: "#06b6d4" },
  { id: "kitchen", label: "キッチン", x: 450, y: 255, w: 150, h: 115, accent: "#34d399" },
  { id: "bath", label: "浴室", x: 610, y: 255, w: 170, h: 115, accent: "#38bdf8" },
  { id: "wash", label: "洗面・洗濯", x: 450, y: 380, w: 150, h: 120, accent: "#38bdf8" },
  { id: "wc", label: "トイレ", x: 610, y: 380, w: 80, h: 120, accent: "#38bdf8" },
  { id: "entrance", label: "玄関", x: 700, y: 380, w: 80, h: 120, accent: "#94a3b8" },
];

export default function FloorPlan() {
  const [hovered, setHovered] = useState<string | null>(null);

  const go = (href?: string) => {
    if (href) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="floorplan" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-100/40 to-transparent" />
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Floor Plan"
          title="間取り"
          lead="個室4室 ＋ 広々ゲーミングLDK。居室・リビングをクリックすると、3D内覧セクションへ移動します。"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-[2rem] p-4 sm:p-8"
        >
          <svg
            viewBox="0 0 800 520"
            className="w-full"
            role="img"
            aria-label="施設の間取り図：居室4室、廊下、LDK、キッチン、浴室、洗面・洗濯、トイレ、玄関"
          >
            <defs>
              <filter id="roomGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#22d3ee" floodOpacity="0.7" />
              </filter>
            </defs>

            {/* outer wall */}
            <rect x="12" y="12" width="776" height="496" rx="10" fill="none" stroke="#0f2a43" strokeWidth="7" />
            {/* corridor */}
            <rect x="20" y="190" width="760" height="60" fill="#eef6fd" />
            <text x="400" y="226" textAnchor="middle" fontSize="15" fill="#7c93a8" letterSpacing="8">
              廊下
            </text>

            {AREAS.map((a) => {
              const active = hovered === a.id;
              const clickable = Boolean(a.href);
              return (
                <g
                  key={a.id}
                  onMouseEnter={() => setHovered(a.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => go(a.href)}
                  style={{ cursor: clickable ? "pointer" : "default" }}
                >
                  <rect
                    x={a.x}
                    y={a.y}
                    width={a.w}
                    height={a.h}
                    fill={active && clickable ? `${a.accent}26` : "#ffffffcc"}
                    stroke={active && clickable ? a.accent : "#3c5a75"}
                    strokeWidth={active && clickable ? 3 : 2}
                    filter={active && clickable ? "url(#roomGlow)" : undefined}
                  />
                  <text
                    x={a.x + a.w / 2}
                    y={a.y + a.h / 2 - (a.sub ? 6 : -5)}
                    textAnchor="middle"
                    fontSize={a.w < 100 ? 13 : 17}
                    fontWeight="700"
                    fill="#0f2a43"
                  >
                    {a.label}
                  </text>
                  {a.sub && (
                    <text
                      x={a.x + a.w / 2}
                      y={a.y + a.h / 2 + 16}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#7c93a8"
                    >
                      {a.sub}
                    </text>
                  )}
                  {clickable && (
                    <text
                      x={a.x + a.w / 2}
                      y={a.y + a.h - 14}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill={a.accent}
                      opacity={active ? 1 : 0.75}
                    >
                      ▶ 3D内覧へ
                    </text>
                  )}
                </g>
              );
            })}

            {/* bed glyphs in rooms */}
            {[35, 220, 425, 610].map((x) => (
              <g key={x} opacity="0.5">
                <rect x={x} y={35} width="44" height="76" rx="6" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                <rect x={x + 6} y={41} width="32" height="18" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
              </g>
            ))}
            {/* sofa + TV glyphs in LDK */}
            <g opacity="0.55">
              <rect x="120" y="400" width="150" height="34" rx="8" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
              <rect x="120" y="290" width="150" height="10" rx="3" fill="#06b6d4" />
              <text x="195" y="285" textAnchor="middle" fontSize="10" fill="#06b6d4">
                大型TV
              </text>
              <circle cx="350" cy="350" r="26" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="350" y="354" textAnchor="middle" fontSize="9" fill="#06b6d4">
                PC
              </text>
            </g>

            {/* entrance arrow */}
            <text x="740" y="492" textAnchor="middle" fontSize="16" fill="#7c93a8">
              ⬆
            </text>
          </svg>

          <p className="mt-4 text-center text-xs text-slate-400">
            ※ 間取りはコンセプトモデルのイメージです。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
