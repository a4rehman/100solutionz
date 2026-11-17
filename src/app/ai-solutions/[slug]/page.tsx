import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAISolutionBySlug, getAllAISolutionSlugs } from "@/data/aiSolutions";
import SolutionHero from "@/components/ai-solutions/SolutionHero";
import SolutionProblemSolution from "@/components/ai-solutions/SolutionProblemSolution";
import SolutionFeatures from "@/components/ai-solutions/SolutionFeatures";
import SolutionWorkflow from "@/components/ai-solutions/SolutionWorkflow";
import SolutionTechIntegrations from "@/components/ai-solutions/SolutionTechIntegrations";
import SolutionUseCases from "@/components/ai-solutions/SolutionUseCases";
import SolutionFAQ from "@/components/ai-solutions/SolutionFAQ";
import SolutionInquiryForm from "@/components/ai-solutions/SolutionInquiryForm";
import SolutionCTA from "@/components/ai-solutions/SolutionCTA";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllAISolutionSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getAISolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Solution Not Found | 100Solutionz",
    };
  }

  const title = `${solution.title} | 100Solutionz AI Solutions`;
  const description = `${solution.shortDesc} Custom engineered and deployed by 100Solutionz for US, UK & Canadian businesses.`;
  const url = `https://100solutionz.com/ai-solutions/${solution.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "100Solutionz",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AISolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getAISolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full relative z-10">
      {/* 1. Hero */}
      <SolutionHero solution={solution} />

      {/* 2. Problem Statement vs Engineered Solution */}
      <SolutionProblemSolution solution={solution} />

      {/* 3. Detailed Features */}
      <SolutionFeatures solution={solution} />

      {/* 4. Execution Workflow */}
      <SolutionWorkflow solution={solution} />

      {/* 5. Technology Stack & Integrations */}
      <SolutionTechIntegrations solution={solution} />

      {/* 6. Target Industries & Interactive Scenarios */}
      <SolutionUseCases solution={solution} />

      {/* 7. Technical & Commercial FAQs */}
      <SolutionFAQ solution={solution} />

      {/* 8. Reusable Inquiry & Proposal Form */}
      <SolutionInquiryForm initialSolutionSlug={solution.slug} />

      {/* 9. Related Solutions & Consultation CTA */}
      <SolutionCTA solution={solution} />
    </div>
  );
}
