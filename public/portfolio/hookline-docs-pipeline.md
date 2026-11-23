# Self-Updating Docs-as-Code Pipeline

How I connected product code changes to automated AI drafting, quality checks, and Docusaurus deployments.

- [View Live Docs](https://manueldezman.github.io/hookline-docs/)
- [Product Repo](https://github.com/manueldezman/hookline)
- [Docs Repo](https://github.com/manueldezman/hookline-docs)

This is a working demonstration of an end-to-end documentation quality pipeline. It exists to show, with running code rather than claims, that I can design, implement, and maintain documentation systems that work for both human readers and AI agents.

## How the system works

Every step of the pipeline runs on one of these tools.

| Tool | Role |
| --- | --- |
| GitHub Actions | Runs the workflow when a product change merges and on every docs pull request. |
| OpenCode | The agent that reads the product diff and drafts the documentation update. |
| Docusaurus | Builds the site and checks the links between pages. |
| Vale | Checks wording and product terms. |
| codespell | Checks spelling. |
| lychee | Checks external links after the site builds. |
| Netlify | Builds a preview for every pull request. |

Figure 1: High-level system architecture illustrating the product repo, the docs repo, the GitHub Actions jobs, the OpenCode agent, and the two hosts that serve the docs.

Figure 2: Event flow showing a product pull request through the docs pipeline to the deployed site.

## 01 Automated Update Pipeline

When code merges to the product repo, a GitHub Actions job runs the OpenCode agent. The agent reads the git diff and edits only the pages the change makes wrong.

Figure 3: Event flow showing a product pull request through the impact job and the merge to the drafted docs pull request.

Figure 4: Screenshot showing the impact job flagging six pages that read `src/config.js` and the agent updating the two that the version change touches.

Figure 5: Screenshot showing the drafted pull request with each page it changed.

BEFORE · PRODUCT REPO

Figure 6: Developer merges a feature or API change in the product codebase.

AFTER · DOCS REPO

Figure 7: OpenCode maps the code change to the right Docusaurus file and drafts the documentation update.

Proof: [Inspect AI-Drafted Docs PR](https://github.com/manueldezman/hookline-docs/pull/17)

## 02 Information Architecture

Here are the architectural decisions I made, I used:

- **Audience first framing**: The overview names four readers, from backend developers to security teams. Anyone going through the docs knows if the tool is for them.
- **3 max levels of depth**: Reference > Events > Create an event is the deepest path. Getting started and Guides stop at two. This follows the information architecture standards, which ensures information is easily reachable and easily retrieved.
- **Navigation organized by user's job**: Sending an event sits in the Quickstart, signature checks sit in Guides, and the endpoint sits in Reference. A reader who wants to send an event finds it in the Quickstart, a reader who wants to verify a signature finds it in Guides, and a reader who wants the exact fields finds them in Reference, so nobody has to guess which section holds the page.

Figure 8: Hierarchical taxonomy of the Hookline documentation illustrating the parent-child relationships from broad product categories down to specific task-based topics.

Figure 9: Screenshot showing the product overview page and who it is for.

Figure 10: Screenshot showing the getting started page from installing the CLI to sending a first event.

Figure 11: Screenshot showing the guides page with its four tasks.

Figure 12: Screenshot showing the generated endpoint pages under Reference.

Figure 13: Screenshot showing the Node.js and Python SDK pages.

Proof: [Open the Live Docs](https://manueldezman.github.io/hookline-docs/)

## 03 Code Example Validation

Every curl and CLI example in the Markdown files runs against the product code. An example that returns 404 where the page promises 202 fails the pull request.

Figure 14: Event flow showing a docs pull request through the code examples job to a blocked merge.

Figure 15: Screenshot showing the test pull request that changes one example on purpose.

Figure 16: Screenshot showing the failed code examples job stopped on `docs/getting-started/quick-start.md` with expected 202 and got 404.

Proof: [Inspect Blocked Code-Validation PR](https://github.com/manueldezman/hookline-docs/pull/16)

## 04 Automated Quality Gates

Here are the quality gates:

| Check | Tool | When it runs | What it blocks |
| --- | --- | --- | --- |
| Style and terminology | Vale | Pull request | Errors block the merge |
| Spelling | codespell | Pull request | Any known misspelling blocks the merge |
| Front matter | check-frontmatter.js (Node) | Pull request | Missing or malformed metadata blocks the merge |
| Internal links and build | Docusaurus | Pull request | Any broken internal link blocks the merge |
| Code examples | check-docs-code-examples.mjs (Node) | Pull request | Any curl or CLI example that does not match the product blocks the merge |
| Agent-file parity | validate-agent-files.js and Node tests | Pull request | Any missing or broken agent file blocks the merge |
| External links | Lychee | Pull request | Any dead URL blocks the merge |

Figure 17: Event flow showing a docs pull request through the six gates to an unblocked merge.

Figure 18: Screenshot showing the required checks panel with the merge button locked.

Figure 19: Screenshot showing the front matter check reporting a missing description in `docs/index.md`.

Figure 20: Screenshot showing Vale asking for webhook instead of web hook.

Figure 21: Screenshot showing codespell flagging one word on line 14.

Figure 22: Screenshot showing lychee finding a 404 on an external URL.

Proof: [Inspect Blocked Quality-Gate PR](https://github.com/manueldezman/hookline-docs/pull/2)

## 05 PR Preview Links

Netlify builds every pull request and posts the preview link as a comment.

Figure 23: Event flow showing a docs pull request through the Netlify preview to a deployed site.

Figure 24: Screenshot showing the Netlify comment with a deploy preview link.

Figure 25: Screenshot showing the docs site on the Netlify preview domain.

Proof: [Inspect Live Preview PR](https://github.com/manueldezman/hookline-docs/pull/2)

## 06 Agent-Facing Documentation

AI agents read documentation differently to humans. They prefer Markdown rather than rendered HTML, so I prepared these surfaces to serve them.

| Output | URL | Purpose |
| --- | --- | --- |
| Markdown twin of every page | Add `.md` to any page URL | The page as Markdown, with components resolved |
| `llms.txt` | `/llms.txt` | An index of every page with its description, following the llmstxt.org layout |
| `llms-full.txt` | `/llms-full.txt` | Every page as Markdown in one file |
| `sitemap.xml` and `robots.txt` | `/sitemap.xml`, `/robots.txt` | Lists every page for crawlers and tells bots which pages to skip |

Figure 26: Screenshot of the agent-facing documentation section.

Proof: [View llms.txt](https://manueldezman.github.io/hookline-docs/llms.txt)
