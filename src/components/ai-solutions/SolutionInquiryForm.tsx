"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, RefreshCw, Lock } from "lucide-react";
import emailjs from "@emailjs/browser";
import { getVisitorMetadata } from "@/utils/visitorTracker";
import { aiSolutions } from "@/data/aiSolutions";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_lw030qp";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_t2r1s1j";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "znlhzaw2OQmZ7uVqd";

interface SolutionInquiryFormProps {
  initialSolutionSlug?: string;
}

const budgetOptions = [
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$5,000",
  "$5,000–$10,000",
  "$10,000+",
  "Not sure yet",
];

const contactMethods = ["Email", "WhatsApp", "Google Meet", "Phone"];

const industryOptions = [
  "SaaS & Technology",
  "E-Commerce & Retail",
  "Legal Services",
  "Financial Services & Fintech",
  "Healthcare & Life Sciences",
  "Marketing & Creative Agency",
  "Consulting & Professional Services",
  "Logistics & Supply Chain",
  "Other",
];

export default function SolutionInquiryForm({ initialSolutionSlug }: SolutionInquiryFormProps) {
  const currentSolution = aiSolutions.find((s) => s.slug === initialSolutionSlug);
  const defaultSolutionTitle = currentSolution ? currentSolution.title : aiSolutions[0].title;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    country: "",
    industry: industryOptions[0],
    selectedSolution: defaultSolutionTitle,
    description: "",
    budget: budgetOptions[2], // $3,000–$5,000
    contactMethod: contactMethods[0], // Email
    honeypot: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.description) {
      setErrorMsg("Please complete all required fields (Name, Email, and Project Description).");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // 1. Post to our API endpoint (/api/inquiries)
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setReferenceId(data.referenceId || `100S-${Date.now().toString(36).toUpperCase()}`);

      // 2. Dispatch via EmailJS for inbox alerting
      try {
        const trackingMeta = await getVisitorMetadata();
        const templateParams = {
          subject: `AI Solution Lead: ${formData.selectedSolution} (${formData.budget})`,
          from_name: formData.fullName,
          from_email: formData.email,
          phone: `Company: ${formData.companyName || "N/A"} | Country: ${formData.country || "N/A"}`,
          message: `[AI SOLUTIONS INQUIRY]
Solution: ${formData.selectedSolution}
Company: ${formData.companyName || "N/A"}
Country: ${formData.country || "N/A"}
Industry: ${formData.industry}
Estimated Budget: ${formData.budget}
Preferred Contact: ${formData.contactMethod}

Project Scope:
${formData.description}`,
          source: `AI Solutions Form (${formData.selectedSolution})`,
          ...trackingMeta,
        };

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      } catch (emailErr) {
        console.warn("Secondary EmailJS dispatch warning (primary API recorded):", emailErr);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : "Submission failed. Please check your network.";
      setErrorMsg(msg);
    }
  };

  return (
    <section id="solution-inquiry-form" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-10 shadow-lg">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
            Project Scoping &amp; Custom Quote
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-1.5 tracking-tight">
            Request an Architecture Proposal
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
            Tell us about your systems, data sources, and operational goals. Our engineering team responds within 24 business hours with an estimated implementation roadmap.
          </p>
        </div>

        {submitSuccess ? (
          <div className="p-8 rounded-xl bg-[var(--surface-elevated)] border border-[var(--accent)]/40 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Proposal Request Confirmed
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[var(--text-primary)]">{formData.fullName}</strong>. Your project specification has been logged with reference ID <span className="font-mono font-bold text-[var(--accent)]">{referenceId}</span>. A senior AI solutions architect will review your scope and follow up via <strong className="text-[var(--text-primary)]">{formData.contactMethod}</strong>.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmitSuccess(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    companyName: "",
                    country: "",
                    industry: industryOptions[0],
                    selectedSolution: defaultSolutionTitle,
                    description: "",
                    budget: budgetOptions[2],
                    contactMethod: contactMethods[0],
                    honeypot: "",
                  });
                }}
                className="text-xs font-bold text-[var(--accent)] hover:underline cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* SPAM HONEYPOT (hidden from humans) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleChange}
              />
            </div>

            {/* ERROR BANNER */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ROW 1: FULL NAME & BUSINESS EMAIL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--focus-ring)] cursor-text"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--focus-ring)] cursor-text"
                />
              </div>
            </div>

            {/* ROW 2: COMPANY & COUNTRY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="e.g. Apex Dynamics Ltd"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--focus-ring)] cursor-text"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                  Country / Region
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="e.g. United States, United Kingdom, Canada"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--focus-ring)] cursor-text"
                />
              </div>
            </div>

            {/* ROW 3: SOLUTION SELECT & INDUSTRY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                  Selected AI Solution *
                </label>
                <select
                  name="selectedSolution"
                  value={formData.selectedSolution}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--focus-ring)] cursor-pointer"
                >
                  {aiSolutions.map((sol) => (
                    <option key={sol.slug} value={sol.title}>
                      {sol.title}
                    </option>
                  ))}
                  <option value="Custom Multi-Agent Architecture">
                    Custom Multi-Agent Architecture
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--focus-ring)] cursor-pointer"
                >
                  {industryOptions.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ROW 4: BUDGET & PREFERRED CONTACT METHOD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                  Estimated Project Budget (USD)
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--focus-ring)] cursor-pointer"
                >
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                  Preferred Contact Method
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--focus-ring)] cursor-pointer"
                >
                  {contactMethods.map((cm) => (
                    <option key={cm} value={cm}>
                      {cm}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PROJECT DESCRIPTION */}
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                Project Scope &amp; Target Systems *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Describe your current manual workflow, data sources (e.g. Google Drive, Shopify, PostgreSQL), and what you want the AI system to automate..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--focus-ring)] cursor-text leading-relaxed"
              />
            </div>

            {/* FOOTER & SUBMIT BUTTON */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                <Lock className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Bilateral NDA protected &bull; 100% private data boundary</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Submitting Project Scope...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Request Custom Quote &amp; Scoping</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
}
