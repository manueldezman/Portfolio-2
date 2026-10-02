# Portfolio

Selected technical writing, developer tooling, API documentation, open-source, and developer-community work by Abdulganiy Adeleke. Entries with interactive details on the HTML page have those details included immediately below the matching entry here.

## API documentation

### Agent ready API documentation

OpenAPI 3.1 and Mintlify documentation for the EmPay HRMS product, scored 99/100 on the AFDocs agent-friendly docs check.

- Source: Mintlify
- [Read the documentation](https://empay-sample.mintlify.site/product-overview)

#### AI readiness result

AFDocs agent-friendly docs scorecard: 99/100 for the EmPay HRMS documentation, September 2026.

#### Verify it yourself

Run the same check against the published docs to reproduce the score:

```sh
npx afdocs check https://empay-sample.mintlify.app/ --format scorecard
```

#### Tools used

- Redocly: API spec contract validation
- Mintlify: Publishing
- GitHub: Version control
- AFDocs: AI readiness evaluation
- Codex: AI coding assistance

#### What made it agent-ready

- Enabled Markdown output for every page so agents read clean Markdown instead of scraped HTML.
- Kept `llms.txt` valid: existence, size, link coverage, and links that point at Markdown, in both HTML and Markdown directive variants.
- Verified Markdown URL support and `Accept: text/markdown` content negotiation.
- Held page size and content-start position in check; raw `/openapi.json` and `/openapi.yaml` stay published because agents need them.
- Made tabbed content serialize correctly for agents.
- Checked URL stability, redirect behavior, and HTTP status codes.
- Kept the documentation readable without a login wall.
- Applied cache-header hygiene so agents and proxies get consistent responses.
- Served the OpenAPI spec from the configured source with valid code fences and an interactive reference.
- Verified Markdown and HTML content parity so agents do not see different content.
- Ran readiness checks as a repeatable gate instead of a one-off audit.

### Hookline docs: a documentation pipeline

A docs-as-code pipeline on Docusaurus: Vale, codespell, front matter, and link checks in CI, plus Markdown twins and `llms.txt` for AI agents.

- Source: Docusaurus · GitHub
- [GitHub project](https://github.com/manueldezman/hookline-docs#hookline-docs-a-documentation-pipeline)

## AI agent and developer tools

### botchain skills and MCP

A toolkit for building BOT Chain skills and Model Context Protocol integrations.

- Source: GitHub
- [Documentation](https://manueldezman.github.io/botchain-init-toolkit/#install)
- [GitHub repository](https://github.com/manueldezman/botchain-init-toolkit/tree/main)
- [Full case study in Markdown](https://abdulganiy.dev/portfolio/botchain-skills-and-mcp.md)

#### Problem

I wanted to build on BOT Chain for a hackathon using my coding agent. The available AI agent resources were limited to a prompt, which was not enough for my workflow because the project involved tool calling and reliable on-chain actions.

#### My solution

I built a BOT Chain agent skill and MCP server for the workflow. The skill packages BOT Chain engineering context, while the MCP gives the agent executable tools, so it can act instead of only following prompt instructions.

#### Outcome

The result is a single-command toolkit that turns Claude Code, Codex, Cursor, and Windsurf into specialized BOT Chain engineering agents. It supports scaffold, compile, deploy, and verify workflows without leaving the prompt.

## Tutorials

### How to make technical documentation AI-ready: prevent information loss in Markdown

Covers Markdown practices that make developer documentation easier for AI systems to consume.

- Source: Hackmamba
- [Read the article](https://hackmamba.io/technical-documentation/how-to-make-technical-documentation-ai-ready-with-markdown/)

#### Why I wrote it

I noticed tab components kept vanishing in the AI-facing Markdown representations of three documentation sites I examined, which impacted the correctness of the answers the agents gave me. I traced the root cause in each case and found they arose from decisions made during the conversion process, so I wrote this article to help documentation teams avoid those issues.

#### Who it’s for

Documentation engineers and teams.

#### How it got published

1. Draft
2. Hackmamba editor review
3. Revisions
4. Hackmamba growth marketer’s review
5. Revisions
6. Publish

The article went through Hackmamba’s editorial review before publication: an assigned Hackmamba editor reviewed the draft and recommended changes, I revised accordingly, then the growth marketer reviewed the revised draft and I applied a final round of changes before it was published on September 10, 2026.

### How to Fix CORS Errors in Your Frontend App Using a Proxy Server

Guides developers through diagnosing failed browser requests and fixing them with a proxy server.

- Source: Hashnode
- [Read the article](https://0xdezman.hashnode.dev/how-to-fix-cors-errors-in-your-frontend-app-using-a-proxy-server)

### How to Fix Form Validation UX: Switching from :invalid to :user-invalid

Teaches a modern CSS approach for avoiding premature validation messages.

- Source: Hashnode
- [Read the article](https://0xdezman.hashnode.dev/how-to-fix-form-validation-ux-switching-from-invalid-to-user-invalid)

### Why the Revealing Module Pattern property won't update (and how to fix it)

Walks through a JavaScript closure and IIFE pitfall that causes stale returned properties.

- Source: Hashnode
- [Read the article](https://0xdezman.hashnode.dev/why-the-revealing-module-pattern-property-won-t-update-and-how-to-fix-it)

## Explainers

### Blockchain State Simplified

An Excalidraw breakdown of the current snapshot of accounts, balances, contract storage, and network data.

- Source: X · Excalidraw
- [View on X](https://x.com/0xDezman/status/2075505322450399654?s=20)

### AI Tokens Video Explainer

A short video explainer on AI tokens and how models use them to process text.

- Source: X · Video
- [View on X](https://x.com/0xDezman/status/2085081363410202639?s=20)

Video explainers on AI and blockchain fundamentals:

- [AI fundamentals playlist](https://youtube.com/playlist?list=PLBrXj7vjmXss&si=4vLMGWKEl5Hfsddl)
- [Blockchain fundamentals playlist](https://youtube.com/playlist?list=PLXTXM9gvoaaI&si=G1pfMZGY6dVjHSRw)

## Open-source contributions

### The Odin Project curriculum

**Contribution:** Update the form validation lesson to reflect the modern `:user-valid` and `:user-invalid` pseudo-classes.

- [PR #30815](https://github.com/TheOdinProject/curriculum/pull/30815) — Merged · February 17, 2026
- [PR #30994](https://github.com/TheOdinProject/curriculum/pull/30994) — Merged · April 16, 2026
- [PR #30905](https://github.com/TheOdinProject/curriculum/pull/30905) — Merged · March 12, 2026

#### Problem

While completing The Odin Project’s Sign-up Form project immediately after its form validation lesson, I noticed validation styles appearing before I interacted with the form. Required fields matched `:invalid` on page load because HTML5 treats empty required fields as invalid, while fields such as email and password could match `:valid` before the user had provided meaningful input.

#### Contribution

I researched the behavior and updated the lesson to replace `:valid` and `:invalid` with `:user-valid` and `:user-invalid`. These pseudo-classes apply validation styles only after meaningful interaction, such as changing the value, blurring the field, or attempting to submit the form.

#### Impact

The update resolved a confusing form-validation developer UX issue in a 13k-star open-source platform and improved the learning experience for over 1.8 million global learners.

#### Links for this contribution

- [Issue #30786](https://github.com/TheOdinProject/curriculum/issues/30786) — Closed · February 17, 2026
- [PR #30815](https://github.com/TheOdinProject/curriculum/pull/30815) — Merged · February 17, 2026

### Intuition developer documentation

**Contribution:** Audit the developer documentation against the live product and fix the inconsistencies.

- [PR #90](https://github.com/0xIntuition/intuition-docs/pull/90) — Merged · fixed invalid npm installation command
- [PR #91](https://github.com/0xIntuition/intuition-docs/pull/91) — Merged · fixed broken/self-referential Browser Extension links
- [PR #92](https://github.com/0xIntuition/intuition-docs/pull/92) — Merged · corrected 19 outdated ETH references across 7 pages to TRUST

#### Problem

While building on Intuition with AI coding agents, I noticed the agents kept citing ETH instead of TRUST. The protocol migrated in August 2025 from the Base-based `EthMultiVault`, where deposits were denominated in ETH, to the current Intuition Network `MultiVault`, where payable deposits use the network’s native TRUST currency. Several current and general documentation pages still used terminology from the earlier deployment.

#### Contribution

I corrected the staking and deposit documentation to identify TRUST—not ETH—as the native currency used by the current Intuition Network and `MultiVault` deployment.

#### Impact

The updated documentation now matches the current protocol, improving agent readiness and the developer experience for anyone building on Intuition.

#### Links for this contribution

- [PR #92](https://github.com/0xIntuition/intuition-docs/pull/92) — Merged · corrected 19 outdated ETH references across 7 pages to TRUST
- [PR #90](https://github.com/0xIntuition/intuition-docs/pull/90) — Merged · fixed invalid npm installation command
- [PR #91](https://github.com/0xIntuition/intuition-docs/pull/91) — Merged · fixed broken/self-referential Browser Extension links

### EmPay HRMS

**Contribution:** Added an OpenAPI 3.1 specification for the REST API endpoints (49 total endpoints).

- [PR #145](https://github.com/rushikesh-bobade/empay-hrms/pull/145) — Merged · positive maintainer feedback

#### Problem

After finishing Hackmamba’s eight-week API documentation learning sprint, I wanted to contribute to an open-source project that needed API documentation. I found EmPay, an HRMS platform with 49 endpoints documented in `API.md` but no OpenAPI specification.

#### Contribution

I generated the OpenAPI 3.1 `openapi.yaml` contract with my coding agent, validated it with Redocly CLI to ensure the agent’s structural choices did not violate API conventions, and then converted the validated YAML structure into the final `API.md` document.

#### Impact

The contribution produced a validated OpenAPI contract and clearer API documentation for EmPay’s 49 endpoints. PR #145 was merged and received positive feedback from the maintainer.

#### Links for this contribution

- [PR #145](https://github.com/rushikesh-bobade/empay-hrms/pull/145) — Merged · positive maintainer feedback

## Developer community

### Education & Workshops

**Status:** Past

Co-founded Kodespot with friends as an undergraduate community where we tutored fellow students in DeFi, smart contract development, and software development. It ran for two cohorts until we graduated.

- **Audience:** Student developers and beginner Web2/Web3 builders.
- **Outcome:** Tutored 20+ students on DeFi and smart contract development.
- **Proof:** [Kodespot Learning Hub Cohort 2.0 announcement](https://x.com/kodespot/status/1825473801808679369), August 2024.
- **Proof:** [Student thread sharing a smart contract built during Cohort 2.0](https://x.com/Keshdev3/status/1854174582892089775), November 2024.

### Developer Events — Techie Soiree

**Organizer:** Kodespot × AngelHack

- **Role:** Co-organizer
- **Date:** July 2024
- **Audience:** Developers entering Web3 — a mix of beginners and more experienced builders.
- **Taught / Goal:** Onboarded new developers into the Web3 ecosystem through community-led education and event support.
- **Outcome:** 200+ individuals in attendance.
- **What happened after:** Attendee feedback described the event as an amazing experience and praised the team for the execution.
- [View Kodespot proof](https://x.com/kodespot/status/1809987698209206438?s=20)
- [View feedback posts](https://x.com/kodespot/status/1809991403457404983?s=20)

#### Event proof

- Developers seated at Techie Soiree: audience gathered for a Web3 onboarding session.
- Abdulganiy at Techie Soiree: on-site coordination.
- Speaker and community proof from the Techie Soiree environment.
- Kodespot × AngelHack community presence and event coordination.

#### Attendee feedback

The event created visible attendee enthusiasm.

### Speaking & Thought Leadership

**Status:** Open to opportunities

I’m open to talks, AMAs, panels, and recorded sessions.

## Contact

Looking to hire? [Email me](mailto:adelekeabdulganiy@gmail.com) or reach me on [LinkedIn](https://www.linkedin.com/in/abdulganiyadeleke).
