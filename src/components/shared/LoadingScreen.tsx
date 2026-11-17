"use client";

import React, { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("100sol_splash_seen");
      const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (!hasSeen && !prefersReduced) {
        startTransition(() => {
          setShow(true);
        });
        sessionStorage.setItem("100sol_splash_seen", "true");
        const timer = setTimeout(() => {
          startTransition(() => {
            setShow(false);
          });
        }, 450);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore private browsing errors
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] bg-[var(--background)] flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14">
            <Logo showText={false} className="w-full h-full" />
          </div>
          <div className="w-28 h-1 bg-[var(--card-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--accent)]"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.45, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
