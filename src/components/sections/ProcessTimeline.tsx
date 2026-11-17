"use client";

import React from "react";
import { Eye, Box, Wrench, Settings, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discovery & Strategic Alignment",
    desc: "We analyze target user flows, evaluate technical bottlenecks, audit dataset structures, and outline a strict product specification roadmap.",
    icon: Eye,
    tag: "Week 1",
  },
  {
    step: "02",
    title: "System & Architecture Design",
    desc: "We draft entity schemas, map microservice boundaries, select LLM layers, choose vector indexes, and design responsive UI component systems.",
    icon: Box,
    tag: "Week 2",
  },
  {
    step: "03",
    title: "Rapid Prototyping & Validation",
    desc: "We deploy an interactive frontend wireframe coupled with sandbox mock endpoints so stakeholders can test UX and workflow feasibility early.",
    icon: Wrench,
    tag: "Weeks 3-4",
  },
  {
    step: "04",
    title: "Sprint Production Engineering",
    desc: "Our developers engineer clean TypeScript/Next.js and Python codebases, setup automated CI/CD testing, and integrate backend APIs.",
    icon: Settings,
    tag: "Active Sprints",
  },
  {
    step: "05",
    title: "Auditing, Launch & Scalability",
    desc: "Comprehensive load testing, penetration auditing, latency optimization, and automated cloud autoscaling for uninterrupted production stability.",
    icon: Rocket,
    tag: "Production",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 bg-[var(--surface-elevated)] border-y border-[var(--card-border)]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
            Our Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 text-[var(--text-primary)] tracking-tight">
            How We Deliver Enterprise Projects
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
            A transparent, sprint-driven workflow designed to eliminate surprises, keep timelines predictable, and maintain engineering excellence.
          </p>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((st) => (
            <div
              key={st.step}
              className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-5 shadow-xs flex flex-col justify-between hover:border-[var(--secondary-accent)]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-black text-[var(--accent)] bg-[var(--selection-bg)] px-2.5 py-1 rounded-md">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--text-muted)]">
                    {st.tag}
                  </span>
                </div>

                <div className="w-9 h-9 rounded-lg bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--secondary-accent)] flex items-center justify-center mb-3">
                  <st.icon className="w-4 h-4" />
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                  {st.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--card-border)] text-[10px] text-[var(--text-muted)] font-medium">
                Phase Complete &rarr; Signed Review
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
