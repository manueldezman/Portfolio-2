import type { StaticImageData } from "next/image";
import {
  apiDocumentationItems,
  communityEvent,
  developerCommunityEntries,
  openSourceRepositories,
  tutorialItems,
  type AgentReadiness,
  type ArticleNote,
  type CommunityActivity,
  type CommunityEvent,
  type CommunityProofImage,
  type OpenSourceContributionImage,
} from "@/content/portfolio";

export type DetailLink = { href: string; label: string; status?: string };
export type DetailField = { label: string; value: string };
export type DetailImage = { alt: string; caption: string; image: StaticImageData; link?: { href: string; label: string } };

export type PortfolioDetail =
  | {
      href: string;
      kind: "readiness";
      readiness: AgentReadiness;
      slug: string;
      summary: string;
      title: string;
    }
  | {
      href: string;
      kind: "article";
      note: ArticleNote;
      slug: string;
      summary: string;
      title: string;
    }
  | {
      image?: OpenSourceContributionImage;
      kind: "contribution";
      links: DetailLink[];
      otherLinks: DetailLink[];
      problem: string;
      contribution: string;
      impact: string;
      slug: string;
      summary: string;
      title: string;
    }
  | {
      fields: DetailField[];
      images: DetailImage[];
      kind: "activity";
      slug: string;
      summary: string;
      title: string;
    }
  | {
      feedback: { image: DetailImage; title: string };
      fields: DetailField[];
      images: DetailImage[];
      kind: "event";
      proofLinks: DetailLink[];
      slug: string;
      summary: string;
      title: string;
    };

function proofImages(images: CommunityProofImage[] | undefined): DetailImage[] {
  return (images ?? []).map((image) => ({
    alt: image.alt,
    caption: image.caption,
    image: image.image,
    link: image.link,
  }));
}

function activityDetail(activity: CommunityActivity): PortfolioDetail {
  return {
    kind: "activity",
    slug: activity.slug as string,
    title: activity.title,
    summary: activity.detail,
    fields: activity.fields,
    images: proofImages(activity.images),
  };
}

function eventDetail(event: CommunityEvent): PortfolioDetail {
  return {
    kind: "event",
    slug: event.slug as string,
    title: event.title,
    summary: "",
    fields: event.fields,
    proofLinks: event.proofLinks,
    images: event.images.map((image) => ({
      alt: image.alt,
      caption: image.caption,
      image: image.image,
      link: image.link,
    })),
    feedback: {
      title: event.feedback.title,
      image: {
        alt: event.feedback.image.alt,
        caption: event.feedback.image.caption,
        image: event.feedback.image.image,
        link: event.feedback.image.link,
      },
    },
  };
}

export const portfolioDetails: PortfolioDetail[] = [
  ...apiDocumentationItems.flatMap((item): PortfolioDetail[] =>
    item.slug && item.readiness
      ? [
          {
            kind: "readiness",
            slug: item.slug,
            title: `${item.prefix ?? ""}${item.title}`,
            summary: item.description,
            href: item.href,
            readiness: item.readiness,
          },
        ]
      : [],
  ),
  ...tutorialItems.flatMap((item): PortfolioDetail[] =>
    item.slug && item.articleNote
      ? [
          {
            kind: "article",
            slug: item.slug,
            title: item.title,
            summary: item.description,
            href: item.href,
            note: item.articleNote,
          },
        ]
      : [],
  ),
  ...openSourceRepositories.flatMap((repository) =>
    repository.contributions.flatMap((contribution): PortfolioDetail[] => {
      if (!contribution.slug) {
        return [];
      }
      const usedHrefs = new Set(contribution.links.map((link) => link.href));
      return [
        {
          kind: "contribution",
          slug: contribution.slug,
          title: contribution.title,
          summary: `Contribution to ${repository.organization}.`,
          problem: contribution.problem,
          contribution: contribution.contribution,
          impact: contribution.impact,
          image: contribution.image,
          links: contribution.links,
          otherLinks: repository.prLinks.filter((link) => !usedHrefs.has(link.href)),
        },
      ];
    }),
  ),
  ...developerCommunityEntries.flatMap((entry): PortfolioDetail[] => {
    if (entry.kind === "activity") {
      return entry.activity.slug ? [activityDetail(entry.activity)] : [];
    }
    return entry.event.slug ? [eventDetail(entry.event)] : [];
  }),
];

export function getPortfolioDetail(slug: string): PortfolioDetail | undefined {
  return portfolioDetails.find((detail) => detail.slug === slug);
}
