import type { StaticImageData } from "next/image";
import agentFacingMarkdown from "@/images/portfolio/hookline/agent-facing-markdown.png";
import codeJobImage from "@/images/portfolio/hookline/code-job.webp";
import codePrImage from "@/images/portfolio/hookline/code-pr.webp";
import docsDiffImage from "@/images/portfolio/hookline/docs-diff.webp";
import docsIaImage from "@/images/portfolio/hookline/docs-ia.png";
import draftPrImage from "@/images/portfolio/hookline/draft-pr.webp";
import draftRunImage from "@/images/portfolio/hookline/draft-run.webp";
import eventPathImage from "@/images/portfolio/hookline/event-path.png";
import flowCodeExamplesImage from "@/images/portfolio/hookline/flow-code-examples.png";
import flowGatesImage from "@/images/portfolio/hookline/flow-gates.png";
import flowPreviewImage from "@/images/portfolio/hookline/flow-preview.png";
import flowProductPrImage from "@/images/portfolio/hookline/flow-product-pr.png";
import gatesFrontmatterImage from "@/images/portfolio/hookline/gates-frontmatter.webp";
import gatesLinksImage from "@/images/portfolio/hookline/gates-links.webp";
import gatesOverviewImage from "@/images/portfolio/hookline/gates-overview.webp";
import gatesProseImage from "@/images/portfolio/hookline/gates-prose.webp";
import gatesSpellingImage from "@/images/portfolio/hookline/gates-spelling.webp";
import pageGettingStartedImage from "@/images/portfolio/hookline/page-getting-started.webp";
import pageGuidesImage from "@/images/portfolio/hookline/page-guides.webp";
import pageOverviewImage from "@/images/portfolio/hookline/page-overview.webp";
import pageReferenceImage from "@/images/portfolio/hookline/page-reference.webp";
import pageSdkImage from "@/images/portfolio/hookline/page-sdk.webp";
import previewCommentImage from "@/images/portfolio/hookline/preview-comment.webp";
import previewSiteImage from "@/images/portfolio/hookline/preview-site.webp";
import productDiffImage from "@/images/portfolio/hookline/product-diff.webp";
import systemArchitectureImage from "@/images/portfolio/hookline/system-architecture.png";

export type HooklineFigure = {
  alt: string;
  caption: string;
  image: StaticImageData;
};

export type HooklineSlide = {
  alt: string;
  caption: string;
  image: StaticImageData;
  label: string;
};

export type HooklineDiagram = {
  alt: string;
  caption: string;
  image: StaticImageData;
};

export type HooklineGate = {
  catches: string;
  does: string;
  label: string;
  name: string;
};

export type HooklineFile = {
  output: string;
  purpose: string;
  url: string;
};

export type HooklinePillar = {
  body: string;
  compare?: {
    after: HooklineSlide;
    before: HooklineSlide;
  };
  diagram: HooklineDiagram;
  files?: HooklineFile[];
  gates?: HooklineGate[];
  id: string;
  index: string;
  media: HooklineSlide[];
  notes?: string[];
  proof: { href: string; label: string };
  title: string;
};

export type HooklineTool = {
  name: string;
  role: string;
};

const liveDocs = "https://manueldezman.github.io/hookline-docs/";
const productRepo = "https://github.com/manueldezman/hookline";
const docsRepo = "https://github.com/manueldezman/hookline-docs";
const draftingPr = "https://github.com/manueldezman/hookline-docs/pull/17";
const codeExamplePr = "https://github.com/manueldezman/hookline-docs/pull/16";
const qualityGatePr = "https://github.com/manueldezman/hookline-docs/pull/2";

export const hooklineCaseStudy = {
  title: "Self-Updating Docs-as-Code Pipeline",
  summary:
    "How I connected product code changes to automated AI drafting, quality checks, and Docusaurus deployments.",
  index: "2026",
  eyebrow: "Case study · Docs as code",
  intro:
    "This is a working demonstration of an end-to-end documentation quality pipeline. It exists to show, with running code rather than claims, that I can design, implement, and maintain documentation systems that work for both human readers and AI agents.",
  links: [
    { href: liveDocs, label: "View Live Docs" },
    { href: productRepo, label: "Product Repo" },
    { href: docsRepo, label: "Docs Repo" },
  ],
  architecture: {
    figures: [
      {
        alt: "System architecture diagram with the product repo, the docs repo, the GitHub Actions jobs, the OpenCode agent, the Netlify preview and the GitHub Pages production site.",
        caption:
          "High-level system architecture illustrating the product repo, the docs repo, the GitHub Actions jobs, the OpenCode agent, and the two hosts that serve the docs.",
        image: systemArchitectureImage,
      },
      {
        alt: "Event path diagram with three phases, from a product pull request through the merge to main and the docs pull request, including the failure path.",
        caption:
          "Event flow showing a product pull request through the docs pipeline to the deployed site.",
        image: eventPathImage,
      },
    ] satisfies HooklineFigure[],
  },
  tools: [
    {
      name: "GitHub Actions",
      role: "Runs the workflow when a product change merges and on every docs pull request.",
    },
    {
      name: "OpenCode",
      role: "The agent that reads the product diff and drafts the documentation update.",
    },
    { name: "Docusaurus", role: "Builds the site and checks the links between pages." },
    { name: "Vale", role: "Checks wording and product terms." },
    { name: "codespell", role: "Checks spelling." },
    { name: "lychee", role: "Checks external links after the site builds." },
    { name: "Netlify", role: "Builds a preview for every pull request." },
  ] satisfies HooklineTool[],
  pillars: [
    {
      id: "update-pipeline",
      index: "01",
      title: "Automated Update Pipeline",
      body: "When code merges to the product repo, a GitHub Actions job runs the OpenCode agent. The agent reads the git diff and edits only the pages the change makes wrong.",
      diagram: {
        alt: "Flow from a product pull request through the impact job and the review to the merge, then the draft job and the OpenCode agent opening a docs pull request.",
        caption:
          "Event flow showing a product pull request through the impact job and the merge to the drafted docs pull request.",
        image: flowProductPrImage,
      },
      media: [
        {
          alt: "GitHub Actions run of the Docs impact workflow showing the impact and draft jobs, six affected documentation pages, and a link to the drafted pull request.",
          caption:
            "Screenshot showing the impact job flagging six pages that read `src/config.js` and the agent updating the two that the version change touches.",
          image: draftRunImage,
          label: "Impact and draft jobs",
        },
        {
          alt: "Pull request 17 in the docs repo, titled docs update pages for product PR 2, showing nine checks and a list of the updated pages.",
          caption: "Screenshot showing the drafted pull request with each page it changed.",
          image: draftPrImage,
          label: "Docs pull request",
        },
      ],
      compare: {
        before: {
          alt: "Pull request 2 in the product repo changing the current and supported API versions in src/config.js.",
          caption: "Developer merges a feature or API change in the product codebase.",
          image: productDiffImage,
          label: "Before · Product repo",
        },
        after: {
          alt: "Pull request 17 in the docs repo showing a changelog entry added for version 2026-04-01.",
          caption:
            "OpenCode maps the code change to the right Docusaurus file and drafts the documentation update.",
          image: docsDiffImage,
          label: "After · Docs repo",
        },
      },
      proof: { href: draftingPr, label: "Inspect AI-Drafted Docs PR" },
    },
    {
      id: "information-architecture",
      index: "02",
      title: "Information Architecture",
      body: "Here are the architectural decisions I made, I used:",
      notes: [
        "**Audience first framing**: The overview names four readers, from backend developers to security teams. Anyone going through the docs knows if the tool is for them.",
        "**3 max levels of depth**: Reference > Events > Create an event is the deepest path. Getting started and Guides stop at two. This follows the information architecture standards, which ensures information is easily reachable and easily retrieved.",
        "**Navigation organized by user's job**: Sending an event sits in the Quickstart, signature checks sit in Guides, and the endpoint sits in Reference. A reader who wants to send an event finds it in the Quickstart, a reader who wants to verify a signature finds it in Guides, and a reader who wants the exact fields finds them in Reference, so nobody has to guess which section holds the page.",
      ],
      diagram: {
        alt: "Documentation hierarchy with Overview branching into Getting started, API reference, Guides and SDK, and the generated Reference group shaded.",
        caption:
          "Hierarchical taxonomy of the Hookline documentation illustrating the parent-child relationships from broad product categories down to specific task-based topics.",
        image: docsIaImage,
      },
      media: [
        {
          alt: "Hookline docs overview page with top navigation for Getting started, Guides, API reference and SDK.",
          caption: "Screenshot showing the product overview page and who it is for.",
          image: pageOverviewImage,
          label: "Product overview",
        },
        {
          alt: "Getting started page in the Hookline docs with the sidebar open.",
          caption:
            "Screenshot showing the getting started page from installing the CLI to sending a first event.",
          image: pageGettingStartedImage,
          label: "Getting started",
        },
        {
          alt: "Guides page in the Hookline docs listing the four task guides.",
          caption: "Screenshot showing the guides page with its four tasks.",
          image: pageGuidesImage,
          label: "Guides",
        },
        {
          alt: "API reference page in the Hookline docs showing the generated endpoint pages.",
          caption: "Screenshot showing the generated endpoint pages under Reference.",
          image: pageReferenceImage,
          label: "API reference",
        },
        {
          alt: "SDK page in the Hookline docs with the Node.js and Python SDK sections.",
          caption: "Screenshot showing the Node.js and Python SDK pages.",
          image: pageSdkImage,
          label: "SDK",
        },
      ],
      proof: { href: liveDocs, label: "Open the Live Docs" },
    },
    {
      id: "code-examples",
      index: "03",
      title: "Code Example Validation",
      body: "Every curl and CLI example in the Markdown files runs against the product code. An example that returns 404 where the page promises 202 fails the pull request.",
      diagram: {
        alt: "Flow from a docs pull request to the code examples job, which starts the product app, runs the curl and CLI checks, and writes a step summary.",
        caption:
          "Event flow showing a docs pull request through the code examples job to a blocked merge.",
        image: flowCodeExamplesImage,
      },
      media: [
        {
          alt: "Pull request 16 in the docs repo, titled Test broken curl example, with the code examples check failing.",
          caption: "Screenshot showing the test pull request that changes one example on purpose.",
          image: codePrImage,
          label: "Test pull request",
        },
        {
          alt: "Code examples job log showing a 404 response where quick-start.md expected a 202.",
          caption:
            "Screenshot showing the failed code examples job stopped on `docs/getting-started/quick-start.md` with expected 202 and got 404.",
          image: codeJobImage,
          label: "Failed job",
        },
      ],
      proof: { href: codeExamplePr, label: "Inspect Blocked Code-Validation PR" },
    },
    {
      id: "quality-gates",
      index: "04",
      title: "Automated Quality Gates",
      body: "Here are the quality gates:",
      diagram: {
        alt: "Flow from a docs pull request through the prose, spelling, front matter, build, code examples and lychee checks to an unblocked merge.",
        caption: "Event flow showing a docs pull request through the six gates to an unblocked merge.",
        image: flowGatesImage,
      },
      gates: [
        {
          name: "Vale",
          label: "Prose",
          does: "Checks wording against the Vale style rules.",
          catches: "Style breaks and wrong product terms.",
        },
        {
          name: "codespell",
          label: "Spelling",
          does: "Checks spelling in the docs and the README.",
          catches: "Misspellings.",
        },
        {
          name: "Front matter check",
          label: "Front matter",
          does: "Checks the required page fields and the generated reference pages.",
          catches:
            "A missing title or description, a description over 160 characters, and reference pages out of sync with the OpenAPI spec.",
        },
        {
          name: "Docusaurus build",
          label: "Build",
          does: "Builds the site and writes the Markdown twins and agent files.",
          catches:
            "Broken internal links, broken serializers, a missing Markdown twin, a page missing from llms.txt, and leaked MDX.",
        },
        {
          name: "Code examples check",
          label: "Code examples",
          does: "Runs every curl and CLI example against the product.",
          catches: "Examples that do not run or return the wrong status.",
        },
        {
          name: "lychee",
          label: "Links",
          does: "Checks external links in the built HTML.",
          catches: "Dead external links.",
        },
      ],
      media: [
        {
          alt: "Pull request 2 checks panel showing four required checks failing.",
          caption: "Screenshot showing the required checks panel with the merge button locked.",
          image: gatesOverviewImage,
          label: "Required checks",
        },
        {
          alt: "Front matter check log reporting a missing description in docs/index.md.",
          caption:
            "Screenshot showing the front matter check reporting a missing description in `docs/index.md`.",
          image: gatesFrontmatterImage,
          label: "Front matter",
        },
        {
          alt: "Vale log reporting web hook instead of webhook.",
          caption: "Screenshot showing Vale asking for webhook instead of web hook.",
          image: gatesProseImage,
          label: "Prose",
        },
        {
          alt: "codespell log reporting a misspelling on line 14.",
          caption: "Screenshot showing codespell flagging one word on line 14.",
          image: gatesSpellingImage,
          label: "Spelling",
        },
        {
          alt: "lychee log reporting a dead external link.",
          caption: "Screenshot showing lychee finding a 404 on an external URL.",
          image: gatesLinksImage,
          label: "Links",
        },
      ],
      proof: { href: qualityGatePr, label: "Inspect Blocked Quality-Gate PR" },
    },
    {
      id: "preview-environments",
      index: "05",
      title: "PR Preview Links",
      body: "Netlify builds every pull request and posts the preview link as a comment.",
      diagram: {
        alt: "Flow from a docs pull request to a Netlify build, a live deploy preview, a maintainer review, and a merge that deploys the site.",
        caption: "Event flow showing a docs pull request through the Netlify preview to a deployed site.",
        image: flowPreviewImage,
      },
      media: [
        {
          alt: "Netlify comment on pull request 2 with a deploy preview link.",
          caption: "Screenshot showing the Netlify comment with a deploy preview link.",
          image: previewCommentImage,
          label: "Preview comment",
        },
        {
          alt: "The Hookline docs overview page served on the Netlify deploy preview domain.",
          caption: "Screenshot showing the docs site on the Netlify preview domain.",
          image: previewSiteImage,
          label: "Live preview",
        },
      ],
      proof: { href: qualityGatePr, label: "Inspect Live Preview PR" },
    },
    {
      id: "agent-facing",
      index: "06",
      title: "Agent-Facing Documentation",
      body: "AI agents read documentation differently to humans. They prefer Markdown rather than rendered HTML, so I prepared these surfaces to serve them.",
      diagram: {
        alt: "Agent-facing documentation surface",
        caption: "Screenshot of the agent-facing documentation section",
        image: agentFacingMarkdown,
      },
      media: [],
      files: [
        {
          output: "Markdown twin of every page",
          url: "Add `.md` to any page URL",
          purpose: "The page as Markdown, with components resolved",
        },
        {
          output: "`llms.txt`",
          url: "`/llms.txt`",
          purpose: "An index of every page with its description, following the llmstxt.org layout",
        },
        { output: "`llms-full.txt`", url: "`/llms-full.txt`", purpose: "Every page as Markdown in one file" },
        {
          output: "`sitemap.xml` and `robots.txt`",
          url: "`/sitemap.xml`, `/robots.txt`",
          purpose: "Lists every page for crawlers and tells bots which pages to skip",
        },
      ],
      proof: { href: "https://manueldezman.github.io/hookline-docs/llms.txt", label: "View llms.txt" },
    },
  ] satisfies HooklinePillar[],
};
