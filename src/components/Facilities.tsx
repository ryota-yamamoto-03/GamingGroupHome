"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Wifi,
  Gamepad2,
  Joystick,
  Monitor,
  Tv,
  WashingMachine,
  Wind,
  Refrigerator,
  Microwave,
  CookingPot,
  Bath,
  Toilet,
  AirVent,
  Sofa,
  Armchair,
  Cloud,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const ITEMS = [
  { icon: Wifi, label: "高速Wi-Fi" },
  { icon: Gamepad2, label: "PS5" },
  { icon: Joystick, label: "Nintendo Switch" },
  { icon: Monitor, label: "ゲーミングデスクトップPC ×5" },
  { icon: Cloud, label: "Steam" },
  { icon: Tv, label: "大型テレビ" },
  { icon: WashingMachine, label: "洗濯機" },
  { icon: Wind, label: "乾燥機" },
  { icon: Refrigerator, label: "冷蔵庫" },
  { icon: Microwave, label: "電子レンジ" },
  { icon: CookingPot, label: "キッチン" },
  { icon: Bath, label: "浴室" },
  { icon: Toilet, label: "トイレ" },
  { icon: AirVent, label: "エアコン" },
  { icon: Sofa, label: "家具付き" },
  { icon: Armchair, label: "ゲーミングチェア" },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} style={{ fontFamily: "var(--font-display)" }}>
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 10, suffix: "室", label: "個室（2階建て）" },
  { to: 100, suffix: "%", label: "全室Wi-Fi・エアコン" },
  { to: 3, suffix: "機種", label: "Switch / PS5 / PC" },
  { to: 365, suffix: "日", label: "生活支援サポート" },
];

export default function Facilities() {
  return (
    <section id="facilities" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-100/50 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Equipment"
          title="設備"
          lead="暮らしに必要なものも、遊びに必要なものも。ぜんぶ揃った状態からスタートできます。"
        />

        {/* count-up stats */}
        <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <p className="gradient-text text-3xl font-black sm:text-4xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className="glass glass-card flex items-center gap-3 rounded-2xl px-4 py-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 text-cyan-600">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-sky-950">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          ※ 設備内容はコンセプトモデルのイメージです。実際の障害福祉サービスの内容は自治体や運営法人により異なります。
        </p>
      </div>
    </section>
  );
}
