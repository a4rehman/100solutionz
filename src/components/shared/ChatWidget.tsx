"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

const quickReplies = [
  { text: "AI Solutions", keyword: "ai" },
  { text: "Request a Quote", keyword: "quote" },
  { text: "Our Portfolio", keyword: "portfolio" },
  { text: "Contact Human", keyword: "human" },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const idCounterRef = useRef(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi there! 👋 I am SolutionzAI, your digital assistant. How can we help you shape your idea today?",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const botReply = (query: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let replyText = "I can help connect you with our lead engineers! 100Solutionz specializes in Autonomous AI Agents, Enterprise RAG, Web & SaaS Platforms, and Mobile Apps. Would you like to schedule a consultation?";
      const q = query.toLowerCase();

      if (q.includes("ai") || q.includes("chatbot") || q.includes("rag") || q.includes("agent")) {
        replyText = "Our AI division architects enterprise AI Agents, RAG systems, voice automation, and custom model deployments. Check out our 'AI Solutions' page for interactive agent demos!";
      } else if (q.includes("quote") || q.includes("pricing") || q.includes("cost") || q.includes("consultation")) {
        replyText = "We offer free initial architectural consultations! Click 'Book Consultation' in the top navigation or use our Contact page to speak directly with an engineering lead.";
      } else if (q.includes("portfolio") || q.includes("project") || q.includes("work")) {
        replyText = "Our portfolio includes autonomous support agents, medical intelligence systems, fintech mobile apps, and custom SaaS platforms. Explore our 'Portfolio' tab for case studies!";
      } else if (q.includes("human") || q.includes("contact") || q.includes("email") || q.includes("phone")) {
        replyText = "You can reach our team directly at live40220@gmail.com or call +1 (555) 019-9100. We typically respond within 2 business hours.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${idCounterRef.current++}`,
          sender: "bot",
          text: replyText,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${idCounterRef.current++}`,
      sender: "user",
      text,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    botReply(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          type="button"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="w-13 h-13 rounded-full bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--secondary-accent)] flex items-center justify-center shadow-lg hover:border-[var(--secondary-accent)] hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[var(--accent)] rounded-full border-2 border-[var(--background)] animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[90vw] sm:w-[380px] h-[520px] max-h-[85vh] rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 bg-[var(--surface-elevated)] border-b border-[var(--card-border)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--secondary-accent)]/15 text-[var(--secondary-accent)] flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    SolutionzAI Assistant
                    <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                  </h3>
                  <p className="text-[10px] text-[var(--accent)] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    Online &bull; Instant Answers
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-md border border-[var(--card-border)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Feed */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs bg-[var(--background)]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 max-w-[85%] ${
                    m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
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
                          : "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--card-border)] rounded-tl-none shadow-xs"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className={`text-[9px] text-[var(--text-muted)] mt-1 px-1 ${m.sender === "user" ? "text-right" : ""}`}>
                      {m.time}
                    </span>
                  </div>
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
            </div>

            {/* Quick Suggested Replies */}
            <div className="p-2 bg-[var(--surface)] border-t border-[var(--card-border)] flex items-center gap-1.5 overflow-x-auto">
              {quickReplies.map((qr) => (
                <button
                  key={qr.text}
                  type="button"
                  onClick={() => handleSend(qr.text)}
                  className="text-[10px] font-semibold py-1 px-2.5 rounded-full border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:border-[var(--secondary-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all whitespace-nowrap cursor-pointer"
                >
                  {qr.text}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[var(--surface-elevated)] border-t border-[var(--card-border)] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about our AI & software services..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[var(--surface)] border border-[var(--input-border)] px-3 py-2 text-xs rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                aria-label="Message to assistant"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:opacity-40"
                disabled={!inputText.trim()}
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
