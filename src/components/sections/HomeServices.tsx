"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Code, Smartphone, BarChart3, Cloud, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "AI & Machine Learning",
    desc: "Autonomous agent pipelines, Retrieval-Augmented Generation (RAG), and fine-tuned LLM architectures tailored to enterprise operations.",
    tags: ["Agentic AI", "Enterprise RAG", "Custom LLMs", "NLP Workflows"],
    color: "text-[var(--accent)]",
    linkTab: "ai"
  },
  {
    icon: Code,
    title: "Web & SaaS Development",
    desc: "High-performance corporate portals, multi-tenant SaaS dashboards, and secure e-commerce engines built with Next.js and TypeScript.",
    tags: ["SaaS Architecture", "Next.js App Router", "Full-Stack APIs", "Microfrontends"],
    color: "text-[var(--secondary-accent)]",
    linkTab: "web"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native iOS and Android systems alongside cross-platform React Native and Flutter applications with offline sync capabilities.",
    tags: ["iOS (Swift)", "Android (Kotlin)", "React Native", "Cross-Platform"],
    color: "text-emerald-500",
    linkTab: "mobile"
  },
  {
    icon: BarChart3,
    title: "Data Science & Intelligence",
    desc: "Transform unstructured databases into actionable business intelligence with statistical modeling, predictive forecasts, and telemetry dashboards.",
    tags: ["Predictive Analytics", "Data Pipelines", "BI Dashboards", "Telemetry"],
    color: "text-amber-500",
    linkTab: "data"
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Architecture",
    desc: "Scale with confidence using AWS, GCP, and Azure serverless designs, Docker containerization, Kubernetes clusters, and automated CI/CD pipelines.",
    tags: ["AWS / GCP / Azure", "Kubernetes", "Terraform", "Automated CI/CD"],
    color: "text-sky-500",
    linkTab: "cloud"
  },
];

export default function HomeServices() {
  return (
    <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
            Core Competencies
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 text-[var(--text-primary)] tracking-tight">
            Comprehensive Engineering Solutions
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
            From autonomous agent intelligence to distributed cloud infrastructure, we build digital products that accelerate enterprise performance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <motion.div
              key={srv.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 shadow-sm hover:shadow-md hover:border-[var(--secondary-accent)]/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--surface-elevated)] border border-[var(--card-border)] mb-5 ${srv.color}`}>
                  <srv.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>

                {/* Service Title & Desc */}
                <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--secondary-accent)] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {srv.desc}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {srv.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--card-border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center justify-between">
                <Link
                  href={`/services?tab=${srv.linkTab}`}
                  className="text-xs font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  Explore Capabilities
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[var(--accent)]" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Section Bottom Banner */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer"
          >
            Review Detailed Architecture &amp; Delivery Matrices
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
