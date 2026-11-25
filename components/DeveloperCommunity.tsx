import Link from "next/link";
import type { DeveloperCommunityEntry } from "@/content/portfolio";

type DeveloperCommunityProps = {
  entries: DeveloperCommunityEntry[];
};

export function DeveloperCommunity({ entries }: DeveloperCommunityProps) {
  return (
    <div className="mt-4">
      <ul className="space-y-3 pl-8 list-disc">
        {entries.map((entry) => {
          const title = entry.kind === "activity" ? entry.activity.title : entry.event.title;
          const label = entry.kind === "activity" ? entry.activity.label : entry.event.label;
          const slug = entry.kind === "activity" ? entry.activity.slug : entry.event.slug;

          return (
            <li className="leading-7" key={title}>
              {slug ? (
                <Link
                  className="link-ring inline font-semibold text-[var(--text)] underline decoration-[var(--rule-soft)] underline-offset-4"
                  href={`/portfolio/${slug}/`}
                >
                  {title}
                </Link>
              ) : (
                <span className="font-semibold text-[var(--text)]">{title}</span>
              )}
              <span className="text-[var(--muted)]"> — {label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
