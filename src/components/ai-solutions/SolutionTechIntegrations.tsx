"use client";

import React from "react";
import { Plug, Layers, Info } from "lucide-react";
import { AISolution } from "@/data/aiSolutions";

interface SolutionTechIntegrationsProps {
  solution: AISolution;
}

export default function SolutionTechIntegrations({ solution }: SolutionTechIntegrationsProps) {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* TECH STACK POSSIBILITIES */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--accent)] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Technology Stack Possibilities
              </h2>
            </div>
            
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
              We select optimal models, databases, and microservices based on your speed, security, and hosting requirements.
            </p>

            <div className="space-y-4">
              {solution.technologyPossibilities.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)]">
                  <span className="text-[11px] font-mono font-bold text-[var(--accent)] uppercase tracking-wider block mb-2">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--card-border)] text-xs font-medium text-[var(--text-primary)] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-start gap-2 text-[11px] text-[var(--text-muted)] leading-relaxed">
            <Info className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
            <span>Technologies are selected based on your technical roadmap, budget, and data sovereignty policies.</span>
          </div>
        </div>

        {/* INTEGRATIONS */}
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--secondary-accent)] flex items-center justify-center">
                <Plug className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Ecosystem &amp; API Integrations
              </h2>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
              Seamless connections with the platforms and software tools your team already uses every day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {solution.integrations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] hover:border-[var(--secondary-accent)]/40 transition-colors"
                >
                  <span className="text-xs font-bold text-[var(--text-primary)] block">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 block leading-snug">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--card-border)] text-[11px] text-[var(--text-muted)]">
            Custom REST, GraphQL, SFTP &amp; WebSocket connectors available on demand.
          </div>
        </div>

      </div>
    </section>
  );
}
