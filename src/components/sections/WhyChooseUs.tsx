"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Cpu } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Integration & Deep Domain Engineering",
    desc: "We don't merely wrap external APIs. We design production-grade RAG pipelines with custom chunking, fine-tune models on domain terminology, and deploy autonomous multi-agent loops with automated self-correction.",
    gridArea: "md:col-span-2",
    tag: "Autonomous Systems",
    iconColor: "text-[var(--accent)]",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Data Security",
    desc: "Strict multi-tenant data segregation, SOC2 compliance roadmaps, end-to-end payload encryption, and role-based access controls protect corporate assets.",
    gridArea: "md:col-span-1",
    tag: "Confidentiality & Compliance",
    iconColor: "text-[var(--secondary-accent)]",
  },
  {
    icon: Zap,
    title: "Disciplined Agile Sprints",
    desc: "Two-week structured sprint cycles with bi-weekly demo builds, transparent GitHub boards, and direct Slack/Discord channels with senior engineers.",
    gridArea: "md:col-span-1",
    tag: "High Velocity",
    iconColor: "text-amber-500",
  },
  {
    icon: Globe,
    title: "Globally Scalable Architecture",
    desc: "Every system is architected for global traffic surges — utilizing edge CDN delivery, serverless elasticity, database pooling, and Kubernetes orchestration to scale seamlessly from thousands to millions of requests.",
    gridArea: "md:col-span-2",
    tag: "Infinite Scale",
    iconColor: "text-sky-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 bg-[var(--surface-elevated)] border-y border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--secondary-accent)]">
            The 100Solutionz Advantage
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 text-[var(--text-primary)] tracking-tight">
            Engineered for Precision &amp; Reliability
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
            We combine rigorous software engineering practices with cutting-edge artificial intelligence to deliver lasting competitive advantages.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className={`rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 shadow-sm hover:shadow-md hover:border-[var(--card-border)] transition-all flex flex-col justify-between ${feat.gridArea}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] ${feat.iconColor}`}>
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span>Verified Architecture</span>
                <span className="font-mono text-[var(--accent)] font-semibold">&bull; Production Grade</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
