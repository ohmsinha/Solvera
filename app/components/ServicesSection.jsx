"use client";

import {
  Bot,
  Workflow,
  MessagesSquare,
  FileText,
  GitMerge,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem, RevealText, Counter } from "./Motion";

const SERVICES = [
  {
    icon: Bot,
    slug: "ai-agents",
    title: "AI agents",
    body: "Autonomous agents that run real workflows end to end — qualifying leads, answering customers, and updating your systems without supervision.",
    outcome: "Works 24/7, no headcount added",
  },
  {
    icon: Workflow,
    slug: "workflow-automation",
    title: "Workflow automation",
    body: "We connect the tools your team already uses and remove the manual copy-paste, re-keying, and chasing between them.",
    outcome: "Hours back every week",
  },
  {
    icon: MessagesSquare,
    slug: "conversational-ai",
    title: "Conversational AI",
    body: "WhatsApp, web, and voice assistants that answer instantly, hold context, and hand off cleanly to your team when it matters.",
    outcome: "Replies in seconds, not hours",
  },
  {
    icon: FileText,
    slug: "document-intelligence",
    title: "Document intelligence",
    body: "Read contracts, invoices, and forms automatically — extract the data, validate it, and route it into the right system.",
    outcome: "Minutes instead of hours",
  },
  {
    icon: GitMerge,
    slug: "sales-crm-automation",
    title: "Sales & CRM automation",
    body: "Capture, enrich, and route every lead into your CRM the moment it lands — and keep the data clean as it scales.",
    outcome: "No lead left waiting",
  },
  {
    icon: Cpu,
    slug: "custom-models-integrations",
    title: "Custom models & integrations",
    body: "Bespoke models and secure integrations wired into your stack, built to fit your operations rather than the other way round.",
    outcome: "Fits your systems",
  },
];

const STATS = [
  { to: 10, suffix: "M+", label: "Requests resolved monthly", highlight: false },
  { to: 99, suffix: "%", label: "Uptime reliability", highlight: false },
  { to: 3.2, decimals: 1, suffix: "×", label: "Faster lead response", highlight: true },
  { to: 6, suffix: " wks", label: "To first deployment", highlight: false },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-[var(--paper-1)] texture-dots border-t border-[var(--line-0)] py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">01 // What we do</p>
          </Reveal>
          <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--ink-0)]">
            <RevealText
              text="AI systems built around business outcomes."
              accentWords={["outcomes."]}
              stagger={0.04}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[var(--ink-2)] text-lg leading-relaxed">
              We design and deploy practical AI — not demos. Each system is scoped
              around a number worth moving, then shipped to production.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-0)] hover:text-[var(--accent-1)] transition-colors no-underline group/all"
            >
              View all six services
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </Reveal>
        </div>

        {/* Service grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line-0)] border border-[var(--line-0)] rounded-xl overflow-hidden">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex flex-col h-full bg-[var(--surface-card)] p-8 transition-colors duration-300 hover:bg-[var(--paper-0)] no-underline"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--accent-0)]" strokeWidth={2} />
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 text-[var(--ink-4)] transition-all group-hover:text-[var(--accent-0)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-[var(--ink-0)] text-lg font-semibold tracking-tight mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-[var(--ink-2)] text-[15px] leading-relaxed mb-5 flex-1">
                    {s.body}
                  </p>
                  <p className="eyebrow text-[var(--ink-3)] flex items-center gap-2">
                    <span className="w-4 h-px bg-[var(--accent-line)]" />
                    {s.outcome}
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Stats strip */}
        <Stagger
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5"
          stagger={0.1}
        >
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="editorial-card p-6 text-center h-full">
                <p
                  className={`headline-serif text-3xl sm:text-4xl tnum ${
                    stat.highlight ? "text-[var(--accent-0)]" : "text-[var(--ink-0)]"
                  }`}
                >
                  <Counter
                    to={stat.to}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-[var(--ink-3)] text-sm mt-2 leading-snug">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
