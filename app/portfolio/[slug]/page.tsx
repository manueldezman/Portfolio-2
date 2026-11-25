import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HooklineCaseStudy } from "@/components/HooklineCaseStudy";
import { PortfolioCaseStudyLayout } from "@/components/PortfolioCaseStudyLayout";
import { PortfolioDetailPage } from "@/components/PortfolioDetailPage";
import { portfolioCaseStudies } from "@/content/portfolio";
import { getPortfolioDetail, portfolioDetails } from "@/content/portfolioDetails";

type PortfolioCaseStudyPageProps = {
  params: {
    slug: string;
  };
};

function getCaseStudy(slug: string) {
  return portfolioCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function generateStaticParams() {
  return [
    ...portfolioCaseStudies.map((caseStudy) => ({ slug: caseStudy.slug })),
    ...portfolioDetails.map((detail) => ({ slug: detail.slug })),
  ];
}

export function generateMetadata({ params }: PortfolioCaseStudyPageProps): Metadata {
  const caseStudy = getCaseStudy(params.slug);

  if (caseStudy) {
    const isHookline = caseStudy.slug === "hookline-docs-pipeline";
    const ogImage = isHookline ? "/og/hookline-docs-pipeline.png" : "/og/profile.png";

    return {
      title: `${caseStudy.title} case study`,
      description: caseStudy.summary,
      alternates: {
        canonical: `/portfolio/${caseStudy.slug}/`,
      },
      openGraph: {
        title: caseStudy.title,
        description: caseStudy.summary,
        type: "article",
        url: `https://0xdezman.cv/portfolio/${caseStudy.slug}/`,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: isHookline ? 630 : 675,
            alt: caseStudy.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: caseStudy.title,
        description: caseStudy.summary,
        images: [ogImage],
      },
    };
  }

  const detail = getPortfolioDetail(params.slug);

  if (detail) {
    const description = detail.summary || detail.title;

    return {
      title: detail.title,
      description,
      alternates: {
        canonical: `/portfolio/${detail.slug}/`,
      },
      openGraph: {
        title: detail.title,
        description,
        type: "article",
        url: `https://0xdezman.cv/portfolio/${detail.slug}/`,
        images: [{ url: "/og/profile.png", width: 1200, height: 675, alt: detail.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: detail.title,
        description,
        images: ["/og/profile.png"],
      },
    };
  }

  return { title: "Case study" };
}

export default function PortfolioCaseStudyPage({ params }: PortfolioCaseStudyPageProps) {
  const caseStudy = getCaseStudy(params.slug);

  if (caseStudy) {
    if (caseStudy.layout === "hookline") {
      return <HooklineCaseStudy />;
    }

    return <PortfolioCaseStudyLayout caseStudy={caseStudy} />;
  }

  const detail = getPortfolioDetail(params.slug);

  if (detail) {
    return <PortfolioDetailPage detail={detail} />;
  }

  notFound();
}
