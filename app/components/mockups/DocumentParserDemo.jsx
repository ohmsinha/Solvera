"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const EASE = [0.22, 0.61, 0.36, 1];

/* Extracted data points; `at` = step index at which they fill */
const POINTS = [
  { label: "Agreement Type", value: "Professional Services Agreement", at: 1 },
  { label: "Effective Date", value: "November 1, 2023", at: 1 },
  { label: "Parties Involved", value: "ACME Corp. · John Doe", at: 1 },
  { label: "Compensation", value: "$5,000 USD / Month", at: 2 },
  { label: "Term Duration", value: "Twelve (12) Months", at: 3 },
  { label: "Governing Law", value: "Delaware", at: 3 },
  { label: "Confidentiality", value: "Present, Section 3", at: 3 },
];

export default function DocumentParserDemo() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce) {
      setStep(3);
      return;
    }
    setStep(0);
    const timers = [
      setTimeout(() => setStep(1), 600), // scan para 1 → first batch
      setTimeout(() => setStep(2), 1700), // scan compensation
      setTimeout(() => setStep(3), 2700), // fill remaining → 100%
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  const progress = [50, 70, 85, 100][step];
  const filled = (at) => step >= at;

  const Hl = ({ children, on }) => (
    <span
      className={
        on
          ? "bg-[var(--accent-soft)] rounded-[2px] px-0.5 transition-colors duration-300"
          : undefined
      }
    >
      {children}
    </span>
  );

  return (
    <div className="w-full aspect-[16/10] rounded-xl bg-[var(--surface-card)] border border-[var(--line-1)] shadow-[0_24px_60px_-32px_rgba(22,20,15,0.35)] overflow-hidden flex flex-col">
      <div className="grid grid-cols-5 flex-1 min-h-0">
        {/* ── Left: document ── */}
        <div className="col-span-3 p-5 border-r border-[var(--line-0)] flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3">
            <span className="eyebrow text-[var(--ink-3)] text-[10px]">
              Document view
            </span>
            <span className="headline-serif text-[var(--ink-2)] text-base">
              Newsreader
            </span>
          </div>

          <div className="relative flex-1 rounded-md bg-[var(--paper-1)] border border-[var(--line-0)] p-4 overflow-hidden">
            {/* scanning highlight bar */}
            {!reduce && step >= 1 && step < 3 && (
              <motion.div
                key={step}
                className="absolute left-3 right-3 bg-[var(--accent-0)]/15 rounded"
                style={{ top: step === 1 ? "14%" : "58%", height: "16%" }}
                initial={{ scaleX: 0, opacity: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1, opacity: [0, 1, 1, 0.4] }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            )}

            <p className="text-[var(--font-serif)] font-[family-name:var(--font-serif)] text-[var(--ink-1)] text-[10.5px] leading-relaxed mb-2.5">
              THIS AGREEMENT is made and entered into this{" "}
              <Hl on={filled(1)}>13th day of October, 2022</Hl>, by and between{" "}
              <Hl on={filled(1)}>ACME Corp.</Hl>, a Delaware corporation, and{" "}
              <Hl on={filled(1)}>John Doe</Hl>, an individual (the “Contractor”).
            </p>
            <p className="font-[family-name:var(--font-serif)] text-[var(--ink-1)] text-[10.5px] leading-relaxed mb-2.5">
              1. <Hl on={filled(1)}>TERM.</Hl> The initial term shall commence on{" "}
              <Hl on={filled(1)}>November 1, 2023</Hl> and continue for a period
              of twelve (12) months.
            </p>
            <p className="font-[family-name:var(--font-serif)] text-[var(--ink-1)] text-[10.5px] leading-relaxed mb-2.5">
              2. <Hl on={filled(2)}>COMPENSATION.</Hl> The Company shall pay the
              Contractor a monthly fee of <Hl on={filled(2)}>$5,000 USD</Hl> for
              the Services rendered under this Agreement.
            </p>
            <p className="font-[family-name:var(--font-serif)] text-[var(--ink-1)] text-[10.5px] leading-relaxed">
              3. <Hl on={filled(3)}>CONFIDENTIALITY.</Hl> The Contractor shall
              maintain confidentiality of all proprietary information disclosed
              during the term of this Agreement.
            </p>
          </div>
        </div>

        {/* ── Right: extraction panel ── */}
        <div className="col-span-2 p-5 bg-[var(--paper-1)] flex flex-col min-h-0">
          <span className="eyebrow text-[var(--ink-3)] text-[10px] mb-3">
            AI extraction panel
          </span>

          {/* progress */}
          <div className="rounded-md bg-[var(--surface-card)] border border-[var(--line-0)] p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[var(--ink-2)] text-[10.5px] font-medium">
                AI processing {progress}%
              </span>
              <Check
                className={`w-3.5 h-3.5 ${
                  progress === 100
                    ? "text-[var(--accent-0)]"
                    : "text-[var(--ink-4)]"
                }`}
                strokeWidth={3}
              />
            </div>
            <div className="h-1.5 rounded-full bg-[var(--paper-3)] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[var(--accent-0)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
          </div>

          {/* data points */}
          <div className="flex-1 rounded-md bg-[var(--surface-card)] border border-[var(--line-0)] p-3 space-y-2 overflow-hidden">
            {POINTS.map((p) => {
              const on = filled(p.at);
              return (
                <div key={p.label} className="flex items-start gap-2">
                  <div
                    className={`mt-0.5 w-3.5 h-3.5 rounded-[4px] flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      on
                        ? "bg-[var(--accent-0)] border border-[var(--accent-0)]"
                        : "border border-[var(--line-1)]"
                    }`}
                  >
                    {on && (
                      <Check
                        className="w-2.5 h-2.5 text-[var(--on-ink-0)]"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                  <div className="leading-tight">
                    <p
                      className={`text-[10.5px] font-semibold transition-colors duration-300 ${
                        on ? "text-[var(--ink-0)]" : "text-[var(--ink-4)]"
                      }`}
                    >
                      {p.label}
                    </p>
                    <p
                      className={`text-[10px] transition-colors duration-300 ${
                        on ? "text-[var(--ink-2)]" : "text-[var(--ink-4)]"
                      }`}
                    >
                      {p.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
