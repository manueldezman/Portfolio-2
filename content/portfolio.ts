import type { StaticImageData } from "next/image";
import apiDocsScorecardImage from "@/images/portfolio/empay-afdocs-scorecard.png";
import cohortAnnouncementImage from "@/images/community/kodespot-cohort-2-announcement.png";
import cohortStudentThreadImage from "@/images/community/kodespot-cohort-2-student-thread.png";
import eventFeedbackImage from "@/images/community/techie-soiree-feedback.jpg";
import eventOnsiteImage from "@/images/community/angelhack-kodespot-onsite.jpg";
import eventRoomImage from "@/images/community/angelhack-web3-room.jpg";
import eventSpeakerImage from "@/images/community/kodespot-speaker-proof.png";
import eventTeamImage from "@/images/community/kodespot-angelhack-team.jpg";

export type PortfolioItem = {
  title: string;
  description: string;
  href: string;
  source: string;
  caseStudySlug?: string;
  articleNote?: ArticleNote;
  readiness?: AgentReadiness;
};

export type AgentReadiness = {
  image: CommunityProofImage;
  command: string;
  tools: Array<{ name: string; role: string }>;
  practices: string[];
};

export type ArticleNote = {
  why: string;
  audience: string;
  process: string[];
  processNote: string;
};

export type ExplainerPlaylistNote = {
  text: string;
  playlists: Array<{ label: string; href: string }>;
};

export type PortfolioCaseStudy = {
  slug: string;
  title: string;
  summary: string;
  links: Array<{ label: string; href: string }>;
  demoVideo?: { youtubeId: string; title: string };
  sections: Array<{ id: string; label: string; body: string }>;
};

export type OpenSourceContributionLink = {
  label: string;
  href: string;
  status: string;
};

export type OpenSourceContribution = {
  title: string;
  problem: string;
  contribution: string;
  impact: string;
  links: OpenSourceContributionLink[];
};

export type OpenSourceRepository = {
  repository: string;
  organization: string;
  heading: string;
  prLinks: OpenSourceContributionLink[];
  contributions: OpenSourceContribution[];
};

export type CommunityActivityField = {
  label: string;
  value: string;
};

export type CommunityActivity = {
  title: string;
  label: string;
  detail: string;
  fields: CommunityActivityField[];
  images?: CommunityProofImage[];
};

export type CommunityProofImage = {
  alt: string;
  caption: string;
  image: StaticImageData;
  lead?: boolean;
  link?: { label: string; href: string };
};

export type CommunityEvent = {
  title: string;
  label: string;
  fields: CommunityActivityField[];
  proofLinks: Array<{ label: string; href: string }>;
  images: CommunityProofImage[];
  feedback: {
    title: string;
    image: CommunityProofImage;
  };
};

export type DeveloperCommunityEntry =
  | { kind: "activity"; activity: CommunityActivity }
  | { kind: "event"; event: CommunityEvent };

export const tutorialItems: PortfolioItem[] = [
  {
    title: "How to make technical documentation AI-ready: prevent information loss in Markdown",
    description: "Covers Markdown practices that make developer documentation easier for AI systems to consume.",
    href: "https://hackmamba.io/technical-documentation/how-to-make-technical-documentation-ai-ready-with-markdown/",
    source: "Hackmamba",
    articleNote: {
      why: "I noticed tab components kept vanishing in the AI-facing Markdown representations of three documentation sites I examined, which impacted the correctness of the answers the agents gave me. I traced the root cause in each case and found they arose from decisions made during the conversion process, so I wrote this article to help documentation teams avoid those issues.",
      audience: "Documentation engineers and teams",
      process: [
        "Draft",
        "Hackmamba editor review",
        "Revisions",
        "Hackmamba growth marketer's review",
        "Revisions",
        "Publish",
      ],
      processNote:
        "The article went through Hackmamba's editorial review before publication: an assigned Hackmamba editor reviewed the draft and recommended changes, I revised accordingly, then the growth marketer reviewed the revised draft and I applied a final round of changes before it was published on September 10, 2026.",
    },
  },
  {
    title: "How to Fix CORS Errors in Your Frontend App Using a Proxy Server",
    description: "Guides developers through diagnosing failed browser requests and fixing them with a proxy server.",
    href: "https://0xdezman.hashnode.dev/how-to-fix-cors-errors-in-your-frontend-app-using-a-proxy-server",
    source: "Hashnode",
  },
  {
    title: "How to Fix Form Validation UX: Switching from :invalid to :user-invalid",
    description: "Teaches a modern CSS approach for avoiding premature validation messages.",
    href: "https://0xdezman.hashnode.dev/how-to-fix-form-validation-ux-switching-from-invalid-to-user-invalid",
    source: "Hashnode",
  },
  {
    title: "Why the Revealing Module Pattern property won't update (and how to fix it)",
    description: "Walks through a JavaScript closure and IIFE pitfall that causes stale returned properties.",
    href: "https://0xdezman.hashnode.dev/why-the-revealing-module-pattern-property-won-t-update-and-how-to-fix-it",
    source: "Hashnode",
  },
];

export const explainerItems: PortfolioItem[] = [
  {
    title: "Blockchain State Simplified",
    description: "An Excalidraw breakdown of the current snapshot of accounts, balances, contract storage, and network data.",
    href: "https://x.com/0xDezman/status/2075505322450399654?s=20",
    source: "X · Excalidraw",
  },
  {
    title: "AI Tokens Video Explainer",
    description: "A short video explainer on AI tokens and how models use them to process text.",
    href: "https://x.com/0xDezman/status/2085081363410202639?s=20",
    source: "X · Video",
  },
];

export const explainerPlaylistNote: ExplainerPlaylistNote = {
  text: "I also publish video explainers on AI and blockchain fundamentals on YouTube:",
  playlists: [
    {
      label: "AI fundamentals",
      href: "https://youtube.com/playlist?list=PLBrXj7vjmXss&si=4vLMGWKEl5Hfsddl",
    },
    {
      label: "Blockchain fundamentals",
      href: "https://youtube.com/playlist?list=PLXTXM9gvoaaI&si=G1pfMZGY6dVjHSRw",
    },
  ],
};

export const developerToolItems: PortfolioItem[] = [
  // Unlisted: GitHub README Generator card pulled until its issues are fixed. Restore this block to re-list it.
  // {
  //   title: "GitHub README Generator",
  //   description: "A developer tool for generating structured GitHub documentation from repository details.",
  //   href: "https://github-docs-generator.vercel.app/",
  //   source: "Live demo",
  //   caseStudySlug: "github-readme-generator",
  // },
  {
    title: "botchain skills and MCP",
    description: "A toolkit for building BOT Chain skills and Model Context Protocol integrations.",
    href: "https://github.com/manueldezman/botchain-init-toolkit/tree/main",
    source: "GitHub",
    caseStudySlug: "botchain-skills-and-mcp",
  },
];

export const apiDocumentationItems: PortfolioItem[] = [
  {
    title: "Agent ready API documentation",
    description:
      "OpenAPI 3.1 and Mintlify documentation for the EmPay HRMS product, scored 99/100 on the AFDocs agent-friendly docs check.",
    href: "https://empay-sample.mintlify.site/product-overview",
    source: "Mintlify",
    readiness: {
      image: {
        alt: "Terminal output of an AFDocs agent-friendly docs scorecard showing an overall score of 99 out of 100 for empay-sample.mintlify.app",
        caption: "AFDocs agent-friendly docs scorecard: 99/100 for the EmPay HRMS documentation, September 2026.",
        image: apiDocsScorecardImage,
      },
      command: "npx afdocs check https://empay-sample.mintlify.app/ --format scorecard",
      tools: [
        { name: "Redocly", role: "API spec contract validation" },
        { name: "Mintlify", role: "Publishing" },
        { name: "GitHub", role: "Version control" },
        { name: "AFDocs", role: "AI readiness evaluation" },
        { name: "Codex", role: "AI coding assistance" },
      ],
      practices: [
        "Enabled Markdown output for every page so agents read clean Markdown instead of scraped HTML.",
        "Kept llms.txt valid — existence, size, link coverage, and links that point at Markdown, in both HTML and Markdown directive variants.",
        "Verified Markdown URL support and `Accept: text/markdown` content negotiation.",
        "Held page size and content-start position in check; raw `/openapi.json` and `/openapi.yaml` stay published because agents need them.",
        "Made tabbed content serialize correctly for agents.",
        "Checked URL stability — redirect behavior and HTTP status codes.",
        "Kept the documentation readable without a login wall.",
        "Applied cache-header hygiene so agents and proxies get consistent responses.",
        "Served the OpenAPI spec from the configured source with valid code fences and an interactive reference.",
        "Verified Markdown and HTML content parity so agents do not see different content.",
        "Ran readiness checks as a repeatable gate instead of a one-off audit.",
      ],
    },
  },
];

export const openSourceRepositories: OpenSourceRepository[] = [
  {
    repository: "TheOdinProject/curriculum",
    organization: "Odin Project",
    heading: "Update the form validation lesson to reflect the modern :user-valid and :user-invalid pseudo-classes.",
    prLinks: [
      {
        label: "PR #30815",
        href: "https://github.com/TheOdinProject/curriculum/pull/30815",
        status: "Merged · February 17, 2026",
      },
      {
        label: "PR #30994",
        href: "https://github.com/TheOdinProject/curriculum/pull/30994",
        status: "Merged · April 16, 2026",
      },
      {
        label: "PR #30905",
        href: "https://github.com/TheOdinProject/curriculum/pull/30905",
        status: "Merged · March 12, 2026",
      },
    ],
    contributions: [
      {
        title: "Update the form validation lesson to reflect the modern :user-valid and :user-invalid pseudo-classes.",
        problem:
          "While completing The Odin Project's Sign-up Form project immediately after its form validation lesson, I noticed validation styles appearing before I interacted with the form. Required fields matched `:invalid` on page load because HTML5 treats empty required fields as invalid, while fields such as email and password could match `:valid` before the user had provided meaningful input.",
        contribution:
          "I researched the behavior and updated the lesson to replace `:valid` and `:invalid` with `:user-valid` and `:user-invalid`. These pseudo-classes apply validation styles only after meaningful interaction, such as changing the value, blurring the field, or attempting to submit the form.",
        impact:
          "The update resolved a confusing form-validation developer UX issue in a 13k-star open-source platform and improved the learning experience for over 1.8 million global learners.",
        links: [
          {
            label: "Issue #30786",
            href: "https://github.com/TheOdinProject/curriculum/issues/30786",
            status: "Closed · February 17, 2026",
          },
          {
            label: "PR #30815",
            href: "https://github.com/TheOdinProject/curriculum/pull/30815",
            status: "Merged · February 17, 2026",
          },
        ],
      },
    ],
  },
  {
    repository: "0xIntuition/intuition-docs",
    organization: "Intuition",
    heading: "Audit the developer documentation against the live product and fix the inconsistencies.",
    prLinks: [
      {
        label: "PR #90",
        href: "https://github.com/0xIntuition/intuition-docs/pull/90",
        status: "Merged · fixed invalid npm installation command",
      },
      {
        label: "PR #91",
        href: "https://github.com/0xIntuition/intuition-docs/pull/91",
        status: "Merged · fixed broken/self-referential Browser Extension links",
      },
      {
        label: "PR #92",
        href: "https://github.com/0xIntuition/intuition-docs/pull/92",
        status: "Merged · corrected 19 outdated ETH references across 7 pages to TRUST",
      },
    ],
    contributions: [
      {
        title: "Audit the developer documentation against the live product and fix the inconsistencies.",
        problem:
          "While building on Intuition with AI coding agents, I noticed the agents kept citing ETH instead of TRUST. The protocol migrated in August 2025 from the Base-based `EthMultiVault`, where deposits were denominated in ETH, to the current Intuition Network `MultiVault`, where payable deposits use the network's native TRUST currency. Several current and general documentation pages still used terminology from the earlier deployment.",
        contribution:
          "I corrected the staking and deposit documentation to identify TRUST—not ETH—as the native currency used by the current Intuition Network and `MultiVault` deployment.",
        impact:
          "The updated documentation now matches the current protocol, improving agent readiness and the developer experience for anyone building on Intuition.",
        links: [
          {
            label: "PR #92",
            href: "https://github.com/0xIntuition/intuition-docs/pull/92",
            status: "Merged · corrected 19 outdated ETH references across 7 pages to TRUST",
          },
        ],
      },
    ],
  },
  {
    repository: "rushikesh-bobade/empay-hrms",
    organization: "EmPay HRMS",
    heading: "Added an OpenAPI 3.1 specification for the REST API endpoints (49 total endpoints).",
    prLinks: [
      {
        label: "PR #145",
        href: "https://github.com/rushikesh-bobade/empay-hrms/pull/145",
        status: "Merged · positive maintainer feedback",
      },
    ],
    contributions: [
      {
        title: "Added an OpenAPI 3.1 specification for the REST API endpoints (49 total endpoints).",
        problem:
          "After finishing Hackmamba's eight-week API documentation learning sprint, I wanted to contribute to an open-source project that needed API documentation. I found EmPay, an HRMS platform with 49 endpoints documented in `API.md` but no OpenAPI specification.",
        contribution:
          "I generated the OpenAPI 3.1 `openapi.yaml` contract with my coding agent, validated it with Redocly CLI to ensure the agent's structural choices did not violate API conventions, and then converted the validated YAML structure into the final `API.md` document.",
        impact:
          "The contribution produced a validated OpenAPI contract and clearer API documentation for EmPay's 49 endpoints. PR #145 was merged and received positive feedback from the maintainer.",
        links: [
          {
            label: "PR #145",
            href: "https://github.com/rushikesh-bobade/empay-hrms/pull/145",
            status: "Merged · positive maintainer feedback",
          },
        ],
      },
    ],
  },
];

const educationWorkshopsActivity: CommunityActivity = {
  title: "Education & Workshops",
  label: "Past",
  detail:
    "Co-founded Kodespot with friends as an undergraduate community where we tutored fellow students in DeFi, smart contract development, and software development. It ran for two cohorts until we graduated.",
  fields: [
    { label: "Audience", value: "Student developers and beginner Web2/Web3 builders." },
    { label: "Outcome", value: "Tutored 20+ students on DeFi and smart contract development." },
  ],
  images: [
    {
      alt: "Kodespot Learning Hub Cohort 2.0 announcement post",
      caption: "Kodespot Learning Hub Cohort 2.0 announcement, August 2024.",
      image: cohortAnnouncementImage,
      link: {
        label: "View the announcement on X",
        href: "https://x.com/kodespot/status/1825473801808679369",
      },
    },
    {
      alt: "Student thread sharing a smart contract built during Cohort 2.0",
      caption: "Cohort 2.0 student thread sharing the contract he built, November 2024.",
      image: cohortStudentThreadImage,
      link: {
        label: "View the student thread on X",
        href: "https://x.com/Keshdev3/status/1854174582892089775",
      },
    },
  ],
};

const speakingActivity: CommunityActivity = {
  title: "Speaking & Thought Leadership",
  label: "Open to opportunities",
  detail: "I'm open to talks, AMAs, panels, and recorded sessions.",
  fields: [],
};

export const communityEvent: CommunityEvent = {
  title: "Developer Events — Techie Soiree",
  label: "Kodespot × AngelHack",
  fields: [
    { label: "Role", value: "Co-organizer" },
    { label: "Date", value: "July 2024" },
    { label: "Audience", value: "Developers entering Web3 — a mix of beginners and more experienced builders." },
    {
      label: "Taught / Goal",
      value: "Onboarded new developers into the Web3 ecosystem through community-led education and event support.",
    },
    { label: "Outcome", value: "200+ individuals in attendance" },
    {
      label: "What happened after",
      value: "Attendee feedback described the event as an amazing experience and praised the team for the execution.",
    },
  ],
  proofLinks: [
    { label: "View Kodespot proof", href: "https://x.com/kodespot/status/1809987698209206438?s=20" },
    { label: "View feedback posts", href: "https://x.com/kodespot/status/1809991403457404983?s=20" },
  ],
  images: [
    {
      alt: "Developers seated at Techie Soiree",
      caption: "Techie Soiree audience proof: developers gathered for a Web3 onboarding session.",
      image: eventRoomImage,
      lead: true,
    },
    {
      alt: "Abdulganiy at Techie Soiree",
      caption: "On-site coordination during Techie Soiree.",
      image: eventOnsiteImage,
    },
    {
      alt: "Abdulganiy with a speaker at Techie Soiree",
      caption: "Speaker and community proof from the Techie Soiree environment.",
      image: eventSpeakerImage,
    },
    {
      alt: "Kodespot and AngelHack team photo at Techie Soiree",
      caption: "Kodespot × AngelHack community presence and event coordination proof.",
      image: eventTeamImage,
    },
  ],
  feedback: {
    title: "The event created visible attendee enthusiasm.",
    image: {
      alt: "Attendee feedback after Techie Soiree",
      caption: "Screenshot of attendee feedback after Techie Soiree.",
      image: eventFeedbackImage,
    },
  },
};

export const developerCommunityEntries: DeveloperCommunityEntry[] = [
  { kind: "activity", activity: educationWorkshopsActivity },
  { kind: "event", event: communityEvent },
  { kind: "activity", activity: speakingActivity },
];

// Unlisted: GitHub README Generator case study pulled until its issues are fixed.
// Restore this block (and the matching developerToolItems card) to re-list it.
//
//   {
//     slug: "github-readme-generator",
//     title: "GitHub README Generator",
//     summary:
//       "An AI-powered README generator that turns a GitHub repository URL into a ready-to-edit, code-grounded documentation draft.",
//     links: [
//       { label: "Live demo", href: "https://github-docs-generator.vercel.app/" },
//       { label: "GitHub", href: "https://github.com/manueldezman/github-docs-generator" },
//     ],
//     sections: [
//       {
//         id: "problem",
//         label: "Problem",
//         body: "A developer friend spent months building his project, then struggled with the README. He said writing the documentation felt harder than building the project itself. I recognized the problem because I also often got stuck starting a README from a blank page after the code was already done.",
//       },
//       {
//         id: "approach",
//         label: "My solution",
//         body: "I asked him how he normally structures his README, then built an AI-powered README generator for us. It takes a GitHub repository URL and generates documentation that describes the project, its features, its repository structure, and setup guide.",
//       },
//       {
//         id: "outcome",
//         label: "Outcome",
//         body: "The GitHub Docs Generator now turns a GitHub repository URL into ready-to-copy README content. Instead of starting from a blank page after building a project, we get a code-grounded first draft and can edit it to taste. Because AI credits are costly, the tool is currently for me and my friend rather than a fully public service.",
//       },
//     ],
//   },

export const portfolioCaseStudies: PortfolioCaseStudy[] = [
  {
    slug: "botchain-skills-and-mcp",
    title: "botchain skills and MCP",
    summary:
      "A single-command BOT Chain agent toolkit that combines a reusable skill with MCP tool calling for AI-assisted on-chain development.",
    links: [
      { label: "Documentation", href: "https://manueldezman.github.io/botchain-init-toolkit/#install" },
      { label: "GitHub", href: "https://github.com/manueldezman/botchain-init-toolkit/tree/main" },
    ],
    demoVideo: {
      youtubeId: "BXJV3aDqKaQ",
      title: "Demo of the botchain skills and MCP toolkit",
    },
    sections: [
      {
        id: "problem",
        label: "Problem",
        body: "I wanted to build on BOT Chain for a hackathon using my coding agent. The available AI agent resources were limited to a prompt, which was not enough for my workflow because the project involved tool calling and reliable on-chain actions.",
      },
      {
        id: "approach",
        label: "My solution",
        body: "I built a BOT Chain agent skill and MCP server for the workflow. The skill packages BOT Chain engineering context, while the MCP gives the agent executable tools, so it can act instead of only following prompt instructions.",
      },
      {
        id: "outcome",
        label: "Outcome",
        body: "The result is a single-command toolkit that turns Claude Code, Codex, Cursor, and Windsurf into specialized BOT Chain engineering agents. It supports scaffold, compile, deploy, and verify workflows without leaving the prompt.",
      },
    ],
  },
];
