"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SpotlightButton from "./SpotlightButton";
import { Reveal, RevealText } from "./Motion";

export default function ResultsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative bg-[var(--paper-0)] border-t border-[var(--line-0)] py-24 sm:py-32 px-6 sm:px-10 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-[1200px] mx-auto mb-16">
        <Reveal>
          <p className="eyebrow mb-4">Customer results</p>
        </Reveal>
        <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--ink-0)] max-w-xl">
          <RevealText
            text="We measure the work, not the demo."
            accentWords={["work,"]}
            stagger={0.04}
          />
        </h2>
      </div>

      {/* ── Cards ── */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card A — light editorial case card */}
        <Reveal>
          <div className="editorial-card overflow-hidden h-full">
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-md bg-[var(--paper-2)] border border-[var(--line-0)] flex items-center justify-center">
                  <span className="text-[var(--ink-2)] text-xs font-bold">Q</span>
                </div>
                <span className="text-[var(--ink-2)] text-sm font-medium">
                  Quotient
                </span>
              </div>

              <p className="eyebrow mb-3">40% faster resolution time</p>

              <h3 className="headline-serif text-[var(--ink-0)] text-2xl sm:text-3xl mb-4 max-w-md">
                Seamless support across{" "}
                <em className="text-[var(--accent-0)]">every channel</em>
              </h3>

              <p className="text-[var(--ink-2)] text-[15px] leading-relaxed max-w-md">
                With Solvera handling routine and complex requests, the team
                scaled support without adding headcount — while improving
                response speed and consistency.
              </p>
            </div>

            {/* Image placeholder w/ parallax */}
            <motion.div style={{ y: parallaxY }}>
              <div className="mx-8 mb-8 aspect-[16/9] rounded-lg bg-[var(--paper-2)] border border-[var(--line-0)] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80" 
                  alt="Business strategy session" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Card B — inverted dark "premium moment" final CTA */}
        <Reveal delay={0.12}>
          <div className="rounded-xl bg-[var(--ink-bg-0)] border border-[var(--ink-line)] overflow-hidden h-full">
            <div className="p-8 sm:p-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-md bg-[var(--ink-bg-2)] border border-[var(--ink-line)] flex items-center justify-center">
                  <span className="text-[var(--accent-on-dark)] text-sm font-bold">
                    S
                  </span>
                </div>
              </div>

              <h3 className="headline-serif text-[var(--on-ink-0)] text-2xl sm:text-3xl mb-4 max-w-sm">
                Resolve more. Scale smarter.{" "}
                <em className="text-[var(--accent-on-dark)]">
                  Start with Solvera.
                </em>
              </h3>

              <p className="text-[var(--on-ink-1)] text-[15px] leading-relaxed max-w-sm mb-8">
                Deploy your first AI system and turn manual operations into a
                fast, reliable, measurable process.
              </p>

              {/* Pulse — live operations mini-dashboard */}
              <div
                aria-hidden="true"
                className="flex-1 rounded-lg bg-[var(--ink-bg-1)] border border-[var(--ink-line)] min-h-[200px] mb-8 p-5 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[var(--on-ink-1)] text-[12px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-on-dark)] animate-pulse" />
                    Pulse · Live operations
                  </span>
                  <span className="text-[var(--on-ink-2)] text-[11px] font-[family-name:var(--font-mono)]">
                    NOW
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: "1.2s", l: "Avg response" },
                    { v: "94%", l: "Auto-resolved" },
                    { v: "0", l: "Leads dropped" },
                  ].map((m) => (
                    <div
                      key={m.l}
                      className="rounded-md bg-[var(--ink-bg-2)] border border-[var(--ink-line)] px-3 py-2.5"
                    >
                      <p className="tnum text-[var(--accent-on-dark)] text-lg font-semibold font-[family-name:var(--font-mono)] m-0">
                        {m.v}
                      </p>
                      <p className="text-[var(--on-ink-2)] text-[10.5px] mt-0.5 m-0 leading-tight">
                        {m.l}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-1.5 h-10 px-1">
                  {[35, 55, 42, 68, 50, 78, 62, 88, 70, 95, 82, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-[var(--accent-on-dark)]"
                      style={{ height: `${h}%`, opacity: 0.25 + (i / 12) * 0.65 }}
                    />
                  ))}
                </div>

                <div className="space-y-2 mt-auto">
                  {[
                    "Inbox Agent → consultation booked · 2m ago",
                    "Parser → invoice #2841 validated · 4m ago",
                  ].map((row) => (
                    <p
                      key={row}
                      className="text-[var(--on-ink-2)] text-[11px] font-[family-name:var(--font-mono)] m-0 truncate"
                    >
                      {row}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SpotlightButton variant="inverted" href="#contact">
                  Book a consultation
                  <span className="ml-1.5">↗</span>
                </SpotlightButton>
                <SpotlightButton variant="on-dark" href="#contact">
                  Contact sales
                </SpotlightButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
