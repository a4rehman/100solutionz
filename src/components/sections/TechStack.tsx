"use client";

import React, { useState } from "react";
import { Cpu, Terminal, Layers } from "lucide-react";

const techCategories = [
  {
    id: "ai",
    label: "AI & Data Science",
    icon: Cpu,
    items: [
      { name: "OpenAI GPT-4o", level: "Autonomous reasoning & function calling" },
      { name: "Anthropic Claude 3.5", level: "Complex code generation & document parsing" },
      { name: "LangChain & LlamaIndex", level: "Multi-agent pipelines & RAG ingestion" },
      { name: "Qdrant & Pinecone", level: "Enterprise vector storage & indexing" },
      { name: "PyTorch & HuggingFace", level: "Fine-tuning & custom model weights" },
      { name: "FastAPI & Python", level: "Asynchronous high-load model serving" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & Mobile",
    icon: Layers,
    items: [
      { name: "Next.js 16 (App Router)", level: "Server-side rendering & dynamic streaming" },
      { name: "React 19 & TypeScript", level: "Type-safe UI architecture & state management" },
      { name: "Tailwind CSS v4", level: "Design systems & accessible styling" },
      { name: "React Native & Flutter", level: "High-performance iOS & Android applications" },
      { name: "SwiftUI & Kotlin", level: "Native platform modules & background sync" },
      { name: "Framer Motion", level: "Purposeful micro-interactions & transitions" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Cloud Infrastructure",
    icon: Terminal,
    items: [
      { name: "Amazon Web Services (AWS)", level: "EKS, Lambda, S3, RDS, CloudFront" },
      { name: "Google Cloud Platform (GCP)", level: "Kubernetes Engine, Vertex AI, BigQuery" },
      { name: "Docker & Kubernetes", level: "Container clustering & autoscaling" },
      { name: "PostgreSQL & Redis", level: "Relational persistence & in-memory caching" },
      { name: "Terraform & IaC", level: "Reproducible multi-environment provisioning" },
      { name: "GitHub Actions", level: "Automated linting, testing, and CI/CD" },
    ],
  },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("ai");

  const currentCategory = techCategories.find((c) => c.id === activeTab) || techCategories[0];

  return (
    <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 bg-[var(--surface-elevated)] border-y border-[var(--card-border)]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--secondary-accent)]">
            Our Technology Stack
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 text-[var(--text-primary)] tracking-tight">
            Battle-Tested Modern Technologies
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
            We deliberately choose proven, stable, and high-performance tools that guarantee long-term maintainability.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {techCategories.map((cat) => {
            const isSelected = activeTab === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-xs"
                    : "bg-[var(--surface)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentCategory.items.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[var(--text-primary)] block">
                  {item.name}
                </span>
                <span className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug block">
                  {item.level}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-[var(--card-border)] flex items-center gap-1.5 text-[9px] font-mono text-[var(--accent)] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                Production Ready
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
