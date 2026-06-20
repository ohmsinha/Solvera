"use client";

/* ============================================================
   Shared animation primitives (Framer Motion)
   ------------------------------------------------------------
   Reveal       — scroll-triggered fade + slide-up for any block
   Stagger      — container that staggers its <StaggerItem> kids
   StaggerItem  — individual staggered child
   RevealText   — word-by-word masked reveal for headlines
   RevealLines  — line-by-line masked reveal (pass array of lines)

   All respect prefers-reduced-motion (animations collapse to a
   simple fade with no movement when the user opts out).
   ============================================================ */

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];

/* ── Reveal: fade + slide up when scrolled into view ── */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  duration = 0.7,
  once = true,
  margin = "-70px",
  className = "",
  as = "div",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : y }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* ── Stagger container ── */
export function Stagger({
  children,
  className = "",
  stagger = 0.1,
  delayChildren = 0,
  once = true,
  margin = "-70px",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger child ── */
export function StaggerItem({ children, y = 28, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* ── RevealText: word-by-word masked rise ──
   Use for headlines. `text` is a string; words rise from behind a
   mask with a slight stagger. `accentWord` (optional) is rendered
   in italic serif accent color (Flux emphasis convention).        */
export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  once = true,
  accentWords = [],
  as = "span",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag ref={ref} className={className} style={{ display: "inline" }}>
      {words.map((word, i) => {
        const isAccent = accentWords.includes(word.replace(/[.,]/g, ""));
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              // keep descenders (y, p, g) from being clipped by the mask
              paddingBottom: "0.12em",
              marginBottom: "-0.12em",
            }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
              animate={
                inView
                  ? { y: "0%", opacity: 1 }
                  : { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }
              }
              transition={{
                duration: 0.7,
                delay: delay + i * stagger,
                ease: EASE,
              }}
              className={
                isAccent ? "serif-italic text-[var(--accent-0)]" : undefined
              }
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/* ── Counter: count-up number when scrolled into view ──
   Renders `prefix + animated value + suffix` with tabular figures.
   Respects reduced motion (jumps straight to the final value).   */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(to);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ── RevealLines: line-by-line masked rise (array of strings) ── */
export function RevealLines({
  lines = [],
  className = "",
  delay = 0,
  stagger = 0.12,
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          style={{
            display: "block",
            overflow: "hidden",
            paddingBottom: "0.12em",
            marginBottom: "-0.12em",
          }}
        >
          <motion.span
            style={{ display: "block" }}
            initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
            animate={
              inView
                ? { y: "0%", opacity: 1 }
                : { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }
            }
            transition={{ duration: 0.75, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export { EASE };
