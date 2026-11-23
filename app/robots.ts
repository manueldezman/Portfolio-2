import type { MetadataRoute } from "next";

const baseUrl = "https://0xdezman.cv";

const searchEngineCrawlers = ["Googlebot", "Bingbot"];

const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: searchEngineCrawlers,
        allow: "/",
      },
      {
        userAgent: aiCrawlers,
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
