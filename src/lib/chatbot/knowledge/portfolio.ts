import { portfolioProjects } from "@/data/portfolio";

export const portfolioKnowledge = portfolioProjects.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  categoryLabel: p.categoryLabel,
  desc: p.desc,
  tech: p.tech,
  challenges: p.challenges,
  results: p.results,
  feedback: p.feedback,
  url: `/portfolio`,
}));