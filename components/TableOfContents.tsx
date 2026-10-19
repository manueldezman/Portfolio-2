"use client";

import { useEffect, useState } from "react";

type TocItem = readonly [id: string, label: string];

type TableOfContentsProps = {
  heading?: string;
  items: readonly TocItem[];
  label?: string;
};

export function TableOfContents({
  heading,
  items,
  label = "On this page",
}: TableOfContentsProps) {
  const [active, setActive] = useState<string>(items[0]?.[0] ?? "");

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const marker = window.innerHeight * 0.3;
      let current = items[0]?.[0] ?? "";

      for (const [id] of items) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }

      // Pin the last item once the page is scrolled to the bottom so short
      // final sections still register as active.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = items[items.length - 1]?.[0] ?? current;
      }

      setActive(current);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label={label} className="flex flex-col border-l border-[var(--rule-soft)]">
      {heading ? (
        <p className="px-3 pb-2 pl-5 text-base font-semibold leading-6 text-[var(--text)]">
          {heading}
        </p>
      ) : null}
      {items.map(([id, text]) => {
        const isActive = active === id;
        return (
          <a
            aria-current={isActive ? "true" : undefined}
            className={`link-ring relative block py-1.5 pl-5 pr-3 text-[0.8rem] leading-6 transition-colors ${
              isActive
                ? "font-semibold text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
            href={`#${id}`}
            key={id}
          >
            <span
              aria-hidden="true"
              className={`absolute inset-y-1.5 left-0 w-0.5 ${
                isActive ? "bg-[var(--accent)]" : "bg-transparent"
              }`}
            />
            {text}
          </a>
        );
      })}
    </nav>
  );
}
