export type ContentCategory =
  | "Conceptual Explainer"
  | "Tutorial Guide"
  | "Project Demo"
  | "YouTube Explainer";

export type ContentItem = {
  title: string;
  description: string;
  href: string;
  category: ContentCategory;
  date: string;
  readTime?: string;
  thumbnail?: string;
  videoId?: string;
};

export const articleItems: ContentItem[] = [
  {
    title: "How to Fix CORS Errors in Your Frontend App Using a Proxy Server",
    description:
      "Explains why browser API calls fail with Failed to Fetch errors and how to fix them with the proxy pattern.",
    href: "https://0xdezman.hashnode.dev/how-to-fix-cors-errors-in-your-frontend-app-using-a-proxy-server",
    category: "Tutorial Guide",
    date: "March 27, 2026",
    readTime: "8 min read",
    thumbnail: "/thumbnails/cors-proxy.svg",
  },
  {
    title: "How to Fix Form Validation UX: Switching from :invalid to :user-invalid",
    description:
      "Shows how modern CSS validation pseudo-classes avoid premature validation messages and improve form UX.",
    href: "https://0xdezman.hashnode.dev/how-to-fix-form-validation-ux-switching-from-invalid-to-user-invalid",
    category: "Tutorial Guide",
    date: "February 16, 2026",
    readTime: "6 min read",
    thumbnail: "/thumbnails/form-validation.svg",
  },
  {
    title: "Why the Revealing Module Pattern property won't update (and how to fix it)",
    description:
      "Breaks down a JavaScript closure and IIFE pitfall that causes returned properties to appear stale.",
    href: "https://0xdezman.hashnode.dev/why-the-revealing-module-pattern-property-won-t-update-and-how-to-fix-it",
    category: "Conceptual Explainer",
    date: "April 13, 2026",
    readTime: "9 min read",
    thumbnail: "/thumbnails/revealing-module.svg",
  },
  {
    title: "How SEDA Revolutionizes Solana Perps Feeds",
    description:
      "A technical X post explaining how SEDA’s speed can outshine traditional oracle approaches for Solana perps feeds.",
    href: "https://x.com/0xDezman/status/1977466528674025543?s=20",
    category: "Conceptual Explainer",
    date: "2026",
    thumbnail: "/thumbnails/seda-oracles.svg",
  },
  {
    title: "Private Intelligence: Medical AI with Arcium Secure Compute",
    description:
      "A technical X post exploring privacy-preserving compute and medical AI through Arcium.",
    href: "https://x.com/0xDezman/status/1971693881252073983?s=20",
    category: "Conceptual Explainer",
    date: "2026",
    thumbnail: "/thumbnails/arcium-medical-ai.svg",
  },
];

export const projectDemoItems: ContentItem[] = [
  {
    title: "TrovePilot Demo",
    description:
      "A walkthrough of the Mezo borrower automation prototype, showing BTC/MUSD scenario controls and reserve coordination.",
    href: "https://www.youtube.com/watch?v=Aj58RXZ5Bs0",
    category: "Project Demo",
    date: "2026",
    thumbnail: "https://img.youtube.com/vi/Aj58RXZ5Bs0/hqdefault.jpg",
    videoId: "Aj58RXZ5Bs0",
  },
  {
    title: "Suimulate Demo",
    description:
      "A demo of the interactive Sui Move visualizer for transactions, objects, smart contracts, and state transitions.",
    href: "https://www.youtube.com/watch?v=n99id_ENXBg",
    category: "Project Demo",
    date: "2026",
    thumbnail: "https://img.youtube.com/vi/n99id_ENXBg/hqdefault.jpg",
    videoId: "n99id_ENXBg",
  },
];

export const youtubeExplainerItems: ContentItem[] = [
  {
    title: "Slopsquatting and AI-Generated Dependency Risk",
    description:
      "A short explainer on slopsquatting, package-name hallucinations, and how developers can verify dependencies before installing.",
    href: "https://www.youtube.com/shorts/Nvkev1CmVOw",
    category: "YouTube Explainer",
    date: "2026",
    thumbnail: "https://img.youtube.com/vi/Nvkev1CmVOw/hqdefault.jpg",
    videoId: "Nvkev1CmVOw",
  },
];

export const featuredContentItems = [
  ...articleItems.slice(0, 2),
  ...projectDemoItems.slice(0, 1),
];
