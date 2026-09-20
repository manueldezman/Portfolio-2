export type BlogPost = {
  title: string;
  href: string;
  date: string;
  description: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "How to Never Run Out of Ideas",
    href: "https://0xdezman.substack.com/p/how-to-never-run-out-of-ideas",
    date: "2026-08-08",
    description: "A practical system for generating better ideas, consistently.",
    tags: ["writing", "creativity", "process"],
  },
  {
    title:
      "Is SearchApi a Good SerpApi Alternative for RAG and AI Automation Workflows? A Data-Backed Comparison",
    href: "https://0xdezman.hashnode.dev/is-searchapi-a-good-serpapi-alternative-for-rag-and-ai-automation-workflows-a-data-backed-comparison",
    date: "2026-07-16",
    description:
      "Two benchmark runs comparing SearchApi and SerpApi on latency, usable-result availability, relevance, LLM answer completeness, pricing, and search-engine support.",
    tags: ["search api", "rag", "benchmark"],
  },
];
