import Link from "next/link";
import type { PortfolioItem } from "@/content/portfolio";

const titleClass =
  "link-ring inline font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4";

export function ArticleNoteItem({ item }: { item: PortfolioItem }) {
  const label = `${item.prefix ?? ""}${item.title}`;

  if (!item.slug) {
    return <span className={titleClass}>{label}</span>;
  }

  return (
    <Link className={titleClass} href={`/portfolio/${item.slug}/`}>
      {label}
    </Link>
  );
}
