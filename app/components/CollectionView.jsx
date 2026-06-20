"use client";

/* ============================================================
   CollectionView — the shared template for the /services and
   /solutions index (landing) pages. Follows the "Feature-Rich
   Showcase" structure: hero (value prop) + contents panel →
   feature grid → dark stats band (rhythm break) → cross-link →
   CTA. Driven by catalog data so copy stays in sync with the
   detail pages and homepage.

   This page intentionally carries a touch more visual weight
   than the homepage sections (dot-grid + grain texture, tinted
   cards, a dark credibility band) to add depth without leaving
   the warm editorial palette.
   ============================================================ */

import Link from "next/link";
import {
  Bot, Workflow, MessagesSquare, FileText, GitMerge, Cpu,
  Inbox, Route, FileSearch, LifeBuoy, Activity, Target,
  Building2, HeartPulse, Truck, Briefcase, ShoppingBag, Landmark,
  ArrowLeft, ArrowUpRight, ArrowRight,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem, RevealText } from "./Motion";
import SpotlightButton from "./SpotlightButton";
import { itemHref } from "../lib/catalog";

const ICONS = {
  Bot, Workflow, MessagesSquare, FileText, GitMerge, Cpu,
  Inbox, Route, FileSearch, LifeBuoy, Activity, Target,
  Building2, HeartPulse, Truck, Briefcase, ShoppingBag, Landmark,
};
function Icon({ name, className, strokeWidth = 2 }) {
  const Cmp = ICONS[name] || Bot;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}

const hrefFor = (it) => itemHref(it);
const NOUN = { service: "capabilities", solution: "systems", industry: "sectors" };
const CRUMB = { service: "Services", solution: "Solutions", industry: "Industries" };

export default function CollectionView({
  kind,           // "service" | "solution"
  eyebrow,        // hero kicker
  title,          // hero headline (string)
  accentWords,    // words to italic-accent in headline
  intro,          // hero supporting paragraph
  items,          // catalog collection
  stats,          // [{ value, label }] for the dark band
  bandHeadline,   // headline for the dark band
  counterpart,    // { href, label, blurb } cross-link to the other collection
}) {
  const crumb = CRUMB[kind] || "Services";
  const noun = NOUN[kind] || "items";
  const gridHeadline =
    kind === "industry" ? "Every sector, in depth." : kind === "service" ? "Every capability, in depth." : "Every system, in depth.";

  return (
    <div className="pt-16">
      {/* ── Sticky breadcrumb ── */}
      <div className="sticky top-16 z-40 bg-[rgba(251,250,247,0.82)] backdrop-blur-xl border-b border-[var(--line-0)]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink-2)] hover:text-[var(--ink-0)] transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Home
          </Link>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[var(--ink-3)] font-[family-name:var(--font-mono)] tracking-[0.06em]">
            <Link href="/" className="hover:text-[var(--ink-1)] transition-colors no-underline">Home</Link>
            <span className="text-[var(--ink-4)]">/</span>
            <span className="text-[var(--ink-1)]">{crumb}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-[var(--paper-0)] overflow-hidden px-6 sm:px-10 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="absolute inset-0 texture-dots texture-fade opacity-70 pointer-events-none" aria-hidden="true" />
        <div className="grain-layer" aria-hidden="true" />
        <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: value prop */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-5">
                {crumb} <span className="text-[var(--ink-4)]">// {items.length} {noun}</span>
              </p>
            </Reveal>
            <h1 className="headline-serif text-[clamp(2.4rem,5vw,4.25rem)] text-[var(--ink-0)] mb-6">
              <RevealText text={title} accentWords={accentWords} stagger={0.045} />
            </h1>
            <Reveal delay={0.12}>
              <p className="text-[var(--ink-2)] text-lg leading-relaxed mb-8 max-w-xl">
                {intro}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-3">
                <SpotlightButton variant="primary" href="/#contact">
                  Book a consultation
                  <span className="ml-1.5">↗</span>
                </SpotlightButton>
                <SpotlightButton variant="secondary" href={counterpart.href}>
                  {counterpart.label}
                  <ArrowRight className="w-4 h-4 ml-1.5" strokeWidth={2} />
                </SpotlightButton>
              </div>
            </Reveal>
          </div>

          {/* Right: contents / index panel (editorial table of contents) */}
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="editorial-card-tint p-3 shadow-[0_24px_60px_-30px_rgba(22,20,15,0.4)]">
                <div className="flex items-center justify-between px-4 pt-3 pb-4">
                  <span className="eyebrow text-[var(--ink-4)] normal-case tracking-[0.14em]">Index</span>
                  <span className="text-[var(--ink-4)] text-[11px] font-[family-name:var(--font-mono)] tracking-[0.14em]">
                    01–0{items.length}
                  </span>
                </div>
                <ul className="list-none p-0 m-0">
                  {items.map((it, i) => (
                    <li key={it.slug}>
                      <Link
                        href={hrefFor(it)}
                        className="group flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-[var(--paper-0)] transition-colors no-underline"
                      >
                        <span className="tnum text-[var(--ink-4)] text-[12px] font-[family-name:var(--font-mono)] w-6">
                          0{i + 1}
                        </span>
                        <span className="w-8 h-8 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center shrink-0">
                          <Icon name={it.icon} className="w-4 h-4 text-[var(--accent-0)]" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[var(--ink-0)] text-[15px] font-semibold tracking-tight truncate">
                            {it.name}
                          </span>
                          <span className="block text-[var(--ink-3)] text-[12px] truncate">
                            {it.label}
                          </span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[var(--ink-4)] group-hover:text-[var(--accent-0)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" strokeWidth={2} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Feature grid ── */}
      <section className="bg-[var(--paper-1)] border-t border-[var(--line-0)] px-6 sm:px-10 py-24 sm:py-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14 max-w-2xl">
            <Reveal><p className="eyebrow mb-4">Explore</p></Reveal>
            <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,3rem)] text-[var(--ink-0)]">
              <RevealText
                text={gridHeadline}
                accentWords={["depth."]}
                stagger={0.04}
              />
            </h2>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
            {items.map((it) => (
              <StaggerItem key={it.slug}>
                <Link href={hrefFor(it)} className="editorial-card-tint group flex flex-col h-full p-7 no-underline">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center">
                      <Icon name={it.icon} className="w-5 h-5 text-[var(--accent-0)]" />
                    </div>
                    <span className="eyebrow text-[var(--ink-4)] normal-case tracking-[0.14em]">
                      {it.label}
                    </span>
                  </div>
                  <h3 className="text-[var(--ink-0)] text-xl font-semibold tracking-tight mb-2.5">
                    {it.name}
                  </h3>
                  <p className="text-[var(--ink-2)] text-[15px] leading-relaxed mb-6 flex-1">
                    {it.tagline}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--line-0)]">
                    <span className="tnum text-[var(--accent-0)] text-[13px] font-semibold font-[family-name:var(--font-mono)]">
                      {it.heroMetric.value}
                    </span>
                    <span className="flex items-center gap-1 text-[var(--ink-2)] text-sm font-medium group-hover:text-[var(--accent-0)] transition-colors">
                      Explore
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Dark stats band (rhythm break + trust signal) ── */}
      <section className="relative bg-[var(--ink-bg-0)] overflow-hidden px-6 sm:px-10 py-24 sm:py-28">
        <div className="absolute inset-0 texture-dots-dark texture-fade opacity-60 pointer-events-none" aria-hidden="true" />
        <div className="grain-layer opacity-[0.04]" aria-hidden="true" />
        <div className="relative max-w-[1100px] mx-auto">
          <div className="max-w-2xl mb-14">
            <Reveal><p className="eyebrow text-[var(--accent-on-dark)] mb-4">By the numbers</p></Reveal>
            <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,3rem)] text-[var(--on-ink-0)]">
              {bandHeadline}
            </h2>
          </div>
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--ink-line)] border border-[var(--ink-line)] rounded-xl overflow-hidden" stagger={0.08}>
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="h-full bg-[var(--ink-bg-1)] p-7 text-center">
                  <p className="headline-serif text-4xl sm:text-5xl text-[var(--accent-on-dark)] tnum">
                    {s.value}
                  </p>
                  <p className="text-[var(--on-ink-2)] text-[13px] mt-3 leading-snug">
                    {s.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Cross-link to the other collection ── */}
      <section className="bg-[var(--paper-0)] border-t border-[var(--line-0)] px-6 sm:px-10 py-20">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <Link
              href={counterpart.href}
              className="editorial-card group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 sm:p-10 no-underline"
            >
              <div className="max-w-xl">
                <p className="eyebrow mb-3">{counterpart.label}</p>
                <h3 className="headline-serif text-2xl sm:text-3xl text-[var(--ink-0)]">
                  {counterpart.blurb}
                </h3>
              </div>
              <span className="shrink-0 inline-flex items-center gap-2 text-[var(--accent-0)] font-semibold">
                {counterpart.label}
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="relative bg-[var(--ink-bg-0)] overflow-hidden px-6 sm:px-10 py-24 sm:py-28 border-t border-[var(--ink-line)]">
        <div className="grain-layer opacity-[0.04]" aria-hidden="true" />
        <div className="relative max-w-[1100px] mx-auto text-center">
          <Reveal><p className="eyebrow text-[var(--accent-on-dark)] mb-5">Ready when you are</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="headline-serif text-[clamp(2rem,4.5vw,3.6rem)] text-[var(--on-ink-0)] max-w-3xl mx-auto">
              Tell us the number worth moving. We'll scope the system.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
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
