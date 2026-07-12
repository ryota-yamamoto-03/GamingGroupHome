import type { Metadata } from "next";
import { Noto_Sans_JP, Orbitron } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title:
    "Gaming Group Home Haven | ゲーミンググループホーム【コンセプトモデル】",
  description:
    "好きを、居場所に。ゲームを通じて人とつながる、精神障害を持つ方限定のゲーミンググループホーム「Gaming Group Home Haven」のコンセプトモデル（デモサイト）。3D内覧で共用リビング・個室を自由に見学できます。",
  keywords: [
    "ゲーミンググループホーム",
    "精神障害 グループホーム",
    "障害者 グループホーム",
    "グループホーム ゲーム",
    "共同生活援助",
    "GG Haven",
  ],
  openGraph: {
    title: "Gaming Group Home Haven | 好きを、居場所に。",
    description:
      "ゲームを通じて、人とつながる。精神障害を持つ方限定のゲーミンググループホーム（コンセプトモデル）。",
    type: "website",
    locale: "ja_JP",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
