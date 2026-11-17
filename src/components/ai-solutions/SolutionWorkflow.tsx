"use client";

import React from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { AISolution } from "@/data/aiSolutions";

interface SolutionWorkflowProps {
  solution: AISolution;
}

export default function SolutionWorkflow({ solution }: SolutionWorkflowProps) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--secondary-accent)] font-bold">
          System Architecture Flow
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          How the Pipeline Operates
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
          From incoming payload ingestion to validated business outcomes—here is the end-to-end execution path.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {solution.workflow.map((step, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] flex flex-col justify-between relative group hover:border-[var(--accent)]/50 transition-all shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-black font-mono text-[var(--accent)]">
                  {step.stepNumber}
                </span>
                <PlayCircle className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--card-border)]">
              <span className="text-[10px] uppercase font-mono text-[var(--text-muted)] block mb-0.5">
                Output
              </span>
              <span className="text-[11px] font-mono font-semibold text-[var(--text-primary)] block bg-[var(--surface-elevated)] px-2 py-1 rounded border border-[var(--card-border)]">
                {step.output}
              </span>
            </div>

            {idx < solution.workflow.length - 1 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[var(--text-muted)]">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
