import { companyKnowledge } from "./knowledge/company";
import { servicesKnowledge } from "./knowledge/services";
import { aiSolutionsKnowledge } from "./knowledge/ai-solutions";
import { portfolioKnowledge } from "./knowledge/portfolio";
import { aboutKnowledge } from "./knowledge/about";
import { faqKnowledge } from "./knowledge/faq";
import { careersKnowledge } from "./knowledge/careers";
import { blogKnowledge } from "./knowledge/blog";
import { contactKnowledge } from "./knowledge/contact";

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  url: string;
}

function chunk(id: string, category: string, title: string, content: string, url: string): KnowledgeChunk {
  return { id, category, title, content, url };
}

export function buildKnowledgeIndex(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // Company
  chunks.push(
    chunk(
      "company-overview",
      "company",
      "Company Overview",
      `${companyKnowledge.name} — ${companyKnowledge.description} Services: ${companyKnowledge.servicesOverview.join(", ")}.`,
      "/"
    ),
    chunk(
      "company-contact",
      "contact",
      "Contact Information",
      `Email ${companyKnowledge.contact.email}, phone ${companyKnowledge.contact.phone}, hours ${companyKnowledge.contact.hours}, locations ${companyKnowledge.contact.locations.join(", ")}.`,
      "/contact"
    ),
    chunk(
      "company-timelines",
      "company",
      "Project Timelines",
      `MVP or custom SaaS portal: ${companyKnowledge.typicalTimelines.mvp}. Comprehensive enterprise platforms: ${companyKnowledge.typicalTimelines.enterprise}. Sprint cadence: ${companyKnowledge.typicalTimelines.sprintCadence}.`,
      "/about"
    ),
    chunk("company-nda", "company", "NDA and IP", `${companyKnowledge.nda} ${companyKnowledge.ipOwnership}`, "/about"),
    chunk("company-support", "company", "Post-Launch Support", companyKnowledge.postLaunchSupport, "/about")
  );

  // Services
  for (const s of servicesKnowledge) {
    chunks.push(
      chunk(
        `service-${s.id}`,
        "services",
        s.label,
        `${s.title}. ${s.tagline} Sub-services: ${s.subServices.map((x) => `${x.name} — ${x.desc}`).join("; ")}. Technologies: ${s.tech.join(", ")}.`,
        `/services?tab=${s.id}`
      )
    );
  }

  // AI Solutions
  for (const s of aiSolutionsKnowledge) {
    chunks.push(
      chunk(
        `ai-solution-${s.slug}`,
        "ai-solutions",
        s.title,
        `${s.shortDesc} ${s.heroHeadline} ${s.heroSubhead} Benefits: ${s.keyBenefits.map((b) => `${b.title}: ${b.desc}`).join("; ")}. Integrations: ${s.integrations.join(", ")}. Industries: ${s.targetIndustries.join(", ")}.`,
        s.url
      )
    );
    for (const f of s.faqs) {
      chunks.push(chunk(`faq-${s.slug}-${f.question.slice(0, 20)}`, "faq", f.question, f.answer, s.url));
    }
  }

  // Portfolio
  for (const p of portfolioKnowledge) {
    chunks.push(
      chunk(
        `portfolio-${p.id}`,
        "portfolio",
        p.title,
        `${p.desc} Category: ${p.categoryLabel}. Technologies: ${p.tech.join(", ")}. Challenges: ${p.challenges}. Results: ${p.results.join("; ")}. Client feedback: "${p.feedback.quote}" — ${p.feedback.client}.`,
        p.url
      )
    );
  }

  // About
  chunks.push(
    chunk("about-intro", "about", "About 100Solutionz", aboutKnowledge.introduction + " " + aboutKnowledge.mission, "/about"),
    chunk("about-values", "about", "Company Values", aboutKnowledge.values.join(", "), "/about"),
    chunk(
      "about-team",
      "about",
      "Team",
      aboutKnowledge.team.map((t) => `${t.name} — ${t.role}`).join("; "),
      "/about"
    ),
    chunk(
      "about-milestones",
      "about",
      "Milestones",
      aboutKnowledge.milestones.map((m) => `${m.year}: ${m.title}`).join("; "),
      "/about"
    )
  );

  // FAQ
  for (const f of faqKnowledge) {
    chunks.push(chunk(`home-faq-${f.q.slice(0, 20)}`, "faq", f.q, f.a, "/"));
  }

  // Careers
  chunks.push(
    chunk(
      "careers-intro",
      "careers",
      "Careers",
      `${careersKnowledge.intro} Open positions: ${careersKnowledge.openPositions.map((j) => `${j.title} (${j.location}, ${j.salary})`).join("; ")}. Perks: ${careersKnowledge.perks.join("; ")}.`,
      "/careers"
    )
  );
  for (const j of careersKnowledge.openPositions) {
    chunks.push(
      chunk(
        `career-${j.title}`,
        "careers",
        j.title,
        `${j.title} — ${j.dept}. ${j.location}. ${j.type}. ${j.salary}. Requirements: ${j.requirements.join("; ")}.`,
        "/careers"
      )
    );
  }

  // Blog
  for (const b of blogKnowledge) {
    chunks.push(chunk(`blog-${b.title.slice(0, 20)}`, "blog", b.title, `Blog article: ${b.title}.`, b.url));
  }

  // Contact
  chunks.push(
    chunk(
      "contact-info",
      "contact",
      "Contact",
      `Email ${contactKnowledge.email}, phone ${contactKnowledge.phone}, hours ${contactKnowledge.hours}, locations ${contactKnowledge.locations.join(", ")}. ${contactKnowledge.consultation}`,
      "/contact"
    )
  );

  return chunks;
}

export const knowledgeIndex = buildKnowledgeIndex();