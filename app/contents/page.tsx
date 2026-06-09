import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { ArticleArchive } from "@/components/ArticleArchive";
import { EditorialMetric, EditorialPageHero, EditorialSectionTitle, EditorialTag } from "@/components/Editorial";
import { articleItems, projectDemoItems, youtubeExplainerItems } from "@/content/contents";

export const metadata: Metadata = {
  title: "Contents",
  description:
    "Knowledge archive of articles, conceptual explainers, tutorial guides, project demos, and YouTube explainers by Abdulganiy Adeleke.",
};

export default function ContentsPage() {
  const allMedia = [...projectDemoItems, ...youtubeExplainerItems];

  return (
    <main className="editorial-shell py-16">
      <EditorialPageHero
        description="In-depth articles, tutorials, and technical demos on systems, blockchain, developer tooling, frontend fixes, and AI-assisted workflows."
        eyebrow="Knowledge Archive"
        index="02"
        meta={
          <div className="grid border-2 border-[var(--rule)] md:grid-cols-3">
            <EditorialMetric label="Articles" value={`${articleItems.length}`} />
            <EditorialMetric label="Project demos" value={`${projectDemoItems.length}`} />
            <EditorialMetric label="Explainers" value={`${youtubeExplainerItems.length}`} />
          </div>
        }
        title="Contents"
      />

      <ArticleArchive articles={articleItems} />

      <section className="mt-16 border-t-[3px] border-[var(--rule)] pt-12">
        <EditorialSectionTitle index="02" title="Media & Project Demos" />
        <div className="grid border-2 border-[var(--rule)] md:grid-cols-3">
          {allMedia.map((item) => (
            <a
              className="link-ring group border-[var(--rule)] md:border-l md:first:border-l-0"
              href={item.href}
              key={item.href}
              rel="noreferrer"
              target="_blank"
            >
              <div className="relative aspect-video border-b-2 border-[var(--rule)]">
                {item.thumbnail ? (
                  <Image
                    alt={`${item.title} thumbnail`}
                    className="object-cover grayscale transition group-hover:grayscale-0"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={item.thumbnail}
                    unoptimized
                  />
                ) : null}
                <span className="absolute inset-0 bg-[var(--surface-strong)]/15" />
                <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 border-2 border-[var(--rule)] bg-[var(--background)] px-4 py-2 font-mono text-xs font-black uppercase text-[var(--text)]">
                  <Play size={14} />
                  Watch
                </span>
              </div>
              <div className="p-6">
                <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                  {item.category}
                </p>
                <h2 className="mt-4 text-xl font-black tracking-[-0.04em] text-[var(--text)]">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-black text-[var(--accent)]">
                  Open <ArrowUpRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t-[3px] border-[var(--rule)] pt-12">
        <EditorialSectionTitle index="03" title="API Documentation" />
        <div className="border-2 border-[var(--rule)] p-8">
          <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--accent)]">
            In progress
          </p>
          <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[var(--text)]">
            API documentation samples are being developed.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            This section will hold API reference and integration documentation examples as the portfolio grows.
          </p>
        </div>
      </section>
    </main>
  );
}
