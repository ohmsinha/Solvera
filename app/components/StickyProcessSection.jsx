"use client";

import { useRef } from "react";
import { Search, PenTool, Rocket, RefreshCw } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal, RevealText } from "./Motion";
import SpotlightButton from "./SpotlightButton";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Discover",
    body: "We map your workflows and find where AI removes the most manual work — fast.",
    when: "Week 1",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Design",
    body: "We scope a system around a measurable outcome, and agree the number to beat.",
    when: "Week 1–2",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Deploy",
    body: "We build and ship to production. No pilots that go nowhere, no slideware.",
    when: "Week 2–4",
  },
  {
    n: "04",
    icon: RefreshCw,
    title: "Operate",
    body: "We monitor, tune, and improve the system as your operations grow.",
    when: "Ongoing",
  },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2850&q=80",
];

// Extracted image layer component to keep JSX clean and handle the useTransform hooks properly
function StickyImageLayer({ index, scrollYProgress }) {
  const startFadeIn = index === 0 ? 0 : index * 0.25 - 0.05;
  const fullVisible = index * 0.25;
  const startFadeOut = index === 3 ? 1 : (index + 1) * 0.25 - 0.05;
  const hidden = index === 3 ? 1 : (index + 1) * 0.25;

  const opacityMap =
    index === 0
      ? { in: [0, startFadeOut, hidden], out: [1, 1, 0] }
      : index === 3
      ? { in: [startFadeIn, fullVisible, 1], out: [0, 1, 1] }
      : {
          in: [startFadeIn, fullVisible, startFadeOut, hidden],
          out: [0, 1, 1, 0],
        };

  const scaleMap = { in: [fullVisible, hidden], out: [1, 1.06] };

  const opacity = useTransform(scrollYProgress, opacityMap.in, opacityMap.out);
  const scale = useTransform(scrollYProgress, scaleMap.in, scaleMap.out);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 z-0 origin-center"
    >
      <img
        src={IMAGES[index]}
        alt={`Process step ${index + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}

export default function StickyProcessSection() {
  const reduce = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="process"
      aria-label="How we work"
      className="relative bg-[var(--paper-1)] border-t border-[var(--line-0)]"
    >
      {/* Top Header */}
      <div className="max-w-[1200px] mx-auto pt-24 sm:pt-32 px-6 sm:px-10 pb-16">
        <Reveal>
          <p className="eyebrow mb-4">04 // How we work</p>
        </Reveal>
        <h2 className="headline-serif text-[clamp(2rem,4.4vw,3.75rem)] text-[var(--ink-0)] max-w-2xl">
          <RevealText
            text="From first call to production in weeks."
            accentWords={["weeks."]}
            stagger={0.04}
          />
        </h2>
      </div>

      {/* --- DESKTOP STICKY SCROLL (hidden on mobile or reduced motion) --- */}
      {reduce ? null : (
        <div className="hidden lg:block relative h-[400vh]" ref={containerRef}>
          {/* The pinned background stage */}
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--paper-0)]">
            {/* Scrim to ensure text cards have enough contrast if they overlap bright parts of the image */}
            <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />

            {/* Image Layers */}
            {STEPS.map((_, i) => (
              <StickyImageLayer
                key={`img-${i}`}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* Progress Rail (Left side) */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 w-px h-[40vh] bg-[var(--line-0)] z-20">
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="w-full h-full bg-[var(--accent-0)] origin-top"
              />
            </div>
          </div>

          {/* Scrolling Content Foreground */}
          <div className="relative w-full max-w-[1200px] mx-auto z-20 -mt-[100vh] pointer-events-none">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.n}
                  className="h-screen flex items-center justify-end px-10 pointer-events-auto"
                >
                  {/* Editorial Text Card */}
                  <div className="editorial-card p-10 max-w-lg w-full shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-lg bg-[var(--paper-2)] border border-[var(--line-0)] flex items-center justify-center">
                        <Icon
                          className="w-5 h-5 text-[var(--accent-0)]"
                          strokeWidth={2}
                        />
                      </div>
                      <span className="tnum text-[var(--ink-4)] text-sm font-[family-name:var(--font-mono)] tracking-[0.14em]">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="headline-serif text-3xl text-[var(--ink-0)] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[var(--ink-2)] text-base leading-relaxed mb-8">
                      {step.body}
                    </p>
                    <p className="eyebrow text-[var(--accent-0)]">{step.when}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- MOBILE / REDUCED MOTION FALLBACK --- */}
      <div className={`${reduce ? "block" : "block lg:hidden"} max-w-[1200px] mx-auto px-6 sm:px-10`}>
        <div className="flex flex-col gap-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.n}>
                <div className="editorial-card overflow-hidden flex flex-col">
                  <div className="aspect-video w-full bg-[var(--paper-2)] border-b border-[var(--line-0)]">
                    <img
                      src={IMAGES[i]}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 sm:p-10">
                    <div className="flex items-center justify-between mb-6">
                      <Icon
                        className="w-5 h-5 text-[var(--accent-0)]"
                        strokeWidth={2}
                      />
                      <span className="tnum text-[var(--ink-4)] text-sm font-[family-name:var(--font-mono)] tracking-[0.14em]">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="headline-serif text-2xl text-[var(--ink-0)] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--ink-2)] text-[15px] leading-relaxed mb-6">
                      {step.body}
                    </p>
                    <p className="eyebrow text-[var(--accent-0)]">{step.when}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Promise Card & CTA */}
      <div className="max-w-[1200px] mx-auto pb-24 sm:pb-32 px-6 sm:px-10 pt-20">
        <Reveal delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-xl bg-[var(--surface-card)] border border-[var(--line-0)] p-8">
            <p className="text-[var(--ink-1)] text-lg leading-relaxed max-w-xl">
              Most engagements reach a{" "}
              <em className="text-[var(--accent-0)] not-italic font-semibold">
                first production deployment within four to six weeks.
              </em>
            </p>
            <SpotlightButton variant="primary" href="#contact">
              Book a consultation
              <span className="ml-1.5">↗</span>
            </SpotlightButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
