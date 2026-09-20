import type { ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3";

const levelClasses = {
  1: "text-[clamp(1.4rem,4.8vw,3rem)] font-bold leading-[1.1] tracking-[-0.01em]",
  2: "text-lg font-semibold leading-6",
  3: "text-base font-semibold leading-6",
} as const;

export type HeadingLevel = keyof typeof levelClasses;

const levelTags: Record<HeadingLevel, HeadingTag> = {
  1: "h1",
  2: "h2",
  3: "h3",
};

type HeadingProps = {
  as?: HeadingTag;
  children: ReactNode;
  className?: string;
  id?: string;
  level?: HeadingLevel;
};

export function Heading({ as, children, className, id, level = 2 }: HeadingProps) {
  const Tag = as ?? levelTags[level];
  const classes = [levelClasses[level], "text-[var(--text)]", className].filter(Boolean).join(" ");

  return (
    <Tag className={classes} id={id}>
      <span aria-hidden="true" className="text-[var(--muted)]">
        {"#".repeat(level)}{" "}
      </span>
      {children}
    </Tag>
  );
}
