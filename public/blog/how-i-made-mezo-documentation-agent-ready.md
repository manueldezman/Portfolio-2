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

- Authentication and access (100/100).
- Content discoverability (0/100).

Authentication and access scored 100 because the documentation already supported standard HTTP behavior. Content discoverability scored 0 because the documentation lacked agent-facing content. The check marked the following five categories as Not Applicable (N/A).

- Markdown availability.
- Page size and truncation risk.
- Content structure.
- URL stability and redirects.
- Observability and content health.

There was no agent-facing content to test.

## Solution

I opened an issue for each problem and fixed them in eight pull requests.

My first change was to the internal documentation, a README for the repository owner. The file listed many pages that did not exist. I fixed the links so every listed page opens ([PR #345](https://github.com/mezo-org/documentation/pull/345)).

The second change kept the README out of the agent-facing files ([PR #352](https://github.com/mezo-org/documentation/pull/352)).

One PR ([PR #349](https://github.com/mezo-org/documentation/pull/349)) covers Markdown availability, structure, size, and URL stability. The four checks examine whether the Markdown files exist and whether their properties are correct.

The other PRs ensure that agents can discover and consume those files. The build automatically regenerates everything I created whenever the site changes, so nothing has to be updated by hand.

### Markdown availability

Markdown is easier for AI agents to read than HTML pages. I wrote a script that creates a Markdown version of each live documentation page ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

The build process also runs this script automatically.

### Content structure

The same script keeps headings and code blocks intact on every Markdown page. Usually, React components in MDX source become visual elements when the documentation is built.

Since the agent-facing Markdown depends on the same MDX source, the script strips the component syntax and turns its content into plain text. This prevents agents from receiving the raw components as code.

I also made tabbed content serialize one tab after another, each with its label. This ensures one tab's content is never mistaken for another's ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

The script also wrote links to other pages as short paths, such as `/docs/users/borrow`.

Those links only work while the reader is on `mezo.org`. Once you copy the Markdown locally, the path points to the wrong place. I changed the script to write every link as a full web address and fixed nine links that led to missing pages (404).

The link check `markdown-link-portability`, which failed before, now passes ([PR #362](https://github.com/mezo-org/documentation/pull/362)).

### Page size

I kept each Markdown page under 50,000 characters without cutting its content. This ensures an agent never has to open two pages to get one piece of information ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

### URL stability and redirects

This category checks that web addresses respond correctly. That includes a correct error response for bad addresses and a working redirect. Creating the Markdown pages gave agents working links to follow, so that work also covered this category ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

### Content discoverability

Agents cannot use Markdown pages they do not know exist.

- I generated `llms.txt`, an index agents can follow, and `llms-full.txt`, the full text of every page. Each entry links to a page's Markdown version ([PR #354](https://github.com/mezo-org/documentation/pull/354)).
- I added descriptions to 8 pages that had none. Agents use the descriptions to understand what each page covers, and the descriptions feed the `llms.txt` entries ([PR #347](https://github.com/mezo-org/documentation/pull/347)).
- I added an `llms.txt` directive for agents to the regular pages ([PR #357](https://github.com/mezo-org/documentation/pull/357)). I later noticed it was missing from the Markdown pages, so I added it there too ([PR #360](https://github.com/mezo-org/documentation/pull/360)).

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

Agents can now get the Markdown version of each page. They can discover and use `llms.txt`. The Markdown matches the live page.

## Verify it yourself

You need Node.js to run this command. It queries Mezo's live docs and prints the current AFDocs scorecard.

```bash
npx afdocs check https://mezo.org/docs/developers --format scorecard
```

The output is a scorecard like the screenshots above, with one line for each category and an overall score.

*Note. My runs were on October 10, 2026 and November 12, 2026. Mezo's docs may have changed since.*

## What I learned

This work taught me one important lesson about directive placement.

**Place the `llms.txt` directive in both the HTML pages and the individual `.md` files.**

I initially followed the implementation used in the Claude Code documentation. It hides the `llms.txt` directive in the HTML body, as shown below.

![The Claude Code implementation hides the llms.txt directive in the HTML body.](/blog/how-i-made-mezo-documentation-agent-ready/claude.png)

I also updated my Markdown conversion script to add the directive at the top of each `.md` file, so agents could see it without visual noise or screen readers reading it aloud.

The reviewer raised a concern about `mozilla/readability`. He said this extraction method, which agents can use, removes hidden content. He also mentioned that the official MCP server uses this mode by default.

Acting on that concern, he briefly removed the directive from the HTML pages and added a link to `llms.txt` in the footer instead. I wanted to know how that decision affected `llms.txt` discoverability.

I then checked with OpenCode, which negotiates for Markdown, and the Markdown it received did not contain the directive.

The agent negotiated for Markdown instead of HTML, and the server generated the Markdown from HTML. When it followed a `.md` link from `llms.txt`, it got the version I pre-generated.

That meant an agent that negotiated for Markdown this way never saw the directive, so it never found `llms.txt`.

Claude Code and Cursor use content negotiation, so they would also be affected. Agents cannot locate the `.md` files on their own. They find them only after they discover `llms.txt`, so the directive needed to be in both places.

I also tested the reviewer's `mozilla/readability` concern. Agents using an MCP server could still see the directive even when it was visually hidden. That kept `llms.txt` discoverable, so we added the directive back to the HTML pages.

## Want results like this?

I write developer documentation that serves both human developers and AI agents.

Let's talk about your docs.

[Book a conversation](https://calendly.com/adelekeabdulganiy/30min) · [View live docs](https://mezo.org/docs/)
