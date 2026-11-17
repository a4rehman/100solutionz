"use client";

import React, { useState } from "react";
import { Building2, Sparkles } from "lucide-react";
import { AISolution } from "@/data/aiSolutions";

interface SolutionUseCasesProps {
  solution: AISolution;
}

export default function SolutionUseCases({ solution }: SolutionUseCasesProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      
      {/* 1. TARGET INDUSTRIES SECTION */}
      <div className="mb-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
            Industry Applications
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
            Tailored for High-Impact Business Sectors
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
            See how different business models deploy this architecture to achieve measurable operational ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solution.targetIndustries.map((ind, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] hover:border-[var(--accent)]/40 transition-all shadow-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-xs font-bold text-[var(--text-primary)]">
                  {ind.name}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {ind.useCase}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. INTERACTIVE REAL-WORLD SCENARIO WALKTHROUGH */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--secondary-accent)] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Scenario Walkthrough
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-1.5">
            Real-World Production Scenarios
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Click a scenario below to inspect how the system evaluates inputs, takes action, and delivers verified outcomes.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {solution.interactiveUseCases.map((uc, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] border-transparent shadow-xs"
                    : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--card-border)] hover:text-[var(--text-primary)]"
                }`}
              >
                {uc.title}
              </button>
            );
          })}
        </div>

        {/* Active Scenario Display Card */}
        {solution.interactiveUseCases[selectedIdx] && (
          <div className="rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] p-5 sm:p-6 space-y-4">
            
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block mb-1">
                [1] Inbound Scenario Trigger:
              </span>
              <p className="text-sm font-semibold text-[var(--text-primary)] bg-[var(--surface)] p-3 rounded-lg border border-[var(--card-border)]">
                &ldquo;{solution.interactiveUseCases[selectedIdx].scenario}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--card-border)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--secondary-accent)] font-bold block mb-1">
                  [2] Pipeline Execution:
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {solution.interactiveUseCases[selectedIdx].action}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--selection-bg)] border border-[var(--accent)]/40">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold block mb-1">
                  [3] Verified Business Outcome:
                </span>
                <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed">
                  {solution.interactiveUseCases[selectedIdx].outcome}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
