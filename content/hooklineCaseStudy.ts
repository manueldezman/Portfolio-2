import type { StaticImageData } from "next/image";
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
  image: StaticImageData;
};

export type HooklinePillar = {
  body: string;
  compare?: {
    after: HooklineSlide;
    before: HooklineSlide;
  };
  diagram: HooklineDiagram;
  id: string;
  index: string;
  media: HooklineSlide[];
  notes?: string[];
  proof: { href: string; label: string };
  title: string;
  wide?: boolean;
};

export type HooklineTool = {
  blocks: string;
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
  title: "Automated Docs-as-Code & AI Documentation Pipeline",
  summary:
    "An end-to-end engineering workflow connecting product code changes to validated, auto-deployed Docusaurus documentation.",
  index: "2026",
  eyebrow: "Case study · Docs as code",
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
          "The product repo, the docs repo, the GitHub Actions jobs, the OpenCode agent, and the two hosts.",
        image: systemArchitectureImage,
      },
      {
        alt: "Event path diagram with three phases, from a product pull request through the merge to main and the docs pull request, including the failure path.",
        caption:
          "End-to-end event flow from product code merge to automated AI drafting, CI quality gates, and production deployment.",
        image: eventPathImage,
      },
    ] satisfies HooklineFigure[],
  },
  tools: [
    { name: "Docusaurus", role: "Site build, internal links, content model", blocks: "Merge and deploy" },
    { name: "Vale", role: "Prose and terminology", blocks: "Merge" },
    { name: "codespell", role: "Spelling", blocks: "Merge" },
    { name: "check-frontmatter.js", role: "Required metadata, 160 characters max", blocks: "Merge" },
    {
      name: "check-docs-code-examples.mjs",
      role: "Runs each curl and CLI example against the product",
      blocks: "Merge",
    },
    { name: "lychee", role: "External links in the built HTML", blocks: "Merge" },
    { name: "Netlify", role: "Pull request previews", blocks: "None" },
    { name: "GitHub Pages", role: "Production site", blocks: "None" },
  ] satisfies HooklineTool[],
  pillars: [
    {
      id: "update-pipeline",
      index: "01",
      title: "Automated Update Pipeline",
      body: "When code merges to the product repo, a GitHub Actions job runs the OpenCode agent. The agent analyzes the git diff, locates the affected Docusaurus files, and opens a draft PR automatically.",
      diagram: {
        alt: "Flow from a product pull request through the impact job and the review to the merge, then the draft job and the OpenCode agent opening a docs pull request.",
        image: flowProductPrImage,
      },
      media: [
        {
          alt: "GitHub Actions run of the Docs impact workflow showing the impact and draft jobs, six affected documentation pages, and a link to the drafted pull request.",
          caption: "One change to `src/config.js` affects six pages. The draft job then opens the pull request.",
          image: draftRunImage,
          label: "Impact and draft jobs",
        },
        {
          alt: "Pull request 17 in the docs repo, titled docs update pages for product PR 2, showing nine checks and a list of the updated pages.",
          caption: "The drafted pull request lists each page it changed and why.",
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
      body: "The site has four areas. Each one answers a different question, and each has a fixed place for the agent to write.",
      notes: [
        "Audience first. The overview names four readers, from backend developers to security teams.",
        "Three levels deep. Reference > Events > Create an event is the deepest path. Getting started and Guides stop at two.",
        "Navigation follows the job. Sending an event sits in the Quickstart, signature checks sit in Guides, and the endpoint sits in Reference.",
      ],
      wide: true,
      diagram: {
        alt: "Documentation hierarchy with Overview branching into Getting started, API reference, Guides and SDK, and the generated Reference group shaded.",
        image: docsIaImage,
      },
      media: [
        {
          alt: "Hookline docs overview page with top navigation for Getting started, Guides, API reference and SDK.",
          caption: "What Hookline does and who it is for.",
          image: pageOverviewImage,
          label: "Product overview",
        },
        {
          alt: "Getting started page in the Hookline docs with the sidebar open.",
          caption: "Install the CLI, then send a first event.",
          image: pageGettingStartedImage,
          label: "Getting started",
        },
        {
          alt: "Guides page in the Hookline docs listing the four task guides.",
          caption: "Four tasks, from verifying signatures to migrating from v1.",
          image: pageGuidesImage,
          label: "Guides",
        },
        {
          alt: "API reference page in the Hookline docs showing the generated endpoint pages.",
          caption: "Generated endpoint pages under Reference.",
          image: pageReferenceImage,
          label: "API reference",
        },
        {
          alt: "SDK page in the Hookline docs with the Node.js and Python SDK sections.",
          caption: "The Node.js and Python SDK pages.",
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
        image: flowCodeExamplesImage,
      },
      media: [
        {
          alt: "Pull request 16 in the docs repo, titled Test broken curl example, with the code examples check failing.",
          caption: "The test pull request changes one example on purpose.",
          image: codePrImage,
          label: "Test pull request",
        },
        {
          alt: "Code examples job log showing a 404 response where quick-start.md expected a 202.",
          caption: "The run stops on `docs/getting-started/quick-start.md`. Expected 202, got 404.",
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
      body: "A test pull request breaks four rules on purpose, so front matter, prose, spelling, and link checks fail. Build and code examples pass.",
      diagram: {
        alt: "Flow from a docs pull request through the prose, spelling, front matter, build, code examples and lychee checks to an unblocked merge.",
        image: flowGatesImage,
      },
      media: [
        {
          alt: "Pull request 2 checks panel showing four required checks failing.",
          caption: "The merge button stays locked until every required check passes.",
          image: gatesOverviewImage,
          label: "Required checks",
        },
        {
          alt: "Front matter check log reporting a missing description in docs/index.md.",
          caption: "`docs/index.md` has no description.",
          image: gatesFrontmatterImage,
          label: "Front matter",
        },
        {
          alt: "Vale log reporting web hook instead of webhook.",
          caption: "Vale wants `webhook`, not `web hook`.",
          image: gatesProseImage,
          label: "Prose",
        },
        {
          alt: "codespell log reporting a misspelling on line 14.",
          caption: "codespell flags one word on line 14.",
          image: gatesSpellingImage,
          label: "Spelling",
        },
        {
          alt: "lychee log reporting a dead external link.",
          caption: "lychee finds a 404 on an external URL.",
          image: gatesLinksImage,
          label: "Links",
        },
      ],
      proof: { href: qualityGatePr, label: "Inspect Blocked Quality-Gate PR" },
    },
    {
      id: "preview-environments",
      index: "05",
      title: "Ephemeral Preview Environments",
      body: "Netlify builds every pull request and posts the preview link as a comment. Production stays on GitHub Pages.",
      diagram: {
        alt: "Flow from a docs pull request to a Netlify build, a live deploy preview, a maintainer review, and a merge that deploys the site.",
        image: flowPreviewImage,
      },
      media: [
        {
          alt: "Netlify comment on pull request 2 with a deploy preview link.",
          caption: "Netlify posts a deploy preview link.",
          image: previewCommentImage,
          label: "Preview comment",
        },
        {
          alt: "The Hookline docs overview page served on the Netlify deploy preview domain.",
          caption: "The rendered site on the preview domain.",
          image: previewSiteImage,
          label: "Live preview",
        },
      ],
      proof: { href: qualityGatePr, label: "Inspect Live Preview PR" },
    },
  ] satisfies HooklinePillar[],
  agentFiles: {
    lead: "Every page also ships as Markdown. The build fails if a twin goes missing.",
    rows: [
      {
        output: "Markdown twin of every page",
        url: "Add `.md` to any page URL",
        purpose: "The page as Markdown, with components resolved",
      },
      { output: "`llms.txt`", url: "`/llms.txt`", purpose: "Every page with its description" },
      { output: "`llms-full.txt`", url: "`/llms-full.txt`", purpose: "Every page in one file" },
      {
        output: "`sitemap.xml` and `robots.txt`",
        url: "`/sitemap.xml`, `/robots.txt`",
        purpose: "Crawler discovery",
      },
    ],
  },
  proofOfWork: [
    {
      title: "Automated AI Drafting",
      description: "OpenCode drafts docs from a product code diff.",
      href: draftingPr,
    },
    {
      title: "Code Example Gate",
      description: "A pull request blocked by an example that does not run.",
      href: codeExamplePr,
    },
    {
      title: "Editorial and Link Gates",
      description: "Four required gates stop a deliberately broken pull request.",
      href: qualityGatePr,
    },
    {
      title: "Staging Preview",
      description: "Netlify posts a preview on a pull request.",
      href: qualityGatePr,
    },
  ],
};
