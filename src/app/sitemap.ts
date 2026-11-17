import type { MetadataRoute } from "next";
import { getAllAISolutionSlugs } from "@/data/aiSolutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://100solutionz.com";
  const coreRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/ai-solutions",
    "/careers",
    "/blog",
    "/contact",
  ];

  const aiSolutionRoutes = getAllAISolutionSlugs().map(
    (slug) => `/ai-solutions/${slug}`
  );

  const allRoutes = [...coreRoutes, ...aiSolutionRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/ai-solutions") ? 0.9 : 0.8,
  }));
}
