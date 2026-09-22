import type { Metadata } from "next";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import { blogPosts } from "@/content/blog";

const subtitle =
  "Writings about ideas that emerge from what I learn, build, observe, and experience across technology, money, and personal growth.";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const metadata: Metadata = {
  title: "Blog",
  description: subtitle,
};

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="editorial-shell max-w-3xl pb-16">
      <Link className="link-ring font-mono text-xs text-[var(--muted)]" href="/">
        ← back
      </Link>

      <header className="mt-10">
        <Heading level={1}>Blog</Heading>
        <p className="mt-3 text-base leading-8 text-[var(--muted)]">{subtitle}</p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-14 leading-8 text-[var(--muted)]">No posts yet.</p>
      ) : (
        <ul className="mt-14 space-y-12">
          {posts.map((post) => (
            <li key={post.href}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <a
                  className="link-ring text-base font-semibold leading-7 text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
                  href={post.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {post.title}
                </a>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {dateFormatter.format(new Date(post.date))}
                </span>
              </div>
              <p className="mt-2 leading-7 text-[var(--muted)]">{post.description}</p>
              {post.tags.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      className="border border-[var(--rule-soft)] px-3 py-2 font-mono text-[0.65rem] tracking-[0.12em] text-[var(--muted)]"
                      key={tag}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
