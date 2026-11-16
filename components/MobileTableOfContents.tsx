import { ChevronDown } from "lucide-react";

type TocItem = readonly [id: string, label: string, depth?: number];

type MobileTableOfContentsProps = {
  className?: string;
  items: readonly TocItem[];
  label?: string;
};

export function MobileTableOfContents({
  className,
  items,
  label = "On this page",
}: MobileTableOfContentsProps) {
  return (
    <details
      className={[
        "group rounded-xl bg-[color-mix(in_srgb,var(--rule)_6%,transparent)] px-4 py-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <summary className="link-ring flex cursor-pointer list-none items-center justify-between gap-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--text)] [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          aria-hidden="true"
          className="shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180"
          size={15}
        />
      </summary>
      <nav aria-label={label} className="mt-3 flex flex-col border-l border-[var(--rule-soft)]">
        {items.map(([id, text, depth = 0]) => (
          <a
            className={`link-ring block py-1.5 pr-2 leading-6 text-[var(--muted)] ${
              depth > 0 ? "pl-8 text-[0.8rem]" : "pl-4 text-sm"
            }`}
            href={`#${id}`}
            key={id}
          >
            {text}
          </a>
        ))}
      </nav>
    </details>
  );
}
