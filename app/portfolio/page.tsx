import type { Metadata } from "next";
import Link from "next/link";
import { ApiDocumentationItem } from "@/components/ApiDocumentationItem";
import { ArticleNoteItem } from "@/components/ArticleNote";
import { DeveloperCommunity } from "@/components/DeveloperCommunity";
import { Heading } from "@/components/Heading";
import { OpenSourceContributions } from "@/components/OpenSourceContributions";
import {
  apiDocumentationItems,
  developerCommunityEntries,
  developerToolItems,
  explainerPlaylistNote,
  explainerItems,
  openSourceRepositories,
  tutorialItems,
  type PortfolioItem,
} from "@/content/portfolio";
import { socials } from "@/content/socials";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected technical writing, developer tooling, API documentation, open-source, and developer community work by Abdulganiy Adeleke.",
};

function PortfolioList({ items }: { items: PortfolioItem[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li className="leading-7 text-[var(--text)]" key={item.caseStudySlug || item.href}>
          {item.readiness ? (
            <ApiDocumentationItem item={item} readiness={item.readiness} />
          ) : item.articleNote ? (
            <ArticleNoteItem item={item} note={item.articleNote} />
          ) : item.caseStudySlug ? (
            <Link
              className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
              href={`/portfolio/${item.caseStudySlug}`}
            >
              {item.title}
            </Link>
          ) : (
            <a
              className="link-ring font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
              href={item.href}
              rel="noreferrer"
              target="_blank"
            >
              {item.title}
            </a>
          )}
          <span className="text-[var(--muted)]"> — {item.source}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <Heading level={2}>{title}</Heading>
      {children}
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <main className="editorial-shell max-w-3xl pb-16">
      <Link className="link-ring font-mono text-xs text-[var(--muted)]" href="/">
        ← back
      </Link>

      <header className="mt-10">
        <Heading level={1}>Portfolio</Heading>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          Selected work samples. Each link opens the original document.
        </p>
      </header>

      <Section title="Tutorials">
        <PortfolioList items={tutorialItems} />
      </Section>

      <Section title="Explainers">
        <PortfolioList items={explainerItems} />
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          {explainerPlaylistNote.text}{" "}
          {explainerPlaylistNote.playlists.map((playlist, index) => (
            <span key={playlist.href}>
              {index > 0 ? " · " : ""}
              <a
                className="link-ring font-semibold text-[var(--accent)] underline underline-offset-4"
                href={playlist.href}
                rel="noreferrer"
                target="_blank"
              >
                {playlist.label}
              </a>
            </span>
          ))}
        </p>
      </Section>

      <Section title="AI agent/developer tools">
        <PortfolioList items={developerToolItems} />
      </Section>

      <Section title="API documentation">
        <PortfolioList items={apiDocumentationItems} />
      </Section>

      <Section title="Open-source contributions">
        <OpenSourceContributions repositories={openSourceRepositories} />
      </Section>

      <Section title="Developer community">
        <DeveloperCommunity entries={developerCommunityEntries} />
      </Section>

      <p className="mt-16 border-t-[3px] border-[var(--rule)] pt-8 text-base leading-8 text-[var(--muted)]">
        Looking to hire?{" "}
        <a className="link-ring font-semibold text-[var(--text)] underline underline-offset-4" href={socials.email.href}>
          Email me
        </a>{" "}
        or reach me on{" "}
        <a
          className="link-ring font-semibold text-[var(--text)] underline underline-offset-4"
          href={socials.linkedin.href}
          rel="noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        .
      </p>
    </main>
  );
}
