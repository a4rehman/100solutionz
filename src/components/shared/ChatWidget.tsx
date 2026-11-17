"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  RotateCcw,
  ClipboardCopy,
  Check,
  ExternalLink,
  FileText,
} from "lucide-react";

interface Source {
  title: string;
  url: string;
}

interface UIMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  sources?: Source[];
  suggestions?: string[];
  isError?: boolean;
}

const WELCOME_TEXT =
  "Hi! I'm SolutionzAI 👋\n\nI'm your 100Solutionz assistant. I can help you explore our services, AI solutions, projects, and answer questions about working with our team.";

const INITIAL_SUGGESTIONS = [
  "Explore Our Services",
  "Explore AI Solutions",
  "Show Our Portfolio",
  "How Can You Help My Business?",
  "Request a Project Quote",
  "Book a Consultation",
];

function timeNow(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: WELCOME_TEXT,
      time: "Just now",
      suggestions: INITIAL_SUGGESTIONS,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // error state removed; handled inline
  const [conversationId] = useState(() => `conv-${Date.now().toString(36)}`);
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadData, setLeadData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    country: "",
    industry: "",
    selectedSolution: "",
    description: "",
    budget: "",
    contactMethod: "Email",
    honeypot: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const lastUserMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showLeadForm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: UIMessage = {
        id: newId("user"),
        sender: "user",
        text: trimmed,
        time: timeNow(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setIsTyping(true);
      lastUserMessageRef.current = trimmed;

      const nextHistory = [...history, { role: "user" as const, content: trimmed }];

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: nextHistory,
            conversationId,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to get a response.");
        }

        const botMsg: UIMessage = {
          id: newId("bot"),
          sender: "bot",
          text: data.answer,
          time: timeNow(),
          sources: data.sources,
          suggestions: data.suggestions,
        };
        setMessages((prev) => [...prev, botMsg]);
        setHistory([
          ...nextHistory,
          { role: "assistant", content: data.answer },
        ]);
      } catch {
        // error handled inline in bot message
        const botMsg: UIMessage = {
          id: newId("bot"),
          sender: "bot",
          text: "I'm having trouble responding right now. Please try again or contact our team directly.",
          time: timeNow(),
          isError: true,
        };
        setMessages((prev) => [...prev, botMsg]);
      } finally {
        setIsTyping(false);
      }
    },
    [history, conversationId]
  );

  const handleSend = (textToSend?: string) => {
    sendMessage(textToSend || inputText);
  };

  const handleRetry = () => {
    if (lastUserMessageRef.current) {
      // remove last error bot message
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.isError) return prev.slice(0, -1);
        return prev;
      });
      sendMessage(lastUserMessageRef.current);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: WELCOME_TEXT,
        time: "Just now",
        suggestions: INITIAL_SUGGESTIONS,
      },
    ]);
    setHistory([]);
    setShowLeadForm(false);
    setLeadSuccess(null);
    setLeadError(null);
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // ignore
    }
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.fullName || !leadData.email || !leadData.description) {
      setLeadError("Please complete name, email, and project description.");
      return;
    }
    setLeadSubmitting(true);
    setLeadError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setLeadSuccess(data.referenceId || "Submitted");
      setMessages((prev) => [
        ...prev,
        {
          id: newId("bot"),
          sender: "bot",
          text: `Thanks! Your inquiry has been received (Ref: ${data.referenceId || "100S"}). A senior architect will follow up via ${leadData.contactMethod}.`,
          time: timeNow(),
        },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setLeadError(msg);
    } finally {
      setLeadSubmitting(false);
    }
  };

  const renderText = (text: string) => {
    // Safe markdown-lite: paragraphs, bullets, and internal links [label](/path)
    const lines = text.split("\n");
    const blocks: React.ReactNode[] = [];
    let bulletBuffer: string[] = [];

    const flushBullets = () => {
      if (bulletBuffer.length) {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="list-disc pl-4 space-y-1 my-1">
            {bulletBuffer.map((b, i) => (
              <li key={i}>{renderInline(b)}</li>
            ))}
          </ul>
        );
        bulletBuffer = [];
      }
    };

    const renderInline = (s: string): React.ReactNode => {
      // links
      const parts = s.split(/(\[[^\]]+\]\([^)]+\))/g);
      return parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          const label = m[1];
          const url = m[2];
          if (url.startsWith("/") || url.startsWith("https://100solutionz.com")) {
            return (
              <a
                key={i}
                href={url}
                className="text-[var(--accent)] underline hover:opacity-80"
                target={url.startsWith("http") ? "_blank" : undefined}
                rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {label}
              </a>
            );
          }
          return <span key={i}>{label}</span>;
        }
        return <span key={i}>{part}</span>;
      });
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushBullets();
        return;
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
        bulletBuffer.push(trimmed.replace(/^[-•]\s*/, ""));
        return;
      }
      flushBullets();
      blocks.push(
        <p key={`p-${idx}`} className="my-1">
          {renderInline(trimmed)}
        </p>
      );
    });
    flushBullets();

    return <div className="text-xs leading-relaxed">{blocks}</div>;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {!isOpen && (
        <motion.button
          ref={triggerRef}
          type="button"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--secondary-accent)] flex items-center justify-center shadow-lg hover:border-[var(--secondary-accent)] hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--accent)] rounded-full border-2 border-[var(--background)]" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="region"
            aria-label="AI Support Chat"
            className="w-[90vw] sm:w-[400px] h-[600px] max-h-[85vh] rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 bg-[var(--surface-elevated)] border-b border-[var(--card-border)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--secondary-accent)]/15 text-[var(--secondary-accent)] flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    SolutionzAI
                    <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                  </h3>
                  <p className="text-[10px] text-[var(--accent)] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    Your 100Solutionz AI Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="w-7 h-7 rounded-md border border-[var(--card-border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Start new chat"
                  title="New chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-md border border-[var(--card-border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close chat window"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs bg-[var(--background)]"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col gap-1.5 max-w-[88%] ${m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}>
                  <div className={`flex gap-2 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                        m.sender === "user"
                          ? "bg-[var(--secondary-accent)] text-white"
                          : "bg-[var(--surface-muted)] text-[var(--accent)]"
                      }`}
                    >
                      {m.sender === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex flex-col">
                      <div
                        className={`p-2.5 rounded-xl leading-relaxed text-xs ${
                          m.sender === "user"
                            ? "bg-[var(--secondary-accent)] text-white rounded-tr-none"
                            : m.isError
                            ? "bg-rose-500/10 text-rose-500 border border-rose-500/30 rounded-tl-none"
                            : "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--card-border)] rounded-tl-none shadow-xs"
                        }`}
                      >
                        {m.sender === "bot" ? renderText(m.text) : <span className="whitespace-pre-wrap">{m.text}</span>}
                      </div>
                      <div className={`flex items-center gap-2 mt-1 px-1 ${m.sender === "user" ? "justify-end" : ""}`}>
                        <span className="text-[9px] text-[var(--text-muted)]">{m.time}</span>
                        {m.sender === "bot" && !m.isError && (
                          <button
                            type="button"
                            onClick={() => handleCopy(m.id, m.text)}
                            className="text-[9px] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-0.5 cursor-pointer"
                            aria-label="Copy response"
                          >
                            {copiedId === m.id ? <Check className="w-3 h-3" /> : <ClipboardCopy className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {m.sender === "bot" && m.sources && m.sources.length > 0 && (
                    <div className="ml-8 flex flex-wrap gap-1.5">
                      {m.sources.map((s) => (
                        <a
                          key={s.url + s.title}
                          href={s.url}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full border border-[var(--card-border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          {s.title}
                        </a>
                      ))}
                    </div>
                  )}

                  {m.sender === "bot" && m.suggestions && m.suggestions.length > 0 && (
                    <div className="ml-8 flex flex-wrap gap-1.5">
                      {m.suggestions.map((sg) => (
                        <button
                          key={sg}
                          type="button"
                          onClick={() => {
                            if (sg === "Request a Project Quote") {
                              setShowLeadForm(true);
                            } else {
                              handleSend(sg);
                            }
                          }}
                          className="text-[9px] font-semibold px-2 py-1 rounded-full border border-[var(--card-border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--secondary-accent)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                        >
                          {sg}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.isError && (
                    <div className="ml-8">
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="text-[9px] font-bold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Retry
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-[var(--text-muted)] p-2 text-xs">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] ml-1">SolutionzAI is typing...</span>
                </div>
              )}

              {showLeadForm && (
                <div className="mr-auto max-w-[95%] w-full rounded-xl bg-[var(--surface)] border border-[var(--card-border)] p-3 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                      Project Inquiry
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                      aria-label="Close lead form"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {leadSuccess ? (
                    <div className="text-xs text-[var(--accent)] font-semibold">
                      Submitted (Ref: {leadSuccess}). Our team will follow up shortly.
                    </div>
                  ) : (
                    <form onSubmit={submitLead} className="space-y-2">
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={leadData.honeypot}
                          onChange={(e) => setLeadData({ ...leadData, honeypot: e.target.value })}
                        />
                      </div>
                      {leadError && (
                        <div className="text-[10px] text-rose-500 font-semibold">{leadError}</div>
                      )}
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={leadData.fullName}
                        onChange={(e) => setLeadData({ ...leadData, fullName: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)]"
                      />
                      <input
                        type="email"
                        placeholder="Work Email *"
                        value={leadData.email}
                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)]"
                      />
                      <input
                        type="text"
                        placeholder="Company (optional)"
                        value={leadData.companyName}
                        onChange={(e) => setLeadData({ ...leadData, companyName: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Project description *"
                        value={leadData.description}
                        onChange={(e) => setLeadData({ ...leadData, description: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[var(--input-background)] border border-[var(--input-border)] text-xs text-[var(--text-primary)]"
                      />
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className="w-full py-1.5 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer disabled:opacity-50"
                      >
                        {leadSubmitting ? "Submitting..." : "Submit Inquiry"}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[var(--surface-elevated)] border-t border-[var(--card-border)] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about our AI & software services..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[var(--surface)] border border-[var(--input-border)] px-3 py-2 text-xs rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                aria-label="Message to assistant"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:opacity-40"
                disabled={!inputText.trim() || isTyping}
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}