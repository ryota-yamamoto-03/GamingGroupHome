"use client";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.25 6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 7.2a3 3 0 0 0-2.12-2.13C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.38.52A3 3 0 0 0 .5 7.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 4.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-4.8ZM9.6 15.6V8.4l6.24 3.6Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-8 border-t border-sky-100 bg-gradient-to-b from-transparent to-sky-100/70 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2.5 sm:justify-start">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 text-sm font-black text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                GG
              </span>
              <div className="leading-tight">
                <p
                  className="text-sm font-bold tracking-wider text-sky-950"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Gaming Group Home Haven
                </p>
                <p className="text-[10px] tracking-[0.3em] text-cyan-600">
                  好きを、居場所に。
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-slate-500">
              本サイトは実在する福祉施設ではなく、ゲーミンググループホームのコンセプトモデル（デモサイト）です。実際の障害福祉サービス（共同生活援助）の内容・対象・費用は、自治体や運営法人により異なります。
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 sm:items-end">
            <div className="flex gap-3">
              {[
                { icon: XIcon, label: "X (Twitter)" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: YoutubeIcon, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={`${s.label}（ダミーリンク）`}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-sky-600 transition-all hover:-translate-y-1 hover:text-cyan-500 hover:shadow-[0_8px_24px_-6px_rgba(34,211,238,0.6)]"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
            <nav className="flex gap-6 text-xs text-slate-500">
              <a href="#top" className="transition hover:text-cyan-600">
                利用規約
              </a>
              <a href="#top" className="transition hover:text-cyan-600">
                プライバシーポリシー
              </a>
              <a href="#contact" className="transition hover:text-cyan-600">
                お問い合わせ
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-sky-200/60 pt-6 text-center">
          <p
            className="text-[10px] tracking-[0.25em] text-slate-400"
            style={{ fontFamily: "var(--font-display)" }}
          >
            © 2026 GAMING GROUP HOME HAVEN — CONCEPT MODEL / DEMO SITE
          </p>
        </div>
      </div>
    </footer>
  );
}
