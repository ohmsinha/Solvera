"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, CalendarCheck, Check, ArrowRight } from "lucide-react";
import { Reveal, RevealText, EASE } from "./Motion";
import { SITE } from "../lib/site";

const INTERESTS = [
  "AI agents / conversational AI",
  "Workflow automation",
  "Document intelligence",
  "Sales & CRM automation",
  "Not sure yet — help me scope it",
];

const NEXT_STEPS = [
  { title: "Intro call", body: "25 minutes. We map where AI removes the most manual work." },
  { title: "Assessment", body: "A scoped proposal anchored to a number worth moving." },
  { title: "First deployment", body: "A production system live in four to six weeks." },
];

const inputCls =
  "w-full bg-[var(--ink-bg-1)] border border-[var(--ink-line)] rounded-lg px-4 py-3 text-[15px] " +
  "text-[var(--on-ink-0)] placeholder:text-[var(--on-ink-2)] transition-colors duration-200 " +
  "focus:outline-none focus:border-[var(--accent-on-dark)] focus:ring-[3px] focus:ring-[rgba(92,184,159,0.25)]";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: INTERESTS[0],
    message: "",
    website: "", // honeypot — real users never fill this
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      next.email = "Enter a valid work email so we can reply.";
    if (!form.company.trim()) next.company = "Which company is this for?";
    return next;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) return; // bot caught by honeypot
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      // focus the first invalid field for keyboard / screen-reader users
      const first = ["name", "email", "company"].find((k) => next[k]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    // TODO: POST `form` to your CRM / email service (e.g. /api/contact)
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  };

  return (
    <section
      id="contact"
      aria-label="Book a consultation"
      className="relative bg-[var(--ink-bg-0)] border-t border-[var(--ink-line)] py-24 sm:py-32 px-6 sm:px-10 overflow-hidden"
    >
      {/* faint ambient accent glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] w-[48vw] h-[48vw] rounded-full opacity-[0.12] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--accent-on-dark) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 relative">
        {/* Left: pitch + details */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-4 text-[var(--accent-on-dark)]">
              08 // Start
            </p>
          </Reveal>
          <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--on-ink-0)]">
            <RevealText
              text="Tell us what's slowing you down."
              accentWords={["slowing"]}
              stagger={0.04}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[var(--on-ink-1)] text-base leading-relaxed max-w-md">
              One short call. We&rsquo;ll tell you honestly whether AI moves
              your numbers — and exactly what we would build first if it does.
            </p>
          </Reveal>

          {/* what happens next */}
          <Reveal delay={0.25}>
            <ol className="mt-10 space-y-5 list-none p-0 m-0">
              {NEXT_STEPS.map((step, i) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full border border-[var(--ink-line)] flex items-center justify-center text-[var(--accent-on-dark)] text-xs font-semibold font-[family-name:var(--font-mono)]">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[var(--on-ink-0)] text-sm font-semibold">
                      {step.title}
                    </span>
                    <span className="block text-[var(--on-ink-2)] text-sm mt-1 leading-relaxed">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* direct contact */}
          <Reveal delay={0.35}>
            <div className="mt-10 pt-8 border-t border-[var(--ink-line)] space-y-3">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-[var(--on-ink-1)] text-sm hover:text-[var(--on-ink-0)] transition-colors"
              >
                <Mail className="w-4 h-4 text-[var(--accent-on-dark)]" strokeWidth={2} />
                {SITE.email}
              </a>
              <p className="flex items-center gap-3 text-[var(--on-ink-1)] text-sm m-0">
                <MapPin className="w-4 h-4 text-[var(--accent-on-dark)]" strokeWidth={2} />
                {SITE.address.locality}, {SITE.address.countryName}
              </p>
              <p className="flex items-center gap-3 text-[var(--on-ink-1)] text-sm m-0">
                <CalendarCheck className="w-4 h-4 text-[var(--accent-on-dark)]" strokeWidth={2} />
                Replies within one business day
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1} y={44}>
            <div className="rounded-xl bg-[var(--ink-bg-1)] border border-[var(--ink-line)] p-7 sm:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="min-h-[420px] flex flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                      className="w-16 h-16 rounded-full bg-[var(--accent-on-dark)] flex items-center justify-center mb-6"
                    >
                      <Check className="w-7 h-7 text-[var(--ink-bg-0)]" strokeWidth={2.5} />
                    </motion.span>
                    <h3 className="headline-serif text-[var(--on-ink-0)] text-2xl sm:text-3xl mb-3">
                      Request received.
                    </h3>
                    <p className="text-[var(--on-ink-1)] text-sm leading-relaxed max-w-sm m-0">
                      Thanks, {form.name.split(" ")[0]} — we&rsquo;ll reply to{" "}
                      <span className="text-[var(--accent-on-dark)]">{form.email}</span>{" "}
                      within one business day with a few times for the intro call.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    noValidate
                    initial={false}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-[var(--on-ink-1)] text-[13px] font-medium mb-2"
                        >
                          Full name <span className="text-[var(--accent-on-dark)]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Jane Carter"
                          className={inputCls}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p role="alert" className="text-[#e08a7a] text-xs mt-2 m-0">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-[var(--on-ink-1)] text-[13px] font-medium mb-2"
                        >
                          Work email <span className="text-[var(--accent-on-dark)]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="jane@company.com"
                          className={inputCls}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p role="alert" className="text-[#e08a7a] text-xs mt-2 m-0">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-company"
                          className="block text-[var(--on-ink-1)] text-[13px] font-medium mb-2"
                        >
                          Company <span className="text-[var(--accent-on-dark)]">*</span>
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          autoComplete="organization"
                          value={form.company}
                          onChange={set("company")}
                          placeholder="Company name"
                          className={inputCls}
                          aria-invalid={!!errors.company}
                        />
                        {errors.company && (
                          <p role="alert" className="text-[#e08a7a] text-xs mt-2 m-0">
                            {errors.company}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-interest"
                          className="block text-[var(--on-ink-1)] text-[13px] font-medium mb-2"
                        >
                          What do you want to automate?
                        </label>
                        <select
                          id="contact-interest"
                          value={form.interest}
                          onChange={set("interest")}
                          className={`${inputCls} cursor-pointer appearance-none`}
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23908c7f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.85rem center",
                          }}
                        >
                          {INTERESTS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="contact-message"
                          className="block text-[var(--on-ink-1)] text-[13px] font-medium mb-2"
                        >
                          Anything else we should know?
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          value={form.message}
                          onChange={set("message")}
                          placeholder="Team size, tools you use, the process that hurts the most…"
                          className={`${inputCls} resize-none`}
                        />
                      </div>

                      {/* honeypot — hidden from humans, traps naive bots */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="contact-website">Website</label>
                        <input
                          id="contact-website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.website}
                          onChange={set("website")}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-spotlight inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg
                          bg-[var(--accent-on-dark)] text-[var(--ink-bg-0)] text-sm font-semibold tracking-tight
                          hover:brightness-110 transition-all duration-200 cursor-pointer
                          disabled:opacity-60 disabled:cursor-wait active:translate-y-px
                          focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(92,184,159,0.35)]"
                      >
                        {status === "sending" ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-[var(--ink-bg-0)] border-t-transparent animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Book the intro call
                            <ArrowRight className="w-4 h-4" strokeWidth={2} />
                          </>
                        )}
                      </button>
                      <p className="text-[var(--on-ink-2)] text-xs leading-relaxed m-0">
                        No retainers, no commitments — just an honest read on
                        whether AI moves your numbers.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
