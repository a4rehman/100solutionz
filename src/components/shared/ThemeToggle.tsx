"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--secondary-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] transition-all cursor-pointer ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ scale: 0.6, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.6, rotate: 45, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Sun className="w-4 h-4 text-[#F59E0B]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0.6, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.6, rotate: -45, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Moon className="w-4 h-4 text-[var(--secondary-accent)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
