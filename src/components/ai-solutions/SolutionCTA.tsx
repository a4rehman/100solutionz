"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { AISolution, aiSolutions } from "@/data/aiSolutions";

interface SolutionCTAProps {
  solution: AISolution;
}

export default function SolutionCTA({ solution }: SolutionCTAProps) {
  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  const scrollToForm = () => {
    const el = document.getElementById("solution-inquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const relatedSolutions = aiSolutions.filter((s) =>
    solution.relatedSlugs.includes(s.slug)
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      
      {/* RELATED SOLUTIONS */}
      {relatedSolutions.length > 0 && (
        <div className="mb-14 pt-10 border-t border-[var(--card-border)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                Complementary Implementations
              </span>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                Explore Related AI Solutions
              </h3>
            </div>
            <Link
              href="/ai-solutions"
              className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All 6 Solutions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedSolutions.map((rel) => (
              <Link
                key={rel.slug}
                href={`/ai-solutions/${rel.slug}`}
                className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between group cursor-pointer shadow-xs"
              >
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block mb-1">
                    {rel.badge}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors block">
                    {rel.title}
                  </span>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                    {rel.shortDesc}
                  </p>
                </div>
                <div className="mt-3 pt-2 text-[11px] font-bold text-[var(--accent)] flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FINAL HIGH-CONVERSION BANNER */}
      <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--card-border)] p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ready to Deploy {solution.shortTitle}?</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          Let&apos;s Build Your Custom AI Architecture
        </h2>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 max-w-xl mx-auto leading-relaxed">
          Schedule an engineering architecture session or submit your requirements for an immediate scope evaluation and milestone estimate.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollToForm}
            className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={openCalendly}
            className="px-6 py-3.5 rounded-xl bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] border border-[var(--card-border)] font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[var(--secondary-accent)]" />
            <span>Schedule 30-Min Consultation</span>
          </button>
        </div>
      </div>

    </section>
  );
}
