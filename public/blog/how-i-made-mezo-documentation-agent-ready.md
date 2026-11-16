# How I Made Mezo's Documentation Agent-Ready

by Abdulganiy Adeleke, published on Nov 16, 2026

[Mezo](https://mezo.org/) is a blockchain network that enables developers to build decentralized applications for the Bitcoin community.

As a member of the Mezo community, I noticed they were preparing to host a hackathon, the Mezo Buildathon. The event ran in two waves, each lasting about two weeks, from October 16 to November 15, 2026.

Recently, I have focused on agent-ready documentation. I saw the Buildathon as an opportunity to put my learning into practice.

## The Problem

The advent of AI has changed the tools developers use to build software. AI-assisted workflows are becoming part of software development. Developers now use coding agents to help them build applications.

Coding agents also rely on documentation to understand products and perform development tasks. They are becoming the primary consumers of developer documentation.

[Fern published a report](https://buildwithfern.com/post/state-of-docs) on November 10, 2026. It found that 52% of documentation traffic now comes from agents, up from 14% in January.

This reveals two things.

- Agents read documentation on behalf of developers.
- Developer experience is now closely tied to the AI agent's experience navigating documentation.

AI agents read documentation differently from people. They need a clear map of the pages (`llms.txt`) and a clean Markdown version of each page.

Mezo's documentation lacked the structure agents need to navigate and consume its content.

When agents cannot navigate documentation effectively, they may miss important information. They may also provide wrong answers. Developers who rely on those answers may become frustrated. This creates a poor developer experience.

On October 10, 2026, I assessed Mezo's documentation using [AFDocs](https://afdocs.dev/). AFDocs is a specification for evaluating how well documentation supports AI agents. Mezo's documentation scored 41 out of 100, an F.

![AFDocs scorecard before the fixes, October 10, 2026.](/blog/how-i-made-mezo-documentation-agent-ready/before.png)

Only two of seven categories could be scored.

- Authentication and access. 100/100.
- Content discoverability. 0/100.

Authentication and access scored 100 because the documentation already supported standard HTTP behavior. Content discoverability scored 0 because the documentation lacked agent-facing content. The check marked the following five categories as Not Applicable (N/A).

- Markdown availability.
- Page size and truncation risk.
- Content structure.
- URL stability and redirects.
- Observability and content health.

This was because there was no agent-facing content to test.

## Solution

I opened an issue for each problem and fixed them in eight pull requests.

The first change I made was to the internal documentation, a README for the repository owner. The file listed many pages that did not exist. I fixed the links so every listed page opens ([PR #345](https://github.com/mezo-org/documentation/pull/345)).

The second change kept the README out of the agent-facing files ([PR #352](https://github.com/mezo-org/documentation/pull/352)).

One of the PRs ([PR #349](https://github.com/mezo-org/documentation/pull/349)) covers Markdown availability, structure, size, and URL stability. The four checks examine whether the Markdown files exist and whether their properties are correct.

The other PRs ensure that agents can discover and consume those files. Everything I generated is rebuilt automatically whenever the site changes. This ensures nothing has to be updated by hand.

### Markdown availability

Markdown is easier for AI agents to read than the regular pages. I wrote a script that creates a Markdown version of each page from the live documentation pages ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

The build process also runs this script automatically.

### Content structure

The same script keeps headings and code blocks intact on every Markdown page. Usually, React components in MDX source become visual elements when the documentation is built.

Since the agent-facing Markdown depends on this same MDX source, the script strips the component syntax and turns its content into plain text. This prevents agents from receiving the raw components as code.

I also made tabbed content serialize one tab after another, each with its label. This ensures one tab's content is never mistaken for another's ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

The generated Markdown also wrote links to other pages as short paths, such as `/docs/users/borrow`.

Those links only work while the reader is on `mezo.org`. Once you copy the Markdown locally, the path points to the wrong place. I changed the script to write every link as a full web address and fixed nine links that led to missing pages (404).

The link check `markdown-link-portability`, which failed before, now passes ([PR #362](https://github.com/mezo-org/documentation/pull/362)).

### Page size

I kept each Markdown page under 50,000 characters and retained its complete content. This ensures an agent never has to open two pages to get one piece of information ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

### URL stability and redirects

This category checks that web addresses respond correctly. This includes a proper error for bad addresses and a working redirect. Creating the Markdown pages gave agents working links to follow, so the same work covered it ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

### Content discoverability

Agents cannot use Markdown pages they do not know exist.

- I generated `llms.txt`, an index agents can follow, and `llms-full.txt`, the full text of every page. Each entry links to a page's Markdown version ([PR #354](https://github.com/mezo-org/documentation/pull/354)).
- I added descriptions to 8 pages that had none. Agents use them to tell what a page covers, and they feed the `llms.txt` entries ([PR #347](https://github.com/mezo-org/documentation/pull/347)).
- I added a directive for agents to `llms.txt` on the regular pages ([PR #357](https://github.com/mezo-org/documentation/pull/357)). I later noticed it was missing from the Markdown pages, so I added it there too ([PR #360](https://github.com/mezo-org/documentation/pull/360)).

### Observability and content health

I created a script that generates `llms.txt` from the same Markdown files, so the index and the pages remain in sync ([PR #354](https://github.com/mezo-org/documentation/pull/354)).

## Outcome

After the fixes, the score went from 41/100 (F) to 100/100 (A+). Every category now scores 100.

| Category | Before | After |
| --- | ---: | ---: |
| Overall | 41 (F) | 100 (A+) |
| Markdown availability | N/A | 100 |
| Page size and truncation risk | N/A | 100 |
| Content structure | N/A | 100 |
| URL stability and redirects | N/A | 100 |
| Content discoverability | 0 | 100 |
| Observability and content health | N/A | 100 |
| Authentication and access | 100 | 100 |

N/A means the check had nothing to test.

![AFDocs scorecard after the fixes, November 12, 2026.](/blog/how-i-made-mezo-documentation-agent-ready/after.png)

Agents can now get the Markdown, since it is available. They can discover `llms.txt` and use it, and the Markdown is consistent with the live page.

## Verify it yourself

You need Node.js to run this command. It queries Mezo's live docs and prints the current AFDocs scorecard.

```bash
npx afdocs check https://mezo.org/docs/developers --format scorecard
```

The output is a scorecard like the screenshots above, with one line for each category and an overall score.

*Note. My runs were on October 10, 2026 and November 12, 2026. Mezo's docs may have changed since.*

## What I learned

One important lesson from this work was about directive placement.

**Place the `llms.txt` directive in both the HTML pages and the individual `.md` files.**

I initially followed the implementation used in Claude Code documentation. It hides the `llms.txt` directive in the HTML body, as shown below.

![The Claude Code implementation hides the llms.txt directive in the HTML body.](/blog/how-i-made-mezo-documentation-agent-ready/claude.png)

I also updated my Markdown conversion script to add the directive at the top of each `.md` file. The purpose was to make it available to agents without adding visual noise or having it read out by screen readers.

During review, the reviewer raised a concern about `mozilla/readability`. He said this extraction method available to agents removes hidden content. He also mentioned that the official MCP server uses this extraction mode by default.

Acting on that concern, he briefly removed the directive from the HTML pages and added a link to `llms.txt` in the footer instead. I was curious about the impact of this decision on `llms.txt` discoverability.

I then checked with OpenCode, which negotiates for Markdown, and the Markdown it received did not contain the directive.

When the agent negotiated for Markdown instead of HTML, the Markdown was generated from the HTML on the server side. When it followed a `.md` link from `llms.txt`, it got the version I pre-generated.

That meant an agent that negotiated for Markdown this way never saw the directive, so it never found `llms.txt`.

Claude Code and Cursor use content negotiation, so they would be affected too. Agents cannot locate the `.md` files on their own. They only find them once they find `llms.txt`, so the directive needed to be in both places.

I also tested the reviewer's `mozilla/readability` concern. Thankfully, agents using an MCP server could still see the directive when it was visually hidden. That kept `llms.txt` discoverable, so we added the directive back to the HTML pages.

## Want results like this?

I write developer documentation that serves both human developers and AI agents, driving business results.

Let's talk about your docs.

[Book a conversation](https://calendly.com/adelekeabdulganiy/30min) · [View live docs](https://mezo.org/docs/)
