"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, DollarSign, Heart, Monitor, BookOpen, X, Check, ArrowRight } from "lucide-react";

interface Job {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  salary: string;
  requirements: string[];
}

const openJobs: Job[] = [
  {
    id: "ai-eng",
    title: "Senior AI / Machine Learning Engineer",
    dept: "Artificial Intelligence",
    location: "Remote (Global) / Silicon Valley",
    type: "Full-Time",
    salary: "$95,000 - $130,000 / Yr",
    requirements: [
      "3+ years experience orchestrating multi-agent systems and fine-tuning LLMs.",
      "Expert knowledge of vector storage (Qdrant, Pinecone) and RAG setups.",
      "Proficient in Python, FastAPI, PyTorch, and LangChain."
    ]
  },
  {
    id: "fs-dev",
    title: "Senior Full-Stack Developer (Next.js)",
    dept: "Web Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    salary: "$85,000 - $115,000 / Yr",
    requirements: [
      "4+ years experience building complex production web applications.",
      "Deep understanding of React 19, Next.js App Router, SSR, and Tailwind CSS.",
      "Experience with PostgreSQL, Redis, Stripe subscription integrations, and Node.js."
    ]
  },
  {
    id: "devops-arch",
    title: "Lead Cloud & DevOps Architect",
    dept: "Infrastructure",
    location: "Remote (Global)",
    type: "Full-Time",
    salary: "$100,000 - $140,000 / Yr",
    requirements: [
      "5+ years hosting scalable cloud architectures on Amazon AWS or Google Cloud.",
      "Mastery of Docker containerization and Kubernetes (EKS) routing.",
      "Strong skills in Terraform, GitHub Actions CI/CD pipelines, and cloud security."
    ]
  }
];

const perks = [
  { icon: Monitor, title: "Modern Hardware", desc: "Top-tier MacBook Pro configurations and ergonomic workspace equipment stipends." },
  { icon: Heart, title: "Comprehensive Health", desc: "Premium health insurance, mental wellness support, and gym/fitness allowances." },
  { icon: BookOpen, title: "Annual Learning Stipend", desc: "$2,500 annual budget for specialized courses, technical conferences, and books." },
  { icon: Clock, title: "True Remote Autonomy", desc: "Remote-first culture. Choose your work hours as long as sprint checkpoints align." }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", links: "", cover: "" });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedJob(null);
      }
    };
    if (selectedJob) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedJob]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
  };

  return (
    <div className="flex flex-col w-full relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* 1. HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
          Careers at 100Solutionz
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Help Us Engineer <span className="text-gradient">Intelligent Digital Systems</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          We operate as a remote-first, collaborative team of senior software engineers, AI researchers, and distributed cloud architects.
        </p>
      </div>

      {/* 2. BENEFITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {perks.map((perk) => (
          <div
            key={perk.title}
            className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--accent)] flex items-center justify-center mb-3">
                <perk.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{perk.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">{perk.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. OPEN POSITIONS */}
      <div className="mb-14">
        <h2 className="text-xl sm:text-2xl font-black mb-6 text-[var(--text-primary)] flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[var(--secondary-accent)]" /> Open Engineering Roles
        </h2>

        <div className="space-y-4">
          {openJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs hover:border-[var(--secondary-accent)]/50 transition-all flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--selection-bg)] px-2 py-0.5 rounded">
                      {job.dept}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mt-1.5 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                    <span className="flex items-center gap-1 font-semibold text-[var(--accent)]"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Key Qualifications</h4>
                  <ul className="space-y-1 text-xs text-[var(--text-secondary)] leading-relaxed">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--accent)] font-bold mt-0.5">&bull;</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-end md:items-start justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(job);
                    setFormStep(1);
                    setFormData({ name: "", email: "", links: "", cover: "" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-bold hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                >
                  Apply for Role <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. APPLICATION FORM MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-[var(--overlay-background)] backdrop-blur-xs"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Job Application Form"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 shadow-2xl z-10 overflow-y-auto max-h-[85vh]"
            >
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {formStep === 1 ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
                      Role Application
                    </span>
                    <h2 className="text-base font-bold text-[var(--text-primary)] mt-1">
                      {selectedJob.title}
                    </h2>

                    <form onSubmit={handleApply} className="space-y-3 mt-4">
                      <div>
                        <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Morgan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                          LinkedIn or GitHub Profile *
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://github.com/alex"
                          value={formData.links}
                          onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                          Key Technical Highlights &amp; Experience
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Briefly describe relevant codebases or systems you've built..."
                          value={formData.cover}
                          onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] resize-none cursor-text"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs mt-2"
                      >
                        Submit Application
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center gap-3 py-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--selection-bg)] text-[var(--accent)] flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h2 className="text-base font-bold text-[var(--text-primary)]">
                      Application Submitted!
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs">
                      Thank you, <span className="font-bold text-[var(--text-primary)]">{formData.name}</span>. Our technical hiring leads will review your portfolio and reply to {formData.email} within 3 business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="mt-3 px-5 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-xs font-bold text-[var(--text-primary)] cursor-pointer"
                    >
                      Close Window
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
