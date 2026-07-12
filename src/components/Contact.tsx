"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionHeading from "./SectionHeading";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async () => {
    // concept model: simulate a request instead of hitting a real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="お問い合わせ・内覧予約"
          lead="見学・体験入居のご相談など、お気軽にどうぞ。"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-6 sm:p-10"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4 py-10 text-center"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-teal-400 text-white shadow-[0_12px_36px_-8px_rgba(52,211,153,0.7)]">
                <CheckCircle2 className="h-10 w-10" />
              </span>
              <h3 className="text-xl font-bold text-sky-950">
                送信ありがとうございます！
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                ※ 本サイトはコンセプトモデル（デモ）のため、実際の送信は行われていません。実在の施設へのお問い合わせは、お住まいの自治体・各運営法人へお願いします。
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">
                  お名前 <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="山田 太郎"
                  autoComplete="name"
                  {...register("name", { required: "お名前を入力してください" })}
                />
                {errors.name && (
                  <p className="text-xs text-rose-500">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="090-1234-5678"
                    autoComplete="tel"
                    {...register("phone", {
                      pattern: {
                        value: /^[0-9+\-() ]{10,}$/,
                        message: "電話番号の形式で入力してください",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    メールアドレス <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email", {
                      required: "メールアドレスを入力してください",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "メールアドレスの形式で入力してください",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  お問い合わせ内容 <span className="text-rose-400">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="内覧を希望します。／体験入居について教えてください。など"
                  {...register("message", {
                    required: "お問い合わせ内容を入力してください",
                  })}
                />
                {errors.message && (
                  <p className="text-xs text-rose-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="btn-shine w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    送信中...
                  </>
                ) : (
                  <>
                    <Send />
                    送信する
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-slate-400">
                ※ デモサイトのため、入力内容が実際に送信されることはありません。
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
