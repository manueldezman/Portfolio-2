# Automated Docs-as-Code & AI Documentation Pipeline

An end-to-end engineering workflow connecting product code changes to validated, auto-deployed Docusaurus documentation.

- [Live documentation](https://manueldezman.github.io/hookline-docs/)
- [Product repository](https://github.com/manueldezman/hookline)
- [Docs repository](https://github.com/manueldezman/hookline-docs)
- [AI-drafted docs PR](https://github.com/manueldezman/hookline-docs/pull/17)
- [Blocked code validation PR](https://github.com/manueldezman/hookline-docs/pull/16)
- [Blocked quality gate PR](https://github.com/manueldezman/hookline-docs/pull/2)

## System Architecture

The product repo, the docs repo, the GitHub Actions jobs, the OpenCode agent, and the two hosts.

End-to-end event flow from product code merge to automated AI drafting, CI quality gates, and production deployment.

## Tools Used

| Tool | Role | Blocks |
| --- | --- | --- |
| Docusaurus | Site build, internal links, content model | Merge and deploy |
| Vale | Prose and terminology | Merge |
| codespell | Spelling | Merge |
| check-frontmatter.js | Required metadata, 160 characters max | Merge |
| check-docs-code-examples.mjs | Runs each curl and CLI example against the product | Merge |
| lychee | External links in the built HTML | Merge |
| Netlify | Pull request previews | None |
| GitHub Pages | Production site | None |

## 01 Automated Update Pipeline

When code merges to the product repo, a GitHub Actions job runs the OpenCode agent. The agent analyzes the git diff, locates the affected Docusaurus files, and opens a draft PR automatically.

- Before: Developer merges a feature or API change in the product codebase.
- After: OpenCode maps the code change to the right Docusaurus file and drafts the documentation update.
- Proof: [AI-drafted docs PR](https://github.com/manueldezman/hookline-docs/pull/17)

## 02 Information Architecture

The site has four areas. Each one answers a different question, and each has a fixed place for the agent to write.

- Audience first. The overview names four readers, from backend developers to security teams.
- Three levels deep. Reference > Events > Create an event is the deepest path. Getting started and Guides stop at two.
- Navigation follows the job. Sending an event sits in the Quickstart, signature checks sit in Guides, and the endpoint sits in Reference.

Pages shown: Product overview, Getting started, Guides, API reference, and SDK.

- Proof: [Live documentation](https://manueldezman.github.io/hookline-docs/)

## 03 Code Example Validation

Every curl and CLI example in the Markdown files runs against the product code. An example that returns 404 where the page promises 202 fails the pull request.

- Proof: [Blocked code validation PR](https://github.com/manueldezman/hookline-docs/pull/16)

## 04 Automated Quality Gates

A test pull request breaks four rules on purpose, so front matter, prose, spelling, and link checks fail. Build and code examples pass.

- Proof: [Blocked quality gate PR](https://github.com/manueldezman/hookline-docs/pull/2)

## 05 Ephemeral Preview Environments

Netlify builds every pull request and posts the preview link as a comment. Production stays on GitHub Pages.

- Proof: [Live preview PR](https://github.com/manueldezman/hookline-docs/pull/2)

## Agent-Facing Documentation

Every page also ships as Markdown. The build fails if a twin goes missing.

| Output | URL | Purpose |
| --- | --- | --- |
| Markdown twin of every page | Add `.md` to any page URL | The page as Markdown, with components resolved |
| `llms.txt` | `/llms.txt` | Every page with its description |
| `llms-full.txt` | `/llms-full.txt` | Every page in one file |
| `sitemap.xml` and `robots.txt` | `/sitemap.xml`, `/robots.txt` | Crawler discovery |

## Proof of Work

- Automated AI Drafting. OpenCode drafts docs from a product code diff. [View PR](https://github.com/manueldezman/hookline-docs/pull/17)
- Code Example Gate. A pull request blocked by an example that does not run. [View PR](https://github.com/manueldezman/hookline-docs/pull/16)
- Editorial and Link Gates. Four required gates stop a deliberately broken pull request. [View PR](https://github.com/manueldezman/hookline-docs/pull/2)
- Staging Preview. Netlify posts a preview on a pull request. [View PR](https://github.com/manueldezman/hookline-docs/pull/2)
