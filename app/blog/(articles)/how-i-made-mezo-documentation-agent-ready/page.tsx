import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Heading } from "@/components/Heading";
import { MobileTableOfContents } from "@/components/MobileTableOfContents";
import { PageActions } from "@/components/PageActions";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";
import { blogPosts } from "@/content/blog";

const title = "How I Made Mezo's Documentation Agent-Ready";
const description =
  "How I improved Mezo's documentation agent-readiness score from 41 to 100 with 8 PRs.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: [{ url: "/og/mezo-documentation-agent-ready.png", width: 1200, height: 675 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/mezo-documentation-agent-ready.png"],
  },
};

const codeStyle =
  "rounded-sm border border-[var(--rule-soft)] bg-[color-mix(in_srgb,var(--text)_7%,transparent)] px-1.5 py-0.5 font-mono text-[0.85em] font-semibold not-italic text-[var(--text)]";

const currentHref = "/blog/how-i-made-mezo-documentation-agent-ready/";
const liveDocsHref = "https://mezo.org/docs/";
const bookingHref = "https://calendly.com/adelekeabdulganiy/30min";

const recentByYear = (() => {
  const groups: Record<string, typeof blogPosts> = {};
  [...blogPosts]
    .filter((post) => post.href !== currentHref)
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((post) => {
      const year = post.date.slice(0, 4);
      groups[year] = [...(groups[year] ?? []), post];
    });
  return Object.entries(groups);
})();

const toc = [
  ["overview", "Overview"],
  ["problem", "The Problem"],
  ["solution", "Solution"],
  ["markdown", "Markdown availability", 1],
  ["structure", "Content structure", 1],
  ["size", "Page size", 1],
  ["urls", "URL stability", 1],
  ["discover", "Content discoverability", 1],
  ["health", "Observability", 1],
  ["outcome", "Outcome"],
  ["verify", "Verify it yourself"],
  ["learned", "What I learned"],
] as const;

const scoreRows = [
  ["Overall", "41 (F)", "100 (A+)"],
  ["Markdown availability", "N/A", "100"],
  ["Page size and truncation risk", "N/A", "100"],
  ["Content structure", "N/A", "100"],
  ["URL stability and redirects", "N/A", "100"],
  ["Content discoverability", "0", "100"],
  ["Observability and content health", "N/A", "100"],
  ["Authentication and access", "100", "100"],
] as const;

function PrLink({ number }: { number: number }) {
  return (
    <a
      className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
      href={`https://github.com/mezo-org/documentation/pull/${number}`}
      rel="noreferrer"
      target="_blank"
    >
      PR #{number}
    </a>
  );
}

export default function MezoDocumentationAgentReadyPost() {
  return (
    <main className="editorial-shell pb-16">
      <article className="grid gap-x-6 gap-y-8 lg:grid-cols-[220px_1fr_220px]">
        <aside className="hidden lg:col-start-1 lg:row-start-2 lg:block">
          <div className="sticky top-32">
            <p className="text-base font-semibold leading-6 text-[var(--text)]">Recent posts</p>
            {recentByYear.map(([year, posts]) => (
              <div className="mt-5" key={year}>
                <p className="font-mono text-xs text-[var(--muted)]">{year}</p>
                <ul className="mt-2 space-y-2">
                  {posts.map((post) =>
                    post.href.startsWith("/") ? (
                      <li key={post.href}>
                        <Link
                          className="link-ring text-[0.8rem] leading-6 text-[var(--muted)]"
                          href={post.href}
                        >
                          {post.title}
                        </Link>
                      </li>
                    ) : (
                      <li key={post.href}>
                        <a
                          className="link-ring text-[0.8rem] leading-6 text-[var(--muted)]"
                          href={post.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {post.title}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <header
          className="mx-auto w-full min-w-0 max-w-3xl scroll-mt-32 lg:col-start-2 lg:row-start-1"
          id="overview"
        >
          <Heading className="text-left" level={1}>
            {title}
          </Heading>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-mono text-xs text-[var(--muted)]">
              by{" "}
              <Link className="link-ring underline underline-offset-4" href="/">
                Abdulganiy Adeleke
              </Link>
              , published on Nov 16, 2026
            </p>
            <PageActions className="ml-auto" />
          </div>
          <MobileTableOfContents className="mt-6 lg:hidden" items={toc} />
        </header>

        <div className="mx-auto w-full min-w-0 max-w-3xl text-left [text-justify:inter-word] lg:col-start-2 lg:row-start-2 lg:text-justify">
          <BeforeAfterSlider
            afterAlt="AFDocs scorecard for Mezo documentation dated November 12, 2026, showing an overall score of 100 out of 100, an A+."
            afterSrc="/blog/how-i-made-mezo-documentation-agent-ready/after.png"
            beforeAlt="AFDocs scorecard for Mezo documentation dated October 10, 2026, showing an overall score of 41 out of 100, an F."
            beforeSrc="/blog/how-i-made-mezo-documentation-agent-ready/before.png"
            className="mb-8"
          />

          <p className="text-base leading-8 text-[var(--muted)]">
            <a
              className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
              href="https://mezo.org/"
              rel="noreferrer"
              target="_blank"
            >
              Mezo
            </a>{" "}
            is a blockchain network that enables developers to build decentralized applications for
            the Bitcoin community.
          </p>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            As a member of the Mezo community, I noticed they were preparing to host a hackathon,
            the Mezo Buildathon. The event ran in two waves, each lasting about two weeks, from
            October 16 to November 15, 2026.
          </p>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">
            Recently, I have focused on agent-ready documentation. I saw the Buildathon as an
            opportunity to put my learning into practice.
          </p>

          <section className="mt-12 scroll-mt-32" id="problem">
            <Heading className="text-left" level={2}>
              The Problem
            </Heading>
            <div className="mt-4 space-y-5 leading-8 text-[var(--muted)]">
              <p>
                Coding agents now read documentation on behalf of developers. They rely on it to
                understand products and complete development tasks, and they are becoming its
                primary consumers.{" "}
                <a
                  className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
                  href="https://buildwithfern.com/post/state-of-docs"
                  rel="noreferrer"
                  target="_blank"
                >
                  Fern published a report
                </a>{" "}
                on November 10, 2026 that found 52% of documentation traffic comes from agents, up
                from 14% in January.
              </p>
              <p>Developer experience now depends on how well agents navigate documentation.</p>
              <p>
                AI agents read documentation differently from people. They need a clear map of the
                pages (<code className={codeStyle}>llms.txt</code>) and a clean Markdown version of
                each page.
              </p>
              <p>
                Mezo&apos;s documentation lacked the structure agents need to navigate and consume
                its content.
              </p>
              <p>
                When agents cannot navigate documentation, they miss information or give wrong
                answers. Developers who rely on those answers lose trust, and the developer
                experience suffers.
              </p>
              <p>
                On October 10, 2026, I assessed Mezo&apos;s documentation using{" "}
                <a
                  className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
                  href="https://afdocs.dev/"
                  rel="noreferrer"
                  target="_blank"
                >
                  AFDocs
                </a>
                . AFDocs is a specification for evaluating how well documentation supports AI
                agents. Mezo&apos;s documentation scored 41 out of 100, an F.
              </p>
            </div>

            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="AFDocs scorecard for Mezo documentation dated October 10, 2026, showing an overall score of 41 out of 100, an F."
                className="mx-auto h-auto w-full max-w-2xl border border-[var(--rule-soft)]"
                height={413}
                loading="lazy"
                src="/blog/how-i-made-mezo-documentation-agent-ready/before.png"
                width={640}
              />
              <figcaption className="mt-2 text-center font-mono text-xs text-[var(--muted)]">
                AFDocs scorecard before the fixes, October 10, 2026.
              </figcaption>
            </figure>

            <div className="mt-6 space-y-5 leading-8 text-[var(--muted)]">
              <p>Only two of seven categories could be scored.</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Authentication and access (100/100).</li>
                <li>Content discoverability (0/100).</li>
              </ul>
              <p>
                Authentication and access scored 100 because the documentation already supported
                standard HTTP behavior. Content discoverability scored 0 because there was no
                agent-facing content. The check marked the following five categories as Not
                Applicable (N/A) for the same reason.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Markdown availability.</li>
                <li>Page size and truncation risk.</li>
                <li>Content structure.</li>
                <li>URL stability and redirects.</li>
                <li>Observability and content health.</li>
              </ul>
            </div>
          </section>

          <section className="mt-12 scroll-mt-32" id="solution">
            <Heading className="text-left" level={2}>
              Solution
            </Heading>
            <div className="mt-4 space-y-5 leading-8 text-[var(--muted)]">
              <p>I opened an issue for each problem and fixed them in eight pull requests.</p>
              <p>
                My first change was to the internal documentation, a README for the
                repository owner. The file listed many pages that did not exist. I fixed the links
                so every listed page opens (<PrLink number={345} />).
              </p>
              <p>
                The second change kept the README out of the agent-facing files (
                <PrLink number={352} />).
              </p>
              <p>
                One PR (<PrLink number={349} />) covers Markdown availability, structure,
                size, and URL stability. The four checks examine whether the Markdown files exist
                and whether their properties are correct.
              </p>
              <p>
                The other PRs ensure that agents can discover and consume those files. The build
                automatically regenerates everything I created whenever the site changes, so nothing
                has to be updated by hand.
              </p>
            </div>

            <section className="mt-10 scroll-mt-32" id="markdown">
              <Heading className="text-left" level={3}>
                Markdown availability
              </Heading>
              <div className="mt-4 space-y-5 leading-8 text-[var(--muted)]">
                <p>
                  Markdown is easier for AI agents to read than HTML pages. I wrote a script that
                  creates a Markdown version of each live documentation page (
                  <PrLink number={349} />).
                </p>
              </div>
            </section>

            <section className="mt-10 scroll-mt-32" id="structure">
              <Heading className="text-left" level={3}>
                Content structure
              </Heading>
              <div className="mt-4 space-y-5 leading-8 text-[var(--muted)]">
                <p>
                  The same script keeps headings and code blocks intact on every Markdown page.
                  Usually, React components in MDX source become visual elements when the
                  documentation is built.
                </p>
                <p>
                  Since the agent-facing Markdown depends on the same MDX source, the script strips
                  the component syntax and turns its content into plain text. This prevents agents
                  from receiving the raw components as code.
                </p>
                <p>
                  I also made tabbed content serialize one tab after another, each with its label.
                  This ensures one tab&apos;s content is never mistaken for another&apos;s (
                  <PrLink number={349} />).
                </p>
                <p>
                  The script also wrote links to other pages as short paths, such as{" "}
                  <code className={codeStyle}>/docs/users/borrow</code>.
                </p>
                <p>
                  Those links only work while the reader is on <code className={codeStyle}>mezo.org</code>.
                  Once you copy the Markdown locally, the path points to the wrong place. I changed
                  the script to write every link as a full web address and fixed nine links that led
                  to missing pages (404).
                </p>
                <p>
                  The link check <code className={codeStyle}>markdown-link-portability</code>, which
                  failed before, now passes (<PrLink number={362} />).
                </p>
              </div>
            </section>

            <section className="mt-10 scroll-mt-32" id="size">
              <Heading className="text-left" level={3}>
                Page size
              </Heading>
              <p className="mt-4 leading-8 text-[var(--muted)]">
                I kept each Markdown page under 50,000 characters without cutting its content. This
                ensures an agent never has to open two pages to get one piece of information (
                <PrLink number={349} />).
              </p>
            </section>

            <section className="mt-10 scroll-mt-32" id="urls">
              <Heading className="text-left" level={3}>
                URL stability and redirects
              </Heading>
              <p className="mt-4 leading-8 text-[var(--muted)]">
                This category checks that web addresses respond correctly. That includes a correct
                error response for bad addresses and a working redirect. Creating the Markdown pages
                gave agents working links to follow, so that work also covered this category (
                <PrLink number={349} />).
              </p>
            </section>

            <section className="mt-10 scroll-mt-32" id="discover">
              <Heading className="text-left" level={3}>
                Content discoverability
              </Heading>
              <p className="mt-4 leading-8 text-[var(--muted)]">
                Agents cannot use Markdown pages they do not know exist.
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-[var(--muted)]">
                <li>
                  I generated <code className={codeStyle}>llms.txt</code>, an index agents can
                  follow, and <code className={codeStyle}>llms-full.txt</code>, the full text of every
                  page. Each entry links to a page&apos;s Markdown version (<PrLink number={354} />).
                </li>
                <li>
                  I added descriptions to 8 pages that had none. Agents use the descriptions to
                  understand what each page covers, and the descriptions feed the{" "}
                  <code className={codeStyle}>llms.txt</code> entries (
                  <PrLink number={347} />).
                </li>
                <li>
                  I added an <code className={codeStyle}>llms.txt</code> directive for agents to the
                  regular pages (<PrLink number={357} />). I later noticed it was missing from the
                  Markdown pages, so I added it there too (<PrLink number={360} />).
                </li>
              </ul>
            </section>

            <section className="mt-10 scroll-mt-32" id="health">
              <Heading className="text-left" level={3}>
                Observability and content health
              </Heading>
              <p className="mt-4 leading-8 text-[var(--muted)]">
                I created a script that generates <code className={codeStyle}>llms.txt</code> from the
                same Markdown files, so the index and the pages remain in sync (
                <PrLink number={354} />).
              </p>
            </section>
          </section>

          <section className="mt-12 scroll-mt-32" id="outcome">
            <Heading className="text-left" level={2}>
              Outcome
            </Heading>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              After the fixes, the score went from 41/100 (F) to 100/100 (A+). Every category now
              scores 100.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm leading-6">
                <caption className="sr-only">AFDocs score before and after the fixes</caption>
                <thead>
                  <tr className="border-b-[3px] border-[var(--rule)]">
                    <th className="py-2 pr-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                      Category
                    </th>
                    <th className="px-4 py-2 text-right font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                      Before
                    </th>
                    <th className="py-2 pl-4 text-right font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                      After
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoreRows.map(([category, before, after]) => (
                    <tr className="border-b border-[var(--rule-soft)]" key={category}>
                      <td className="py-2 pr-4 text-[var(--text)]">{category}</td>
                      <td className="px-4 py-2 text-right font-mono text-[var(--muted)]">{before}</td>
                      <td className="py-2 pl-4 text-right font-mono text-[var(--muted)]">{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 leading-8 text-[var(--muted)]">
              N/A means the check had nothing to test.
            </p>

            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="AFDocs scorecard for Mezo documentation dated November 12, 2026, showing an overall score of 100 out of 100, an A+."
                className="mx-auto h-auto w-full max-w-2xl border border-[var(--rule-soft)]"
                height={413}
                loading="lazy"
                src="/blog/how-i-made-mezo-documentation-agent-ready/after.png"
                width={640}
              />
              <figcaption className="mt-2 text-center font-mono text-xs text-[var(--muted)]">
                AFDocs scorecard after the fixes, November 12, 2026.
              </figcaption>
            </figure>

            <p className="mt-6 leading-8 text-[var(--muted)]">
              Agents now get the Markdown version and the{" "}
              <code className={codeStyle}>llms.txt</code> map they need.
            </p>
          </section>

          <section className="mt-12 scroll-mt-32" id="verify">
            <Heading className="text-left" level={2}>
              Verify it yourself
            </Heading>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              You need Node.js to run this command. It queries Mezo&apos;s live docs and prints the
              current AFDocs scorecard.
            </p>
            <pre className="mt-4 overflow-x-auto bg-[var(--surface-strong)] p-4 font-mono text-sm leading-7 text-[var(--background)]">
              <code>npx afdocs check https://mezo.org/docs/developers --format scorecard</code>
            </pre>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              The output is a scorecard like the screenshots above, with one line for each category
              and an overall score.
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Note. My runs were on October 10, 2026 and November 12, 2026. Mezo&apos;s docs may
              have changed since.
            </p>
          </section>

          <section className="mt-12 scroll-mt-32" id="learned">
            <Heading className="text-left" level={2}>
              What I learned
            </Heading>
            <div className="mt-4 space-y-5 leading-8 text-[var(--muted)]">
              <p>This work taught me one important lesson about directive placement.</p>
              <p>
                <strong>
                  Place the <code className={codeStyle}>llms.txt</code> directive in both the HTML
                  pages and the individual <code className={codeStyle}>.md</code> files.
                </strong>
              </p>
              <p>
                I initially followed the implementation used in the Claude Code documentation. It hides
                the <code className={codeStyle}>llms.txt</code> directive in the HTML body, as shown
                below.
              </p>
            </div>

            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Claude Code documentation HTML showing the llms.txt directive hidden in a visually hidden blockquote."
                className="mx-auto h-auto w-full max-w-2xl border border-[var(--rule-soft)]"
                height={184}
                loading="lazy"
                src="/blog/how-i-made-mezo-documentation-agent-ready/claude.png"
                width={905}
              />
              <figcaption className="mt-2 text-center font-mono text-xs text-[var(--muted)]">
                The Claude Code implementation hides the llms.txt directive in the HTML body.
              </figcaption>
            </figure>

            <div className="mt-6 space-y-5 leading-8 text-[var(--muted)]">
              <p>
                I also updated my Markdown conversion script to add the directive at the top of each{" "}
                <code className={codeStyle}>.md</code> file, so agents could see it without visual
                noise or screen readers reading it aloud.
              </p>
              <p>
                The reviewer raised a concern about{" "}
                <code className={codeStyle}>mozilla/readability</code>. He said this extraction
                method, which agents can use, removes hidden content. He also mentioned that the
                official MCP server uses this mode by default.
              </p>
              <p>
                Acting on that concern, he briefly removed the directive from the HTML pages and
                added a link to <code className={codeStyle}>llms.txt</code> in the footer instead. I
                wanted to know how that decision affected{" "}
                <code className={codeStyle}>llms.txt</code> discoverability.
              </p>
              <p>
                I then checked with OpenCode, which negotiates for Markdown, and the Markdown it
                received did not contain the directive.
              </p>
              <p>
                The agent negotiated for Markdown instead of HTML, and the server generated the
                Markdown from HTML. When it followed a{" "}
                <code className={codeStyle}>.md</code> link from{" "}
                <code className={codeStyle}>llms.txt</code>, it got the version I pre-generated.
              </p>
              <p>
                That meant an agent that negotiated for Markdown this way never saw the directive,
                so it never found <code className={codeStyle}>llms.txt</code>.
              </p>
              <p>
                Claude Code and Cursor use content negotiation, so they would also be affected.
                Agents cannot locate the <code className={codeStyle}>.md</code> files on their own.
                They find them only after they discover <code className={codeStyle}>llms.txt</code>,
                so the directive needed to be in both places.
              </p>
              <p>
                I also tested the reviewer&apos;s <code className={codeStyle}>mozilla/readability</code>{" "}
                concern. Agents using an MCP server could still see the directive even when it was
                visually hidden. That kept <code className={codeStyle}>llms.txt</code>{" "}
                discoverable, so we added the directive back to the HTML pages.
              </p>
            </div>
          </section>

          <section className="mt-12 scroll-mt-32" id="work-with-me">
            <Heading className="text-left" level={2}>
              Want results like this?
            </Heading>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              I write developer documentation that serves both human developers and AI agents.
            </p>
            <p className="mt-3 leading-8 text-[var(--muted)]">Let&apos;s talk about your docs.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                className="link-ring inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
                href={bookingHref}
                rel="noreferrer"
                target="_blank"
              >
                Book a conversation
              </a>
              <a
                className="link-ring text-sm font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
                href={liveDocsHref}
                rel="noreferrer"
                target="_blank"
              >
                View live docs
              </a>
            </div>
          </section>

          <ShareButtons title="How I Made Mezo's Documentation Agent-Ready" path={currentHref} />
        </div>

        <aside className="hidden lg:col-start-3 lg:row-start-2 lg:block">
          <div className="sticky top-32">
            <TableOfContents heading="On this page" items={toc} label="On this page" />
          </div>
        </aside>
      </article>
    </main>
  );
}
