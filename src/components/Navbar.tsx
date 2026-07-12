"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "#concept", label: "コンセプト" },
  { href: "#living", label: "共用リビング" },
  { href: "#room", label: "個室" },
  { href: "#floorplan", label: "間取り" },
  { href: "#day", label: "一日の流れ" },
  { href: "#facilities", label: "設備" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass-strong mx-3 sm:mx-6 lg:mx-auto" : "bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 text-sm font-black text-white shadow-[0_4px_16px_-2px_rgba(56,189,248,0.6)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            GG
          </span>
          <div className="leading-tight">
            <span
              className="block text-sm font-bold tracking-wider text-sky-950"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Gaming Group Home
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-cyan-600">
              HAVEN — CONCEPT MODEL
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-cyan-600"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="btn-shine">
            <a href="#contact">内覧予約</a>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl p-2 text-sky-900 lg:hidden cursor-pointer"
          aria-label="メニュー"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-3 mt-2 rounded-2xl p-4 lg:hidden"
          >
            <div className="flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white/80 hover:text-cyan-600"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild className="mt-3 btn-shine">
                <a href="#contact" onClick={() => setOpen(false)}>
                  内覧予約
                </a>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
