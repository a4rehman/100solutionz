"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Check, AlertCircle, Calendar } from "lucide-react";
import emailjs from "@emailjs/browser";
import { getVisitorMetadata } from "@/utils/visitorTracker";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_lw030qp";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_t2r1s1j";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "znlhzaw2OQmZ7uVqd";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const trackingMeta = await getVisitorMetadata();

      let formContext = "General Website Lead";
      const sub = (formData.subject || "").toLowerCase();
      const msg = (formData.message || "").toLowerCase();

      if (sub.includes("ai") || sub.includes("agent") || sub.includes("bot") || msg.includes("ai") || msg.includes("agent") || msg.includes("bot")) {
        formContext = "AI & ML Development Request";
      } else if (sub.includes("web") || sub.includes("saas") || sub.includes("site") || msg.includes("web") || msg.includes("saas") || msg.includes("site")) {
        formContext = "Web & SaaS Development Request";
      } else if (sub.includes("mobile") || sub.includes("app") || msg.includes("mobile") || msg.includes("app")) {
        formContext = "Mobile App Development Request";
      }

      const templateParams = {
        subject: formContext,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        message: formData.subject ? `Subject: ${formData.subject}\n\n${formData.message}` : formData.message,
        source: "Contact Page Form",
        ...trackingMeta
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      setIsSubmitting(false);
      const message = err instanceof Error ? err.message : "Failed to dispatch email. Please try again or email us directly.";
      setErrorMsg(message);
    }
  };

  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  return (
    <div className="flex flex-col w-full relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* 1. HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)]">
          Direct Technical Access
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-2 tracking-tight">
          Connect With Our <span className="text-gradient">Engineering Leadership</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          Have an upcoming product roadmap, AI automation goal, or RFP specification? Send us a direct message or book a technical consultation session.
        </p>
      </div>

      {/* 2. SPLIT LAYOUT CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Contact Form Column */}
        <div className="lg:col-span-7 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Send Us an Inquiry
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    We sign bilateral NDAs before discussing proprietary specifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Lee"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jordan@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-9100"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                      Project Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Enterprise RAG Pipeline"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-primary)] mb-1">
                    Project Requirements / Timeline *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your objectives, existing tech stack, and timeline goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] resize-none cursor-text"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-1.5 text-rose-500 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4" />
                    {errorMsg}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? "Dispatching Message..." : "Submit Technical Inquiry"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-4 py-12 justify-center h-full"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--selection-bg)] text-[var(--accent)] flex items-center justify-center shadow-xs">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Inquiry Received!
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 max-w-sm leading-relaxed">
                    Thank you. Your message has been routed to our technical leadership team. We typically respond within 2 to 4 business hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-xs font-bold text-[var(--text-primary)] cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right: Info & Locations Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Direct Channels Card */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Direct Contact Channels
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] text-[var(--accent)] mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block font-semibold">Engineering &amp; Sales</span>
                  <a href="mailto:live40220@gmail.com" className="font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                    live40220@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] text-[var(--secondary-accent)] mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block font-semibold">Direct Phone Inquiries</span>
                  <a href="tel:+15550199100" className="font-bold text-[var(--text-primary)] hover:text-[var(--secondary-accent)] transition-colors">
                    +1 (555) 019-9100
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] text-emerald-500 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block font-semibold">Hours of Operation</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    Monday &mdash; Friday (9:00 AM - 6:00 PM EST)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Locations & Booking Card */}
          <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--card-border)] shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" /> Office Locations
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium mb-4">
                Silicon Valley, California &bull; Lahore, Pakistan
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-center">
              <Calendar className="w-6 h-6 text-[var(--secondary-accent)] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-[var(--text-primary)]">
                Prefer a Live Consultation?
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1 mb-3">
                Pick a direct slot on our calendar to discuss architecture with lead engineers.
              </p>
              <button
                type="button"
                onClick={openCalendly}
                className="w-full py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs"
              >
                Open Scheduling Calendar
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
