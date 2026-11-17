"use client";

import React from "react";
import { AlertCircle, CheckCircle, ShieldCheck } from "lucide-react";
import { AISolution } from "@/data/aiSolutions";

interface SolutionProblemSolutionProps {
  solution: AISolution;
}

export default function SolutionProblemSolution({ solution }: SolutionProblemSolutionProps) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* PROBLEM COLUMN */}
        <div className="p-7 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-mono font-bold mb-4">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>The Operational Bottleneck</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {solution.problem.headline}
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
              {solution.problem.description}
            </p>

            <div className="mt-6 space-y-3 pt-5 border-t border-[var(--card-border)]">
              {solution.problem.painPoints.map((pain, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {pain}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--card-border)] text-[10px] font-mono text-[var(--text-muted)]">
            Status Quo: Manual, Error-Prone &amp; Slow
          </div>
        </div>

        {/* SOLUTION COLUMN */}
        <div className="p-7 sm:p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--accent)]/40 flex flex-col justify-between shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-[11px] font-mono font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The 100Solutionz Engineering Approach</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {solution.proposedSolution.headline}
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
              {solution.proposedSolution.description}
            </p>

            <div className="mt-6 space-y-3 pt-5 border-t border-[var(--card-border)]">
              {solution.proposedSolution.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[var(--text-primary)] leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--card-border)] text-[10px] font-mono text-[var(--accent)] font-semibold">
            Outcome: Automated, Grounded &amp; Production-Grade
          </div>
        </div>

      </div>
    </section>
  );
}
