import Link from "next/link";
import type { OpenSourceRepository } from "@/content/portfolio";

const contributionTitleClass =
  "link-ring inline text-left underline decoration-[var(--rule-soft)] underline-offset-4 transition-colors duration-150 group-hover:text-[var(--accent)]";

export function OpenSourceContributions({ repositories }: { repositories: OpenSourceRepository[] }) {
  return (
    <div className="mt-4 space-y-7">
      {repositories.map((repository) => {
        const repositoryId = repository.repository.replace("/", "-").toLowerCase();

        return (
          <div className="scroll-mt-28" id={repositoryId} key={repository.repository}>
            <ul className="space-y-7 pl-8 list-disc">
              {repository.contributions.map((contribution) => (
                <li className="group" key={`${repository.repository}-${contribution.title}`}>
                  <h3 className="text-sm font-semibold leading-7 text-[var(--text)]">
                    {contribution.href ? (
                      contribution.href.startsWith("/") ? (
                        <Link className={contributionTitleClass} href={contribution.href}>
                          {contribution.title}
                        </Link>
                      ) : (
                        <a
                          className={contributionTitleClass}
                          href={contribution.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {contribution.title}
                        </a>
                      )
                    ) : contribution.slug ? (
                      <Link className={contributionTitleClass} href={`/portfolio/${contribution.slug}/`}>
                        {contribution.title}
                      </Link>
                    ) : (
                      <span className={contributionTitleClass}>{contribution.title}</span>
                    )}{" "}
                    <span className="font-normal text-[var(--muted)]">— {repository.organization}</span>
                  </h3>
                </li>
              ))}
            </ul>
            <p className="mt-2 pl-8 text-sm leading-7 text-[var(--muted)]">
              {`${repository.prLinks.length} merged PR${
                repository.prLinks.length === 1 ? "" : "s"
              } to this repository`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
