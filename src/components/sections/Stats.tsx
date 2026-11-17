"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  desc: string;
}

function Counter({ value, suffix, label, desc }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1200;
    const incrementTime = Math.max(10, Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6 rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-xs">
      <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight flex items-baseline">
        <span>{count}</span>
        <span className="text-[var(--accent)] font-extrabold ml-0.5">{suffix}</span>
      </span>
      
      <span className="text-xs font-bold mt-2 text-[var(--text-primary)] uppercase tracking-wider">
        {label}
      </span>
      
      <span className="text-[11px] text-[var(--text-muted)] mt-1 max-w-[220px] leading-relaxed">
        {desc}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 relative z-10 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Counter
            value={50}
            suffix="+"
            label="Digital Deployments"
            desc="AI agents, SaaS tools, and web platforms successfully deployed."
          />
          <Counter
            value={99}
            suffix="%"
            label="Sprint Completion"
            desc="Features and user stories delivered strictly within scheduled milestones."
          />
          <Counter
            value={45}
            suffix="s"
            label="AI Resolution Time"
            desc="Average latency for automated AI customer support ticket triage."
          />
          <Counter
            value={100}
            suffix="%"
            label="Code Ownership"
            desc="Clients own 100% of IP, repositories, licenses, and documentation."
          />
        </div>
      </div>
    </section>
  );
}
