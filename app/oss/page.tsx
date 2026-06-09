import type { Metadata } from "next";
import { EditorialMetric, EditorialPageHero } from "@/components/Editorial";
import { OssContributionLedger } from "@/components/OssContributionLedger";
import { contributionStories } from "@/content/oss";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Contribution ledger of merged documentation PRs, curriculum contributions, and developer feedback issues by Abdulganiy Adeleke.",
};

export default function OssPage() {
  const totalLinks = contributionStories.reduce((count, story) => count + story.links.length, 0);
  const totalPrs = contributionStories.reduce(
    (count, story) => count + story.links.filter((link) => link.type === "PR").length,
    0,
  );
  const repositories = Array.from(new Set(contributionStories.map((story) => story.repo)));

  return (
    <main className="editorial-shell py-16">
      <EditorialPageHero
        description="Contributions to open-source projects that improve developer experience, documentation sequencing, onboarding clarity, and learning resources."
        eyebrow="Contribution Ledger"
        index="03"
        meta={
          <div className="grid border-2 border-[var(--rule)] md:grid-cols-4">
            <EditorialMetric label="Stories" value={`${contributionStories.length}`} />
            <EditorialMetric label="Proof links" value={`${totalLinks}`} />
            <EditorialMetric label="Merged PRs" value={`${totalPrs}`} />
            <EditorialMetric label="Repositories" value={`${repositories.length}`} />
          </div>
        }
        title="Open Source"
      />

      <OssContributionLedger contributionStories={contributionStories} repositories={repositories} />
    </main>
  );
}
