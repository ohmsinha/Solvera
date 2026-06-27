"use client";

import {
  Inbox,
  Route,
  FileSearch,
  LifeBuoy,
  Activity,
  Target,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem, RevealText } from "./Motion";

const SOLUTIONS = [
  {
    icon: Inbox,
    slug: "inbox-agent",
    tag: "Conversational AI",
    name: "Inbox Agent",
    body: "Replies to every inbound lead on WhatsApp and web in seconds, around the clock, and books the meeting before a competitor does.",
  },
  {
    icon: Route,
    slug: "pipeline",
    tag: "Sales automation",
    name: "Pipeline",
    body: "Captures, enriches, and routes every lead straight into your CRM — no manual entry, no leads sitting in an inbox overnight.",
  },
  {
    icon: FileSearch,
    slug: "parser",
    tag: "Document intelligence",
    name: "Parser",
    body: "Reads contracts, invoices, and forms, then pushes validated data into your systems and flags what needs a human.",
  },
  {
    icon: LifeBuoy,
    slug: "desk",
    tag: "Support automation",
    name: "Desk",
    body: "Resolves routine and complex support requests across every channel, and escalates the rest with full context.",
  },
  {
    icon: Activity,
    slug: "pulse",
    tag: "Operational dashboards",
    name: "Pulse",
    body: "Turns scattered operational data into one live view your team actually uses to make decisions in the moment.",
  },
  {
    icon: Target,
    slug: "scout",
    tag: "Lead qualification",
    name: "Scout",
    body: "Scores and qualifies inbound automatically, so your team spends its time only on the buyers who are ready.",
  },
];

export default function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="relative bg-[var(--paper-0)] border-t border-[var(--line-0)] py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-4">02 // Solutions</p>
            </Reveal>
            <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--ink-0)]">
              <RevealText
                text="Pre-built systems, deployed in weeks."
                accentWords={["weeks."]}
                stagger={0.04}
              />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <div className="max-w-sm">
              <p className="text-[var(--ink-2)] text-base leading-relaxed">
                Patterns we build from — proven approaches we configure to your
                data and your tools, rather than starting from a blank page.
              </p>
              <Link
                href="/solutions"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-0)] hover:text-[var(--accent-1)] transition-colors no-underline group/all"
              >
                View all six systems
                <ArrowUpRight
                  className="w-4 h-4 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Solutions grid */}
        <Stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          stagger={0.08}
        >
          {SOLUTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.name}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="editorial-card-tint group flex flex-col h-full p-7 no-underline"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--accent-0)]" strokeWidth={2} />
                    </div>
                    <span className="eyebrow text-[var(--ink-4)] normal-case tracking-[0.14em]">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="text-[var(--ink-0)] text-xl font-semibold tracking-tight mb-2.5">
                    {s.name}
                  </h3>
                  <p className="text-[var(--ink-2)] text-[15px] leading-relaxed mb-6 flex-1">
                    {s.body}
                  </p>

                  <div className="flex items-center justify-end pt-4 border-t border-[var(--line-0)]">
                    <span className="flex items-center gap-1 text-[var(--ink-2)] text-sm font-medium group-hover:text-[var(--accent-0)] transition-colors">
                      Explore
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
