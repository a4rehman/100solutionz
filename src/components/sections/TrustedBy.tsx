"use client";

import React from "react";
import { motion } from "framer-motion";

const technologies = [
  "OpenAI GPT-4",
  "Anthropic Claude",
  "Amazon AWS",
  "Google Cloud",
  "Next.js",
  "React 19",
  "Tailwind CSS",
  "Docker & K8s",
  "PostgreSQL",
  "Pinecone",
];

export default function TrustedBy() {
  const listItems = [...technologies, ...technologies];

  return (
    <section className="py-8 border-y border-[var(--card-border)] bg-[var(--surface-elevated)] relative overflow-hidden z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 text-center mb-4">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--text-muted)]">
          Technologies We Engineer &amp; Integrate With
        </span>
      </div>

      <div className="flex w-full overflow-hidden select-none mask-gradient">
        <motion.div
          className="flex gap-12 whitespace-nowrap min-w-full"
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 22,
            repeat: Infinity,
          }}
        >
          {listItems.map((tech, idx) => (
            <div
              key={`${tech}-${idx}`}
              className="text-xs sm:text-sm font-bold tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mr-2 opacity-60" />
              {tech}
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}
