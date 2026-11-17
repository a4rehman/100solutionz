"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "100Solutionz took our raw agentic AI requirements and developed a production-ready multi-agent system in record time. Their senior technical expertise in RAG databases and vector search was evident from day one.",
    author: "Dr. Sarah Jenkins",
    role: "VP of AI Operations",
    company: "Biotech Nexus Corp",
  },
  {
    quote: "The web portal they designed is a masterpiece. It integrates complex telemetry analytics, has extremely low latency, and handles our heavy user volume seamlessly. Our user retention surged within the first month.",
    author: "Marcello Russo",
    role: "Co-Founder & CEO",
    company: "Scribe SaaS Inc",
  },
  {
    quote: "Outstanding mobile and cloud engineering. They delivered our iOS and Android applications ahead of schedule, with zero critical bugs. Their sprint communication is the best I've experienced in 15 years.",
    author: "Amelie Dubois",
    role: "Product Director",
    company: "Fintech Flow Ltd",
  },
];

export default function HomeTestimonials() {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
            Client Perspectives
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 text-[var(--text-primary)] tracking-tight">
            Trusted by Technology Founders &amp; Leads
          </h2>
        </div>

        {/* Carousel Card Deck */}
        <div className="relative rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-10 shadow-sm flex flex-col justify-between min-h-[260px]">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <Quote className="w-8 h-8 text-[var(--card-border)] rotate-180" />
          </div>

          <blockquote className="text-sm sm:text-base text-[var(--text-primary)] font-medium leading-relaxed italic my-2">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--card-border)]">
            <div>
              <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                {t.author}
              </div>
              <div className="text-[11px] text-[var(--text-muted)] font-medium">
                {t.role} &bull; <span className="text-[var(--secondary-accent)]">{t.company}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevTestimonial}
                className="w-9 h-9 rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="w-9 h-9 rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
