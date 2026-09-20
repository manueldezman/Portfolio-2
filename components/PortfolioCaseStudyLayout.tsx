import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { DemoVideo } from "@/components/DemoVideo";
import { Heading } from "@/components/Heading";
import { RichText } from "@/components/RichText";
import type { PortfolioCaseStudy } from "@/content/portfolio";

export function PortfolioCaseStudyLayout({ caseStudy }: { caseStudy: PortfolioCaseStudy }) {
  return (
    <main className="editorial-shell py-16">
      <Link className="link-ring font-mono text-xs text-[var(--muted)]" href="/">
        ← back
      </Link>

      <header className="border-b-[3px] border-[var(--rule)] pb-12">
        <Heading className="mt-5 max-w-4xl" level={1}>
          {caseStudy.title}
        </Heading>
        <RichText
          className="mt-6 max-w-3xl text-lg font-semibold italic leading-8 text-[var(--muted)]"
          text={caseStudy.summary}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {caseStudy.links.map((link) => (
            <a
              className="editorial-button editorial-button-secondary gap-2 px-4 py-3"
              href={link.href}
              key={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
        {caseStudy.demoVideo ? (
          <DemoVideo title={caseStudy.demoVideo.title} youtubeId={caseStudy.demoVideo.youtubeId} />
        ) : null}
      </header>

      <section className="mt-12 grid gap-10 md:grid-cols-[0.24fr_1fr]">
        <aside className="hidden md:block">
          <nav className="sticky top-32 border-2 border-[var(--rule)]">
            {caseStudy.sections.map((section, index) => (
              <a
                className="link-ring block border-b border-[var(--rule-soft)] px-4 py-3 font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)] last:border-b-0"
                href={`#${section.id}`}
                key={section.id}
              >
                {String(index + 1).padStart(2, "0")} {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <div>
          {caseStudy.sections.map((section, index) => (
            <section
              className="grid border-t-[3px] border-[var(--rule)] py-10 md:grid-cols-[0.28fr_1fr]"
              id={section.id}
              key={section.id}
            >
              <div>
                <p className="font-mono text-xs font-black text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <Heading className="mt-3" level={2}>
                  {section.label}
                </Heading>
              </div>
              <RichText className="text-lg font-semibold leading-9 text-[var(--muted)]" text={section.body} />
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
