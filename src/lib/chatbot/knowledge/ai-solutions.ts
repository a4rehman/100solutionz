import { aiSolutions } from "@/data/aiSolutions";

export const aiSolutionsKnowledge = aiSolutions.map((s) => ({
  slug: s.slug,
  title: s.title,
  shortTitle: s.shortTitle,
  badge: s.badge,
  shortDesc: s.shortDesc,
  heroHeadline: s.heroHeadline,
  heroSubhead: s.heroSubhead,
  keyBenefits: s.keyBenefits,
  features: s.features.map((f) => f.title),
  integrations: s.integrations.map((i) => i.name),
  targetIndustries: s.targetIndustries.map((t) => t.name),
  faqs: s.faqs,
  ctaLabel: s.ctaLabel,
  url: `/ai-solutions/${s.slug}`,
}));