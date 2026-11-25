"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type PortfolioTabsProps = {
  tabs: Array<{ id: string; label: string; content: ReactNode }>;
};

export function PortfolioTabs({ tabs }: PortfolioTabsProps) {
  const [activeId, setActiveId] = useState(() => {
    const hash = typeof window === "undefined" ? "" : window.location.hash.replace(/^#/, "");
    return tabs.some((tab) => tab.id === hash) ? hash : tabs[0].id;
  });

  function goTo(index: number) {
    const id = tabs[index]?.id;
    if (id) {
      setActiveId(id);
    }
  }

  function move(offset: number) {
    const index = tabs.findIndex((tab) => tab.id === activeId);
    const next = tabs[Math.min(Math.max(index + offset, 0), tabs.length - 1)];
    if (next) {
      setActiveId(next.id);
    }
  }

  return (
    <div className="mt-8">
      <div
        className="flex overflow-x-auto border-b-2 border-[var(--rule)] pb-px"
        role="tablist"
      >
        {tabs.map((tab, index) => {
          const active = tab.id === activeId;
          return (
            <button
              aria-selected={active}
              className={`shrink-0 border-b-2 px-3 py-3.5 text-xs font-black uppercase tracking-[0.12em] transition-colors ${
                active
                  ? "border-[var(--accent)] text-[var(--text)]"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--text)]"
              }`}
              id={`tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  move(-1);
                } else if (event.key === "ArrowRight") {
                  event.preventDefault();
                  move(1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  goTo(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  goTo(tabs.length - 1);
                }
              }}
              role="tab"
              tabIndex={active ? 0 : -1}
              type="button"
            >
              <span className="mr-2 font-mono">{String(index + 1).padStart(2, "0")}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        {tabs.map((tab) => (
          <div
            aria-labelledby={`tab-${tab.id}`}
            className="scroll-mt-8"
            hidden={tab.id !== activeId}
            id={`panel-${tab.id}`}
            key={tab.id}
            role="tabpanel"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
