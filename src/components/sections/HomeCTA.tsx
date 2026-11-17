"use client";

import React from "react";
import { ArrowRight, Sparkles, Mail, ShieldCheck } from "lucide-react";

export default function HomeCTA() {
  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  return (
    <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 bg-[var(--surface-elevated)] border-t border-[var(--card-border)]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-8 sm:p-14 shadow-lg">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--selection-bg)] text-[var(--accent)] text-xs font-bold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Elevate Your Technology?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
            Let&apos;s Build Something <span className="text-gradient">Extraordinary</span> Together.
          </h2>
          
          <p className="text-xs sm:text-base text-[var(--text-secondary)] mt-4 max-w-xl mx-auto leading-relaxed">
            Schedule a technical roadmapping call with our engineering leadership. We&apos;ll evaluate your architecture, discuss AI feasibility, and map out a delivery timeline.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={openCalendly}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 group"
            >
              Schedule Technical Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="mailto:live40220@gmail.com"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-[var(--text-primary)] text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[var(--secondary-accent)]" />
              live40220@gmail.com
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--card-border)] flex flex-wrap items-center justify-center gap-6 text-[11px] text-[var(--text-muted)] font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" /> 100% Confidential NDAs
            </span>
            <span>&bull;</span>
            <span>No Obligation Architecture Review</span>
            <span>&bull;</span>
            <span>Direct Access to Senior Engineers</span>
          </div>

        </div>
      </div>
    </section>
  );
}
