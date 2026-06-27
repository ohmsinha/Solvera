"use client";

import { Reveal } from "./Motion";
import { BRAND_LOGOS } from "../lib/brandLogos";

/* ============================================================
   IntegrationsBand — a dark "integration network" band.
   ------------------------------------------------------------
   Sits in the middle of the page as a rhythm break against the
   run of light sections. A bespoke SVG shows the tools you run
   wired into a central Solvera hub, with data pulsing along the
   connectors (CSS `flow-line`; freezes under reduced motion via
   the global rule). Desktop shows the diagram; smaller screens
   fall back to a dark tool marquee.
   ============================================================ */

const HUB = { x: 500, y: 210 };
// Real brand marks (inlined, monochrome) assigned to node positions.
const LEFT = [
  { logo: BRAND_LOGOS[0], y: 55 },  // WhatsApp
  { logo: BRAND_LOGOS[1], y: 145 }, // Gmail
  { logo: BRAND_LOGOS[2], y: 275 }, // HubSpot
  { logo: BRAND_LOGOS[3], y: 365 }, // Zoho
];
const RIGHT = [
  { logo: BRAND_LOGOS[4], y: 55 },  // Google Sheets
  { logo: BRAND_LOGOS[5], y: 145 }, // Notion
  { logo: BRAND_LOGOS[6], y: 275 }, // Stripe
  { logo: BRAND_LOGOS[7], y: 365 }, // Zapier
];
const LEFT_X = 180;
const RIGHT_X = 820;

/* Tools for the small-screen marquee fallback (plain text — names only) */
const TOOLS = [
  "WhatsApp Business", "Gmail", "HubSpot", "Zoho", "Google Sheets",
  "Notion", "Stripe", "Zapier", "Outlook", "Calendly", "Airtable", "Google Calendar",
];

const ink = (v) => `var(--${v})`;

function connector(nx, ny, side) {
  const dx = side === "left" ? 170 : -170;
  return `M ${nx} ${ny} C ${nx + dx} ${ny}, ${HUB.x - dx} ${HUB.y}, ${HUB.x} ${HUB.y}`;
}

function Node({ logo, y, side, index }) {
  const nx = side === "left" ? LEFT_X : RIGHT_X;
  const d = connector(nx, y, side);
  const labelX = side === "left" ? nx - 28 : nx + 28;
  const anchor = side === "left" ? "end" : "start";
  const S = 18; // logo glyph size (source viewBox is 24×24)
  return (
    <g>
      {/* base connector */}
      <path d={d} fill="none" style={{ stroke: ink("ink-line") }} strokeWidth={1.5} />
      {/* animated data pulse */}
      <path
        d={d}
        fill="none"
        className="flow-line"
        style={{ stroke: ink("accent-on-dark"), animationDelay: `${index * 0.25}s` }}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* node chip + brand mark (monochrome) */}
      <circle cx={nx} cy={y} r={17} style={{ fill: ink("ink-bg-2"), stroke: ink("ink-line") }} strokeWidth={1.5} />
      <g
        transform={`translate(${nx - S / 2}, ${y - S / 2}) scale(${S / 24})`}
        style={{ fill: ink("on-ink-0") }}
        aria-hidden="true"
      >
        <path d={logo.path} />
      </g>
      {/* label */}
      <text
        x={labelX}
        y={y + 4}
        textAnchor={anchor}
        style={{ fill: ink("on-ink-1"), fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.04em" }}
      >
        {logo.title}
      </text>
    </g>
  );
}

function IntegrationNetwork() {
  return (
    <svg viewBox="0 0 1000 420" className="w-full h-auto" role="img" aria-label="Solvera wired into your existing tools">
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-on-dark)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent-on-dark)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {LEFT.map((t, i) => (
        <Node key={t.logo.title} logo={t.logo} y={t.y} side="left" index={i} />
      ))}
      {RIGHT.map((t, i) => (
        <Node key={t.logo.title} logo={t.logo} y={t.y} side="right" index={i} />
      ))}

      {/* Hub */}
      <circle cx={HUB.x} cy={HUB.y} r={75} fill="url(#hubGlow)" />
      <circle cx={HUB.x} cy={HUB.y} r={44} className="hub-ping" fill="none" style={{ stroke: ink("accent-on-dark") }} strokeWidth={1.5} />
      <circle cx={HUB.x} cy={HUB.y} r={40} style={{ fill: ink("accent-0"), stroke: ink("accent-on-dark") }} strokeWidth={1.5} />
      <text
        x={HUB.x}
        y={HUB.y + 9}
        textAnchor="middle"
        style={{ fill: ink("paper-0"), fontFamily: "var(--font-serif)", fontSize: "30px", fontWeight: 600 }}
      >
        S
      </text>
      <text
        x={HUB.x}
        y={HUB.y + 70}
        textAnchor="middle"
        style={{ fill: ink("on-ink-2"), fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em" }}
      >
        SOLVERA AI
      </text>
    </svg>
  );
}

export default function IntegrationsBand() {
  return (
    <section
      aria-label="Tools we integrate with"
      className="relative bg-[var(--ink-bg-0)] overflow-hidden border-t border-b border-[var(--ink-line)] py-20 sm:py-24 px-6 sm:px-10"
    >
      <div className="absolute inset-0 texture-dots-dark texture-fade opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="grain-layer opacity-[0.05]" aria-hidden="true" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <Reveal>
          <p className="eyebrow text-[var(--accent-on-dark)] text-center mb-4">Integrations</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,3rem)] text-[var(--on-ink-0)] text-center max-w-2xl mx-auto">
            Wired into the tools you already run.
          </h2>
        </Reveal>

        {/* Desktop diagram */}
        <Reveal delay={0.15}>
          <div className="hidden lg:block mt-10">
            <IntegrationNetwork />
          </div>
        </Reveal>

        {/* Small-screen fallback: dark tool marquee */}
        <div className="lg:hidden mt-10 marquee-mask marquee-paused overflow-hidden">
          <div
            className="animate-marquee flex w-max items-center gap-3 pr-3"
            style={{ animationDuration: "45s" }}
          >
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="whitespace-nowrap rounded-full border border-[var(--ink-line)] bg-[var(--ink-bg-1)]
                  px-5 py-2.5 text-[13px] font-medium text-[var(--on-ink-1)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
