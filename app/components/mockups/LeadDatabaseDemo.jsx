"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  ListFilter,
  ArrowUpDown,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const EASE = [0.22, 0.61, 0.36, 1];

const BASE_ROWS = [
  { name: "Anya Sharma", intent: "Enterprise Solution Inquiry" },
  { name: "David Chen", intent: "Product Demo Request" },
  { name: "Elena Petrova", intent: "Pricing Information" },
  { name: "Kenji Tanaka", intent: "Trial Sign-up" },
];
const ROW5 = { name: "Maria Rodriguez", intent: "Partnership Opportunity" };
const ROW6 = { name: "Omar Hassan", intent: "Technical Support" };

function Badge({ delay = 0, bounce = false }) {
  return (
    <motion.span
      initial={bounce ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, delay, ease: EASE }}
      className="inline-block rounded-full bg-[var(--accent-0)] text-[var(--on-ink-0)] text-[11px] font-medium px-3 py-1"
    >
      Qualified
    </motion.span>
  );
}

function Row({ row, badge }) {
  return (
    <div className="grid grid-cols-[1.1fr_1.2fr_0.7fr] items-center px-4 py-2.5 border-b border-[var(--line-0)] last:border-0">
      <span className="text-[var(--ink-0)] text-[12.5px]">{row.name}</span>
      <span className="text-[var(--ink-2)] text-[12.5px]">{row.intent}</span>
      <span>{badge}</span>
    </div>
  );
}

export default function LeadDatabaseDemo() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 2 : 0);

  useEffect(() => {
    if (reduce) {
      setStep(2);
      return;
    }
    setStep(0);
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <div className="w-full rounded-xl bg-[var(--surface-card)] border border-[var(--line-1)] shadow-[0_24px_60px_-32px_rgba(22,20,15,0.35)] overflow-hidden flex flex-col">
      {/* Top nav */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--line-0)]">
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded bg-[var(--accent-0)]" />
          <div className="hidden sm:flex items-center gap-3 text-[var(--ink-2)] text-[11.5px] font-medium">
            {["Dashboard", "Leads", "Database", "Analytics"].map((n, i) => (
              <span key={n} className={i === 2 ? "text-[var(--ink-0)]" : ""}>
                {n}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-[var(--ink-3)]">
          <span className="text-[10.5px] font-[family-name:var(--font-mono)]">
            Oct 26, 2023
          </span>
          <User className="w-3.5 h-3.5" strokeWidth={2} />
        </div>
      </div>

      <div className="p-4">
        <h4 className="headline-serif text-[var(--ink-0)] text-xl mb-3">
          Lead Qualification Database
        </h4>

        {/* Controls */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 rounded-md border border-[var(--line-1)] px-2.5 py-1.5 text-[var(--ink-4)] text-[11px]">
            <Search className="w-3 h-3" strokeWidth={2} /> Search
          </div>
          {[
            { i: ListFilter, t: "Filter by Intent" },
            { i: ArrowUpDown, t: "Sort by Status" },
            { i: Calendar, t: "Date Range" },
          ].map(({ i: I, t }) => (
            <div
              key={t}
              className="hidden md:flex items-center gap-1.5 rounded-md border border-[var(--line-1)] px-2.5 py-1.5 text-[var(--ink-2)] text-[11px]"
            >
              <I className="w-3 h-3" strokeWidth={2} /> {t}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-md border border-[var(--line-0)] overflow-hidden">
          <div className="grid grid-cols-[1.1fr_1.2fr_0.7fr] px-4 py-2.5 bg-[var(--paper-1)] border-b border-[var(--line-0)] text-[var(--ink-1)] text-[11px] font-semibold">
            <span>Lead Name</span>
            <span>Intent</span>
            <span>Status</span>
          </div>

          {BASE_ROWS.map((r) => (
            <Row key={r.name} row={r} badge={<Badge />} />
          ))}

          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                key="row5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <Row row={ROW5} badge={<Badge bounce delay={0.1} />} />
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div
                key="row6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Row row={ROW6} badge={<Badge bounce delay={0.12} />} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 text-[var(--ink-3)] text-[11px]">
          <span>Showing 1–6 of 120 entries</span>
          <div className="flex items-center gap-2">
            <ChevronsLeft className="w-3.5 h-3.5" strokeWidth={2} />
            <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="w-5 h-5 rounded flex items-center justify-center bg-[var(--accent-0)] text-[var(--on-ink-0)] text-[11px]">
              1
            </span>
            <span className="w-5 h-5 rounded flex items-center justify-center text-[var(--ink-2)] text-[11px]">
              2
            </span>
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
            <ChevronsRight className="w-3.5 h-3.5" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
