"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Workflow,
  Search,
  BellRing,
  Video,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";
import { AISolution } from "@/data/aiSolutions";

const iconMap: Record<string, React.ElementType> = {
  "rag-knowledge-assistant": FileText,
  "ai-customer-support": MessageSquare,
  "business-process-automation": Workflow,
  "ai-document-intelligence": Search,
  "ai-monitoring-alert-management": BellRing,
  "ai-content-automation": Video,
};

interface SolutionCardProps {
  solution: AISolution;
}

export default function SolutionCard({ solution }: SolutionCardProps) {
  const [showUseCases, setShowUseCases] = useState(false);
  const Icon = iconMap[solution.slug] || Layers;

  return (
    <div className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] hover:border-[var(--accent)]/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between p-6 sm:p-7 relative group">
      
      {/* TOP HEADER & ICON */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--accent)] flex items-center justify-center group-hover:scale-105 group-hover:border-[var(--accent)]/40 transition-all">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--text-muted)] font-semibold">
            {solution.badge}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
          {solution.title}
        </h3>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed line-clamp-3">
          {solution.shortDesc}
        </p>

        {/* KEY HIGHLIGHTS / BENEFITS */}
        <div className="mt-5 space-y-2.5 pt-4 border-t border-[var(--card-border)]">
          {solution.keyBenefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[var(--text-primary)]">{benefit.title}: </span>
                <span className="text-[var(--text-secondary)]">{benefit.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE EXPANDABLE USE CASES PANEL */}
      <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex flex-col gap-3">
        
        <button
          type="button"
          onClick={() => setShowUseCases(!showUseCases)}
          className="w-full py-2 px-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--text-primary)] text-xs font-bold hover:bg-[var(--surface-muted)] transition-colors flex items-center justify-between cursor-pointer"
          aria-expanded={showUseCases}
        >
          <span className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showUseCases ? "Hide Real-World Scenarios" : "See Real-World Use Cases"}</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
              showUseCases ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {showUseCases && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] text-xs space-y-3 mt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block font-bold">
                  Target Deployments:
                </span>
                {solution.interactiveUseCases.map((useCase, idx) => (
                  <div key={idx} className="border-l-2 border-[var(--accent)] pl-2.5 space-y-1">
                    <span className="font-bold text-[var(--text-primary)] block">
                      {useCase.title}
                    </span>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                      <span className="text-[var(--text-muted)] font-medium">Action: </span>
                      {useCase.action}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULL DETAILS LINK */}
        <Link
          href={`/ai-solutions/${solution.slug}`}
          className="w-full py-2.5 px-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] text-[var(--text-primary)] border border-[var(--card-border)] hover:border-transparent font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-center group/btn"
        >
          <span>Explore Architecture &amp; Pricing</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
