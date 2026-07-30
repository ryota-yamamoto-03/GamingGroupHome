import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gaming Group Home Haven",
    short_name: "GG Haven",
    description:
      "好きを、居場所に。精神障害を持つ方限定のゲーミンググループホーム（コンセプトモデル）。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f4f9ff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
