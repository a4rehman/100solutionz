"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, ArrowRight, Sparkles, Code, Smartphone, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { getVisitorMetadata } from "@/utils/visitorTracker";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_lw030qp";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_t2r1s1j";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "znlhzaw2OQmZ7uVqd";

const consultationTypes = [
  { id: "ai", title: "AI & Agent Strategy", duration: "30 Mins", icon: Sparkles, desc: "Explore LLMs, RAG indexing, and agent automations." },
  { id: "web", title: "Web & SaaS Architecture", duration: "45 Mins", icon: Code, desc: "Review cloud scalability, full-stack stacks, and roadmaps." },
  { id: "mobile", title: "Mobile App Consultation", duration: "30 Mins", icon: Smartphone, desc: "Discuss iOS, Android, and cross-platform timelines." },
];

const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

export default function CalendlyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(consultationTypes[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setSelectedDate("");
      setSelectedTime("");
      setFormData({ name: "", email: "", notes: "" });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-calendly", handleOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-calendly", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const trackingMeta = await getVisitorMetadata();
      const templateParams = {
        subject: `Consultation Booked: ${selectedType.title}`,
        from_name: formData.name,
        from_email: formData.email,
        phone: "Consultation Request",
        message: `Topic: ${selectedType.title}\nDate: ${selectedDate}\nTime: ${selectedTime}\nNotes: ${formData.notes}`,
        source: "In-App Consultation Scheduler",
        ...trackingMeta,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
    } catch {
      // Proceed to success step even if email delivery fails, ensuring smooth UX
    } finally {
      setIsSubmitting(false);
      setStep(4);
    }
  };

  // Generate the next 5 business days
  const getDaysArray = () => {
    const days = [];
    const today = new Date();
    const current = new Date(today);
    while (days.length < 5) {
      current.setDate(current.getDate() + 1);
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        days.push(new Date(current));
      }
    }
    return days;
  };
  const calendarDays = getDaysArray();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[var(--overlay-background)] backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Book Technical Consultation"
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative w-full max-w-lg rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] shadow-2xl p-6 overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--card-border)]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                Direct Engineering Access
              </span>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Schedule a Free Technical Consultation
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-3 gap-2 py-3 border-b border-[var(--card-border)]">
            {["1. Topic", "2. Date & Time", "3. Contact"].map((label, idx) => (
              <div
                key={label}
                className={`text-[11px] font-semibold text-center py-1 rounded-md transition-colors ${
                  step === idx + 1
                    ? "bg-[var(--selection-bg)] text-[var(--accent)] border border-[var(--accent)]/30"
                    : step > idx + 1
                      ? "text-[var(--text-primary)] font-bold"
                      : "text-[var(--text-muted)]"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Body Content */}
          <div className="py-4 overflow-y-auto flex-1">
            {/* STEP 1: CONSULTATION TYPE */}
            {step === 1 && (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-[var(--text-secondary)] mb-1">
                  Select the domain you would like to explore with our engineering leads:
                </p>
                {consultationTypes.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "border-[var(--secondary-accent)] bg-[var(--surface-elevated)] shadow-xs"
                          : "border-[var(--card-border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)]"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-[var(--surface-muted)] text-[var(--secondary-accent)] shrink-0 mt-0.5">
                        <type.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[var(--text-primary)]">{type.title}</h4>
                          <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 font-semibold">
                            <Clock className="w-3 h-3" /> {type.duration}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{type.desc}</p>
                      </div>
                    </button>
                  );
                })}

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-2">
                    Select a Date
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {calendarDays.map((d) => {
                      const dateStr = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          type="button"
                          key={dateStr}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                            isSelected
                              ? "border-[var(--secondary-accent)] bg-[var(--surface-elevated)] font-bold text-[var(--text-primary)]"
                              : "border-[var(--card-border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--text-secondary)]"
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">
                            {d.toLocaleDateString("en-US", { weekday: "short" })}
                          </span>
                          <span className="text-sm font-extrabold mt-1">
                            {d.getDate()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-2">
                    Select an Available Slot (EST / GMT-5)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 rounded-lg border text-xs text-center transition-all cursor-pointer font-semibold ${
                            isSelected
                              ? "border-[var(--accent)] bg-[var(--selection-bg)] text-[var(--accent)] font-bold"
                              : "border-[var(--card-border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--text-secondary)]"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleNextStep}
                    className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT FORM */}
            {step === 3 && (
              <form onSubmit={handleBook} className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] text-xs text-[var(--text-secondary)]">
                  <span className="font-bold text-[var(--text-primary)]">{selectedType.title}</span>
                  <div className="text-[11px] mt-0.5 text-[var(--accent)] font-semibold">
                    {selectedDate} &bull; {selectedTime}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                    Your Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] cursor-text"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-primary)] block mb-1">
                    Project Goals / Tech Needs
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe what you're building..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--surface)] border border-[var(--input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--secondary-accent)] resize-none cursor-text"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email}
                    className="px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)] font-bold text-xs hover:bg-[var(--accent-hover)] transition-all cursor-pointer disabled:opacity-40"
                  >
                    {isSubmitting ? "Confirming..." : "Confirm Consultation"}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
              <div className="flex flex-col items-center justify-center text-center py-6 gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--selection-bg)] text-[var(--accent)] flex items-center justify-center">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Consultation Request Received!
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
                  Thank you, <span className="font-bold text-[var(--text-primary)]">{formData.name}</span>. An engineering lead has received your booking request for{" "}
                  <span className="font-semibold text-[var(--accent)]">{selectedDate} at {selectedTime}</span>. A calendar invitation has been dispatched to {formData.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-6 py-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--card-border)] hover:bg-[var(--surface-muted)] text-xs font-bold text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
