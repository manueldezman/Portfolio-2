import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HooklineCaseStudy } from "@/components/HooklineCaseStudy";
import { PortfolioCaseStudyLayout } from "@/components/PortfolioCaseStudyLayout";
import { portfolioCaseStudies } from "@/content/portfolio";

type PortfolioCaseStudyPageProps = {
  params: {
    slug: string;
  };
};

function getCaseStudy(slug: string) {
  return portfolioCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function generateStaticParams() {
  return portfolioCaseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export function generateMetadata({ params }: PortfolioCaseStudyPageProps): Metadata {
  const caseStudy = getCaseStudy(params.slug);

  if (!caseStudy) {
    return { title: "Case study" };
  }

  return {
    title: `${caseStudy.title} case study`,
    description: caseStudy.summary,
    alternates: {
      canonical: `/portfolio/${caseStudy.slug}/`,
    },
  };
}

export default function PortfolioCaseStudyPage({ params }: PortfolioCaseStudyPageProps) {
  const caseStudy = getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  if (caseStudy.layout === "hookline") {
    return <HooklineCaseStudy />;
  }

  return <PortfolioCaseStudyLayout caseStudy={caseStudy} />;
}
