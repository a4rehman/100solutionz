"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, X, Sparkles, BookOpen } from "lucide-react";

interface Post {
  id: string;
  title: string;
  category: "ai" | "web" | "cloud";
  categoryLabel: string;
  date: string;
  readTime: string;
  desc: string;
  tags: string[];
  featured?: boolean;
  content: string;
}

const blogPosts: Post[] = [
  {
    id: "agentic-ai",
    title: "The Rise of Agentic AI: Moving Beyond Simple LLM API Wrappers",
    category: "ai",
    categoryLabel: "AI & ML",
    date: "June 18, 2026",
    readTime: "6 Min Read",
    desc: "Why static prompts fail in production and how to architect autonomous agent pipelines that self-correct, execute tools, and handle errors.",
    tags: ["Agentic AI", "LLM Pipelines", "Automation"],
    featured: true,
    content: `
### Why Static Prompt Wrappers Fail
Static prompt wrappers lack recursive feedback. When an LLM generates a malformed database query or inaccurate payload, traditional wrappers crash without retry loops.

### The Solution: Agentic Reasoning Loops
Agentic loops use a continuous cycle of **Thought-Action-Observation**:
1. **Thought:** The agent formulates which parameters and tools are required.
2. **Action:** The agent executes an isolated tool call (e.g., querying transactional SQL).
3. **Observation:** The environment feeds tool return data back into the LLM context.
4. **Self-Correction:** If an action fails or returns empty, the agent explores alternate reasoning paths.

\`\`\`python
# Example Agent Execution Loop
def run_agent_loop(goal: str):
    agent = AgentContext(goal)
    while not agent.is_complete and agent.step_count < MAX_STEPS:
        thought = llm.plan(agent.history)
        action = tool_parser.parse(thought)
        observation = execute_tool(action)
        agent.update(thought, observation)
    return agent.get_final_summary()
\`\`\`

### Key Production Takeaways
By orchestrating autonomous reasoning paths with strict boundary guards, engineering teams can build reliable support automation, document triage, and enterprise data workflows.
`
  },
  {
    id: "react-19-next-16",
    title: "How React 19 and Next.js 16 Optimize Core Web Vitals Automatically",
    category: "web",
    categoryLabel: "Web Dev",
    date: "June 12, 2026",
    readTime: "5 Min Read",
    desc: "A deep dive into Server Actions, Turbopack compiling, automated asset preloading, and dynamic streaming configurations.",
    tags: ["React 19", "Next.js 16", "Performance"],
    content: `
### React Compiler & Automatic Memoization
React 19 compiles components under the hood, eliminating the need for manual \`useMemo\` and \`useCallback\` hooks while preserving render isolation.

### Next.js 16 App Router Server Actions
Server actions enable form mutations directly to database backends without requiring boilerplate REST endpoints:
- Eliminates manual fetch wiring.
- Built-in pending and optimistic UI states.
- Fully end-to-end type safety from database to client.

\`\`\`typescript
// Server Action Example
"use server";

export async function submitConsultation(formData: FormData) {
  const email = formData.get("email");
  await db.leads.insert({ email, createdAt: new Date() });
  return { success: true };
}
\`\`\`

### Asset Optimization & Streaming
Next.js 16 automatically preloads critical styles and font subsets, significantly improving Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).
`
  },
  {
    id: "rag-contract-extraction",
    title: "Enterprise RAG: Indexing 50k PDF Documents with Zero Leakage",
    category: "ai",
    categoryLabel: "AI & ML",
    date: "May 28, 2026",
    readTime: "8 Min Read",
    desc: "How we configured vector storage metadata partitions to isolate user access and chunked tables with high semantic precision.",
    tags: ["RAG Systems", "Vector Databases", "Qdrant"],
    content: `
### Overcoming Context Dilution at Scale
Ingesting large corporate repositories into naive vector stores leads to semantic dilution. Searching a multi-page document often yields disparate, irrelevant fragments.

### Tenant Isolation & Metadata Filtering
To prevent data leakage across organizational boundaries, vector chunks must carry immutable tenant identifiers:
- **Tenant ID:** Ensures users only query documents within their authorization boundary.
- **Section Headers:** Boosts semantic match scores when queries align with document chapters.

\`\`\`typescript
// Qdrant Isolated Vector Search
const searchResults = await qdrant.search({
  collection: "corporate_contracts",
  vector: queryEmbedding,
  filter: {
    must: [{ key: "tenant_id", match: { value: "enterprise_org_102" } }]
  }
});
\`\`\`
`
  },
  {
    id: "devops-edge-gateways",
    title: "Optimizing Microservices via Serverless Edge Gateways",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    date: "May 15, 2026",
    readTime: "7 Min Read",
    desc: "Configure edge routing scripts to filter traffic, cache API responses, and run rate limits before hitting Kubernetes nodes.",
    tags: ["DevOps", "Edge Functions", "AWS"],
    content: `
### What is Edge Ingress?
Edge Ingress executes lightweight compute logic at distributed CDN locations before requests hit internal container clusters.

### Rate Limiting at the Edge
By filtering abusive requests, scrapers, and DDoS surges at the CDN perimeter, you protect database pools and reduce cloud compute costs:
1. Client request lands on edge point of presence.
2. Edge validates cryptographic JWT token and rate limit counter.
3. If valid, request is forwarded through low-latency private VPC mesh.
`
  }
];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [readingPost, setReadingPost] = useState<Post | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesFilter = activeFilter === "all" || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredPost = blogPosts.find((p) => p.featured);

  return (
    <div className="flex flex-col w-full relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* 1. HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
          Engineering Insights
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Technical Articles &amp; <span className="text-gradient">Architectural Guides</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          Deep dives from our engineering leads on autonomous AI pipelines, Next.js performance, RAG vector indexing, and scalable cloud topologies.
        </p>
      </div>

      {/* 2. FEATURED ARTICLE BANNER */}
      {featuredPost && activeFilter === "all" && !searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setReadingPost(featuredPost)}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-8 shadow-xs hover:border-[var(--secondary-accent)]/50 transition-all cursor-pointer mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group"
        >
          <div className="lg:col-span-5 h-44 sm:h-48 w-full rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-[var(--secondary-accent)] opacity-60 group-hover:scale-105 transition-transform" />
          </div>
          
          <div className="lg:col-span-7 flex flex-col gap-2.5">
            <span className="inline-flex max-w-max items-center gap-1 text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider bg-[var(--selection-bg)] px-2.5 py-0.5 rounded">
              <Sparkles className="w-3 h-3" /> Featured Article
            </span>
            <h2 className="text-base sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--secondary-accent)] transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {featuredPost.desc}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)] mt-1 font-medium">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. SEARCH & FILTERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-5 border-b border-[var(--card-border)]">
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {[
            { id: "all", label: "All Insights" },
            { id: "ai", label: "AI & ML" },
            { id: "web", label: "Web Dev" },
            { id: "cloud", label: "Cloud & DevOps" },
          ].map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)] shadow-xs"
                    : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--card-border)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
          />
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
        </div>

      </div>

      {/* 4. POSTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, idx) => (
            <motion.div
              layout
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              onClick={() => setReadingPost(post)}
              className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-5 shadow-xs hover:border-[var(--secondary-accent)]/50 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-full h-28 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-[var(--secondary-accent)] opacity-50 group-hover:scale-105 transition-transform" />
                </div>

                <div className="flex items-center justify-between mb-2 text-[10px] font-bold">
                  <span className="text-[var(--accent)] uppercase tracking-wider bg-[var(--selection-bg)] px-2 py-0.5 rounded">
                    {post.categoryLabel}
                  </span>
                  <span className="text-[var(--text-muted)]">{post.readTime}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--secondary-accent)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed line-clamp-3">
                  {post.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--card-border)] text-[11px] font-bold text-[var(--accent)] flex items-center justify-between group-hover:underline">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <div className="h-44 flex flex-col items-center justify-center border border-dashed border-[var(--card-border)] rounded-2xl text-xs text-[var(--text-muted)]">
          No articles match your search parameters.
        </div>
      )}

      {/* 5. ARTICLE READING MODAL */}
      <AnimatePresence>
        {readingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingPost(null)}
              className="fixed inset-0 bg-[var(--overlay-background)] backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 md:p-8 shadow-2xl z-10 overflow-y-auto max-h-[85vh]"
            >
              <button
                type="button"
                onClick={() => setReadingPost(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider bg-[var(--selection-bg)] px-2 py-0.5 rounded">
                  {readingPost.categoryLabel}
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] mt-2 leading-snug">
                  {readingPost.title}
                </h2>
                <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)] mt-2 font-semibold">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {readingPost.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readingPost.readTime}</span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-[var(--card-border)] text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] space-y-3.5">
                {readingPost.content.split("\n\n").map((para, i) => {
                  if (para.trim().startsWith("###")) {
                    return (
                      <h3 key={i} className="text-sm font-bold text-[var(--text-primary)] mt-3">
                        {para.replace("###", "").trim()}
                      </h3>
                    );
                  }
                  
                  if (para.trim().startsWith("```")) {
                    const cleanCode = para.replace(/```[a-z]*/g, "").trim();
                    return (
                      <pre key={i} className="p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] font-mono text-[11px] text-[var(--text-primary)] overflow-x-auto leading-relaxed">
                        <code>{cleanCode}</code>
                      </pre>
                    );
                  }

                  if (para.trim().startsWith("-")) {
                    const bulletItems = para.trim().split("\n");
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1 text-xs">
                        {bulletItems.map((li, idx) => (
                          <li key={idx}>{li.replace("-", "").trim()}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {para.trim()}
                    </p>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setReadingPost(null)}
                  className="px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Close Article
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReadingPost(null);
                    window.dispatchEvent(new CustomEvent("open-calendly"));
                  }}
                  className="px-5 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs"
                >
                  Consult Authors
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
