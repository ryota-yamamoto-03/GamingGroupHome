"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2, Loader2, ChevronsRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionHeading from "./SectionHeading";

const CONTACT_EMAIL = "ryota.yamamoto03@gmail.com";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const KNOB = 56; // knob width in px
const PAD = 4; // track inner padding

/* ---- slide-to-submit button ---- */
function SlideToSubmit({
  onComplete,
  submitting,
}: {
  /** returns true if validation+submit succeeded, false to snap the knob back */
  onComplete: () => Promise<boolean>;
  submitting: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(1);
  const x = useMotionValue(0);
  const fillWidth = useTransform(x, (v) => v + KNOB + PAD);
  const textOpacity = useTransform(x, [0, maxX * 0.55], [1, 0]);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setMaxX(Math.max(trackRef.current.clientWidth - KNOB - PAD * 2, 1));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const snapBack = () => animate(x, 0, { type: "spring", stiffness: 400, damping: 32 });

  const complete = async () => {
    animate(x, maxX, { duration: 0.15 });
    const ok = await onComplete();
    if (!ok) snapBack();
  };

  const handleDragEnd = () => {
    if (submitting) return;
    if (x.get() >= maxX * 0.85) {
      void complete();
    } else {
      snapBack();
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative h-16 w-full select-none overflow-hidden rounded-full border border-sky-200/80 bg-white/60 shadow-[inset_0_2px_8px_rgba(14,165,233,0.12)] backdrop-blur-md"
      role="slider"
      aria-label="右へスライドして送信"
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !submitting) {
          e.preventDefault();
          void complete();
        }
      }}
    >
      {/* progress fill */}
      <motion.div
        style={{ width: fillWidth }}
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 opacity-90"
      />

      {/* hint text */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-sm font-bold tracking-wide text-sky-700"
      >
        <ChevronsRight className="h-4 w-4 animate-pulse text-cyan-500" />
        スライドして送信
        <ChevronsRight className="h-4 w-4 animate-pulse text-cyan-500" />
      </motion.div>

      {/* draggable knob */}
      <motion.div
        drag={submitting ? false : "x"}
        dragConstraints={{ left: 0, right: maxX }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x, width: KNOB }}
        whileTap={{ scale: 0.96 }}
        className="absolute inset-y-1 left-1 flex cursor-grab items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-[0_6px_20px_-4px_rgba(14,165,233,0.7)] active:cursor-grabbing"
      >
        {submitting ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setSendError(false);
    // backend-less mail delivery for the static demo site (FormSubmit)
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        お名前: data.name,
        電話番号: data.phone || "（未記入）",
        メールアドレス: data.email,
        お問い合わせ内容: data.message,
        _subject: "【GG Haven】お問い合わせ・内覧予約",
        _template: "table",
        _captcha: "false",
      }),
    });
    if (!res.ok) throw new Error("send failed");
    setSent(true);
  };

  /* validate, then submit; return false so the slider snaps back on any failure */
  const slideSubmit = async () => {
    const valid = await trigger();
    if (!valid) return false;
    try {
      await handleSubmit(onSubmit)();
      return true;
    } catch {
      setSendError(true);
      return false;
    }
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
                お問い合わせ内容をサイト運営者宛てに送信しました。内容を確認のうえ、ご記入いただいた連絡先へご返信します。
              </p>
              <p className="max-w-md text-xs leading-relaxed text-slate-400">
                ※ 本サイトはコンセプトモデル（デモ）です。実在の施設へのお問い合わせは、お住まいの自治体・各運営法人へお願いします。
              </p>
            </motion.div>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6" noValidate>
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

              <SlideToSubmit onComplete={slideSubmit} submitting={isSubmitting} />

              {sendError && (
                <p className="text-center text-xs text-rose-500">
                  送信に失敗しました。時間をおいて再度お試しいただくか、
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      "【GG Haven】お問い合わせ・内覧予約"
                    )}`}
                    className="underline"
                  >
                    メールで直接お問い合わせ
                  </a>
                  ください。
                </p>
              )}

              <p className="text-center text-xs text-slate-400">
                ※ ノブを右端までスライドすると送信されます。内容はサイト運営者宛てのメールとして送付されます。
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
