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

export function searchWebsiteKnowledge(query: string, limit = 6): KnowledgeChunk[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = knowledgeIndex.map((chunk) => {
    const haystack = `${chunk.title} ${chunk.content} ${chunk.category}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (haystack.includes(t)) score += 2;
      // title boost
      if (chunk.title.toLowerCase().includes(t)) score += 3;
      // category boost
      if (chunk.category.toLowerCase().includes(t)) score += 1;
    }
    // phrase boost
    const q = query.toLowerCase();
    if (haystack.includes(q) && q.length > 4) score += 5;
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.chunk);
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