"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, GitBranch, ArrowUpRight } from "lucide-react";
import Logo from "@/components/shared/Logo";
import emailjs from "@emailjs/browser";
import { getVisitorMetadata } from "@/utils/visitorTracker";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_lw030qp";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_t2r1s1j";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "znlhzaw2OQmZ7uVqd";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const trackingMeta = await getVisitorMetadata();
      const templateParams = {
        subject: "Newsletter Subscription",
        from_name: "Newsletter Subscriber",
        from_email: email,
        phone: "N/A",
        message: `New newsletter subscription from: ${email}`,
        source: "Footer Newsletter Form",
        ...trackingMeta
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      setSubscribed(true);
      setEmail("");
      setError("");
    } catch {
      setError("Failed to subscribe. Please try again.");
    }
  };

  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  return (
    <footer className="relative mt-auto border-t border-[var(--card-border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8">
                <Logo showText={false} className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-[var(--text-primary)] leading-tight">
                  100<span className="text-[var(--secondary-accent)]">SOLUTIONZ</span>
                </span>
                <span className="text-[8px] tracking-[0.2em] font-medium text-[var(--text-muted)] uppercase">
                  Digital Innovation
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              We engineer enterprise-grade AI agents, high-performance web applications, custom mobile experiences, and scalable cloud architectures.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--secondary-accent)] hover:border-[var(--secondary-accent)] transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/a4rehman/100solutionz"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all cursor-pointer"
                aria-label="GitHub Repository"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="https://100solutionz.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all cursor-pointer"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/ai-solutions" className="text-[var(--accent)] font-semibold hover:underline transition-colors">AI Solutions</Link>
              </li>
              <li>
                <Link href="/services" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/careers" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Solutions
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/services?tab=ai" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  AI & ML <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services?tab=web" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  Web & SaaS <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services?tab=mobile" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  Mobile Apps <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services?tab=data" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  Data Science <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services?tab=cloud" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  Cloud & DevOps <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Stay Updated
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Engineering insights on agentic AI, software architecture, and modern tech.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative flex items-center mt-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                disabled={subscribed}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] pr-9 cursor-text"
                aria-label="Newsletter email address"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="absolute right-1 w-7 h-7 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                aria-label="Subscribe to newsletter"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>

            <AnimatePresence mode="wait">
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs text-[var(--accent)] font-semibold mt-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Successfully subscribed!
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-500 font-medium mt-1"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* BOTTOM CONTACT ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 mt-10 border-t border-[var(--card-border)] text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[var(--accent)]" />
            <a href="mailto:live40220@gmail.com" className="hover:text-[var(--accent)] transition-colors">
              live40220@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[var(--secondary-accent)]" />
            <a href="tel:+15550199100" className="hover:text-[var(--secondary-accent)] transition-colors">
              +1 (555) 019-9100
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--accent)]" />
            <span>Silicon Valley, CA &bull; Lahore, Pakistan</span>
          </div>
        </div>

        {/* COPYRIGHT & LEGAL */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[var(--card-border)] text-[11px] text-[var(--text-muted)]">
          <div>
            &copy; {new Date().getFullYear()} 100Solutionz. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:underline">About Company</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <button type="button" onClick={openCalendly} className="text-[var(--accent)] hover:underline font-semibold cursor-pointer">
              Schedule Consultation
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
