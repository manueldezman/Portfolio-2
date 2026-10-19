import type { Metadata } from "next";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import { MobileTableOfContents } from "@/components/MobileTableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "TUI vs CLI: Is There Any Difference?",
  description:
    "A simple explainer on how TUIs and CLIs differ in expressing intent, terminal output, and automation — with Git and Lazygit.",
  openGraph: {
    title: "TUI vs CLI: Is There Any Difference?",
    description:
      "A simple explainer on how TUIs and CLIs differ in expressing intent, terminal output, and automation — with Git and Lazygit.",
    type: "article",
    images: [{ url: "/og/tui-vs-cli.png", width: 1200, height: 675 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TUI vs CLI: Is There Any Difference?",
    description:
      "A simple explainer on how TUIs and CLIs differ in expressing intent, terminal output, and automation — with Git and Lazygit.",
    images: ["/og/tui-vs-cli.png"],
  },
};

const codeStyle =
  "rounded-sm border border-[var(--rule-soft)] bg-[color-mix(in_srgb,var(--text)_7%,transparent)] px-1.5 py-0.5 font-mono text-[0.85em] font-semibold not-italic text-[var(--text)]";

const currentHref = "/blog/tui-vs-cli/";

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
  ["express", "How they use the terminal"],
  ["experience", "User experience and automation"],
  ["wrap", "Wrapping up"],
] as const;

export default function TuiVsCliPost() {
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

        <header className="min-w-0 scroll-mt-32 lg:col-start-2 lg:row-start-1" id="overview">
          <Heading className="text-left" level={1}>TUI vs CLI: Is There Any Difference?</Heading>
          <p className="mt-3 font-mono text-xs text-[var(--muted)]">
            by <Link className="link-ring underline underline-offset-4" href="/">Abdulganiy Adeleke</Link>, published on Oct 13, 2026
          </p>
          <MobileTableOfContents className="mt-6 lg:hidden" items={toc} />
        </header>

        <div className="min-w-0 max-w-3xl text-left [text-justify:inter-word] lg:col-start-2 lg:row-start-2 lg:text-justify">
          <p className="text-base leading-8 text-[var(--muted)]">
            A basic mental model for differentiating between a GUI and a CLI is that one uses
            graphical elements, while the other runs in a terminal. That was my mental model too,
            until I encountered the term TUI, which also runs in the terminal and I thought:
            aren&apos;t they the same thing?
          </p>
          <p className="mt-3 text-base leading-8 text-[var(--muted)]">That&apos;s the exact question this post aims to answer.</p>

          <section className="mt-12 scroll-mt-32" id="express">
            <Heading className="text-left" level={2}>How they use the terminal</Heading>
            <div className="mt-4 space-y-5 leading-8 text-[var(--muted)]">
              <p>
                CLIs and TUIs are both presented in the terminal environment, but they differ in how
                they use it to express intent and interact with a program.
              </p>
              <p>
                With the Git CLI, you express your intent by passing fixed commands, flags, and text
                through keyboard input. Think about when you run{" "}
                <code className={codeStyle}>git status</code> in your local repository.
              </p>
            </div>
            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Screen recording of running git status in the terminal"
                className="mx-auto w-full max-w-xl"
                src="/blog/tui-vs-cli/git-status.gif"
              />
              <figcaption className="mt-2 text-center font-mono text-xs text-[var(--muted)]">
                Running git status on the CLI.
              </figcaption>
            </figure>
            <div className="mt-6 space-y-5 leading-8 text-[var(--muted)]">
              <p>
                Git interprets the command, processes the request, and writes the resulting output to
                your terminal as a stream of text, progressing line by line. The sequence below shows
                the operations involved and terminal involvement.
              </p>
            </div>
            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Flow diagram of a git CLI command from terminal to shell to output"
                className="mx-auto w-full max-w-md"
                src="/blog/tui-vs-cli/cli-flow.png"
              />
              <figcaption className="mt-2 text-center font-mono text-xs text-[var(--muted)]">
                How a CLI command flows from the terminal to text output.
              </figcaption>
            </figure>
            <div className="mt-6 space-y-5 leading-8 text-[var(--muted)]">
              <p>
                To perform the same operation in a TUI like lazygit, you express your intent in a
                different way. Once you launch it, it takes over the full terminal screen. In
                Lazygit&apos;s case, that&apos;s six panels: status, files, branches, commits, stash,
                and the main preview panel.
              </p>
            </div>
            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Screen recording of navigating Lazygit panels"
                className="mx-auto w-full max-w-xl"
                src="/blog/tui-vs-cli/lazygit.gif"
              />
              <figcaption className="mt-2 text-center font-mono text-xs text-[var(--muted)]">
                Navigating the same repo in Lazygit.
              </figcaption>
            </figure>
            <div className="mt-6 space-y-5 leading-8 text-[var(--muted)]">
              <p>
                You can interact with it by pressing keyboard shortcuts, typing, and even mouse
                clicks, and the interface updates in real time as you interact with it. Below is the
                flow of operations involved and the terminal&apos;s role in it.
              </p>
            </div>
            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Flow diagram of Lazygit key presses from terminal to interface update"
                className="mx-auto w-full max-w-md"
                src="/blog/tui-vs-cli/tui-flow.png"
              />
              <figcaption className="mt-2 text-center font-mono text-xs text-[var(--muted)]">
                How a key press flows through Lazygit back to the screen.
              </figcaption>
            </figure>
          </section>

          <section className="mt-12 scroll-mt-32" id="experience">
            <Heading className="text-left" level={2}>User experience and automation</Heading>
            <div className="mt-4 space-y-5 leading-8 text-[var(--muted)]">
              <p>
                The CLI is well suited to automation, but it can be difficult for beginners to
                learn. To use Git through the CLI, you need to learn commands, options, and their
                syntax, which requires a great deal of mental effort. Although some CLI tools suggest
                the correct command when you make a mistake, you still have to correct and enter it
                again. When this happens a lot, it can lead to frustration.
              </p>
              <p>
                A TUI, such as Lazygit, can reduce this effort by displaying available actions in a
                visual menu. Instead of remembering every command, you can navigate the interface
                using keyboard shortcuts or, where supported, a mouse. This can make interactive
                tasks easier.
              </p>
              <p>
                However, a TUI is not always faster. For example, an experienced user can delete many
                files with a single command instead of selecting them one by one in an interface.
                CLI commands are also useful in scripts, where you can automate repetitive tasks.
              </p>
              <p>
                User preference also matters. You may prefer the CLI because you already know the
                commands and flags, and entering them has become second nature. Beginners, however,
                may find it easier to navigate a TUI, where they can see available options instead
                of having to remember commands.
              </p>
              <p>
                This difference in preference is one reason some applications, such as Claude Code
                and OpenCode, offer both CLI and TUI options.
              </p>
              <p>
                For example, running <code className={codeStyle}>claude</code> launches Claude
                Code&apos;s TUI, where you can enter prompts and navigate available options.
                Alternatively, you can use the <code className={codeStyle}>-p</code> flag to run a
                prompt directly from the CLI:
              </p>
              <pre className="overflow-x-auto bg-[var(--surface-strong)] p-4 font-mono text-sm leading-7 text-[var(--background)]">
                <code>claude -p &quot;Explain this code&quot;</code>
              </pre>
              <p>Both approaches let you work with Claude Code, but they differ in how you experience it.</p>
            </div>
          </section>

          <section className="mt-12 scroll-mt-32" id="wrap">
            <Heading className="text-left" level={2}>Wrapping up</Heading>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              Thank you for reading to the end. I hope you can now boldly state the difference
              between TUI and CLI, but if there is a part that still feels confusing, do let me know
              in the comments.
            </p>
            <ShareButtons title="TUI vs CLI: Is There Any Difference?" path="/blog/tui-vs-cli/" />
          </section>
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
