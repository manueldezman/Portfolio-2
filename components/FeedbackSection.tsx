"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/content/testimonials";

const ROTATE_MS = 6000;

function RelatedWork({ href, label, meta }: { href: string; label: string; meta: string }) {
  const content = (
    <>
      <p className="font-mono text-[0.6rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
        Related case study
      </p>
      <p className="mt-2 font-bold leading-6 text-[var(--text)]">{label}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{meta}</p>
      <ArrowUpRight className="absolute right-3 top-3 text-[var(--text)]" size={14} />
    </>
  );

  const className =
    "link-ring relative block border border-[var(--rule-soft)] bg-[var(--surface)] px-4 py-3 pr-10";

  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {content}
    </a>
  );
}

export function FeedbackSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) {
      return;
    }

    const timer = window.setTimeout(
      () => setIndex((value) => (value + 1) % testimonials.length),
      ROTATE_MS,
    );

    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion]);

  const testimonial = testimonials[index];

  return (
    <div
      className="mt-4"
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={index} className={reducedMotion ? undefined : "feedback-enter"}>
        <article className="flex min-h-[15rem] flex-col">
          <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
            {testimonial.name} · {testimonial.role}
          </p>
          <blockquote className="mt-5 max-w-3xl text-xl font-semibold leading-9 text-[var(--text)]">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{testimonial.caption}</p>
          <div className="mt-auto flex w-full pt-8 md:justify-end">
            <div className="w-full md:max-w-xs">
              <RelatedWork
                href={testimonial.href}
                label={testimonial.relatedLabel}
                meta={testimonial.relatedMeta}
              />
            </div>
          </div>
        </article>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {testimonials.map((entry, dotIndex) => (
          <button
            aria-label={`Show feedback from ${entry.name}`}
            aria-pressed={dotIndex === index}
            className={`h-2.5 w-8 border-2 transition-colors duration-150 ${
              dotIndex === index
                ? "border-[var(--accent)] bg-[var(--accent)]"
                : "border-[var(--rule-soft)] bg-transparent"
            }`}
            key={entry.name}
            onClick={() => setIndex(dotIndex)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
