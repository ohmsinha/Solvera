"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal, RevealText } from "./Motion";
import InboxAgentDemo from "./mockups/InboxAgentDemo";
import DocumentParserDemo from "./mockups/DocumentParserDemo";
import LeadDatabaseDemo from "./mockups/LeadDatabaseDemo";

const STEPS = [
  {
    key: "inbox",
    tag: "Conversational AI · Inbox Agent",
    title: "Replies in seconds, books the meeting.",
    body: "Every inbound message on WhatsApp or web gets an instant, on-brand reply — qualifying the lead and booking the consultation around the clock, before a competitor ever responds.",
    href: "/solutions/inbox-agent",
    cta: "Explore Inbox Agent",
    Mockup: InboxAgentDemo,
  },
  {
    key: "parser",
    tag: "Document intelligence · Parser",
    title: "Reads the contract, extracts the data.",
    body: "Drop in a contract, invoice, or form. Parser scans it, pulls the key terms, validates them, and pushes clean data into your systems — flagging only what genuinely needs a human.",
    href: "/solutions/parser",
    cta: "Explore Parser",
    Mockup: DocumentParserDemo,
  },
  {
    key: "scout",
    tag: "Lead qualification · Scout",
    title: "Qualifies every lead, automatically.",
    body: "Scout scores and tags inbound the moment it lands, so your team opens its day to a database of buyers who are actually ready — not a backlog to triage.",
    href: "/solutions/scout",
    cta: "Explore Scout",
    Mockup: LeadDatabaseDemo,
  },
];

/* Detects when a step crosses the viewport center and reports it active */
function ScrollStep({ index, onActive, step, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const { Mockup } = step;

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-center min-h-[62vh] lg:min-h-[78vh] ${
        isLast ? "" : ""
      }`}
    >
      <p className="eyebrow text-[var(--ink-4)] normal-case tracking-[0.14em] mb-4">
        {step.tag}
      </p>
      <h3 className="headline-serif text-[var(--ink-0)] text-[clamp(1.6rem,2.6vw,2.4rem)] mb-5 max-w-md">
        {step.title}
      </h3>
      <p className="text-[var(--ink-2)] text-base leading-relaxed max-w-md">
        {step.body}
      </p>

      <Link
        href={step.href}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-0)] hover:text-[var(--accent-1)] transition-colors no-underline group/cta w-fit"
      >
        {step.cta}
        <ArrowUpRight
          className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          strokeWidth={2}
        />
      </Link>

      {/* Mobile: inline mockup beneath each step (sticky pane is desktop-only) */}
      <div className="lg:hidden mt-8">
        <MobileMockup Mockup={Mockup} />
      </div>
    </div>
  );
}

/* Mobile mockup: mounts (and plays) only once scrolled into view */
function MobileMockup({ Mockup }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  return (
    <div ref={ref} className="flex justify-center">
      {inView ? <Mockup /> : <div className="w-full aspect-[16/10]" />}
    </div>
  );
}

export default function ShowcaseSection() {
  const [active, setActive] = useState(0);
  const onActive = useCallback((i) => setActive(i), []);
  const ActiveMockup = STEPS[active].Mockup;

  return (
    <section
      id="showcase"
      className="relative bg-[var(--paper-1)] border-t border-[var(--line-0)] py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">See it in action</p>
          </Reveal>
          <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--ink-0)]">
            <RevealText
              text="Real systems, not slideware."
              accentWords={["slideware."]}
              stagger={0.04}
            />
          </h2>
        </div>

        {/* 12-col sticky-scroll grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          {/* Left: scrolling text track (5 cols) */}
          <div className="lg:col-span-5">
            {STEPS.map((step, i) => (
              <ScrollStep
                key={step.key}
                index={i}
                step={step}
                onActive={onActive}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>

          {/* Right: pinned canvas (7 cols, desktop only) */}
          <div className="hidden lg:block lg:col-span-7">
            <div className="sticky top-24 h-[calc(100vh-8rem)] flex items-center justify-center">
              <div className="relative w-full min-h-[420px] flex items-center justify-center">
                {/* step indicator */}
                <div className="absolute -top-2 left-0 flex items-center gap-1.5">
                  {STEPS.map((s, i) => (
                    <span
                      key={s.key}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === active
                          ? "w-8 bg-[var(--accent-0)]"
                          : "w-3 bg-[var(--line-1)]"
                      }`}
                    />
                  ))}
                </div>

                <AnimatePresence>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <ActiveMockup />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
