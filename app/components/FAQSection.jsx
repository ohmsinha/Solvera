"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, Stagger, StaggerItem, RevealText, EASE } from "./Motion";
import SpotlightButton from "./SpotlightButton";
import { FAQS } from "../lib/faq";

function FaqItem({ faq, isOpen, onToggle, index }) {
  return (
    <div className="border-b border-[var(--line-0)] last:border-b-0">
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          id={`faq-trigger-${index}`}
          className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer
            group focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)] rounded-md"
        >
          <span
            className={`text-base sm:text-lg font-semibold tracking-tight transition-colors duration-200 ${
              isOpen
                ? "text-[var(--accent-0)]"
                : "text-[var(--ink-0)] group-hover:text-[var(--accent-0)]"
            }`}
          >
            {faq.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-200 ${
              isOpen
                ? "border-[var(--accent-line)] bg-[var(--accent-soft)] text-[var(--accent-0)]"
                : "border-[var(--line-1)] text-[var(--ink-3)] group-hover:border-[var(--ink-3)]"
            }`}
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-[var(--ink-2)] text-[15px] leading-relaxed max-w-2xl pb-6 pr-2 m-0">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="relative bg-[var(--paper-0)] border-t border-[var(--line-0)] py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: header (sticky on desktop) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-4">07 // FAQ</p>
            </Reveal>
            <h2 className="headline-serif text-[clamp(2rem,4vw,3.25rem)] text-[var(--ink-0)]">
              <RevealText
                text="Asked before every engagement."
                accentWords={["every"]}
                stagger={0.04}
              />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 text-[var(--ink-2)] text-base leading-relaxed max-w-sm">
                The honest answers, before the call. Anything else — ask us
                directly and we&rsquo;ll reply the same day.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8">
                <SpotlightButton variant="secondary" href="#contact">
                  Ask a question
                  <span className="ml-1.5">↗</span>
                </SpotlightButton>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="lg:col-span-8">
          <Stagger
            className="editorial-card px-7 sm:px-10 py-2"
            stagger={0.06}
          >
            {FAQS.map((faq, i) => (
              <StaggerItem key={faq.q} y={18}>
                <FaqItem
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
