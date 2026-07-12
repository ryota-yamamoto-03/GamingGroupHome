"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const FLOOR_1F: Area[] = [
  { id: "r1", label: "居室 1", sub: "洋室 6帖", x: 20, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r2", label: "居室 2", sub: "洋室 6帖", x: 205, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r3", label: "居室 3", sub: "洋室 6帖", x: 410, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r4", label: "居室 4", sub: "洋室 6帖", x: 595, y: 20, w: 185, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "ldk", label: "ゲーミングリビング", sub: "LDK 16帖", x: 20, y: 255, w: 420, h: 245, href: "#living", accent: "#06b6d4" },
  { id: "kitchen", label: "キッチン", x: 450, y: 255, w: 150, h: 115, accent: "#34d399" },
  { id: "bath", label: "浴室", x: 610, y: 255, w: 170, h: 115, accent: "#38bdf8" },
  { id: "wash", label: "洗面・洗濯", x: 450, y: 380, w: 150, h: 120, accent: "#38bdf8" },
  { id: "wc1", label: "トイレ", x: 610, y: 380, w: 80, h: 120, accent: "#38bdf8" },
  { id: "entrance", label: "玄関", x: 700, y: 380, w: 80, h: 120, accent: "#94a3b8" },
];

const FLOOR_2F: Area[] = [
  { id: "r5", label: "居室 5", sub: "洋室 6帖", x: 20, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r6", label: "居室 6", sub: "洋室 6帖", x: 205, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r7", label: "居室 7", sub: "洋室 6帖", x: 410, y: 20, w: 175, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r8", label: "居室 8", sub: "洋室 6帖", x: 595, y: 20, w: 185, h: 165, href: "#room", accent: "#8b5cf6" },
  { id: "r9", label: "居室 9", sub: "洋室 6帖", x: 20, y: 255, w: 175, h: 245, href: "#room", accent: "#8b5cf6" },
  { id: "r10", label: "居室 10", sub: "洋室 6帖", x: 205, y: 255, w: 175, h: 245, href: "#room", accent: "#8b5cf6" },
  { id: "free", label: "フリースペース", sub: "ミニ卓球・本棚", x: 410, y: 255, w: 175, h: 245, href: "#freespace", accent: "#34d399" },
  { id: "wc2", label: "トイレ・洗面", x: 595, y: 255, w: 185, h: 245, accent: "#38bdf8" },
];

const BEDS_1F = [35, 220, 425, 610];
const BEDS_2F_TOP = [35, 220, 425, 610];
const BEDS_2F_BOTTOM = [35, 220];

export default function FloorPlan() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [floor, setFloor] = useState<1 | 2>(1);

  const areas = floor === 1 ? FLOOR_1F : FLOOR_2F;

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
          lead="2階建て・全10個室 ＋ 広々ゲーミングLDK。1F / 2F を切り替えて、居室・リビングをクリックすると3D内覧セクションへ移動します。"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-[2rem] p-4 sm:p-8"
        >
          {/* floor switcher */}
          <div className="mb-5 flex items-center justify-center gap-3">
            {([1, 2] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFloor(f)}
                className={`cursor-pointer rounded-full px-7 py-2.5 text-sm font-bold tracking-widest transition-all duration-300 ${
                  floor === f
                    ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_8px_24px_-6px_rgba(14,165,233,0.6)]"
                    : "glass text-sky-700 hover:border-cyan-300"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
                aria-pressed={floor === f}
              >
                {f}F
              </button>
            ))}
            <span className="ml-2 hidden text-xs text-slate-400 sm:inline">
              {floor === 1 ? "共用フロア ＋ 居室1〜4" : "居室5〜10 ＋ フリースペース"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={floor}
              initial={{ opacity: 0, x: floor === 1 ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: floor === 1 ? 24 : -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg
                viewBox="0 0 800 520"
                className="w-full"
                role="img"
                aria-label={
                  floor === 1
                    ? "1階の間取り図：居室4室、廊下、階段、LDK、キッチン、浴室、洗面・洗濯、トイレ、玄関"
                    : "2階の間取り図：居室6室、廊下、階段、フリースペース、トイレ・洗面"
                }
              >
                <defs>
                  <filter id="roomGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#22d3ee" floodOpacity="0.7" />
                  </filter>
                </defs>

                {/* outer wall */}
                <rect x="12" y="12" width="776" height="496" rx="10" fill="none" stroke="#0f2a43" strokeWidth="7" />
                {/* corridor */}
                <rect x="20" y="190" width="655" height="60" fill="#eef6fd" />
                <text x="360" y="226" textAnchor="middle" fontSize="15" fill="#7c93a8" letterSpacing="8">
                  廊下
                </text>
                {/* stairs (both floors) */}
                <g>
                  <rect x="685" y="190" width="95" height="60" fill="#f3f0fb" stroke="#3c5a75" strokeWidth="2" />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1={697 + i * 15}
                      y1="214"
                      x2={697 + i * 15}
                      y2="244"
                      stroke="#9f8fd0"
                      strokeWidth="2"
                    />
                  ))}
                  <text x="732.5" y="206" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c93a8">
                    階段（{floor === 1 ? "2Fへ" : "1Fへ"}）
                  </text>
                </g>

                {areas.map((a) => {
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
                        fontSize={a.w < 100 ? 13 : a.h < 80 ? 14 : 17}
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

                {/* bed glyphs */}
                {(floor === 1 ? BEDS_1F : BEDS_2F_TOP).map((x) => (
                  <g key={`t${x}`} opacity="0.5">
                    <rect x={x} y={35} width="44" height="76" rx="6" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                    <rect x={x + 6} y={41} width="32" height="18" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                  </g>
                ))}
                {floor === 2 &&
                  BEDS_2F_BOTTOM.map((x) => (
                    <g key={`b${x}`} opacity="0.5">
                      <rect x={x} y={270} width="44" height="76" rx="6" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                      <rect x={x + 6} y={276} width="32" height="18" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
                    </g>
                  ))}

                {floor === 1 ? (
                  <>
                    {/* sofa + TV + PC row glyphs in LDK */}
                    <g opacity="0.55">
                      <rect x="120" y="400" width="150" height="34" rx="8" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                      <rect x="120" y="290" width="150" height="10" rx="3" fill="#06b6d4" />
                      <text x="195" y="285" textAnchor="middle" fontSize="10" fill="#06b6d4">
                        大型TV
                      </text>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <rect
                          key={i}
                          x={330 + i * 20}
                          y="300"
                          width="14"
                          height="20"
                          rx="3"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="1.5"
                        />
                      ))}
                      <text x="375" y="292" textAnchor="middle" fontSize="10" fill="#06b6d4">
                        ゲーミングPC ×5
                      </text>
                    </g>
                    {/* entrance arrow */}
                    <text x="740" y="492" textAnchor="middle" fontSize="16" fill="#7c93a8">
                      ⬆
                    </text>
                  </>
                ) : (
                  <g opacity="0.55">
                    {/* table in free space */}
                    <rect x="455" y="340" width="85" height="46" rx="8" fill="none" stroke="#34d399" strokeWidth="1.5" />
                    <line x1="497" y1="340" x2="497" y2="386" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" />
                  </g>
                )}
              </svg>
            </motion.div>
          </AnimatePresence>

          <p className="mt-4 text-center text-xs text-slate-400">
            ※ 間取りはコンセプトモデルのイメージです。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
