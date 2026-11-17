"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight, Check, Award, Calendar } from "lucide-react";

import { portfolioProjects, type PortfolioProject as Project } from "@/data/portfolio";

const projects: Project[] = portfolioProjects;

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedProject]);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeFilter === "all" || p.category === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* 1. HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
          Case Studies &amp; Demonstrations
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Systems We Have <span className="text-gradient">Architected &amp; Launched</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          Explore representative production builds across autonomous AI agents, enterprise RAG systems, scalable web applications, and native mobile apps.
        </p>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[var(--card-border)]">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {[
            { id: "all", label: "All Projects" },
            { id: "ai", label: "AI & ML" },
            { id: "web", label: "Web & SaaS" },
            { id: "mobile", label: "Mobile Apps" },
            { id: "data", label: "Data Science" },
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

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by title or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[var(--surface)] border border-[var(--input-border)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] text-[var(--text-primary)] placeholder-[var(--text-muted)] cursor-text"
          />
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
        </div>

      </div>

      {/* 3. CASE STUDY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              layout
              key={proj.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              onClick={() => setSelectedProject(proj)}
              className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-5 shadow-xs hover:shadow-md hover:border-[var(--secondary-accent)]/50 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-full h-32 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] flex items-center justify-center mb-4 relative overflow-hidden">
                  <Award className="w-8 h-8 text-[var(--secondary-accent)] opacity-40 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-2 right-2 text-[9px] font-mono font-bold text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--card-border)] px-2 py-0.5 rounded">
                    Case Study
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider bg-[var(--selection-bg)] px-2 py-0.5 rounded">
                    {proj.categoryLabel}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--secondary-accent)] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-3">
                  {proj.desc}
                </p>
              </div>

              {/* Bottom technology tags */}
              <div className="mt-5 pt-3 border-t border-[var(--card-border)] flex flex-col gap-2.5">
                <div className="flex flex-wrap gap-1">
                  {proj.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-[9px] font-mono font-semibold text-[var(--text-muted)] bg-[var(--surface-muted)] px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 3 && (
                    <span className="text-[9px] text-[var(--text-muted)] font-bold">
                      +{proj.tech.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="text-[11px] font-bold text-[var(--accent)] flex items-center gap-1 group-hover:underline">
                  <span>Review Architecture &amp; Metrics</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="h-48 flex flex-col items-center justify-center border border-dashed border-[var(--card-border)] rounded-2xl text-xs text-[var(--text-muted)]">
          No case studies match your query. Try searching for &ldquo;AI&rdquo; or &ldquo;Next.js&rdquo;.
        </div>
      )}

      {/* 4. MODAL DETAILED DRAWER */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[var(--overlay-background)] backdrop-blur-xs"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Case Study Details"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 md:p-8 shadow-2xl z-10 overflow-y-auto max-h-[85vh]"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider bg-[var(--selection-bg)] px-2 py-0.5 rounded">
                  {selectedProject.categoryLabel}
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] mt-3">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--text-secondary)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className="mt-6 pt-5 border-t border-[var(--card-border)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  The Engineering Challenges
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                  {selectedProject.challenges}
                </p>
              </div>

              {/* Results */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Key Metrics &amp; Outcomes
                </h3>
                <div className="space-y-1.5">
                  {selectedProject.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-[var(--selection-bg)] text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="mt-5 pt-5 border-t border-[var(--card-border)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Client Perspective
                </h3>
                <blockquote className="text-xs text-[var(--text-primary)] leading-relaxed mt-2 font-medium italic border-l-2 border-[var(--accent)] pl-3">
                  &ldquo;{selectedProject.feedback.quote}&rdquo;
                </blockquote>
                <div className="text-[11px] text-[var(--text-muted)] mt-1.5 pl-3 font-semibold">
                  &mdash; {selectedProject.feedback.client}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    window.dispatchEvent(new CustomEvent("open-calendly"));
                  }}
                  className="px-5 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Discuss Similar Scope
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
