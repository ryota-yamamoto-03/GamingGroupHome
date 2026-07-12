"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Rotate3D, MousePointer2, Play } from "lucide-react";
import SectionHeading from "./SectionHeading";

const LivingRoomScene = dynamic(() => import("./three/LivingRoomScene"), {
  ssr: false,
});
const PrivateRoomScene = dynamic(() => import("./three/PrivateRoomScene"), {
  ssr: false,
});

function ViewerFrame({
  scene,
  hint,
  cta,
}: {
  scene: "living" | "room";
  hint: string;
  cta: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong relative overflow-hidden rounded-[2rem] p-2 sm:p-3"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-sky-50 to-sky-100 sm:aspect-[16/9]">
        {active ? (
          scene === "living" ? (
            <LivingRoomScene />
          ) : (
            <PrivateRoomScene />
          )
        ) : (
          <button
            onClick={() => setActive(true)}
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-5"
            aria-label={cta}
          >
            {/* preview backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.35),transparent_70%)]" />
            <div className="holo-grid absolute inset-x-[-20%] bottom-[-10%] top-1/2 opacity-60" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/70 bg-white/70 backdrop-blur-xl shadow-[0_0_40px_-4px_rgba(34,211,238,0.7)] transition-transform duration-500 group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full border border-cyan-300/60 [animation-duration:2s]" />
              <Play className="ml-1 h-8 w-8 text-cyan-500" fill="currentColor" />
            </span>
            <span className="relative rounded-full border border-white/70 bg-white/70 px-6 py-2.5 text-sm font-bold text-sky-800 backdrop-blur-md">
              {cta}
            </span>
            <span className="relative text-xs text-slate-500">
              クリックで3Dビューアを起動します
            </span>
          </button>
        )}

        {/* corner HUD decoration */}
        <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-cyan-300/80" />
        <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-cyan-300/80" />
        <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-cyan-300/80" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-cyan-300/80" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Rotate3D className="h-4 w-4 text-cyan-500" />
          {hint}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <MousePointer2 className="h-3.5 w-3.5" />
          3D INTERACTIVE VIEW
        </div>
      </div>
    </motion.div>
  );
}

export function LivingSection() {
  return (
    <section id="living" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-sky-100/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="3D Virtual Tour — Living"
          title="共用リビングを、3Dで内覧。"
          lead="ここが施設の最大の魅力。大型テレビ・ゲーミングデスクトップPC・PS5・Switch が揃う、白と木目の明るいリビング。ドラッグで自由に回転して、お部屋の空気を感じてください。"
        />
        <ViewerFrame
          scene="living"
          hint="ドラッグで回転 / ピンチ・スクロールでズーム"
          cta="共用リビングを3D内覧する"
        />
      </div>
    </section>
  );
}

export function RoomSection() {
  return (
    <section id="room" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="3D Virtual Tour — Private Room"
          title="あなたの個室を、360°見渡す。"
          lead="シングルベッド・白いデスク・ゲーミングチェア・PCモニター・LEDライト・収納・観葉植物。落ち着く照明の中で、部屋の真ん中から360°ぐるりと見渡せます。"
        />
        <ViewerFrame
          scene="room"
          hint="ドラッグで360°見渡せます（お部屋の中に立っている視点）"
          cta="個室を360°内覧する"
        />
      </div>
    </section>
  );
}
