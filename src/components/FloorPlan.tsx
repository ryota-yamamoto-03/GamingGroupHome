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
  room?: boolean;
};

/* ---- portrait room grid geometry (viewBox 600 x 1060) ---- */
const COL_X = [20, 332]; // 2 columns
const RW = 248;
const RH = 108;
const ROW_Y = [22, 140, 258, 376, 494]; // 5 rows
const PURPLE = "#8b5cf6";

/** build 10 居室 (2 cols x 5 rows) for a floor, numbered from `start` */
function buildRooms(start: number): Area[] {
  const rooms: Area[] = [];
  ROW_Y.forEach((y, row) => {
    COL_X.forEach((x, col) => {
      const n = start + row * 2 + col;
      rooms.push({
        id: `r${n}`,
        label: `居室 ${n}`,
        sub: "洋室 6帖",
        x,
        y,
        w: RW,
        h: RH,
        href: "#room",
        accent: PURPLE,
        room: true,
      });
    });
  });
  return rooms;
}

const FLOOR_1F: Area[] = [
  ...buildRooms(1),
  { id: "ldk", label: "ゲーミングリビング", sub: "共用 / LDK", x: 20, y: 618, w: 560, h: 250, href: "#living", accent: "#06b6d4" },
  { id: "kitchen", label: "キッチン", x: 20, y: 878, w: 270, h: 74, accent: "#34d399" },
  { id: "bath", label: "浴室", x: 300, y: 878, w: 280, h: 74, accent: "#38bdf8" },
  { id: "wash", label: "洗面・洗濯", x: 20, y: 960, w: 180, h: 80, accent: "#38bdf8" },
  { id: "wc1", label: "トイレ", x: 208, y: 960, w: 180, h: 80, accent: "#38bdf8" },
  { id: "entrance", label: "玄関", x: 396, y: 960, w: 184, h: 80, accent: "#94a3b8" },
];

const FLOOR_2F: Area[] = [
  ...buildRooms(11),
  { id: "free", label: "フリースペース", sub: "卓球台・本棚", x: 20, y: 618, w: 560, h: 250, href: "#freespace", accent: "#34d399" },
  { id: "wc2", label: "トイレ・洗面", x: 20, y: 878, w: 270, h: 162, accent: "#38bdf8" },
  { id: "storage2f", label: "収納・室内物干し", x: 300, y: 878, w: 280, h: 162, accent: "#94a3b8" },
];

/* ---- reusable bed glyph inside a room ---- */
function Bed({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.5" pointerEvents="none">
      <rect x={x + 14} y={y + 16} width="28" height="72" rx="5" fill="none" stroke={PURPLE} strokeWidth="1.5" />
      <rect x={x + 18} y={y + 20} width="20" height="16" rx="3" fill="none" stroke={PURPLE} strokeWidth="1.5" />
    </g>
  );
}

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
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Floor Plan"
          title="間取り"
          lead="2階建て・全20個室 ＋ 共用のゲーミングフロア。1F / 2F を切り替えて、居室・リビング・フリースペースをクリックすると3D内覧セクションへ移動します。"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-[2rem] p-4 sm:p-8"
        >
          {/* floor switcher */}
          <div className="mb-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <div className="flex gap-3">
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
            </div>
            <span className="text-xs text-slate-400">
              {floor === 1
                ? "共用フロア（ゲーミング部屋）＋ 居室1〜10"
                : "フリースペース（卓球台など）＋ 居室11〜20"}
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
                viewBox="0 0 600 1060"
                className="mx-auto w-full max-w-md"
                role="img"
                aria-label={
                  floor === 1
                    ? "1階の間取り図：共用ゲーミングリビング、居室1〜10、廊下、階段、キッチン、浴室、洗面・洗濯、トイレ、玄関"
                    : "2階の間取り図：フリースペース（卓球台・本棚）、居室11〜20、廊下、階段、トイレ・洗面、収納・室内物干し"
                }
              >
                <defs>
                  <filter id="roomGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#22d3ee" floodOpacity="0.7" />
                  </filter>
                </defs>

                {/* outer wall */}
                <rect x="10" y="10" width="580" height="1040" rx="12" fill="none" stroke="#0f2a43" strokeWidth="7" />

                {/* central vertical corridor between the two room columns */}
                <rect x="272" y="20" width="56" height="582" fill="#eef6fd" />
                <text
                  x="300"
                  y="300"
                  textAnchor="middle"
                  fontSize="15"
                  fill="#7c93a8"
                  letterSpacing="6"
                  transform="rotate(90 300 300)"
                >
                  廊下
                </text>

                {/* stairs at the bottom of the corridor */}
                <g>
                  <rect x="276" y="500" width="48" height="100" fill="#f3f0fb" stroke="#3c5a75" strokeWidth="2" />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="280"
                      y1={528 + i * 15}
                      x2="320"
                      y2={528 + i * 15}
                      stroke="#9f8fd0"
                      strokeWidth="2"
                    />
                  ))}
                  <text x="300" y="518" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c93a8">
                    階段
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
                      {a.room && <Bed x={a.x} y={a.y} />}

                      {a.room ? (
                        <>
                          <text
                            x={a.x + a.w / 2 + 16}
                            y={a.y + a.h / 2 - 4}
                            textAnchor="middle"
                            fontSize="15"
                            fontWeight="700"
                            fill="#0f2a43"
                          >
                            {a.label}
                          </text>
                          <text
                            x={a.x + a.w / 2 + 16}
                            y={a.y + a.h / 2 + 13}
                            textAnchor="middle"
                            fontSize="11"
                            fill="#7c93a8"
                          >
                            {a.sub}
                          </text>
                          <text
                            x={a.x + a.w / 2 + 16}
                            y={a.y + a.h - 9}
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight="600"
                            fill={a.accent}
                            opacity={active ? 1 : 0.75}
                          >
                            ▶ 3D内覧へ
                          </text>
                        </>
                      ) : (
                        (() => {
                          // large clickable common areas carry furniture glyphs,
                          // so anchor their label near the top
                          const tall = clickable && a.h > 200;
                          const labelY = tall ? a.y + 44 : a.y + a.h / 2 - (a.sub ? 6 : clickable ? -2 : 5);
                          const subY = tall ? a.y + 62 : a.y + a.h / 2 + 16;
                          return (
                            <>
                              <text
                                x={a.x + a.w / 2}
                                y={labelY}
                                textAnchor="middle"
                                fontSize={a.w < 200 ? 15 : 19}
                                fontWeight="700"
                                fill="#0f2a43"
                              >
                                {a.label}
                              </text>
                              {a.sub && (
                                <text
                                  x={a.x + a.w / 2}
                                  y={subY}
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
                                  y={a.y + a.h - 18}
                                  textAnchor="middle"
                                  fontSize="12"
                                  fontWeight="600"
                                  fill={a.accent}
                                  opacity={active ? 1 : 0.8}
                                >
                                  ▶ 3D内覧へ
                                </text>
                              )}
                            </>
                          );
                        })()
                      )}
                    </g>
                  );
                })}

                {/* common-zone furniture glyphs */}
                {floor === 1 ? (
                  <g opacity="0.55" pointerEvents="none">
                    {/* big TV */}
                    <rect x="170" y="716" width="260" height="12" rx="3" fill="#06b6d4" />
                    <text x="300" y="708" textAnchor="middle" fontSize="11" fill="#06b6d4">
                      大型TV
                    </text>
                    {/* 5 gaming PCs */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <rect
                        key={i}
                        x={192 + i * 46}
                        y="756"
                        width="20"
                        height="28"
                        rx="3"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                      />
                    ))}
                    <text x="300" y="748" textAnchor="middle" fontSize="11" fill="#06b6d4">
                      ゲーミングPC ×5
                    </text>
                    {/* sofa */}
                    <rect x="200" y="812" width="200" height="38" rx="12" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                  </g>
                ) : (
                  <g opacity="0.55" pointerEvents="none">
                    {/* ping-pong table */}
                    <rect x="150" y="716" width="180" height="100" rx="8" fill="none" stroke="#34d399" strokeWidth="1.5" />
                    <line x1="240" y1="716" x2="240" y2="816" stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" />
                    <line x1="150" y1="766" x2="330" y2="766" stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="240" y="708" textAnchor="middle" fontSize="11" fill="#34d399">
                      卓球台
                    </text>
                    {/* bookshelf */}
                    <rect x="370" y="716" width="90" height="100" rx="4" fill="none" stroke="#34d399" strokeWidth="1.5" />
                    {[0, 1, 2].map((i) => (
                      <line key={i} x1="370" y1={749 + i * 25} x2="460" y2={749 + i * 25} stroke="#34d399" strokeWidth="1" />
                    ))}
                    <text x="415" y="708" textAnchor="middle" fontSize="11" fill="#34d399">
                      本棚
                    </text>
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
