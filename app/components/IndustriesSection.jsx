"use client";

import {
  Building2,
  HeartPulse,
  Truck,
  Briefcase,
  ShoppingBag,
  Landmark,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem, RevealText } from "./Motion";

const INDUSTRIES = [
  {
    icon: Building2,
    slug: "real-estate",
    title: "Real estate & brokerage",
    body: "Instant lead response and CRM automation for high-velocity property enquiries — so the first reply is always yours.",
  },
  {
    icon: HeartPulse,
    slug: "clinics-aesthetics",
    title: "Clinics & aesthetics",
    body: "24/7 booking and inbound response across WhatsApp and web, so no patient enquiry goes cold after hours.",
  },
  {
    icon: Truck,
    slug: "logistics-trading",
    title: "Logistics & trading",
    body: "Document parsing and operations automation across high-volume paperwork, manifests, and invoices.",
  },
  {
    icon: Briefcase,
    slug: "professional-services",
    title: "Professional services",
    body: "Automated intake, proposals, and back-office workflows that free senior people from admin.",
  },
  {
    icon: ShoppingBag,
    slug: "ecommerce-retail",
    title: "E-commerce & retail",
    body: "Conversational sales and support that scale through peak demand without adding headcount.",
  },
  {
    icon: Landmark,
    slug: "financial-insurance",
    title: "Financial & insurance",
    body: "Claims, KYC, and document workflows handled accurately at speed, with humans kept in the loop.",
  },
];

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative bg-[var(--paper-0)] texture-dots border-t border-[var(--line-0)] py-24 sm:py-32 px-6 sm:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-4">05 // Industries</p>
            </Reveal>
            <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--ink-0)]">
              <RevealText
                text="Built for how UAE businesses operate."
                accentWords={["operate."]}
                stagger={0.04}
              />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <div className="max-w-sm">
              <p className="text-[var(--ink-2)] text-base leading-relaxed">
                We work with operators in the sectors where manual work and slow
                response cost the most.
              </p>
              <Link
                href="/industries"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-0)] hover:text-[var(--accent-1)] transition-colors no-underline group/all"
              >
                View all six sectors
                <ArrowUpRight
                  className="w-4 h-4 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Industries grid */}
        <Stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          stagger={0.08}
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <StaggerItem key={ind.title}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="editorial-card-tint group relative h-full p-7 flex items-start gap-5 no-underline"
                >
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-[var(--paper-1)] border border-[var(--line-0)] flex items-center justify-center group-hover:bg-[var(--accent-soft)] group-hover:border-[var(--accent-line)] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[var(--accent-0)]" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[var(--ink-0)] text-lg font-semibold tracking-tight mb-2">
                        {ind.title}
                      </h3>
                      <ArrowUpRight
                        className="w-4 h-4 shrink-0 text-[var(--ink-4)] transition-all group-hover:text-[var(--accent-0)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-[var(--ink-2)] text-[15px] leading-relaxed">
                      {ind.body}
                    </p>
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
