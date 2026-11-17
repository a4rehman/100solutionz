import { knowledgeIndex, type KnowledgeChunk } from "./knowledge-index";

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "to", "of", "in", "on", "at", "for", "with", "by", "from", "as", "and",
  "or", "but", "if", "then", "than", "so", "that", "this", "these", "those",
  "it", "its", "i", "you", "your", "we", "our", "they", "them", "their",
  "what", "which", "who", "whom", "whose", "when", "where", "why", "how",
  "can", "could", "should", "would", "do", "does", "did", "done", "have",
  "has", "had", "not", "no", "yes", "please", "me", "my", "about", "tell",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

export function searchWebsiteKnowledgeScored(query: string, limit = 6): { chunk: KnowledgeChunk; score: number }[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const q = query.toLowerCase();
  const scored = knowledgeIndex.map((chunk) => {
    const haystack = `${chunk.title} ${chunk.content} ${chunk.category}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      // word-boundary-ish token match
      const re = new RegExp(`\\b${t}\\b`, "i");
      if (re.test(haystack)) score += 4;
      else if (haystack.includes(t)) score += 1;
      if (chunk.title.toLowerCase().includes(t)) score += 3;
      if (chunk.category.toLowerCase().includes(t)) score += 1;
    }
    if (haystack.includes(q) && q.length > 4) score += 6;
    // Prefer overview chunks for broad queries
    if (chunk.id.endsWith("overview") && tokens.length <= 4) score += 3;
    // Penalize blog chunks unless blog explicitly asked
    if (chunk.category === "blog" && !q.includes("blog") && !q.includes("article")) score -= 4;
    if (chunk.category === "faq" && !q.includes("faq") && !q.includes("how") && !q.includes("what")) score -= 3;

    // Intent boosts for better relevance
    const ql = q;
    if (/(website|web|site|saas|platform|ecommerce|e-commerce|shop|store|clothing|retail)/.test(ql)) {
      if (chunk.id === "service-web") score += 8;
      if (chunk.id === "services-overview") score += 2;
      if (chunk.id === "portfolio-ecom-platform") score += 6;
    }
    if (/(mobile|app|ios|android|react native|flutter)/.test(ql)) {
      if (chunk.id === "service-mobile") score += 8;
      if (chunk.id === "services-overview") score += 2;
      if (chunk.id === "portfolio-mobile-app") score += 6;
    }
    if (/(ai|chatbot|agent|rag|document|intelligen|automation|workflow|support)/.test(ql)) {
      if (chunk.id === "service-ai") score += 8;
      if (chunk.id.startsWith("ai-solution-")) score += 4;
      if (chunk.id === "portfolio-ai-chatbot" || chunk.id === "portfolio-rag-app") score += 4;
    }
    if (/(data|dashboard|analytics|bi|forecast)/.test(ql)) {
      if (chunk.id === "service-data") score += 8;
      if (chunk.id === "portfolio-dashboard") score += 6;
    }
    if (/(cloud|devops|kubernetes|docker|aws|azure|gcp|infra)/.test(ql)) {
      if (chunk.id === "service-cloud") score += 8;
    }
    if (/(contact|email|phone|consult|quote|price|cost|timeline|nda)/.test(ql)) {
      if (chunk.id === "company-contact" || chunk.id === "contact-info") score += 8;
      if (chunk.id === "company-timelines" || chunk.id === "company-nda") score += 6;
    }
    if (/(portfolio|project|case study|work)/.test(ql)) {
      if (chunk.id === "portfolio-overview") score += 10;
      if (chunk.id.startsWith("portfolio-")) score += 6;
    }

    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function searchWebsiteKnowledge(query: string, limit = 6): KnowledgeChunk[] {
  return searchWebsiteKnowledgeScored(query, limit).map((s) => s.chunk);
}

export function getSources(chunks: KnowledgeChunk[]): { title: string; url: string }[] {
  const seen = new Set<string>();
  const out: { title: string; url: string }[] = [];
  for (const c of chunks) {
    const key = `${c.title}|${c.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ title: c.title, url: c.url });
  }
  return out;
}