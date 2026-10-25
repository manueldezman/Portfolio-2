"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Heading } from "@/components/Heading";

const GISCUS = {
  repo: "manueldezman/Portfolio-2",
  repoId: "R_kgDOMCPpKg",
  category: "Announcements",
  categoryId: "DIC_kwDOMCPpKs4DJmfO",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
} as const;

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function Comments() {
  const pathname = usePathname();
  const mountRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const initialTheme = readTheme();
    setTheme(initialTheme);
    container.replaceChildren();

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS.repo);
    script.setAttribute("data-repo-id", GISCUS.repoId);
    script.setAttribute("data-category", GISCUS.category);
    script.setAttribute("data-category-id", GISCUS.categoryId);
    script.setAttribute("data-mapping", GISCUS.mapping);
    script.setAttribute("data-strict", GISCUS.strict);
    script.setAttribute("data-reactions-enabled", GISCUS.reactionsEnabled);
    script.setAttribute("data-emit-metadata", GISCUS.emitMetadata);
    script.setAttribute("data-input-position", GISCUS.inputPosition);
    script.setAttribute("data-theme", initialTheme);
    script.setAttribute("data-lang", GISCUS.lang);
    script.setAttribute("data-loading", "lazy");
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, [pathname]);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributeFilter: ["data-theme"],
      attributes: true,
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const root = container;

    let iframe = root.querySelector<HTMLIFrameElement>("iframe.giscus-frame");

    function sendTheme() {
      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app",
      );
    }

    function attach() {
      const next = root.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
      if (!next || next === iframe) return;

      iframe?.removeEventListener("load", sendTheme);
      iframe = next;
      iframe.addEventListener("load", sendTheme);
      sendTheme();
    }

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      iframe?.removeEventListener("load", sendTheme);
    };
  }, [pathname, theme]);

  return (
    <section className="border-t border-[var(--rule-soft)] pt-10" aria-labelledby="comments-heading">
      <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
        Discussion
      </p>
      <Heading className="mt-3" id="comments-heading" level={2}>
        Comments
      </Heading>
      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
        Ask a question or leave a note. Comments are hosted on GitHub Discussions, so you will need a
        GitHub account to post.
      </p>
      <div className="mt-6" ref={mountRef} />
    </section>
  );
}
