import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import type { ContentItem } from "@/content/contents";

export function ContentCard({ item }: { item: ContentItem }) {
  const isVideo = item.category === "Project Demo" || item.category === "YouTube Explainer";
  const showGeneratedThumbnail = !item.thumbnail;

  return (
    <article className="terminal-card overflow-hidden">
      {item.thumbnail ? (
        <a
          className="group relative block aspect-video overflow-hidden border-b border-cream/10"
          href={item.href}
          rel="noreferrer"
          target="_blank"
        >
          <Image
            alt={`${item.title} thumbnail`}
            className="object-cover transition duration-300 group-hover:scale-105"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            src={item.thumbnail}
            unoptimized
          />
          <span className="absolute inset-0 bg-ink/20 transition group-hover:bg-ink/5" />
          {isVideo ? (
            <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-accent/40 bg-ink/80 px-4 py-2 text-sm font-semibold text-cream backdrop-blur">
              <Play size={16} />
              Watch
            </span>
          ) : null}
        </a>
      ) : null}
      {showGeneratedThumbnail ? (
        <a
          className="group relative block aspect-video overflow-hidden border-b border-cream/10 bg-ink"
          href={item.href}
          rel="noreferrer"
          target="_blank"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(129,140,248,0.22),transparent_28%),linear-gradient(135deg,rgba(11,16,38,0.96),rgba(3,7,18,0.92))]" />
          <span className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.07)_1px,transparent_1px)] bg-[length:28px_28px] opacity-70" />
          <span className="absolute left-5 top-5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {item.category}
          </span>
          <span className="absolute bottom-5 left-5 right-5">
            <span className="block font-mono text-xs uppercase tracking-[0.22em] text-cyan">
              0xDezman · Article
            </span>
            <span className="mt-3 block text-2xl font-semibold leading-tight text-cream transition group-hover:text-accent">
              {item.title}
            </span>
          </span>
        </a>
      ) : null}

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <span>{item.category}</span>
          <span className="text-cream/30">/</span>
          <span>{item.date}</span>
          {item.readTime ? (
            <>
              <span className="text-cream/30">/</span>
              <span>{item.readTime}</span>
            </>
          ) : null}
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-cream">{item.title}</h3>
        <p className="mt-3 leading-7 text-sand">{item.description}</p>
        <a
          className="link-ring mt-5 inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm font-semibold text-cream"
          href={item.href}
          rel="noreferrer"
          target="_blank"
        >
          {isVideo ? "Open on YouTube" : "Read piece"}
          <ArrowUpRight size={15} />
        </a>
      </div>
    </article>
  );
}
