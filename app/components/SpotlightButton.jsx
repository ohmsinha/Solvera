"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";

/* ============================================================
   Button — Flux variants
   ------------------------------------------------------------
   primary   → pine-teal fill, paper text (main CTA on light)
   secondary → paper fill, ink text, hairline border
   ghost     → transparent, ink text, paper wash on hover
   inverted  → paper fill on dark surfaces (CTA inside ink-bg)
   on-dark   → outline on dark surfaces
   ============================================================ */
export default function SpotlightButton({
  children,
  className = "",
  variant = "primary",
  href,
  ...rest
}) {
  const btnRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    btnRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    btnRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const variants = {
    primary:
      "bg-[var(--accent-0)] text-[var(--paper-0)] hover:bg-[var(--accent-1)] shadow-[0_1px_2px_rgba(22,20,15,0.12)]",
    secondary:
      "bg-[var(--surface-card)] text-[var(--ink-1)] border border-[var(--line-1)] hover:border-[var(--ink-2)]",
    ghost:
      "bg-transparent text-[var(--ink-1)] hover:bg-[var(--paper-1)]",
    inverted:
      "bg-[var(--paper-0)] text-[var(--ink-0)] hover:bg-white",
    "on-dark":
      "bg-transparent text-[var(--on-ink-0)] border border-[var(--ink-line)] hover:border-[var(--on-ink-2)]",
    /* legacy aliases from earlier dark build */
    "outline-light":
      "bg-transparent text-[var(--on-ink-0)] border border-[var(--ink-line)] hover:border-[var(--on-ink-2)]",
    "outline-dark":
      "bg-[var(--surface-card)] text-[var(--ink-1)] border border-[var(--line-1)] hover:border-[var(--ink-2)]",
  };

  const base = variants[variant] || variants.primary;
  // Internal hrefs (in-page hash or app route) soft-navigate via next/link
  // so the homepage doesn't hard-reload on CTA clicks and cross-page anchors
  // (e.g. /#contact from a detail page) resolve correctly.
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
  const Tag = href ? (isInternal ? Link : "a") : "button";

  return (
    <Tag
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      className={`btn-spotlight group relative inline-flex items-center justify-center
        px-5 py-3 rounded-lg text-sm font-semibold tracking-tight no-underline
        cursor-pointer transition-all duration-200 ease-[cubic-bezier(.22,.61,.36,1)]
        active:translate-y-px focus-visible:outline-none
        focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)]
        ${base} ${className}`}
      {...rest}
    >
      <span className="inline-flex items-center">{children}</span>
    </Tag>
  );
}
