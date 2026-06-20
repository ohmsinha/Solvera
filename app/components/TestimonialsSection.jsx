"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, RevealText, EASE } from "./Motion";

const TESTIMONIALS = [
  {
    quote:
      "The inbox agent paid for itself in the first month. Leads that used to sit overnight now get answered in seconds — and our calendar fills itself.",
    name: "Sara Al Mansouri",
    role: "Managing Director",
    company: "Meridian Properties",
    metric: "+38% booked viewings",
  },
  {
    quote:
      "We went from three hours of contract review to under a minute, with fewer errors than the manual process. The team finally works on the work.",
    name: "Daniel Okafor",
    role: "Head of Operations",
    company: "Atlasline Trading",
    metric: "3 hrs → 45 sec per contract",
  },
  {
    quote:
      "Solvera shipped in five weeks what our previous vendor scoped at eight months. It just runs — and when it needs a human, it asks for one.",
    name: "Priya Raghavan",
    role: "COO",
    company: "Quotient",
    metric: "First deployment in 5 weeks",
  },
];

const ROTATE_MS = 6500;

export default function TestimonialsSection() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir) =>
      setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  );

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => go(1), ROTATE_MS);
    return () => clearInterval(id);
  }, [go, reduce, paused]);

  const t = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative bg-[var(--paper-1)] border-t border-[var(--line-0)] py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">06 // Client voices</p>
          </Reveal>
          <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--ink-0)]">
            <RevealText
              text="Operators say it better than we can."
              accentWords={["better"]}
              stagger={0.04}
            />
          </h2>
        </div>

        {/* Featured rotating quote */}
        <Reveal y={40}>
          <div
            className="editorial-card relative overflow-hidden p-8 sm:p-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* oversized quote glyph */}
            <span
              aria-hidden="true"
              className="headline-serif absolute -top-6 left-6 text-[10rem] leading-none text-[var(--accent-soft)] select-none"
            >
              &ldquo;
            </span>

            <div className="relative min-h-[200px] sm:min-h-[170px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -14 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="m-0"
                >
                  <blockquote className="headline-serif text-[var(--ink-0)] text-[clamp(1.35rem,2.6vw,2rem)] leading-snug max-w-3xl m-0">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {/* avatar photo */}
                    <div className="w-10 h-10 rounded-full border border-[var(--line-1)] overflow-hidden bg-[var(--paper-2)]">
                      <img 
                        src={`https://images.unsplash.com/photo-${t.name === "Sara Al Mansouri" ? "1573496359142-b8d87734a5a2" : t.name === "Daniel Okafor" ? "1560250097-0b93528c311a" : "1580489944761-15a19d654956"}?auto=format&fit=crop&w=128&q=80`}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>
                      <span className="block text-[var(--ink-0)] text-sm font-semibold">
                        {t.name}
                      </span>
                      <span className="block text-[var(--ink-3)] text-[13px] mt-0.5">
                        {t.role}, {t.company}
                      </span>
                    </span>
                    <span className="eyebrow text-[var(--accent-0)] sm:ml-auto">
                      {t.metric}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* controls */}
            <div className="mt-10 pt-6 border-t border-[var(--line-0)] flex items-center justify-between">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonials">
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show testimonial from ${item.name}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === index
                        ? "w-8 bg-[var(--accent-0)]"
                        : "w-3 bg-[var(--line-1)] hover:bg-[var(--ink-4)]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {[
                  { Icon: ArrowLeft, dir: -1, label: "Previous testimonial" },
                  { Icon: ArrowRight, dir: 1, label: "Next testimonial" },
                ].map(({ Icon, dir, label }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => go(dir)}
                    className="w-11 h-11 rounded-full border border-[var(--line-1)] flex items-center justify-center
                      text-[var(--ink-2)] hover:text-[var(--ink-0)] hover:border-[var(--ink-3)]
                      transition-colors duration-200 cursor-pointer
                      focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)]"
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
