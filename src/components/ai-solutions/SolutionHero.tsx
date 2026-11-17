"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Calendar, ArrowDown, Sparkles } from "lucide-react";
import { AISolution } from "@/data/aiSolutions";

interface SolutionHeroProps {
  solution: AISolution;
}

export default function SolutionHero({ solution }: SolutionHeroProps) {
  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  const scrollToForm = () => {
    const el = document.getElementById("solution-inquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      
      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/ai-solutions" className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
          AI Solutions
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--text-primary)] font-semibold truncate max-w-[200px] sm:max-w-none">
          {solution.shortTitle}
        </span>
      </nav>

      {/* HERO BADGE & HEADLINE */}
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--card-border)] text-xs font-mono text-[var(--accent)] font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Productized Engineering Implementation</span>
          <span className="text-[var(--text-muted)]">&bull;</span>
          <span className="text-[var(--text-secondary)]">{solution.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.1]">
          {solution.heroHeadline}
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-5 leading-relaxed max-w-3xl">
          {solution.heroSubhead}
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <button
            type="button"
            onClick={scrollToForm}
            className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span>{solution.ctaLabel}</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={openCalendly}
            className="px-6 py-3.5 rounded-xl bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] border border-[var(--card-border)] font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[var(--secondary-accent)]" />
            <span>Book Architecture Consultation</span>
          </button>
        </div>

        {/* BENEFIT HIGHLIGHT PILLS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[var(--card-border)]">
          {solution.keyBenefits.map((b, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--card-border)]">
              <span className="text-xs font-bold text-[var(--text-primary)] block">
                {b.title}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] mt-1 block leading-snug">
                {b.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
