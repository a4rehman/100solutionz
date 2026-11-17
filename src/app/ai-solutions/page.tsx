"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Mic, Database, Play, RefreshCw, Terminal, Eye, Calendar } from "lucide-react";

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
    name: "Support Auto-Pilot",
    desc: "Autonomous email triage, database billing queries, and response compilation.",
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
    id: "pdf",
    name: "PDF Data Extraction",
    desc: "Ingests semi-structured contracts, matches terms against legal rules, and outputs schema structures.",
    triggerPrompt: "Parse uploaded document 'supplier_contract_v2.pdf' and extract payment due terms.",
    steps: [
      { type: "thought", text: "Opening document buffer. I will run OCR parsing on page 4 (Legal terms & Payments schedule)." },
      { type: "action", text: "Executing NLP semantic parse: extract_entities(page_4, schema=['due_date', 'late_fee_percent'])" },
      { type: "observation", text: "Entities found: Payment terms are Net-30 from receipt. Late fees of 1.5% accrue monthly after day 31." },
      { type: "thought", text: "Validating clauses. Company template requires Net-45 terms. I need to flag this contract for legal review as it breaches standard parameters." },
      { type: "action", text: "Executing webhook to Slack: slack.postMessage({ channel: '#legal-review', text: 'Contract supplier_contract_v2.pdf flags a Net-30 term breach.' })" },
      { type: "result", text: "SYSTEM STATUS: Flagged. Extracted: { Term: 'Net-30', LateFee: '1.5%', Compliance: 'FAIL_TERM_BREACH' }" }
    ]
  },
  {
    id: "outreach",
    name: "Lead Research Agent",
    desc: "Scrapes lead websites, matches keywords to services, and compiles tailored pitches.",
    triggerPrompt: "Research lead domain 'techsolutions.io' and outline a personalized pitch for AI integration.",
    steps: [
      { type: "thought", text: "Accessing target landing page for techsolutions.io to discover primary business verticals." },
      { type: "action", text: "Executing web scrape query: scrape_domain('techsolutions.io')" },
      { type: "observation", text: "Scrape returns keywords: 'E-commerce logistics, delivery tracking, manual shipping audits, warehouse scheduling'." },
      { type: "thought", text: "Lead operates logistics. Shipping audits are listed as manual. I should search internal archives for logistics case studies." },
      { type: "action", text: "Executing Vector Search: database.query('logistics AI agents shipping optimization')" },
      { type: "observation", text: "Vector DB returns matched case study: 'Biotech Nexus: 85% support automation, shipping route coordinates sync'." },
      { type: "result", text: "SYSTEM STATUS: Drafted Pitch. Pitch: 'Hi CEO, noticed techsolutions.io audits shipping manually. We built a similar auto-tracking sync for Biotech Nexus that automated 85% of queries. Let's talk!'" }
    ]
  }
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
    }, 1500);
  };

  const handleScenarioChange = (scen: Scenario) => {
    if (isRunning) return;
    setSelectedScenario(scen);
    setActiveStep(-1);
  };

  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  return (
    <div className="flex flex-col w-full relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* 1. HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
          Artificial Intelligence Engineering
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Enterprise <span className="text-gradient">Agentic AI Architectures</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          We architect autonomous AI agents, fine-tuned model pipelines, RAG databases, and custom automation loops that execute real workflows without continuous human prompting.
        </p>
      </div>

      {/* 2. CORE SOLUTIONS CATALOG */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--accent)] flex items-center justify-center mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Autonomous AI Agents</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
              AI software agents that interpret multi-step natural goals, call external APIs, query relational databases, handle schema validations, and report verified outcomes.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--card-border)] text-[10px] font-mono text-[var(--accent)] font-semibold">
            &bull; Multi-Turn Agent Loops
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--secondary-accent)] flex items-center justify-center mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Semantic RAG Knowledge Bases</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
              Index thousands of contracts, spreadsheets, internal documentation, and slides into isolated vector databases (Qdrant, Pinecone) with RBAC permissions.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--card-border)] text-[10px] font-mono text-[var(--secondary-accent)] font-semibold">
            &bull; Zero Training Data Leakage
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] text-emerald-500 flex items-center justify-center mb-4">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Real-Time Voice &amp; Speech AI</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
              Streaming audio transcription, ultra-low latency voice agents, and telephone pipeline automations utilizing WebSockets and Twilio integrations.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--card-border)] text-[10px] font-mono text-emerald-500 font-semibold">
            &bull; &lt; 400ms Audio Latency
          </div>
        </div>

      </div>

      {/* 3. INTERACTIVE AI PLAYGROUND SANDBOX */}
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
                Select a business scenario below, click Run Simulation, and observe how the agent plans, calls tools, and arrives at validated answers in real-time.
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
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--card-border)] text-[10px] text-[var(--text-muted)] font-bold">
              <span>Solutionz-Agent-Runtime-v2.0</span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-amber-400 animate-ping" : "bg-[var(--accent)]"}`} />
                <span className={isRunning ? "text-amber-500" : "text-[var(--accent)]"}>{isRunning ? "Processing" : "Idle"}</span>
              </span>
            </div>

            {/* Console Output */}
            <div className="flex-1 py-3.5 space-y-3.5 overflow-y-auto max-h-[300px]">
              
              {/* Trigger Input Prompt */}
              <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--card-border)]">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                  [1] Task Goal Prompt:
                </span>
                <span className="text-[var(--text-primary)] font-bold">
                  &gt; {selectedScenario.triggerPrompt}
                </span>
              </div>

              {/* Dynamic steps loop display */}
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

            {/* Terminal Footer */}
            <div className="text-[10px] text-[var(--text-muted)] border-t border-[var(--card-border)] pt-2.5 flex items-center justify-between">
              <span>Sandbox: Python 3.12 / FastAPI</span>
              <span>Encrypted Memory Context</span>
            </div>

          </div>

        </div>

      </div>

      {/* 4. CALL TO ACTION DETAILS */}
      <section className="py-14 text-center max-w-3xl mx-auto px-4 mt-8">
        <h2 className="text-xl sm:text-3xl font-black text-[var(--text-primary)]">
          Ready to Automate Complex Workflows?
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2.5 leading-relaxed">
          Schedule a technical session with our AI engineering team. We&apos;ll evaluate vector indexing requirements, model fine-tuning feasibility, and system latency goals.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={openCalendly}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Schedule AI Architecture Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
