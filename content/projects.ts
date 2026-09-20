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
    slug: "mental-note",
    title: "Mental Note",
    category: "AI Learning Tool",
    year: "2026",
    summary:
      "A local-first cognitive sandbox for active recall that turns source material and user blurts into verified notes and an interactive visual knowledge map.",
    role: "Builder: product, frontend, recall workflow, AI integration, and cognitive canvas.",
    timeline: "Currently building · 2026",
    result: "In active development, with source ingestion, recall verification, visual mapping, and note export already working.",
    tags: ["Next.js 15", "React 19", "Excalidraw", "Cognee 1.2.2", "NVIDIA GLM", "OpenAI SDK"],
    links: [{ label: "GitHub", href: "https://github.com/manueldezman/mental-note" }],
    caseStudy: {
      problem:
        "Passive rereading makes it difficult to know whether a learner can actually retrieve and structure what they studied. Existing note tools capture information, but rarely turn recall into a visible, verifiable learning loop.",
      targetUser:
        "Mental Note is for learners and knowledge workers who want to ingest source material, test their understanding through blurting, and turn verified recall into reusable visual notes.",
      difficulty:
        "The system has to combine document ingestion, semantic recall, optional AI interpretation, visual layout, and durable browser state while still working when hosted AI or Cognee services are not fully configured.",
      approach:
        "Sources are stored in a local namespace and, when configured, ingested into a Cognee dataset. User blurts can be interpreted into note graphs by an NVIDIA-hosted GLM through the OpenAI-compatible SDK, then verified against real Cognee recall results or a local overlap heuristic fallback.",
      decision:
        "The key decision was to keep the learning workflow resilient and local-first. Hosted recall and model interpretation improve the experience when available, but browser persistence and local verification keep the core source-to-blurt-to-canvas loop usable without every external service.",
      outcome:
        "The current build renders verified ideas as a branded Excalidraw-style cognitive canvas, preserves the workspace and saved-note library in the browser, exports Markdown and diagram JSON, and attempts Cognee memify enrichment for vetted notes. Next steps include broader document extraction and stronger analogy validation and layout rules.",
    },
  },
  {
    slug: "cloakroom",
    title: "CloakRoom",
    category: "Confidential Token Tooling",
    year: "2026",
    summary:
      "A protocol dashboard for discovering Zama wrapper pairs, wrapping and unwrapping ERC-20 and ERC-7984 tokens, and decrypting confidential balances.",
    role: "Solo builder: product, frontend, Zama integration, wallet flows, documentation, and deployment.",
    timeline: "July 2026",
    result: "Shipped as a live protocol tool supporting confidential token workflows on Ethereum mainnet and Sepolia.",
    tags: ["Next.js", "TypeScript", "Zama FHE SDK", "ERC-7984", "RainbowKit", "wagmi", "viem", "Tailwind CSS"],
    links: [
      { label: "Live App", href: "https://cloak-room.vercel.app/" },
      { label: "GitHub", href: "https://github.com/manueldezman/CloakRoom" },
      { label: "Demo Video", href: "https://youtu.be/qtFiDK-58TQ" },
    ],
    caseStudy: {
      problem:
        "Confidential token users need a practical way to discover official wrapper pairs, move between public ERC-20 and confidential ERC-7984 assets, and reveal their own encrypted balances without stitching together separate scripts and contract interfaces.",
      targetUser:
        "The dashboard serves Zama ecosystem users and developers working with confidential tokens on Ethereum mainnet or Sepolia, including teams testing private asset flows before production deployment.",
      difficulty:
        "The interface has to coordinate onchain registry data, wallet and network state, Zama relayer operations, EIP-712 user decryption, token-specific faucet rules, and safe transaction feedback across testnet and mainnet.",
      approach:
        "CloakRoom reads official pairs from the active chain's Zama Wrappers Registry, merges repository-defined and browser-imported development pairs, and provides focused flows for wrapping, unwrapping, faucet claims, and confidential balance inspection.",
      decision:
        "The key product decision was a hybrid registry model: official onchain pairs take precedence, while repository configuration and chain-scoped browser imports let developers test private or newly deployed pairs without modifying the official registry.",
      outcome:
        "The shipped dashboard supports Ethereum mainnet and Sepolia, provides EIP-712 user decryption for arbitrary ERC-7984 tokens, surfaces network-aware safeguards and actionable errors, and gives developers one interface for confidential token discovery and interaction.",
    },
  },
  {
    slug: "botchain-init-toolkit",
    title: "BOT Chain Init Toolkit",
    category: "Web3 AI Developer Tooling",
    year: "2026",
    summary:
      "A single-command bootstrap that turns Claude Code, Codex, Cursor, and Windsurf into BOT Chain engineering agents with a reusable skill and local MCP tooling.",
    role: "Solo builder: installer, agent skill, MCP server, safety model, documentation, and testing.",
    timeline: "July 2026",
    result: "Released as an open-source toolkit with support for four AI coding environments and 10 BOT Chain tools.",
    tags: ["BOT Chain", "MCP", "AI Agents", "Node.js", "EVM", "Codex", "Claude Code", "Web3"],
    links: [
      { label: "Documentation", href: "https://manueldezman.github.io/botchain-init-toolkit/#install" },
      { label: "GitHub", href: "https://github.com/manueldezman/botchain-init-toolkit/tree/main" },
      { label: "Documentation Audit", href: "/audits/company-documentation-audit.md" },
    ],
    caseStudy: {
      problem:
        "BOT Chain encourages builders to use AI coding tools such as Claude Code, Codex, Cursor, and Windsurf, while still requiring them to understand, demonstrate, and verify what they submit. General-purpose agents can introduce unreliable network assumptions and fragmented setup into that workflow.",
      targetUser:
        "The target users are BOT Chain smart contract developers and Web3 builders who use Claude Code, Codex, Cursor, or Windsurf in their development workflow.",
      difficulty:
        "The toolkit needed to make four different agent environments reliable on BOT Chain, work defensively around gaps found in the official documentation, expose useful blockchain operations, and keep high-risk actions explicit and testnet-first.",
      approach:
        "The project pairs structured BOT Chain knowledge with a local Model Context Protocol server. A single npx command installs the skill, registers executable workflows, and gives agents tools for environment checks, balances, contract reads, gas estimates, deployments, transfers, and explorer lookups.",
      decision:
        "The key decision was to package durable network guidance and executable tools together. The skill teaches agents when and how to act, while the MCP server provides 10 focused operations with safety rules, allow-listed commands, documentation-gap handling, and defensive configuration defaults.",
      outcome:
        "The result is an MIT-0 open-source bootstrap that supports four major AI coding environments, reduces repeated setup to one command, and provides a safer path from development questions to tested onchain workflows. It simplifies the developer experience without replacing the builder's responsibility to understand and verify the work.",
    },
  },
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
