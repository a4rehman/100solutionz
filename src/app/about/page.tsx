"use client";

import React from "react";
import { Target, Compass, Award, Shield, Users, GitBranch, Globe, Calendar, ArrowRight } from "lucide-react";

const values = [
  { icon: Target, title: "Innovation First", desc: "We continually test new frontiers in Agentic AI and edge computing to ensure client codebases remain competitive and modern." },
  { icon: Shield, title: "Uncompromising Integrity", desc: "No cut corners. We sign strict bilateral NDAs, implement enterprise security configurations, and deliver on every commitment." },
  { icon: Compass, title: "User-Centric Architecture", desc: "We believe software should be intuitive, fast, and reliable. Every flow is optimized for conversion, retention, and accessibility." },
  { icon: Award, title: "Commitment to Excellence", desc: "We rigorously review, refactor, and type-check every line of code to maintain clean, production-grade products." },
];

const team = [
  {
    name: "Rehman Siddiqui",
    role: "Founder & Lead Architect",
    bio: "Technical software leader with extensive experience architecting full-stack web platforms, distributed backends, and AI pipelines.",
    img: "RS",
    linkedin: "https://linkedin.com",
    github: "https://github.com/a4rehman"
  },
  {
    name: "Dr. Aris Thorne",
    role: "Chief AI Scientist",
    bio: "PhD in Machine Learning. Specialist in autonomous agent routing, fine-tuning LLMs, and enterprise semantic vector indexes.",
    img: "AT",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    name: "Sarah Mitchell",
    role: "Lead Full-Stack Architect",
    bio: "Senior Next.js and React architect. Expert in high-throughput cloud dashboards, state architecture, and microfrontends.",
    img: "SM",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    name: "Devrim Yusuf",
    role: "Head of Cloud & DevOps",
    bio: "AWS Certified Solutions Architect. Master of Kubernetes orchestration, multi-cloud setups, and automated zero-downtime CI/CD.",
    img: "DY",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
];

const history = [
  { year: "2021", title: "Studio Founded", desc: "Launched 100Solutionz with a clear vision to deliver clean, modern web engineering without bureaucratic agency overhead." },
  { year: "2023", title: "Enterprise Cloud Expansion", desc: "Expanded core services to include native iOS/Android mobile engineering and multi-region AWS cloud deployments." },
  { year: "2025-26", title: "Agentic AI Integration", desc: "Established dedicated AI division focusing on autonomous multi-agent pipelines, private RAG vector search, and voice intelligence." },
];

export default function AboutPage() {
  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  return (
    <div className="flex flex-col w-full relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* 1. HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
          Company Overview
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Engineering the Future of <span className="text-gradient">Intelligent Software</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          At 100Solutionz, we believe that complex ideas deserve clean, world-class execution. We partner with technology leaders and startups to architect scalable software products augmented with modern artificial intelligence.
        </p>
      </section>

      {/* 2. STORY & PROMISE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-20">
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-3">
              Crafted by Builders, for Builders
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              100Solutionz was created out of a desire to build software without compromises. We saw too many organizations struggle with bloated agencies, junior developer hand-offs, and delayed timelines.
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              By maintaining a senior-focused engineering team, we ensure that every system — from complex RAG data pipelines to high-traffic web applications — is delivered strictly on schedule, fully type-safe, and ready for production.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--text-primary)]">Direct Developer Communication</span>
            <span className="text-[var(--accent)] font-bold">&bull; Zero Bureaucracy</span>
          </div>
        </div>

        <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--card-border)] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-[var(--accent)] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Our Core Engineering Promise
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              You collaborate directly with senior technical architects. We provide weekly sprint demos, full Git repository transparency, 100% intellectual property ownership, and direct communication channels.
            </p>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={openCalendly}
              className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              Schedule Introductory Call
            </button>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="mb-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--secondary-accent)]">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-[var(--text-primary)]">
            The Values That Drive Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <v.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">
                  {v.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GROWTH HISTORY */}
      <section className="mb-20 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--card-border)] p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
            Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-[var(--text-primary)]">
            Key Company Milestones
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-8 pl-4 border-l-2 border-[var(--card-border)]">
          {history.map((hist) => (
            <div key={hist.year} className="relative pl-6">
              <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)]" />
              <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider block">
                {hist.year}
              </span>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mt-0.5">
                {hist.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                {hist.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM SHOWCASE */}
      <section className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--secondary-accent)]">
            Engineering Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-[var(--text-primary)]">
            Meet the Core Team
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            Senior software engineers, AI researchers, and DevOps architects dedicated to product reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] flex items-center justify-center font-black text-base text-[var(--accent)] mb-4">
                  {t.img}
                </div>

                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  {t.name}
                </h3>
                <p className="text-[10px] uppercase font-bold text-[var(--secondary-accent)] mt-0.5">
                  {t.role}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-2.5 leading-relaxed line-clamp-3">
                  {t.bio}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-3 border-t border-[var(--card-border)] text-[var(--text-muted)]">
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--secondary-accent)] transition-colors p-1"
                  aria-label={`${t.name} LinkedIn`}
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href={t.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors p-1"
                  aria-label={`${t.name} GitHub`}
                >
                  <GitBranch className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONVERSION FOOTER */}
      <section className="text-center max-w-2xl mx-auto rounded-2xl bg-[var(--surface-elevated)] border border-[var(--card-border)] p-8 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
          Let&apos;s Build Something <span className="text-gradient">Outstanding</span> Together
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
          Have an upcoming product initiative or legacy migration? Speak directly with our technical leadership.
        </p>
        <div className="mt-5">
          <button
            type="button"
            onClick={openCalendly}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
          >
            Schedule Free Architecture Consultation <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
}
