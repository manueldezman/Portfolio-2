"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { RichText } from "@/components/RichText";
import type { HooklineSlide } from "@/content/hooklineCaseStudy";

const INTERVAL_MS = 2000;

const overlayButton =
  "link-ring inline-flex h-7 w-7 items-center justify-center border border-[rgba(238,232,221,0.22)] bg-[rgba(18,17,15,0.8)] text-[#eee8dd]";

type MediaSlideshowProps = {
  figureNumbers: number[];
  onOpenImage: (slideIndex: number) => void;
  slides: HooklineSlide[];
};

export function MediaSlideshow({ figureNumbers, onOpenImage, slides }: MediaSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const captionId = useId();
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
      aria-labelledby={captionId}
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
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[color-mix(in_srgb,var(--text)_7%,var(--background))]">
        {slides.map((item, itemIndex) => (
          <div
            aria-hidden={itemIndex !== index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              itemIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            key={item.image.src}
          >
            <Image
              alt={item.alt}
              className="object-contain"
              fill
              sizes="(min-width: 1024px) 45rem, 100vw"
              src={item.image}
            />
            <button
              aria-label={`Open full size image. ${item.alt}`}
              className="absolute right-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(238,232,221,0.32)] bg-[rgba(18,17,15,0.78)] text-sm leading-none text-[#eee8dd] transition-colors hover:bg-[rgba(18,17,15,0.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              onClick={() => onOpenImage(itemIndex)}
              tabIndex={itemIndex === index ? 0 : -1}
              title="View full size"
              type="button"
            >
              <span aria-hidden="true">⤢</span>
            </button>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-[rgba(9,8,7,0.9)] to-transparent px-2 py-1.5">
          <div className="flex items-center gap-1">
            <button
              aria-label="Previous image"
              className={overlayButton}
              onClick={() => goTo(index - 1)}
              type="button"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              aria-label="Next image"
              className={overlayButton}
              onClick={() => goTo(index + 1)}
              type="button"
            >
              <ChevronRight size={14} />
            </button>
            <button
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              aria-pressed={playing}
              className={overlayButton}
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
                    : "w-4 border-[rgba(238,232,221,0.35)] bg-transparent"
                }`}
                key={item.image.src}
                onClick={() => goTo(itemIndex)}
                type="button"
              />
            ))}
          </div>

          <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.14em] text-[#a39b91]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="mt-3" id={captionId}>
        <RichText
          className="text-sm leading-6 text-[var(--muted)]"
          text={`Figure ${figureNumbers[index]}: ${slide.caption}`}
        />
      </div>
    </div>
  );
}
