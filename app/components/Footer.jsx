"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./Motion";
import { SITE } from "../lib/site";

// Root-relative so footer nav resolves from detail pages, not just home.
const COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Financial impact", href: "/#roi" },
      { label: "Process", href: "/#process" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "What we've built", href: "/about#work" },
      { label: "FAQ", href: "/#faq" },
      { label: "Book a consultation", href: "/#contact" },
    ],
  },
];

/* Brand glyphs — the installed lucide-react version has no brand icons */
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--ink-bg-0)] border-t border-[var(--ink-line)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-16 pb-8">
        {/* Top: brand + columns + contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14">
          {/* Brand */}
          <div className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/solvera-horizontal-reversed.svg"
              alt="Solvera"
              width={152}
              height={42}
              className="h-10 w-auto mb-5"
            />
            {/* Entity-defining sentence — written to be quotable by AI search */}
            <p className="text-[var(--on-ink-2)] text-sm max-w-sm leading-relaxed">
              {SITE.name} is an AI automation consultancy in the UAE. We design,
              deploy, and operate practical AI systems — agents, automations, and
              internal tools — that remove manual work and measurably improve
              operations.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: LinkedinIcon, href: SITE.social.linkedin, label: "Solvera on LinkedIn" },
                { Icon: XIcon, href: SITE.social.x, label: "Solvera on X" },
                { Icon: InstagramIcon, href: SITE.social.instagram, label: "Solvera on Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[var(--ink-line)] flex items-center justify-center
                    text-[var(--on-ink-2)] hover:text-[var(--on-ink-0)] hover:border-[var(--on-ink-2)]
                    transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav
              key={col.heading}
              aria-label={`Footer — ${col.heading}`}
              className="md:col-span-2"
            >
              <h3 className="eyebrow text-[var(--on-ink-2)] mb-4">{col.heading}</h3>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--on-ink-1)] text-[13px] hover:text-[var(--on-ink-0)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="eyebrow text-[var(--on-ink-2)] mb-4">Contact</h3>
            <address className="not-italic space-y-2.5">
              <a
                href={`mailto:${SITE.email}`}
                className="block text-[var(--on-ink-1)] text-[13px] hover:text-[var(--on-ink-0)] transition-colors duration-200"
              >
                {SITE.email}
              </a>
              <p className="text-[var(--on-ink-2)] text-[13px] m-0">
                {SITE.address.countryName}
              </p>
            </address>
            <a
              href="#"
              aria-label="Back to top"
              className="mt-6 inline-flex items-center gap-2 text-[var(--on-ink-2)] text-[12px]
                hover:text-[var(--on-ink-0)] transition-colors duration-200 group"
            >
              <span className="w-8 h-8 rounded-full border border-[var(--ink-line)] flex items-center justify-center group-hover:border-[var(--on-ink-2)] transition-colors">
                <ArrowUp className="w-3.5 h-3.5" strokeWidth={2} />
              </span>
              Back to top
            </a>
          </div>
        </div>

        {/* Legal entity disclosure — the licensed party behind the brand */}
        <p className="text-[var(--on-ink-2)] text-[12px] leading-relaxed mb-6 max-w-2xl">
          {SITE.name} is a trading brand of{" "}
          <span className="text-[var(--on-ink-1)]">{SITE.parent.name}</span>, a
          UAE-licensed firm
          {SITE.parent.licenseNo ? ` (Trade Licence No. ${SITE.parent.licenseNo})` : ""}.
        </p>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--ink-line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[var(--on-ink-2)] text-[11px] m-0">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-[var(--on-ink-2)] text-[11px]">
            <Link href="/privacy" className="hover:text-[var(--on-ink-0)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--on-ink-0)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Giant outlined wordmark — rises into view */}
      <Reveal y={60} duration={1} margin="-10px">
        <div aria-hidden="true" className="select-none px-6 sm:px-10 -mb-[2vw]">
          <p className="wordmark-giant text-center text-[clamp(4.5rem,15vw,14rem)] m-0 translate-y-[12%] opacity-70">
            Solvera
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
