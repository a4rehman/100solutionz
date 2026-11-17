"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is Agentic AI and how does it benefit my business?",
    a: "Unlike standard chatbots that simply answer queries, Agentic AI acts as autonomous digital workers. Agents can parse complex goals (e.g., 'audit invoice discrepancies across multiple systems'), formulate multi-step execution plans, call internal databases and APIs, detect errors, and self-correct until the task is reliably resolved.",
  },
  {
    q: "How long does a typical software project take from start to finish?",
    a: "A focused Minimum Viable Product (MVP) or custom SaaS portal typically ships in 6 to 10 weeks. Comprehensive enterprise platforms with custom AI models, complex database migrations, and native mobile apps generally span 12 to 20 weeks. We work in disciplined two-week agile sprints with bi-weekly demo builds.",
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Yes, without exception. We sign mutual NDAs before reviewing any proprietary specifications, datasets, or business logic. All source code, intellectual property, infrastructure accounts, and documentation remain 100% owned by your company.",
  },
  {
    q: "Can you connect AI securely to our private corporate databases?",
    a: "Yes. We regularly build enterprise Retrieval-Augmented Generation (RAG) pipelines that connect directly to PostgreSQL, MySQL, MongoDB, and enterprise document repositories with role-based access control (RBAC), preventing hallucination and data leakage.",
  },
  {
    q: "What post-launch support and maintenance do you provide?",
    a: "We provide dedicated SLA-backed engineering retainers for continuous uptime monitoring, infrastructure autoscaling, security patches, framework upgrades, and continuous feature expansion.",
  },
];

interface FAQRowProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}

function FAQRow({ question, answer, isOpen, onToggle, id }: FAQRowProps) {
  return (
    <div className="border-b border-[var(--card-border)] pb-2">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="w-full flex items-center justify-between text-left py-4 transition-colors cursor-pointer group"
      >
        <span className="text-xs sm:text-sm font-bold flex items-center gap-2.5 text-[var(--text-primary)] group-hover:text-[var(--secondary-accent)] transition-colors">
          <HelpCircle className="w-4 h-4 text-[var(--accent)] shrink-0" />
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? "rotate-180 text-[var(--accent)]" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-6.5 pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 text-[var(--text-primary)] tracking-tight">
            Clear Answers to Common Questions
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3">
            Everything you need to know about our engineering engagements, IP ownership, and AI integrations.
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 shadow-xs">
          {faqs.map((faq, idx) => (
            <FAQRow
              key={faq.q}
              id={`faq-${idx}`}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
