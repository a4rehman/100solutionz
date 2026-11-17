"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { AISolution } from "@/data/aiSolutions";

interface SolutionFAQProps {
  solution: AISolution;
}

export default function SolutionFAQ({ solution }: SolutionFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold flex items-center justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          Technical &amp; Commercial FAQ
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
          Clear answers regarding privacy, data ownership, integration timelines, and model governance.
        </p>
      </div>

      <div className="space-y-3">
        {solution.faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          const contentId = `faq-content-${idx}`;
          const buttonId = `faq-btn-${idx}`;

          return (
            <div
              key={idx}
              className="rounded-xl bg-[var(--surface)] border border-[var(--card-border)] overflow-hidden transition-colors"
            >
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--surface-elevated)] transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--card-border)] bg-[var(--surface-elevated)]"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
