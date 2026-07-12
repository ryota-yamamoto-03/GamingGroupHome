"use client";

import { motion } from "framer-motion";
import {
  Sunrise,
  Coffee,
  Sun,
  Utensils,
  Gamepad2,
  CookingPot,
  Users,
  Moon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const EVENTS = [
  { time: "8:00", title: "起床", desc: "自分のペースでゆっくり目覚める朝。", icon: Sunrise, color: "from-amber-300 to-orange-400" },
  { time: "9:00", title: "朝食", desc: "みんなで、または自分の部屋で。", icon: Coffee, color: "from-sky-300 to-cyan-400" },
  { time: "10:00", title: "自由時間", desc: "ゲーム・散歩・昼寝。過ごし方は自由。", icon: Sun, color: "from-emerald-300 to-teal-400" },
  { time: "12:00", title: "昼食", desc: "スタッフと一緒に準備するのも楽しい時間。", icon: Utensils, color: "from-lime-300 to-emerald-400" },
  { time: "14:00", title: "ゲーム・動画編集学習", desc: "好きなゲームや、動画編集などのスキル学習に挑戦。", icon: Gamepad2, color: "from-cyan-400 to-sky-500" },
  { time: "18:00", title: "夕食", desc: "1日のできごとを話しながら、あたたかい食卓を。", icon: CookingPot, color: "from-orange-300 to-rose-400" },
  { time: "20:00", title: "みんなでゲーム", desc: "リビングに集合。今日は何をプレイする？", icon: Users, color: "from-violet-400 to-purple-500" },
  { time: "22:00", title: "就寝", desc: "おやすみなさい。また明日、一緒に遊ぼう。", icon: Moon, color: "from-indigo-400 to-blue-500" },
];

export default function DayTimeline() {
  return (
    <section id="day" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Daily Quest Log"
          title="一日の流れ"
          lead="決まりすぎない、ゆるやかなリズム。あなたのペースを大切にした一日のイメージです。"
        />

        <div className="relative">
          {/* glowing vertical line */}
          <div className="absolute left-[26px] top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-sky-300 via-cyan-400 to-violet-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8">
            {EVENTS.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={e.time}
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative pl-16 sm:w-1/2 ${
                    left
                      ? "sm:mr-auto sm:pl-0 sm:pr-14 sm:text-right"
                      : "sm:ml-auto sm:pl-14"
                  }`}
                >
                  {/* node icon, centered on the timeline */}
                  <div
                    className={`absolute left-0 top-1/2 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br ${e.color} text-white shadow-[0_8px_24px_-6px_rgba(14,165,233,0.5)] ${
                      left
                        ? "sm:left-auto sm:right-0 sm:translate-x-1/2"
                        : "sm:-translate-x-1/2"
                    }`}
                  >
                    <e.icon className="h-6 w-6" />
                  </div>

                  <div className="glass glass-card rounded-2xl p-5">
                    <span
                      className="eyebrow text-xs font-bold text-cyan-500"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {e.time}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-sky-950">{e.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{e.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
