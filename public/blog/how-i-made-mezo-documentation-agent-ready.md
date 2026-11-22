# Case Study: How I Made Mezo's Documentation Agent-Ready

by Abdulganiy Adeleke, published on Nov 16, 2026

[Mezo](https://mezo.org/) is a blockchain network that enables developers to build decentralized applications for the Bitcoin community.

As a member of the Mezo community, I noticed they were preparing to host a hackathon, the Mezo Buildathon. The event ran in two waves, each lasting about two weeks, from October 16 to November 15, 2026.

Recently, I have focused on agent-ready documentation. I saw the Buildathon as an opportunity to put my learning into practice.

## The Problem

Coding agents now read documentation on behalf of developers. They rely on it to understand products and complete development tasks, and they are becoming its primary consumers. [Fern published a report](https://buildwithfern.com/post/state-of-docs) on November 10, 2026 that found 52% of documentation traffic comes from agents, up from 14% in January.

Developer experience now depends on how well agents navigate documentation.

AI agents read documentation differently from people. They need an index file (`llms.txt`) that tells them where each page lives, and a clean Markdown version of each page.

Mezo's documentation lacked the structure agents need to navigate and consume its content.

When agents cannot navigate documentation, they miss information or give wrong answers. Developers who rely on those answers lose trust, and the developer experience suffers.

On October 10, 2026, I assessed Mezo's documentation using [AFDocs](https://afdocs.dev/). AFDocs is a specification for evaluating how well documentation supports AI agents. Mezo's documentation scored 41 out of 100, an F.

![AFDocs scorecard before the fixes, October 10, 2026.](/blog/how-i-made-mezo-documentation-agent-ready/before.png)

Only two of seven categories could be scored.

- Authentication and access (100/100).
- Content discoverability (0/100).

Authentication and access scored 100 because the documentation already supported standard HTTP behavior. Content discoverability scored 0 because there was no agent-facing content. The check marked the following five categories as Not Applicable (N/A) for the same reason.

- Markdown availability.
- Page size and truncation risk.
- Content structure.
- URL stability and redirects.
- Observability and content health.

## Solution

I opened an issue for each problem and fixed them in eight pull requests.

My first change was to the internal documentation, a README for the repository owner. The file listed many pages that did not exist. I fixed the links so every listed page opens ([PR #345](https://github.com/mezo-org/documentation/pull/345)).

The second change kept the README out of the files agents read, such as `llms.txt` and the Markdown pages ([PR #352](https://github.com/mezo-org/documentation/pull/352)).

One PR ([PR #349](https://github.com/mezo-org/documentation/pull/349)) covers Markdown availability, structure, size, and URL stability. The four checks examine whether the Markdown files exist and whether their properties are correct.

The other PRs ensure that agents can discover and consume those files. The build automatically regenerates everything I created whenever the site changes, so nothing has to be updated by hand.

### Markdown availability

Markdown is easier for AI agents to read than HTML pages. I wrote a script that creates a Markdown version of each live documentation page ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

### Content structure

The same script keeps headings and code blocks intact on every Markdown page. Usually, React components in MDX source become visual elements when the documentation is built.

Since the agent-facing Markdown depends on the same MDX source, the script strips the component syntax and turns its content into plain text. This prevents agents from receiving the raw components as code.

I also made tabbed content write out one tab after another, each with its label. This ensures one tab's content is never mistaken for another's ([PR #349](https://github.com/mezo-org/documentation/pull/349)).

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
- I added a directive to the HTML pages ([PR #357](https://github.com/mezo-org/documentation/pull/357)). A directive is a short instruction in the HTML source that points agents to `llms.txt`. I later noticed it was missing from the Markdown pages, so I added it there too ([PR #360](https://github.com/mezo-org/documentation/pull/360)).

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

Agents now get the Markdown version and the `llms.txt` map they need.

## Verify it yourself

You need Node.js to run this command. It queries Mezo's live docs and prints the current AFDocs scorecard.

```bash
npx afdocs check https://mezo.org/docs/developers --format scorecard
```

The output is a scorecard like the screenshots above, with one line for each category and an overall score.

*Note. My runs were on October 10, 2026 and November 12, 2026. Mezo's docs may have changed since.*

## What I learned

This contribution taught me two lessons about `llms.txt` directive placement:

- Place the `llms.txt` directive in the HTML pages and in each `.md` file.
- Do not hide the directive with `aria-hidden`.

I initially followed the implementation used in the Claude Code documentation. It hides the HTML `llms.txt` directive with two accessibility tools. `sr-only` hides text visually but keeps it in the page. `aria-hidden` removes it from the accessibility tree, so extraction tools skip it.

![The Claude Code implementation hides the llms.txt directive in the HTML source.](/blog/how-i-made-mezo-documentation-agent-ready/claude.png)

The Markdown conversion script also adds the directive to the top of each `.md` file.

The reviewer raised a concern about `mozilla/readability`, a library that extracts the main text from a page. He said this extraction method, which agents can use, removes hidden content. He added that the official Model Context Protocol (MCP) server uses this mode by default.

I set out to verify the claim. I asked my agent to read the Claude Code docs three ways. One route applied readability extraction to the HTML, one went through the MCP server, and one opened the `.md` file directly.

![Claude Code docs test results. HTML via Readability shows No, the MCP server fetch shows Yes, and the .md file shows Yes.](/blog/how-i-made-mezo-documentation-agent-ready/claude-result.png)

The agent did not see the directive through readability extraction. It saw the directive through the MCP server and in the `.md` file.

This is because the MCP server calls the `fetch` tool before `readability`. That tool can negotiate content, which means it asks for Markdown instead of HTML and receives a Markdown file when the server has one. If it gets the Markdown, it skips the extraction step. The directive sits in the first lines of that Markdown, so the agent finds `llms.txt`.

When the server does not negotiate Markdown and returns HTML instead, the agent extracts the text from the HTML. If that HTML lacks the `llms.txt` directive, the agent cannot find `llms.txt`, even when the `.md` file has it.

I removed the `aria-hidden` attribute from the Mezo HTML files and ran the same check. Here is what I found.

![Mezo docs test results. HTML via Readability, the MCP server fetch, and the .md file all show Yes.](/blog/how-i-made-mezo-documentation-agent-ready/mezo-result.png)

For Mezo, the agent saw the directive through all three methods.

The Claude Code result reveals that its implementation did not work for agents that use readability extraction.

To check your own docs, give this prompt to an agent.

<details>
<summary><pre>Test whether an agent can see the llms.txt directive on <DOCS_NAME> at <DOCS_URL>.

Use these three surfaces.

1. HTML extracted with Mozilla Readability.
2. The MCP server configured in your environment.
3. The .md file.

... View more</pre></summary>
<pre>Test whether an agent can see the llms.txt directive on <DOCS_NAME> at <DOCS_URL>.

Use these three surfaces.

1. HTML extracted with Mozilla Readability.
2. The MCP server configured in your environment.
3. The .md file.

For each page and surface, check whether the extracted text contains a directive to llms.txt.

Output one table for <DOCS_NAME>.

| Surface | Directive visible |
| --- | --- |
| HTML via Readability | Yes or No |
| MCP server | Yes or No |
| .md file | Yes or No |

Below the table, print the directive text for each passing surface. State the pages tested and the date. Print a separate table for each site.</pre>
</details>

This was my experience contributing to the Mezo documentation. All credit to William Pyke, who reviewed my contributions.

## Want results like this?

I write developer documentation that serves both human developers and AI agents.

Let's talk about your docs.

[Book a conversation](https://calendly.com/adelekeabdulganiy/30min) · [View live docs](https://mezo.org/docs/)
