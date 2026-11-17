"use client";

import React from "react";
import { Check, Cpu } from "lucide-react";
import { AISolution } from "@/data/aiSolutions";

interface SolutionFeaturesProps {
  solution: AISolution;
}

export default function SolutionFeatures({ solution }: SolutionFeaturesProps) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
          Engineered Capabilities
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Production Features &amp; System Capabilities
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
          Every implementation is tailored to your infrastructure requirements, data sovereignty policies, and operational tooling.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {solution.features.map((feature, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] hover:border-[var(--accent)]/40 transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--accent)] flex items-center justify-center mb-3.5">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--card-border)] text-[10px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-[var(--accent)]" />
              <span>Configurable Module</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
