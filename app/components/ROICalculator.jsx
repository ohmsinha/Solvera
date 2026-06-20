"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SpotlightButton from "./SpotlightButton";
import { Reveal, RevealText, EASE } from "./Motion";

/* ============================================================
   ROI Calculator — "Financial impact"
   ------------------------------------------------------------
   A transparent decision-tool, not a vanity calculator:
   - The result is shown immediately (no gate on the number).
   - The hero metric is the GROSS annual opportunity (no fee
     anchoring) — the fee conversation happens on the call.
   - Every assumption is conservative and disclosed under
     "How we calculate this".
   - One section, two models, switched by the System Selector.
   ============================================================ */

/* ---- Formatting helpers ---- */
const aed = (n) =>
  "AED " +
  Math.round(n).toLocaleString("en-AE", { maximumFractionDigits: 0 });
const num = (n, d = 0) =>
  n.toLocaleString("en-AE", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ---- Conservative, disclosed assumptions ---- */
const WORKDAYS = 22; // working days / month
const WORKHOURS = 8; // productive hours / day
const AUTOMATION_RATE = 0.7; // share of identified manual hours AI removes
const RECOVERY_RATE = 0.4; // share of lost leads an instant agent recovers
const RECOVERED_CLOSE = 0.15; // close rate on recovered leads

/* ============================================================
   Model definitions
   ============================================================ */
const MODELS = {
  labor: {
    label: "Operational drag — labour reclaimer",
    blurb:
      "For ops-heavy teams burning hours on manual data entry, CRM updates and repetitive admin.",
    heroLabel: "Operational cost reclaimable / year",
    sliders: [
      { key: "team", label: "Operations / admin team size", min: 2, max: 50, step: 1, value: 12, fmt: (v) => `${v} people` },
      { key: "salary", label: "Avg monthly salary / employee", min: 5000, max: 25000, step: 500, value: 12000, fmt: (v) => aed(v) },
      { key: "hours", label: "Hours wasted on manual tasks / day", min: 1, max: 6, step: 0.5, value: 3.5, fmt: (v) => `${num(v, 1)} hrs` },
    ],
    compute: ({ team, salary, hours }) => {
      const hourlyCost = salary / (WORKDAYS * WORKHOURS);
      const monthlyWaste = team * hours * WORKDAYS * hourlyCost;
      const monthlyReclaim = monthlyWaste * AUTOMATION_RATE;
      const hoursReclaimedMo = team * hours * WORKDAYS * AUTOMATION_RATE;
      return {
        hero: monthlyReclaim * 12,
        rows: [
          { label: "Current monthly waste", current: aed(monthlyWaste), accent: false },
          { label: "Hours reclaimed / month", solvera: `${num(hoursReclaimedMo)} hrs`, accent: false },
          { label: "Reclaimable / month", solvera: aed(monthlyReclaim), accent: true },
        ],
        fillPct: Math.round(AUTOMATION_RATE * 100),
        fillLabel: "of manual hours automated",
      };
    },
    methodology: [
      `Hourly cost = monthly salary ÷ (${WORKDAYS} working days × ${WORKHOURS} hrs).`,
      `Monthly waste = team × wasted hrs/day × ${WORKDAYS} days × hourly cost.`,
      `We assume AI removes ${Math.round(AUTOMATION_RATE * 100)}% of those identified manual hours — the rest stays human. Your exact rate is confirmed in the assessment.`,
    ],
  },

  revenue: {
    label: "Leaking bucket — inbound response",
    blurb:
      "For businesses that live on inbound leads, where a slow reply means the lead is already messaging a competitor.",
    heroLabel: "Captured revenue opportunity / year",
    sliders: [
      { key: "leads", label: "Inbound leads / month", min: 50, max: 2000, step: 25, value: 400, fmt: (v) => `${num(v)} leads` },
      { key: "deal", label: "Avg lead-to-deal value", min: 1000, max: 50000, step: 1000, value: 12000, fmt: (v) => aed(v) },
      { key: "dropoff", label: "Leads lost to slow response", min: 10, max: 70, step: 1, value: 35, fmt: (v) => `${v}%` },
    ],
    compute: ({ leads, deal, dropoff }) => {
      const lostMo = leads * (dropoff / 100);
      const recoverable = lostMo * RECOVERY_RATE;
      const recoveredDeals = recoverable * RECOVERED_CLOSE;
      const capturedMo = recoveredDeals * deal;
      return {
        hero: capturedMo * 12,
        rows: [
          { label: "Leads lost / month", current: num(lostMo), accent: false },
          { label: "Recoverable with 24/7 AI", solvera: num(recoverable, 0), accent: false },
          { label: "Recovered deals / month", solvera: num(recoveredDeals, 1), accent: false },
          { label: "Captured revenue / month", solvera: aed(capturedMo), accent: true },
        ],
        fillPct: Math.round(RECOVERY_RATE * 100),
        fillLabel: "of lost leads recoverable",
      };
    },
    methodology: [
      `Leads lost = inbound leads × drop-off rate.`,
      `We assume an instant 24/7 AI agent recovers ${Math.round(RECOVERY_RATE * 100)}% of those lost leads, of which ${Math.round(RECOVERED_CLOSE * 100)}% close at your average deal value.`,
      `Deliberately conservative — the goal is a number you can defend to your CFO, not a headline.`,
    ],
  },
};

/* ============================================================
   Animated count-up number
   ============================================================ */
function AnimatedNumber({ value, format = aed, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!inView) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current;
    const to = value;
    const start = performance.now();
    const dur = 650;
    cancelAnimationFrame(rafRef.current);
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, inView]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {format(display)}
    </span>
  );
}

/* ============================================================
   Slider row
   ============================================================ */
function Slider({ def, value, onChange }) {
  const fill = ((value - def.min) / (def.max - def.min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-[var(--ink-2)] text-sm font-medium">
          {def.label}
        </label>
        <span className="tnum text-[var(--ink-0)] text-sm font-semibold font-[family-name:var(--font-mono)] bg-[var(--paper-1)] border border-[var(--line-0)] rounded-md px-2.5 py-1">
          {def.fmt(value)}
        </span>
      </div>
      <input
        type="range"
        className="flux-range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        style={{ "--fill": `${fill}%` }}
        onChange={(e) => onChange(def.key, parseFloat(e.target.value))}
      />
    </div>
  );
}

/* ============================================================
   Main component
   ============================================================ */
export default function ROICalculator() {
  const [modelKey, setModelKey] = useState("labor");
  const model = MODELS[modelKey];

  // input state per model (seeded from slider defaults)
  const [inputs, setInputs] = useState(() => {
    const init = {};
    Object.entries(MODELS).forEach(([k, m]) => {
      init[k] = Object.fromEntries(m.sliders.map((s) => [s.key, s.value]));
    });
    return init;
  });

  const setInput = (key, val) =>
    setInputs((prev) => ({
      ...prev,
      [modelKey]: { ...prev[modelKey], [key]: val },
    }));

  const result = useMemo(
    () => model.compute(inputs[modelKey]),
    [model, inputs, modelKey]
  );

  const [showMethod, setShowMethod] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submitEmail = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    // TODO: POST { email, modelKey, inputs, result.hero } to your CRM / PDF service
    setSent(true);
  };

  return (
    <section
      id="roi"
      className="relative bg-[var(--paper-0)] border-t border-[var(--line-0)] py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Reveal>
            <p className="eyebrow mb-4">03 // Financial impact</p>
          </Reveal>
          <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--ink-0)] max-w-2xl">
            <RevealText
              text="Quantify the impact before you build."
              accentWords={["impact"]}
              stagger={0.04}
            />
          </h2>
        </div>

        {/* Calculator panel */}
        <Reveal y={48}>
          <div className="editorial-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* ─── LEFT: controls ─── */}
              <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[var(--line-0)]">
                <label className="eyebrow text-[var(--ink-3)] block mb-2.5">
                  Select target system
                </label>
                <select
                  className="flux-select mb-8"
                  value={modelKey}
                  onChange={(e) => setModelKey(e.target.value)}
                >
                  {Object.entries(MODELS).map(([k, m]) => (
                    <option key={k} value={k}>
                      {m.label}
                    </option>
                  ))}
                </select>

                <p className="text-[var(--ink-3)] text-[15px] leading-relaxed mb-8 -mt-3">
                  {model.blurb}
                </p>

                <div className="flex flex-col gap-7">
                  {model.sliders.map((def) => (
                    <Slider
                      key={def.key}
                      def={def}
                      value={inputs[modelKey][def.key]}
                      onChange={setInput}
                    />
                  ))}
                </div>

                {/* Methodology disclosure */}
                <div className="mt-9 pt-6 border-t border-[var(--line-0)]">
                  <button
                    onClick={() => setShowMethod((s) => !s)}
                    className="flex items-center gap-2 text-[var(--accent-0)] text-[13px] font-medium hover:underline underline-offset-4"
                  >
                    <span
                      className="inline-block transition-transform duration-300"
                      style={{ transform: showMethod ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                    How we calculate this
                  </button>
                  <AnimatePresence initial={false}>
                    {showMethod && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: EASE }}
                        className="overflow-hidden mt-3 space-y-2"
                      >
                        {model.methodology.map((line, i) => (
                          <li
                            key={i}
                            className="text-[var(--ink-3)] text-[13px] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--accent-line)]"
                          >
                            {line}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ─── RIGHT: the breakdown ─── */}
              <div className="p-8 sm:p-10 bg-[var(--paper-1)]">
                {/* compare rows */}
                <div className="space-y-3 mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={modelKey}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="space-y-3"
                    >
                      {result.rows.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between py-2.5 border-b border-[var(--line-0)] last:border-0"
                        >
                          <span className="text-[var(--ink-2)] text-sm">
                            {row.label}
                          </span>
                          <span
                            className={`tnum text-sm font-semibold font-[family-name:var(--font-mono)] ${
                              row.accent
                                ? "text-[var(--accent-0)]"
                                : "text-[var(--ink-0)]"
                            }`}
                          >
                            {row.current ?? row.solvera}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* live bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="eyebrow text-[var(--ink-3)]">
                      {result.fillLabel}
                    </span>
                    <span className="tnum text-[var(--accent-0)] text-sm font-semibold font-[family-name:var(--font-mono)]">
                      {result.fillPct}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[var(--paper-3)] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[var(--accent-0)]"
                      animate={{ width: `${result.fillPct}%` }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </div>
                </div>

                {/* hero number */}
                <div className="rounded-lg bg-[var(--surface-card)] border border-[var(--line-0)] p-6 mb-6">
                  <p className="eyebrow text-[var(--ink-3)] mb-3">
                    {model.heroLabel}
                  </p>
                  <AnimatedNumber
                    value={result.hero}
                    className="headline-serif block text-[clamp(2.25rem,5vw,3.5rem)] text-[var(--accent-0)] leading-none"
                  />
                  {modelKey === "revenue" && (
                    <p className="text-[var(--ink-3)] text-xs mt-4 font-[family-name:var(--font-mono)] tracking-wide">
                      RESPONSE TIME · 45 MIN → 1.2 SEC
                    </p>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <SpotlightButton variant="primary" href="#contact">
                    Book a consultation
                    <span className="ml-1.5">↗</span>
                  </SpotlightButton>

                  {!sent ? (
                    <form onSubmit={submitEmail} className="flex items-center gap-2 flex-1 min-w-[220px]">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="flex-1 min-w-0 bg-[var(--surface-card)] border border-[var(--line-1)] rounded-lg px-3 py-2.5 text-sm text-[var(--ink-0)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--accent-0)] focus:ring-[3px] focus:ring-[var(--focus-ring)]"
                      />
                      <SpotlightButton variant="secondary" type="submit">
                        Email the breakdown
                      </SpotlightButton>
                    </form>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[var(--accent-0)] text-sm font-medium flex items-center gap-2"
                    >
                      ✓ On its way — check your inbox for the full PDF.
                    </motion.p>
                  )}
                </div>
                <p className="text-[var(--ink-4)] text-xs mt-3 leading-relaxed">
                  Estimates use conservative, disclosed assumptions. Your exact
                  figures are confirmed in a short assessment — no fee shown here.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
