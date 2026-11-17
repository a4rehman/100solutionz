"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code, Smartphone, BarChart3, Cloud, Check, ArrowRight, Calendar } from "lucide-react";

const serviceDetails = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    icon: Sparkles,
    title: "Enterprise Artificial Intelligence & Autonomous Systems",
    tagline: "Supercharge workflows with semantic indexing, natural dialogue, and autonomous agent loops.",
    subServices: [
      { name: "Autonomous AI Agents", desc: "Multi-agent pipelines that retrieve data, execute external APIs, and self-correct." },
      { name: "Enterprise RAG Architectures", desc: "Connect LLMs safely to your corporate databases and documentation with zero training leakage." },
      { name: "Fine-Tuned Domain Models", desc: "Custom model weights optimized for domain terminology, compliance, and reduced inference cost." },
      { name: "Computer Vision & OCR", desc: "Document entity parsing, contract analysis, and real-time visual inspection." },
      { name: "Natural Language Processing (NLP)", desc: "Sentiment analysis, entity extraction, auto-summarization, and multi-lingual translation." }
    ],
    tech: ["GPT-4o", "Claude 3.5 Sonnet", "LangChain", "LlamaIndex", "Pinecone", "Qdrant", "FastAPI"],
    color: "text-[var(--accent)]"
  },
  {
    id: "web",
    label: "Web & SaaS Development",
    icon: Code,
    title: "High-Performance Web Platforms & SaaS Architectures",
    tagline: "Scalable frontend structures combined with high-throughput database endpoints.",
    subServices: [
      { name: "Multi-Tenant SaaS Dashboards", desc: "Subscription billing, team organizations, usage analytics, and role-based permissions." },
      { name: "Corporate & Marketing Portals", desc: "Fast-loading landing experiences with modern typography, dynamic animations, and complete SEO." },
      { name: "Custom E-Commerce Engines", desc: "Multi-currency checkout pipelines, automated warehouse sync, and headless architectures." }
    ],
    tech: ["Next.js 16 (Turbopack)", "React 19", "TypeScript", "Tailwind CSS v4", "Node.js", "PostgreSQL"],
    color: "text-[var(--secondary-accent)]"
  },
  {
    id: "mobile",
    label: "Mobile Development",
    icon: Smartphone,
    title: "Native & Cross-Platform Mobile Applications",
    tagline: "Fluid gesture tracking, offline synchronization, and native ecosystem integrations.",
    subServices: [
      { name: "Native iOS Applications", desc: "Swift & SwiftUI engineering optimized for performance, widgets, and background sync." },
      { name: "Native Android Applications", desc: "Kotlin architectures built with modern Material guidelines and robust services." },
      { name: "Cross-Platform Frameworks", desc: "High-efficiency React Native or Flutter setups to target iOS and Android with unified code." }
    ],
    tech: ["React Native", "Flutter", "SwiftUI", "Kotlin", "Firebase", "SQLite", "GraphQL"],
    color: "text-emerald-500"
  },
  {
    id: "data",
    label: "Data Science & BI",
    icon: BarChart3,
    title: "Advanced Business Intelligence & Predictive Analytics",
    tagline: "Aggregate unstructured events into metrics boards and predictive analytics models.",
    subServices: [
      { name: "Interactive Business Dashboards", desc: "React analytics visual decks connecting directly to internal server databases." },
      { name: "Predictive Analytics & Forecasting", desc: "Machine learning algorithms modeling customer churn, revenue projections, and demand." },
      { name: "Automated Data Ingestion Pipelines", desc: "Scrapers and ETL data channels compiling disparate databases into unified lakes." }
    ],
    tech: ["Python", "Pandas & NumPy", "Apache Kafka", "PostgreSQL", "Snowflake", "Chart.js"],
    color: "text-amber-500"
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: Cloud,
    title: "Scalable Cloud Hosting & Automated CI/CD Infrastructure",
    tagline: "Infrastructure as Code, dockerized containers, and horizontal auto-scalers.",
    subServices: [
      { name: "Cloud Architecture (AWS / GCP / Azure)", desc: "High-availability networks, serverless edge functions, and secure firewalls." },
      { name: "DevOps CI/CD Automation", desc: "GitHub Actions, automated test runs, linting gates, and zero-downtime releases." },
      { name: "Kubernetes Container Clustering", desc: "Self-healing Docker stacks with dynamic ingress routing and resource caps." }
    ],
    tech: ["AWS (EKS, RDS, S3)", "Google Cloud", "Docker & Kubernetes", "Terraform", "GitHub Actions"],
    color: "text-sky-500"
  }
];

function ServicesPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = (tabParam && serviceDetails.some((s) => s.id === tabParam)) ? tabParam : "ai";
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);

  const activeTab = serviceDetails.some((s) => s.id === selectedTab) ? selectedTab : initialTab;
  const activeSrv = serviceDetails.find((s) => s.id === activeTab) || serviceDetails[0];

  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  return (
    <div className="flex flex-col w-full relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
          Engineering Capabilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Next-Generation <span className="text-gradient">Digital Solutions</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          Whether you need an autonomous agent team, a multi-tenant SaaS application, or enterprise cloud autoscaling, our senior engineering studio builds products that deliver measurable business impact.
        </p>
      </div>

      {/* 2. Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-[var(--card-border)] pb-5">
        {serviceDetails.map((s) => {
          const isActive = activeTab === s.id;
          return (
            <button
              type="button"
              key={s.id}
              onClick={() => setSelectedTab(s.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)] shadow-xs"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--card-border)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"
              }`}
            >
              <s.icon className="w-4 h-4" />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Active Service Detail View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSrv.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-10 shadow-md"
        >
          {/* Service Title Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--card-border)]">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] ${activeSrv.color}`}>
                <activeSrv.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-[var(--text-primary)]">
                  {activeSrv.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium">
                  {activeSrv.tagline}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openCalendly}
              className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] font-bold text-xs transition-all cursor-pointer shadow-xs flex items-center gap-1.5 shrink-0 self-start md:self-auto"
            >
              <Calendar className="w-3.5 h-3.5" />
              Consult on {activeSrv.label.split(" ")[0]}
            </button>
          </div>

          {/* Sub-Services Grid */}
          <div className="mt-8">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)] mb-4">
              Key Architecture &amp; Delivery Pillars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSrv.subServices.map((sub) => (
                <div
                  key={sub.name}
                  className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] flex items-start gap-3"
                >
                  <div className="p-1 rounded-md bg-[var(--surface-muted)] text-[var(--accent)] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">
                      {sub.name}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                      {sub.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Solutions Callout Banner */}
            {activeSrv.id === "ai" && (
              <div className="mt-6 p-4 rounded-xl bg-[var(--selection-bg)] border border-[var(--accent)]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--accent)]/50 text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--text-primary)] block">
                      Looking for Productized AI Automation Services?
                    </span>
                    <span className="text-[11px] text-[var(--text-secondary)]">
                      Explore our 6 turn-key implementations: RAG Assistants, AI Support, Document Intelligence &amp; more.
                    </span>
                  </div>
                </div>
                <Link
                  href="/ai-solutions"
                  className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                >
                  <span>View 6 AI Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Technology Badges */}
          <div className="mt-8 pt-6 border-t border-[var(--card-border)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[var(--text-primary)] mr-2">Technologies Used:</span>
              {activeSrv.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-[var(--surface-muted)] text-[var(--text-secondary)] border border-[var(--card-border)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={openCalendly}
              className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Request Custom Blueprint <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-[var(--text-muted)]">Loading services...</div>}>
      <ServicesPageContent />
    </Suspense>
  );
}
