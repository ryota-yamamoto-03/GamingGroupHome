"use client";

import { motion } from "framer-motion";
import { Gamepad2, BedDouble, ShieldCheck, Check } from "lucide-react";
import SectionHeading from "./SectionHeading";

const CARDS = [
  {
    icon: Gamepad2,
    color: "from-sky-400 to-cyan-400",
    glow: "rgba(34,211,238,0.45)",
    title: "一緒にゲーム",
    body: "Switch・Steam・PS5・PCゲーム。リビングに集まって、みんなで楽しめます。対戦も協力プレイも、観るだけでも大歓迎。",
    items: ["Nintendo Switch", "Steam / PCゲーム", "PS5", "みんなで対戦・協力プレイ"],
  },
  {
    icon: BedDouble,
    color: "from-violet-400 to-purple-500",
    glow: "rgba(139,92,246,0.45)",
    title: "一人の時間",
    body: "各部屋にはベッド・ゲーミングチェア・デスク・観葉植物・収納・Wi-Fi・エアコンを完備。自分のペースで落ち着いて過ごせます。",
    items: ["ベッド・デスク完備", "ゲーミングチェア", "Wi-Fi・エアコン", "観葉植物・収納"],
  },
  {
    icon: ShieldCheck,
    color: "from-emerald-400 to-teal-400",
    glow: "rgba(52,211,153,0.45)",
    title: "安心",
    body: "精神障害を持つ方限定・少人数制。生活支援スタッフがそばにいるから、無理なく自立に向かって進めます。",
    items: ["精神障害を持つ方限定", "少人数制", "生活支援あり", "自立を応援"],
  },
];

export default function Concept() {
  return (
    <section id="concept" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Concept"
          title="好きを、居場所に。"
          lead="「頑張って社会に合わせる場所」ではなく、「好きなことを真ん中に置ける場所」。Gaming Group Home Haven は、ゲームが好きなあなたのための住まいのコンセプトモデルです。"
        />

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass glass-card group rounded-3xl p-8"
            >
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                style={{ boxShadow: `0 10px 30px -8px ${card.glow}` }}
              >
                <card.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-sky-950">
                {card.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                {card.body}
              </p>
              <ul className="space-y-2.5">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${card.color}`}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
