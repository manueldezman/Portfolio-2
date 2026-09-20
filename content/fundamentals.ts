export type FundamentalsTrack = "Blockchain" | "AI" | "DeFi";

export type ExplainerFormat = {
  label: "Short video" | "Carousel" | "Excalidraw";
  href: string;
};

export type FundamentalsTopic = {
  slug: string;
  title: string;
  description: string;
  track: FundamentalsTrack;
  date: string;
  thumbnail: string;
  formats: ExplainerFormat[];
};

export const fundamentalsTracks: FundamentalsTrack[] = ["Blockchain", "AI", "DeFi"];

export const fundamentalsTopics: FundamentalsTopic[] = [
  {
    slug: "blockchain-state",
    title: "Blockchain State Simplified",
    description:
      "A multi-format explanation of blockchain state: the current snapshot of accounts, balances, contract storage, and other data produced as transactions change a network.",
    track: "Blockchain",
    date: "July 10, 2026",
    thumbnail: "https://img.youtube.com/vi/7Q_OGrPW86s/hqdefault.jpg",
    formats: [
      {
        label: "Short video",
        href: "https://youtube.com/shorts/7Q_OGrPW86s?feature=share",
      },
      {
        label: "Carousel",
        href: "https://www.linkedin.com/posts/abdulganiyadeleke_what-is-blockchain-state-ugcPost-7481127617719492608-q0pQ/",
      },
      {
        label: "Excalidraw",
        href: "https://x.com/0xDezman/status/2075505322450399654?s=20",
      },
    ],
  },
];
