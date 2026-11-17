"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Cpu,
  Play,
  RefreshCw,
  Terminal,
  Eye,
  Calendar,
  Sparkles,
  ArrowRight,
  Building2,
} from "lucide-react";
import { aiSolutions } from "@/data/aiSolutions";
import SolutionCard from "@/components/ai-solutions/SolutionCard";
import SolutionInquiryForm from "@/components/ai-solutions/SolutionInquiryForm";

interface ScenarioStep {
  type: "thought" | "action" | "observation" | "result";
  text: string;
}

interface Scenario {
  id: string;
  name: string;
  desc: string;
  triggerPrompt: string;
  steps: ScenarioStep[];
}

const scenarios: Scenario[] = [
  {
    id: "support",
    name: "Customer Support Auto-Pilot",
    desc: "Autonomous email triage, database billing queries, and Stripe refund execution.",
    triggerPrompt: "Analyze customer email warning that their credit card was charged twice.",
    steps: [
      { type: "thought", text: "Customer claims double billing. I need to retrieve their email address 'john@company.com' and search transactional databases." },
      { type: "action", text: "Executing SQL query: SELECT * FROM billing_records WHERE email='john@company.com' ORDER BY charge_date DESC LIMIT 5" },
      { type: "observation", text: "Database returns two charges of $99.00 with transaction IDs TX_8819 and TX_8820 processed on June 20 at 14:32:01 and 14:32:03 respectively." },
      { type: "thought", text: "Charge double processing verified. This is a duplicate charge. I must trigger a refund for transaction TX_8820 via the Stripe API and write an apology draft." },
      { type: "action", text: "Executing Stripe API call: stripe.refunds.create({ charge: 'ch_8820' })" },
      { type: "observation", text: "Stripe API returns Refund Status: SUCCESS. Refund reference: REF_9921." },
      { type: "result", text: "SYSTEM STATUS: Complete. Drafted reply: 'Hi John, we confirmed a transaction duplicate. I have processed a refund of $99.00 for REF_9921. It should reflect in 3 days. Apologies!'" }
    ]
  },
  {
    id: "rag",
    name: "Enterprise RAG Contract Search",
    desc: "Ingests complex vendor contracts, matches clauses against legal guidelines, and flags deviations.",
    triggerPrompt: "Parse uploaded document 'master_supplier_v3.pdf' and verify liability caps.",
    steps: [
      { type: "thought", text: "Opening document buffer. I will run layout OCR and vector search on Section 14 (Indemnification & Liability Limits)." },
      { type: "action", text: "Executing Vector Search: database.query('indemnification clause liability limit standard')" },
      { type: "observation", text: "Found clause: Vendor liability is capped at 12 months fees ($120k), but company guideline requires $1,000,000 minimum insurance indemnity." },
      { type: "thought", text: "Breach identified. I must flag this contract for legal counsel with exact paragraph coordinates." },
      { type: "action", text: "Executing webhook to Slack: slack.postMessage({ channel: '#legal-audits', text: 'Liability breach in master_supplier_v3.pdf (p. 18)' })" },
      { type: "result", text: "SYSTEM STATUS: Flagged. Summary: Liability cap of $120,000 fails minimum $1M policy requirements. Paragraph 18.2 cited." }
    ]
  },
  {
    id: "ops",
    name: "Operations Workflow Sync",
    desc: "Ingests newly converted high-value leads, enriches domain records, and provisions client portals.",
    triggerPrompt: "Process high-tier enterprise lead from website inquiry form.",
    steps: [
      { type: "thought", text: "Evaluating budget parameters. Budget is '$10,000+'. Triggering enrichment pipeline." },
      { type: "action", text: "Executing API call: apollo.enrichOrganization({ domain: 'apexenterprise.com' })" },
      { type: "observation", text: "Company size: 250 employees. Industry: Fintech. Headquarters: New York, NY." },
      { type: "thought", text: "Provisioning deal in HubSpot, assigning senior architect, and alerting leadership." },
      { type: "action", text: "Executing webhook: hubspot.deals.create({ name: 'Apex Enterprise - AI Automation', value: 15000 })" },
      { type: "result", text: "SYSTEM STATUS: Complete. Deal #8819 created in HubSpot. Dedicated Slack channel #client-apex provisioned in 3.2 seconds." }
    ]
  }
];

const industries = [
  { name: "E-Commerce & Retail", desc: "Automated customer support, dynamic returns, inventory monitoring, and personalized marketing." },
  { name: "Healthcare Administration", desc: "Clinical guideline RAG assistants, patient intake processing, and operational document extraction." },
  { name: "Financial Services & Fintech", desc: "SEC filing analysis, KYC data validation, audit trail automation, and anomaly detection." },
  { name: "Legal & Compliance", desc: "Contract comparison, case law knowledge retrieval, precedent indexing, and clause extraction." },
  { name: "Marketing & Creative Agencies", desc: "Multi-channel content repurposing, video highlight slicing, and client onboarding automation." },
  { name: "SaaS & Technology", desc: "Developer documentation assistants, tier-1 customer support, and observability alert triage." },
  { name: "Education & EdTech", desc: "Course content synthesis, curriculum search engines, and student enrollment bots." },
  { name: "Professional Services", desc: "RFP response generation, multi-tier approval routing, and proposal drafting." },
  { name: "IT & Managed Services", desc: "Infrastructure monitoring alert deduplication, SRE runbook retrieval, and automated ticketing." },
];

const howWeWorkSteps = [
  {
    num: "01",
    title: "Discovery & Requirements",
    desc: "We analyze your existing workflows, documents, data systems, and API boundaries to define clear automation metrics and technical feasibility.",
  },
  {
    num: "02",
    title: "Architecture & Pipeline Design",
    desc: "We architect the optimal model selection, vector indexing strategy, database schemas, and failover workflows customized to your cloud boundary.",
  },
  {
    num: "03",
    title: "Development & Integration",
    desc: "Our engineering team builds custom microservices, connects webhooks, configures vector databases, and connects your software tools.",
  },
  {
    num: "04",
    title: "Testing, Grounding & Deployment",
    desc: "We run automated validation tests, verify zero-hallucination guardrails, benchmark latency, and deploy securely to your production VPC.",
  },
  {
    num: "05",
    title: "Support, Retraining & Optimization",
    desc: "We provide telemetry dashboards, continuous model fine-tuning, error monitoring, and dedicated monthly SLA maintenance support.",
  },
];

const techStackCategories = [
  {
    category: "AI & Large Language Models",
    techs: ["OpenAI GPT-4o", "Claude 3.5 Sonnet", "Llama 3 (Self-Hosted)", "Mistral Large", "Whisper", "Cohere Rerank"],
  },
  {
    category: "Vector Databases & Search",
    techs: ["Qdrant", "PostgreSQL pgvector", "Pinecone", "Elasticsearch / OpenSearch", "Milvus"],
  },
  {
    category: "Automation & Orchestration",
    techs: ["n8n (Self-Hosted & Cloud)", "LangChain", "LlamaIndex", "Celery", "Temporal.io"],
  },
  {
    category: "Backend & Microservices",
    techs: ["Python 3.12", "FastAPI", "Node.js / TypeScript", "Go", "Docker", "Redis"],
  },
  {
    category: "Cloud Infrastructure",
    techs: ["AWS (Lambda, ECS, S3)", "Google Cloud Platform", "Microsoft Azure", "Cloudflare Workers"],
  },
  {
    category: "Integrations & APIs",
    techs: ["Shopify API", "Stripe API", "HubSpot CRM", "Salesforce", "Zendesk", "Slack & Teams Bots"],
  },
];

export default function AISolutionsPage() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < selectedScenario.steps.length) {
        setActiveStep(currentStep);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1400);
  };

  const handleScenarioChange = (scen: Scenario) => {
    if (isRunning) return;
    setSelectedScenario(scen);
    setActiveStep(-1);
  };

  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  const scrollToSolutions = () => {
    const el = document.getElementById("solutions-catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full relative z-10">
      
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--card-border)] text-xs font-mono text-[var(--accent)] font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Productized AI &amp; Automation Implementations</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Intelligent AI Solutions That <span className="text-gradient">Transform How Businesses Work</span>
        </h1>

        <p className="text-xs sm:text-base text-[var(--text-secondary)] mt-5 leading-relaxed max-w-2xl mx-auto">
          From private RAG knowledge assistants to event-driven business automation, we design, deploy, and support production-grade technology solutions that eliminate manual labor, streamline operations, and scale with your company.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={scrollToSolutions}
            className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span>Explore AI Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={openCalendly}
            className="px-6 py-3.5 rounded-xl bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] border border-[var(--card-border)] font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[var(--secondary-accent)]" />
            <span>Book a Free Consultation</span>
          </button>
        </div>
      </section>

      {/* 2. SIX PRODUCTIZED AI SOLUTIONS CATALOG */}
      <section id="solutions-catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
            Implementation Portfolio
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
            Six Productized AI &amp; Automation Solutions
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
            Each offering is custom-architected and deployed inside your cloud environment as a turn-key implementation service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE AGENT EXECUTION CONSOLE SANDBOX */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Controls Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5">
              <div>
                <span className="text-[10px] font-mono font-bold text-[var(--accent)] uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Interactive Agent Sandbox
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-1.5">
                  Multi-Agent Execution Console
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                  Select a business scenario below, click Run Simulation, and observe how our agentic pipelines plan, call tools, and arrive at validated outcomes in real-time.
                </p>
              </div>

              {/* Scenario buttons */}
              <div className="space-y-2">
                {scenarios.map((scen) => {
                  const isSelected = selectedScenario.id === scen.id;
                  return (
                    <button
                      key={scen.id}
                      type="button"
                      disabled={isRunning}
                      onClick={() => handleScenarioChange(scen)}
                      className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col gap-1 ${
                        isSelected
                          ? "bg-[var(--surface-elevated)] border-[var(--accent)] shadow-xs"
                          : "bg-[var(--surface)] border-[var(--card-border)] hover:bg-[var(--surface-elevated)] disabled:opacity-40"
                      }`}
                    >
                      <span className="text-xs font-bold text-[var(--text-primary)]">{scen.name}</span>
                      <span className="text-[10px] text-[var(--text-secondary)] leading-snug line-clamp-1">{scen.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Simulation Trigger */}
              <button
                type="button"
                onClick={runSimulation}
                disabled={isRunning}
                className="w-full py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Agent Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run Scenario Simulation</span>
                  </>
                )}
              </button>
            </div>

            {/* Console Terminal Column */}
            <div className="lg:col-span-7 rounded-xl border border-[var(--card-border)] bg-[var(--surface-elevated)] p-4 font-mono text-[11px] leading-relaxed flex flex-col justify-between min-h-[380px]">
              
              <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)] text-[10px] text-[var(--text-muted)] font-bold">
                <span>Solutionz-Agent-Runtime-v2.5</span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-amber-400 animate-ping" : "bg-[var(--accent)]"}`} />
                  <span className={isRunning ? "text-amber-500" : "text-[var(--accent)]"}>{isRunning ? "Processing" : "Idle"}</span>
                </span>
              </div>

              <div className="flex-1 py-3.5 space-y-3.5 overflow-y-auto max-h-[300px]">
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--card-border)]">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    [1] Task Goal Prompt:
                  </span>
                  <span className="text-[var(--text-primary)] font-bold">
                    &gt; {selectedScenario.triggerPrompt}
                  </span>
                </div>

                {activeStep >= 0 && (
                  <div className="space-y-3">
                    {selectedScenario.steps.slice(0, activeStep + 1).map((step, idx) => {
                      const isThought = step.type === "thought";
                      const isAction = step.type === "action";
                      const isObs = step.type === "observation";
                      const isRes = step.type === "result";

                      return (
                        <motion.div
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          key={idx}
                          className="pl-3 border-l-2 border-[var(--card-border)]"
                        >
                          {isThought && (
                            <div>
                              <span className="text-[var(--accent)] font-bold uppercase text-[9px] flex items-center gap-1">
                                <Brain className="w-3 h-3" /> Thought Process:
                              </span>
                              <span className="text-[var(--text-secondary)] font-medium">
                                {step.text}
                              </span>
                            </div>
                          )}
                          {isAction && (
                            <div>
                              <span className="text-[var(--secondary-accent)] font-bold uppercase text-[9px] flex items-center gap-1">
                                <Cpu className="w-3 h-3" /> Agent Action Call:
                              </span>
                              <span className="text-[var(--text-primary)] font-bold">
                                {step.text}
                              </span>
                            </div>
                          )}
                          {isObs && (
                            <div>
                              <span className="text-amber-500 font-bold uppercase text-[9px] flex items-center gap-1">
                                <Eye className="w-3 h-3" /> Tool Observation:
                              </span>
                              <span className="text-[var(--text-secondary)]">
                                {step.text}
                              </span>
                            </div>
                          )}
                          {isRes && (
                            <div className="p-2.5 rounded-lg bg-[var(--selection-bg)] border border-[var(--accent)]/30 text-[var(--text-primary)] mt-1.5">
                              <span className="font-bold block uppercase text-[9px] text-[var(--accent)] mb-0.5">
                                [✓] Final Verified Result:
                              </span>
                              {step.text}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-[var(--text-muted)] border-t border-[var(--card-border)] pt-2.5 flex items-center justify-between">
                <span>Runtime: Python 3.12 / FastAPI</span>
                <span>Encrypted Memory Context</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. INDUSTRY APPLICATIONS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
            Versatile Deployments
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
            Industry Applications
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
            Engineered to resolve real operational friction across fast-scaling startups and established enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] hover:border-[var(--accent)]/40 transition-all shadow-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  {ind.name}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW WE WORK (5-STEP PROCESS) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--secondary-accent)] font-bold">
            Delivery Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
            How We Implement Your AI Solution
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
            A rigorous 5-step engineering framework designed for predictable timelines, data security, and verified ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {howWeWorkSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] flex flex-col justify-between shadow-xs hover:border-[var(--accent)]/40 transition-colors"
            >
              <div>
                <span className="text-xl font-mono font-black text-[var(--accent)] block mb-2">
                  {step.num}
                </span>
                <h3 className="text-xs font-bold text-[var(--text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--card-border)] text-[10px] font-mono text-[var(--text-muted)]">
                Stage {step.num}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TECHNOLOGY STACK GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
            Infrastructure &amp; Tooling
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
            Enterprise Technology Stack
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
            Battle-tested technologies selected for low latency, high throughput, and strict data confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStackCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[var(--text-primary)] block mb-3 pb-2 border-b border-[var(--card-border)]">
                  {cat.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.techs.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[11px] font-mono text-[var(--text-secondary)] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. QUALIFIED PROPOSAL INQUIRY FORM */}
      <SolutionInquiryForm />

      {/* 8. FINAL CONVERSION BANNER */}
      <section className="py-16 text-center max-w-3xl mx-auto px-4 mt-4 mb-8">
        <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--card-border)] p-8 sm:p-12 shadow-md">
          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            Ready to Automate Your Business?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
            Tell us about your manual workflows, documents, or custom AI product idea. Our engineering leadership will help you identify the right architecture and delivery timeline.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("solution-inquiry-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={openCalendly}
              className="px-6 py-3.5 rounded-xl bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] border border-[var(--card-border)] font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[var(--secondary-accent)]" />
              <span>Book a Consultation</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
