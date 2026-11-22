"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { RichText } from "@/components/RichText";
import type { HooklineSlide } from "@/content/hooklineCaseStudy";

const INTERVAL_MS = 6000;

export function MediaSlideshow({ slides, title }: { slides: HooklineSlide[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();
  const total = slides.length;
  const slide = slides[index];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    setPlaying(!query.matches);

    function handleChange(event: MediaQueryListEvent) {
      setReduceMotion(event.matches);
      if (event.matches) setPlaying(false);
    }

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused || reduceMotion || total < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [playing, hovered, focused, reduceMotion, total]);

  function goTo(next: number) {
    setIndex(((next % total) + total) % total);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  return (
    <div
      aria-labelledby={labelId}
      className="border-2 border-[var(--rule)] bg-[var(--background)]"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
      onFocus={() => setFocused(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="group"
    >
      <div
        className="relative aspect-[19/10] w-full overflow-hidden bg-[color-mix(in_srgb,var(--text)_7%,var(--background))]"
        ref={frameRef}
      >
        {slides.map((item, itemIndex) => (
          <div
            aria-hidden={itemIndex !== index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              itemIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            key={item.image.src}
          >
            <a
              aria-label={`Open full size image. ${item.alt}`}
              className="link-ring block h-full w-full"
              href={item.image.src}
              rel="noreferrer"
              tabIndex={itemIndex === index ? 0 : -1}
              target="_blank"
            >
              <Image
                alt={item.alt}
                className="object-contain"
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                src={item.image}
              />
            </a>
          </div>
        ))}

        <p className="pointer-events-none absolute bottom-2 right-2 border border-[var(--rule)] bg-[var(--background)] px-2 py-1 font-mono text-[0.6rem] font-black uppercase tracking-[0.14em] text-[var(--muted)]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>

        <a
          aria-label={`Open full size image. ${slide.alt}`}
          className="link-ring absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center border border-[var(--rule)] bg-[var(--background)] text-[var(--text)]"
          href={slide.image.src}
          rel="noreferrer"
          target="_blank"
        >
          <Maximize2 size={13} />
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-[var(--rule)] px-2 py-2">
        <div className="flex items-center gap-1">
          <button
            aria-label="Previous image"
            className="link-ring inline-flex h-7 w-7 items-center justify-center border border-[var(--rule-soft)] text-[var(--text)]"
            onClick={() => goTo(index - 1)}
            type="button"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            aria-label="Next image"
            className="link-ring inline-flex h-7 w-7 items-center justify-center border border-[var(--rule-soft)] text-[var(--text)]"
            onClick={() => goTo(index + 1)}
            type="button"
          >
            <ChevronRight size={14} />
          </button>
          <button
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            aria-pressed={playing}
            className="link-ring inline-flex h-7 w-7 items-center justify-center border border-[var(--rule-soft)] text-[var(--text)]"
            onClick={() => setPlaying((current) => !current)}
            type="button"
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>

        <div className="flex items-center gap-1">
          {slides.map((item, itemIndex) => (
            <button
              aria-label={`Show ${item.label}`}
              aria-pressed={itemIndex === index}
              className={`link-ring h-2 border ${
                itemIndex === index
                  ? "w-7 border-[var(--accent)] bg-[var(--accent)]"
                  : "w-4 border-[var(--rule-soft)] bg-transparent"
              }`}
              key={item.image.src}
              onClick={() => goTo(itemIndex)}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className="min-h-[4.6rem] border-t border-[var(--rule-soft)] px-3 py-2">
        <p className="font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-[var(--accent)]" id={labelId}>
          {slide.label}
        </p>
        <RichText className="mt-1 text-sm leading-6 text-[var(--muted)]" text={slide.caption} />
      </div>
    </div>
  );
}
