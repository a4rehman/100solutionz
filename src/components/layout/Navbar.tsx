"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles, Code, Smartphone, BarChart3, Cloud, Calendar } from "lucide-react";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Portfolio", href: "/portfolio" },
  { name: "AI Solutions", href: "/ai-solutions", highlighted: true },
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const serviceDropdownItems = [
  { name: "AI & Machine Learning", href: "/services?tab=ai", desc: "Autonomous AI agents, RAG pipelines, NLP & vision", icon: Sparkles, color: "text-[var(--accent)]" },
  { name: "Web Development", href: "/services?tab=web", desc: "Enterprise SaaS, modern web applications, e-commerce", icon: Code, color: "text-[var(--secondary-accent)]" },
  { name: "Mobile App Development", href: "/services?tab=mobile", desc: "iOS, Android, and high-performance cross-platform apps", icon: Smartphone, color: "text-emerald-500" },
  { name: "Data Science", href: "/services?tab=data", desc: "Predictive analytics, BI intelligence, telemetry dashboards", icon: BarChart3, color: "text-amber-500" },
  { name: "Cloud & DevOps", href: "/services?tab=cloud", desc: "Kubernetes, AWS/GCP, infrastructure as code, CI/CD", icon: Cloud, color: "text-sky-500" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route navigation or Escape key
  useEffect(() => {
    startTransition(() => {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    if (mobileMenuOpen || dropdownOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileMenuOpen, dropdownOpen]);

  const openCalendly = () => {
    window.dispatchEvent(new CustomEvent("open-calendly"));
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "py-2.5 bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--card-border)] shadow-sm"
          : "py-4 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group select-none">
          <div className="w-9 h-9">
            <Logo showText={false} className="w-full h-full group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider text-[var(--text-primary)] leading-tight flex items-center gap-1">
              100<span className="text-[var(--secondary-accent)]">SOLUTIONZ</span>
            </span>
            <span className="text-[9px] tracking-[0.18em] font-semibold text-[var(--text-muted)] uppercase">
              Digital Innovation
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className={`px-3.5 py-2 text-xs font-semibold tracking-wide transition-colors flex items-center gap-1 rounded-lg cursor-pointer ${
                      isActive 
                        ? "text-[var(--accent)] bg-[var(--surface-elevated)]" 
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]"
                    }`}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {link.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-[380px] rounded-xl bg-[var(--surface)] p-3 shadow-xl border border-[var(--card-border)] z-50"
                      >
                        <div className="grid gap-1">
                          {serviceDropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors group/item"
                            >
                              <div className={`p-2 rounded-md bg-[var(--surface-muted)] ${item.color} mt-0.5`}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover/item:text-[var(--secondary-accent)] transition-colors">
                                  {item.name}
                                </h4>
                                <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-2 text-xs font-semibold tracking-wide transition-colors rounded-lg ${
                  isActive 
                    ? "text-[var(--accent)] font-bold bg-[var(--surface-elevated)]" 
                    : link.highlighted
                      ? "text-[var(--accent)] font-bold bg-[var(--selection-bg)] border border-[var(--accent)]/30"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* NAV ACTIONS (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={openCalendly}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Consultation
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE SHEET OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 65px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[var(--background)] border-b border-[var(--card-border)] lg:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.name} className="border-b border-[var(--card-border)] pb-2 pt-1">
                    <Link
                      href={link.href}
                      className={`text-base font-bold flex items-center justify-between ${
                        isActive 
                          ? "text-[var(--accent)]" 
                          : link.highlighted
                            ? "text-[var(--accent)]"
                            : "text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.highlighted && <Sparkles className="w-4 h-4 text-[var(--accent)]" />}
                    </Link>
                    
                    {/* Services Sub-Links in Mobile Menu */}
                    {link.hasDropdown && (
                      <div className="mt-2 pl-3 grid gap-2">
                        {serviceDropdownItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center gap-2 py-1"
                          >
                            <item.icon className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 mt-6 pb-6">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCalendly();
                }}
                className="w-full py-3 text-center rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-sm shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation Session
              </button>
              <div className="text-center text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                100Solutionz &bull; Digital Innovation
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
