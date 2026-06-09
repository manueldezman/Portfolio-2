export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  timeline: string;
  result: string;
  tags: string[];
  links: Array<{ label: string; href: string }>;
  caseStudy: {
    problem: string;
    targetUser: string;
    difficulty: string;
    approach: string;
    decision: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: "trovepilot",
    title: "TrovePilot",
    category: "Web3 Hackathon Project",
    year: "2026",
    summary:
      "An automation layer for Mezo borrowers that stabilizes target ICR and coordinates MUSD + USDC reserves through BTC volatility and MUSD peg shifts.",
    role: "Solo builder: frontend, smart contracts, documentation, pitch, and demo.",
    timeline: "Mezo Hackathon · April–June 2026",
    result: "Submitted to the Mezo Hackathon.",
    tags: ["Next.js 14", "React", "TypeScript", "Solidity", "Hardhat", "wagmi", "viem", "Mezo"],
    links: [
      { label: "Live Demo", href: "https://trovepilot-web-vo95.vercel.app/" },
      { label: "GitHub", href: "https://github.com/manueldezman/trovepilot" },
      { label: "Video Demo", href: "https://www.youtube.com/watch?v=Aj58RXZ5Bs0" },
    ],
    caseStudy: {
      problem:
        "Mezo MUSD borrowers need to manage BTC-backed borrowing positions while BTC price, ICR, debt exposure, reserve balances, and MUSD peg conditions change. The manual workflow forces users to constantly decide when to repay, rebalance, or accumulate reserves.",
      targetUser:
        "The primary users are Mezo borrowers and active DeFi users managing BTC-backed borrowing positions who want to maintain a preferred safety level without constant monitoring.",
      difficulty:
        "Multiple variables move at the same time: BTC volatility affects ICR, debt remains fixed unless actively managed, MUSD premium and discount conditions create opportunities and risks, and reserve allocation becomes continuous manual work.",
      approach:
        "TrovePilot treats the problem as an operational coordination problem instead of a prediction problem. It monitors trove health, simulates BTC and MUSD scenarios, and coordinates Stability Liquidity in MUSD with Opportunity Liquidity in USDC.",
      decision:
        "The most important decision was treating MUSD as an active reserve asset rather than only borrowed capital. That led to Stability Liquidity, Opportunity Liquidity, adaptive 60/40 reserve balancing, and scenario-driven reserve actions executed onchain.",
      outcome:
        "The demo showed a more structured borrower workflow: connect a Mezo testnet wallet, configure reserve rules, run BTC-up or BTC-down scenarios, and inspect debt and reserve changes through the dashboard and timeline.",
    },
  },
  {
    slug: "suimulate",
    title: "Suimulate",
    category: "Web3 Developer Tooling",
    year: "2026",
    summary:
      "An interactive Move language visualizer for Sui that helps developers understand transactions, objects, and smart contracts through step-by-step visualizations.",
    role: "Solo builder: frontend, smart contracts, docs, pitch, and demo.",
    timeline: "Walrus Session 1 · April 2026",
    result: "Won Best Technical Website and received recognition from Mysten Labs for expanding the project.",
    tags: ["React 19", "Vite", "JavaScript", "Move", "Sui", "Gemini Flash 2.5", "Vanilla CSS"],
    links: [
      { label: "Live Site", href: "http://0xDezman.wal.app" },
      { label: "GitHub", href: "https://github.com/manueldezman/suimulate" },
      { label: "Demo Video", href: "https://www.youtube.com/watch?v=n99id_ENXBg" },
      { label: "Prize Proof", href: "https://x.com/0xDezman/status/2049555865238114447?s=20" },
    ],
    caseStudy: {
      problem:
        "Move and Sui concepts can feel abstract for developers who are trying to understand how transactions, owned objects, smart contracts, and state changes behave during execution.",
      targetUser:
        "The target users are Sui learners, hackathon builders, and developers who want a more visual way to understand Move execution and object state transitions.",
      difficulty:
        "The challenge was turning execution concepts into an interface that is simple enough for beginners while still useful for technical users who want before-and-after state details.",
      approach:
        "Suimulate combines an interactive code editor, pre-built templates, AI-powered simulation, dual beginner and advanced explanations, and an execution timeline for step-by-step learning.",
      decision:
        "The key product decision was to pair visual state transitions with plain-language and technical explanations so the tool could serve both onboarding and deeper developer education.",
      outcome:
        "The project won the Best Technical Website prize at Walrus Session 1 and became a strong proof point for developer education, Web3 tooling, and technical storytelling.",
    },
  },
  {
    slug: "github-readme-generator",
    title: "GitHub README Generator",
    category: "AI Documentation Tool",
    year: "2026",
    summary:
      "An open-source AI-powered documentation generator that turns a public GitHub repository URL into a README or Quickstart document in seconds.",
    role: "Solo builder: product, frontend, backend proxy, prompt flow, and documentation.",
    timeline: "2026",
    result: "Live open-source tool for developers and hackathon builders.",
    tags: ["GitHub API", "Gemini 2.5 Flash", "Documentation", "AI Tooling", "Responsive UI", "Vercel"],
    links: [
      { label: "Live Demo", href: "https://github-docs-generator.vercel.app/" },
      { label: "GitHub", href: "https://github.com/manueldezman/github-docs-generator" },
    ],
    caseStudy: {
      problem:
        "Developers often ship projects without quality README files, especially after hackathons or fast build cycles. That makes projects harder to evaluate, run, and reuse.",
      targetUser:
        "The target users are developers and hackathon builders who need the most urgent documentation assets before anyone can understand or use their project.",
      difficulty:
        "A useful generator needs real repository context, not generic filler. It has to inspect metadata, file structure, and any existing README before producing a useful document.",
      approach:
        "The app fetches public repository metadata through the GitHub API, lets users choose README or Quickstart, and sends structured context through a secure backend proxy to Gemini 2.5 Flash.",
      decision:
        "The important technical decision was keeping the AI API key server-side behind a disposable backend proxy, so end users do not need to expose their own API key in the browser.",
      outcome:
        "The result is a clean dark UI that quickly generates the first two docs developers usually need: a README for project understanding and a Quickstart for hands-on use.",
    },
  },
  {
    slug: "fhevm-agent-skills",
    title: "FHEVM Agent Skills",
    category: "AI Agent Developer Experience",
    year: "2026",
    summary:
      "A skill collection that gives AI coding agents validated workflows for building, testing, deploying, and integrating Zama FHEVM confidential dApps.",
    role: "Creator and maintainer: skill design, validation, examples, anti-patterns, and planned npm packaging.",
    timeline: "2026",
    result: "Open-source skill collection with planned npm package: @0xdezman/fhevm-agent-skills.",
    tags: ["Zama FHEVM", "AI Agents", "Solidity", "Hardhat", "Sepolia", "@zama-fhe/relayer-sdk", "Docs"],
    links: [
      { label: "GitHub", href: "https://github.com/manueldezman/fhevm-agent-skills" },
      { label: "Planned npm Package", href: "https://www.npmjs.com/package/@0xdezman/fhevm-agent-skills" },
    ],
    caseStudy: {
      problem:
        "FHEVM builders often struggle to use general AI coding agents because the agents do not reliably know current APIs, encrypted input patterns, access-control rules, deployment steps, or frontend integration flow.",
      targetUser:
        "The target users are developers building confidential applications with Zama FHEVM, including smart contract developers, frontend developers, hackathon builders, and privacy-preserving dApp teams.",
      difficulty:
        "FHEVM has sharp edges around encrypted types, external encrypted inputs, input proofs, FHE.fromExternal, FHE.allow, FHE.allowThis, public decryption, user decryption, Sepolia config, and browser encryption.",
      approach:
        "The collection splits guidance into smart contract, testing, deployment, and frontend skills so agents load the exact context needed for each stage of the development workflow.",
      decision:
        "The most important decision was making the skills validation-driven instead of documentation-only. Real contracts, tests, deployment scripts, and frontend integration work informed the patterns and anti-patterns.",
      outcome:
        "The result is a reusable agent context package that helps move from a natural-language FHEVM idea to working confidential dApp code faster, with npm distribution planned for easier installation.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
