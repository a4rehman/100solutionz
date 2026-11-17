"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Layers, ShieldCheck, Terminal, ArrowUpRight } from "lucide-react";

const rotatingServices = [
  "Autonomous Agentic AI",
  "Enterprise RAG Systems",
  "Scalable SaaS Platforms",
  "Native Mobile Applications",
  "Cloud & DevOps Infrastructure",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingServices.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[var(--secondary-accent)]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
        
        {/* Left Column: Brand Headline & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--surface-elevated)] text-[11px] font-semibold text-[var(--text-secondary)] shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
              Engineering Studio <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            </span>
            <span className="text-[var(--text-muted)] hidden sm:inline">&bull; Enterprise AI &amp; Web</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-[var(--text-primary)]">
            Building Intelligent <br className="hidden sm:inline" />
            <span className="text-gradient">Digital Experiences</span> <br />
            For Modern Enterprise.
          </h1>

          {/* Dynamic Service Tagline */}
          <div className="h-7 sm:h-8 flex items-center justify-center lg:justify-start overflow-hidden">
            <span className="text-xs sm:text-sm font-bold text-[var(--text-muted)] mr-2 uppercase tracking-wider">
              Specialized in:
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="text-xs sm:text-sm font-bold text-[var(--accent)]"
              >
                {rotatingServices[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl font-normal leading-relaxed">
            100Solutionz designs and builds high-throughput software products, autonomous multi-agent systems, secure enterprise RAG knowledge indexes, and native mobile applications that accelerate your business.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={openCalendly}
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 group"
            >
              Start Your Project
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold rounded-xl border border-[var(--card-border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] hover:border-[var(--secondary-accent)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              Explore Our Work
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--card-border)] w-full max-w-md text-left">
            <div>
              <div className="text-base sm:text-lg font-black text-[var(--text-primary)]">99.8%</div>
              <div className="text-[10px] text-[var(--text-muted)] font-medium">Sprint On-Time Rate</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-[var(--accent)]">Enterprise</div>
              <div className="text-[10px] text-[var(--text-muted)] font-medium">Grade Security</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-[var(--secondary-accent)]">24/7</div>
              <div className="text-[10px] text-[var(--text-muted)] font-medium">Engineering Support</div>
            </div>
          </div>

        </div>

        {/* Right Column: Architectural Software Visual Deck */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xl p-6 overflow-hidden">
            {/* Window header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)] mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <span className="text-[10px] font-mono text-[var(--text-muted)] ml-2">100solutionz-core-arch.ts</span>
              </div>
              <span className="text-[10px] font-semibold text-[var(--accent)] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                Active
              </span>
            </div>

            {/* Architecture Node Cards */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-muted)] text-[var(--accent)] shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-primary)]">Agentic AI Pipeline</span>
                    <span className="text-[10px] font-mono text-[var(--accent)]">GPT-4 / Claude</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                    Self-correcting routing, structured extraction, autonomous ticket workflows.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-muted)] text-[var(--secondary-accent)] shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-primary)]">Vector Index &amp; RAG</span>
                    <span className="text-[10px] font-mono text-[var(--secondary-accent)]">Qdrant / Pinecone</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                    Semantic document retrieval with strict access token isolation and RBAC.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-muted)] text-emerald-500 shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-primary)]">Web &amp; Cloud Mesh</span>
                    <span className="text-[10px] font-mono text-emerald-500">Next.js / AWS</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                    Sub-second SSR latency, microservices containerized on scalable clusters.
                  </p>
                </div>
              </div>
            </div>

            {/* Architecture Footer Status */}
            <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono">
              <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" /> End-to-End Encryption
              </span>
              <span>Latency: &lt; 250ms</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
