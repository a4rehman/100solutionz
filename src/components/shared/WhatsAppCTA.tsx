"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  const whatsappNumber = "15550199100";
  const message = encodeURIComponent(
    "Hi 100Solutionz! I visited your website and would like to get more information about your AI & Software Development services."
  );

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with our engineers"
        title="Chat on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all group cursor-pointer"
      >
        <span className="absolute left-14 scale-0 group-hover:scale-100 bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--text-primary)] text-[10px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap origin-left transition-all shadow-md pointer-events-none">
          Quick WhatsApp Chat
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
      </a>
    </div>
  );
}
