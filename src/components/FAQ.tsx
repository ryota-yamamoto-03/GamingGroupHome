"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";

const FAQS = [
  {
    q: "入居できるのは精神障害のある方のみですか？",
    a: "このコンセプトモデルでは、精神障害を持つ方を対象としたグループホーム（共同生活援助）を想定しています。実際の入居対象や条件は、自治体の支給決定や運営法人の方針により異なりますので、詳細は各自治体・運営法人にご確認ください。",
  },
  {
    q: "ゲーム初心者でも大丈夫ですか？",
    a: "もちろん大丈夫です。「観る専」も「ちょっとだけ」も大歓迎。ゲーム好きのスタッフや仲間が、最初の一歩からゆっくり一緒に楽しみます。ゲームをしない日があっても、まったく問題ありません。",
  },
  {
    q: "外出はできますか？",
    a: "はい。買い物・散歩・通院・お出かけなど、日常の外出は自由に想定しています。生活リズムや体調に合わせて、スタッフがサポートするイメージです（実際のルールは運営法人により異なります）。",
  },
  {
    q: "体験入居はできますか？",
    a: "コンセプトモデルとしては、短期の体験入居を経てから本入居を検討できる流れを想定しています。実際の体験利用の可否・手続き・費用は、自治体や運営法人により異なりますので、お問い合わせフォームからご相談ください。",
  },
  {
    q: "費用はどのくらいかかりますか？",
    a: "グループホーム（共同生活援助）の利用料金は、障害福祉サービスの自己負担額・家賃・食費・光熱費などで構成されるのが一般的ですが、金額は自治体や運営法人により大きく異なります。本サイトはデモのため具体的な金額の記載はしていません。",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-sky-100/50 to-transparent" />
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Q &amp; A"
          title="よくある質問"
          lead="気になることは、なんでも聞いてください。"
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl px-6 sm:px-8"
        >
          <Accordion type="single" collapsible className="divide-y divide-sky-100">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-sm text-sky-950 sm:text-base">
                  <span className="flex items-center gap-3">
                    <span
                      className="gradient-text shrink-0 text-lg font-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Q
                    </span>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-8 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
