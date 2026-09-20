"use client";

import { useEffect, useState } from "react";
import { heroRoles } from "@/content/roles";

const TYPE_MS = 75;
const DELETE_MS = 40;
const HOLD_MS = 1600;
const BETWEEN_MS = 320;

type Phase = "typing" | "holding" | "deleting";

export function RotatingRoles({ roles = heroRoles }: { roles?: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [phase, setPhase] = useState<Phase>("holding");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const target = roles[index] ?? "";

    if (phase === "holding") {
      const timer = window.setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "deleting") {
      if (text.length === 0) {
        const timer = window.setTimeout(() => {
          setIndex((value) => (value + 1) % roles.length);
          setPhase("typing");
        }, BETWEEN_MS);
        return () => window.clearTimeout(timer);
      }

      const timer = window.setTimeout(() => setText(target.slice(0, text.length - 1)), DELETE_MS);
      return () => window.clearTimeout(timer);
    }

    if (text.length >= target.length) {
      const timer = window.setTimeout(() => setPhase("holding"), TYPE_MS);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => setText(target.slice(0, text.length + 1)), TYPE_MS);
    return () => window.clearTimeout(timer);
  }, [index, phase, reducedMotion, roles, text]);

  const display = reducedMotion ? roles[0] ?? "" : text;

  return (
    <p className="mt-5 flex min-h-[1.5em] items-center font-mono text-sm font-bold tracking-[0.02em] text-[var(--accent)] md:text-base">
      <span aria-hidden="true">{display}</span>
      {reducedMotion ? null : (
        <span aria-hidden="true" className="typewriter-caret ml-0.5">
          |
        </span>
      )}
      <span className="sr-only">{roles.join(", ")}.</span>
    </p>
  );
}
