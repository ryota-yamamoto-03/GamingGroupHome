# Gaming Group Home Haven — GG Haven

**好きを、居場所に。**

ゲームを通じて、人とつながる。精神障害を持つ方限定のゲーミンググループホームの
プロモーションサイト（**コンセプトモデル / デモサイト**）です。

> ⚠️ 本サイトは実在する福祉施設ではありません。実際の障害福祉サービス
> （共同生活援助）の内容・対象・費用は、自治体や運営法人により異なります。

## 主な機能

- **SAO風起動演出** — `GG` ロゴ → Loading → 回転リング → LINK START（GSAP）
- **パーティクル背景** — マウス追従つきの粒子エフェクト（Canvas 2D）
- **パララックスHero** — ガラスUIのホロパネル・未来都市シルエット
- **3D内覧（共用リビング）** — Three.js / React Three Fiber によるSUUMO風の
  自由回転ビュー（大型テレビ・ゲーミングPC・PS5・Switch・RGBライト）
- **3D内覧（個室）** — 部屋の中に立って360°見渡せるビュー
- **クリッカブル間取り図** — 居室・リビングをクリックで3D内覧へ遷移
- **一日の流れタイムライン / 設備一覧（カウントアップ） / スタッフ紹介 /
  FAQ（アコーディオン） / お問い合わせフォーム（React Hook Form）**

## 技術構成

Next.js 15 (App Router) / React 19 / TypeScript / Tailwind CSS v4 /
shadcn/ui / Framer Motion / GSAP / Three.js / React Three Fiber / Drei /
Lucide Icons / React Hook Form

## 開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド
npm run start  # 本番サーバー
```
