"use client";

import { motion } from "framer-motion";
import { Heart, Gamepad2, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STAFF = [
  {
    name: "サポートスタッフ A",
    role: "サービス管理責任者（イメージ）",
    avatar: "A",
    gradient: "from-sky-400 to-cyan-400",
    fav: "好きなゲーム：RPG全般",
    message: "「できない日があっても大丈夫。あなたのペースがいちばん大事です。」",
  },
  {
    name: "サポートスタッフ B",
    role: "生活支援員（イメージ）",
    avatar: "B",
    gradient: "from-violet-400 to-purple-500",
    fav: "好きなゲーム：スプラ・マイクラ",
    message: "「夜のみんなでゲーム大会、いつも本気で参加してます。」",
  },
  {
    name: "サポートスタッフ C",
    role: "世話人（イメージ）",
    avatar: "C",
    gradient: "from-emerald-400 to-teal-400",
    fav: "好きなゲーム：ぷよぷよ・料理ゲーム",
    message: "「ごはんの相談から通院の付き添いまで、なんでも声をかけてね。」",
  },
];

export default function Staff() {
  return (
    <section id="staff" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Party Members"
          title="スタッフ紹介"
          lead="ゲーム好きのスタッフがサポートします。暮らしのことも、ゲームのことも、いつでも一緒に。"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {STAFF.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass glass-card rounded-3xl p-8 text-center"
            >
              <div className="relative mx-auto mb-5 h-24 w-24">
                <div
                  className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${s.gradient} text-4xl font-black text-white shadow-[0_12px_32px_-8px_rgba(56,189,248,0.6)]`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.avatar}
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-cyan-500 shadow">
                  <Gamepad2 className="h-4 w-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-sky-950">{s.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{s.role}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
                <Sparkles className="h-3 w-3" />
                {s.fav}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{s.message}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 rounded-2xl px-6 py-5 text-center"
        >
          <Heart className="h-5 w-5 shrink-0 text-rose-400" fill="currentColor" />
          <p className="text-sm text-slate-600">
            スタッフ紹介はコンセプトモデルのイメージです。実際の人員配置・支援体制は運営法人により異なります。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
