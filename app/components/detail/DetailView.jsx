"use client";

/* ============================================================
   DetailView — the shared template behind every /services/* and
   /solutions/* page. Driven entirely by a catalog item (plain
   data), so all 12 pages stay consistent and the copy lives in
   one place (app/lib/catalog.js).

   Sections: sticky breadcrumb · hero (+ demo or visual) ·
   how it works · what you get · outcomes band · who it's for ·
   FAQ · related · CTA. Motion reuses the homepage primitives
   so the pages feel native; everything respects reduced motion.
   ============================================================ */

import { useState } from "react";
import Link from "next/link";
import {
  // catalog icons
  Bot, Workflow, MessagesSquare, FileText, GitMerge, Cpu,
  Inbox, Route, FileSearch, LifeBuoy, Activity, Target,
  Building2, HeartPulse, Truck, Briefcase, ShoppingBag, Landmark,
  // ui icons
  ArrowLeft, ArrowUpRight, ArrowRight, Check, Plus, Minus,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem, RevealText } from "../Motion";
import SpotlightButton from "../SpotlightButton";
import DemoMount from "./DemoMount";
import { industryHref } from "../../lib/catalog";

const ICONS = {
  Bot, Workflow, MessagesSquare, FileText, GitMerge, Cpu,
  Inbox, Route, FileSearch, LifeBuoy, Activity, Target,
  Building2, HeartPulse, Truck, Briefcase, ShoppingBag, Landmark,
};

function Icon({ name, className, strokeWidth = 2 }) {
  const Cmp = ICONS[name] || Bot;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}

/* ── Mini "input → system → output" schematic ──
   Lightweight inline SVG (no images / network), used on detail
   pages that have no interactive demo. Pure transform/stroke
   animation that freezes under reduced motion.                */
function MiniSchematic() {
  const y = 30;
  return (
    <svg viewBox="0 0 340 64" className="w-full mb-7" aria-hidden="true">
      <line x1="28" y1={y} x2="312" y2={y} style={{ stroke: "var(--line-1)" }} strokeWidth={1.5} />
      <line
        x1="28" y1={y} x2="312" y2={y}
        className="flow-line"
        style={{ stroke: "var(--accent-0)" }}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* input */}
      <circle cx="28" cy={y} r="7" style={{ fill: "var(--accent-soft)", stroke: "var(--accent-line)" }} strokeWidth={1.5} />
      <circle cx="28" cy={y} r="2.5" style={{ fill: "var(--accent-0)" }} />
      {/* system hub */}
      <rect x="153" y={y - 17} width="34" height="34" rx="9" style={{ fill: "var(--accent-0)" }} />
      <g style={{ stroke: "var(--paper-0)" }} strokeWidth={1.7} strokeLinecap="round">
        <line x1="170" y1={y - 7} x2="170" y2={y + 7} />
        <line x1="163" y1={y} x2="177" y2={y} />
      </g>
      {/* output */}
      <circle cx="312" cy={y} r="7" style={{ fill: "var(--accent-soft)", stroke: "var(--accent-line)" }} strokeWidth={1.5} />
      <circle cx="312" cy={y} r="2.5" style={{ fill: "var(--accent-0)" }} />
      {/* labels */}
      {[["28", "INPUT"], ["170", "SYSTEM"], ["312", "OUTPUT"]].map(([x, label]) => (
        <text key={label} x={x} y="58" textAnchor="middle" style={{ fill: "var(--ink-4)", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em" }}>
          {label}
        </text>
      ))}
    </svg>
  );
}

/* ── Static visual for items without an interactive demo ──
   A composed "capability" card so the hero never looks empty.  */
function VisualPanel({ item }) {
  return (
    <div className="editorial-card w-full max-w-md p-8 shadow-[0_24px_60px_-30px_rgba(22,20,15,0.4)]">
      <div className="flex items-center justify-between mb-7">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center">
          <Icon name={item.icon} className="w-6 h-6 text-[var(--accent-0)]" />
        </div>
        <span className="eyebrow text-[var(--ink-4)] normal-case tracking-[0.14em]">
          {item.label}
        </span>
      </div>
      <MiniSchematic />
      <ul className="list-none p-0 m-0 space-y-4">
        {item.capabilities.slice(0, 4).map((c) => (
          <li key={c.title} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center">
              <Check className="w-3 h-3 text-[var(--accent-0)]" strokeWidth={2.5} />
            </span>
            <span className="text-[var(--ink-1)] text-[15px] leading-snug font-medium">
              {c.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── FAQ accordion (lightweight, self-contained) ── */
function FaqItem({ q, a, open, onToggle, index }) {
  return (
    <div className="border-b border-[var(--line-0)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="text-[var(--ink-0)] text-lg font-semibold tracking-tight pr-2">
          {q}
        </span>
        <span className="shrink-0 mt-1 w-7 h-7 rounded-full border border-[var(--line-1)] flex items-center justify-center text-[var(--ink-2)] group-hover:border-[var(--accent-0)] group-hover:text-[var(--accent-0)] transition-colors">
          {open ? <Minus className="w-4 h-4" strokeWidth={2} /> : <Plus className="w-4 h-4" strokeWidth={2} />}
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.22,.61,.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-[var(--ink-2)] text-[15px] leading-relaxed pb-6 max-w-2xl">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DetailView({ item, related }) {
  const isIndustry = item.kind === "industry";
  const SEG = { service: ["services", "Services", "All services"], solution: ["solutions", "Solutions", "All solutions"], industry: ["industries", "Industries", "All industries"] };
  const [seg, crumbLabel, backLabel] = SEG[item.kind] || SEG.service;
  const backHref = `/${seg}`;
  // The "who it's for" section adapts: industries deep-link to their pages
  // for service/solution items; industry pages instead list the buyer roles.
  const whoEyebrow = isIndustry ? "Who it's for" : "Who it's for";
  const whoHeading = isIndustry
    ? "Built for the teams that run this sector."
    : "Built for operators where this work costs the most.";
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="pt-16">
      {/* ── Sticky breadcrumb / back bar ── */}
      <div className="sticky top-16 z-40 bg-[rgba(251,250,247,0.82)] backdrop-blur-xl border-b border-[var(--line-0)]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink-2)] hover:text-[var(--ink-0)] transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            {backLabel}
          </Link>
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-[12px] text-[var(--ink-3)] font-[family-name:var(--font-mono)] tracking-[0.06em]">
            <Link href="/" className="hover:text-[var(--ink-1)] transition-colors no-underline">Home</Link>
            <span className="text-[var(--ink-4)]">/</span>
            <Link href={backHref} className="hover:text-[var(--ink-1)] transition-colors no-underline">{crumbLabel}</Link>
            <span className="text-[var(--ink-4)]">/</span>
            <span className="text-[var(--ink-1)]">{item.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="bg-[var(--paper-0)] px-6 sm:px-10 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-2.5">
                <span className="inline-flex w-7 h-7 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-line)] items-center justify-center">
                  <Icon name={item.icon} className="w-3.5 h-3.5 text-[var(--accent-0)]" />
                </span>
                {item.label}
              </p>
            </Reveal>
            <h1 className="headline-serif text-[clamp(2.4rem,5vw,4rem)] text-[var(--ink-0)] mb-5">
              <RevealText text={item.name} stagger={0.05} />
            </h1>
            <Reveal delay={0.1}>
              <p className="text-[var(--ink-1)] text-xl sm:text-2xl leading-snug font-[family-name:var(--font-serif)] mb-6 max-w-xl">
                {item.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-[var(--ink-2)] text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                {item.summary}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="flex flex-wrap items-center gap-3">
                <SpotlightButton variant="primary" href="/#contact">
                  Book a consultation
                  <span className="ml-1.5">↗</span>
                </SpotlightButton>
                <SpotlightButton variant="secondary" href={backHref}>
                  {backLabel}
                </SpotlightButton>
              </div>
            </Reveal>
          </div>

          {/* Right: demo or visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            {item.demo ? <DemoMount demo={item.demo} /> : <VisualPanel item={item} />}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[var(--paper-1)] border-t border-[var(--line-0)] px-6 sm:px-10 py-24 sm:py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14 max-w-2xl">
            <Reveal><p className="eyebrow mb-4">How it works</p></Reveal>
            <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,3rem)] text-[var(--ink-0)]">
              <RevealText text="From input to outcome, in four steps." accentWords={["steps."]} stagger={0.04} />
            </h2>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line-0)] border border-[var(--line-0)] rounded-xl overflow-hidden" stagger={0.1}>
            {item.how.map((step) => (
              <StaggerItem key={step.n}>
                <div className="h-full bg-[var(--surface-card)] p-7">
                  <span className="tnum text-[var(--ink-4)] text-sm font-[family-name:var(--font-mono)] tracking-[0.14em]">
                    {step.n}
                  </span>
                  <h3 className="headline-serif text-2xl text-[var(--ink-0)] mt-4 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-[var(--ink-2)] text-[15px] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── What you get (capabilities) ── */}
      <section className="bg-[var(--paper-0)] border-t border-[var(--line-0)] px-6 sm:px-10 py-24 sm:py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <Reveal><p className="eyebrow mb-4">What you get</p></Reveal>
              <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,3rem)] text-[var(--ink-0)]">
                <RevealText text="Built to do the work, not demo it." accentWords={["work,"]} stagger={0.04} />
              </h2>
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.08}>
            {item.capabilities.map((c) => (
              <StaggerItem key={c.title}>
                <div className="editorial-card h-full p-7 flex items-start gap-5">
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center">
                    <Check className="w-5 h-5 text-[var(--accent-0)]" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-[var(--ink-0)] text-lg font-semibold tracking-tight mb-2">
                      {c.title}
                    </h3>
                    <p className="text-[var(--ink-2)] text-[15px] leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className="bg-[var(--paper-0)] border-t border-[var(--line-0)] px-6 sm:px-10 py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-md">
            <Reveal><p className="eyebrow mb-4">{whoEyebrow}</p></Reveal>
            <Reveal delay={0.08}>
              <h2 className="headline-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--ink-0)]">
                {whoHeading}
              </h2>
            </Reveal>
          </div>
          <Stagger className="flex flex-wrap gap-2.5 md:max-w-lg md:justify-end" stagger={0.05}>
            {item.industries.map((ind) =>
              isIndustry ? (
                <StaggerItem key={ind}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-1)] bg-[var(--surface-card)] px-4 py-2 text-[13px] font-medium text-[var(--ink-1)]">
                    {ind}
                  </span>
                </StaggerItem>
              ) : (
                <StaggerItem key={ind}>
                  <Link
                    href={industryHref(ind)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-1)] bg-[var(--surface-card)] px-4 py-2 text-[13px] font-medium text-[var(--ink-1)] hover:border-[var(--accent-0)] hover:text-[var(--accent-0)] transition-colors no-underline"
                  >
                    {ind}
                  </Link>
                </StaggerItem>
              )
            )}
          </Stagger>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[var(--paper-1)] border-t border-[var(--line-0)] px-6 sm:px-10 py-24 sm:py-28">
        <div className="max-w-[820px] mx-auto">
          <div className="mb-10">
            <Reveal><p className="eyebrow mb-4">Questions</p></Reveal>
            <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,3rem)] text-[var(--ink-0)]">
              <RevealText text={`${item.name}, in plain terms.`} accentWords={["terms."]} stagger={0.04} />
            </h2>
          </div>
          <Reveal delay={0.05}>
            <div>
              {item.faqs.map((f, i) => (
                <FaqItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  index={i}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="bg-[var(--paper-0)] border-t border-[var(--line-0)] px-6 sm:px-10 py-24 sm:py-28">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-12 max-w-2xl">
              <Reveal><p className="eyebrow mb-4">Often deployed together</p></Reveal>
              <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,3rem)] text-[var(--ink-0)]">
                <RevealText text="Explore what pairs with it." accentWords={["it."]} stagger={0.04} />
              </h2>
            </div>
            <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.08}>
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link href={r.href} className="editorial-card group flex flex-col h-full p-7 no-underline">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center">
                        <Icon name={r.icon} className="w-5 h-5 text-[var(--accent-0)]" />
                      </div>
                      <span className="eyebrow text-[var(--ink-4)] normal-case tracking-[0.14em]">
                        {r.label}
                      </span>
                    </div>
                    <h3 className="text-[var(--ink-0)] text-xl font-semibold tracking-tight mb-2.5">
                      {r.name}
                    </h3>
                    <p className="text-[var(--ink-2)] text-[15px] leading-relaxed mb-6 flex-1">
                      {r.tagline}
                    </p>
                    <span className="flex items-center gap-1 text-[var(--ink-2)] text-sm font-medium group-hover:text-[var(--accent-0)] transition-colors">
                      Explore
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── CTA band ── */}
      <section className="bg-[var(--ink-bg-0)] px-6 sm:px-10 py-24 sm:py-28">
        <div className="max-w-[1100px] mx-auto text-center">
          <Reveal>
            <p className="eyebrow text-[var(--accent-on-dark)] mb-5">Ready when you are</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="headline-serif text-[clamp(2rem,4.5vw,3.6rem)] text-[var(--on-ink-0)] max-w-3xl mx-auto">
              Let's scope {item.name} around a number worth moving.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-[var(--on-ink-1)] text-lg leading-relaxed max-w-xl mx-auto mt-6">
              A short call is enough to tell whether this fits your operations — and
              what a first production deployment in four to six weeks would look like.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
              <SpotlightButton variant="inverted" href="/#contact">
                Book a consultation
                <span className="ml-1.5">↗</span>
              </SpotlightButton>
              <SpotlightButton variant="on-dark" href="/#roi">
                See the ROI <ArrowRight className="w-4 h-4 ml-1.5" strokeWidth={2} />
              </SpotlightButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
