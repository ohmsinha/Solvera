"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SpotlightButton from "./SpotlightButton";
import { RevealText, EASE } from "./Motion";

const CYCLE_WORDS = ["measurable", "practical", "reliable", "shipped", "scalable"];
const CYCLE_INTERVAL = 2200;

/* Typographic wordmarks — distinct treatments read as real logos until
   actual client logos replace them */
const LOGOS = [
  { name: "Northwind", cls: "font-semibold tracking-tight text-[15px]" },
  { name: "CLOUDWATCH", cls: "font-[family-name:var(--font-mono)] text-[12.5px] tracking-[0.22em]" },
  { name: "Quotient", cls: "font-[family-name:var(--font-serif)] italic text-[17px]" },
  { name: "BOLTER", cls: "font-bold tracking-[0.08em] text-[14px]" },
  { name: "Meridian", cls: "font-[family-name:var(--font-serif)] text-[16.5px] tracking-wide" },
  { name: "ATLASLINE", cls: "font-medium tracking-[0.3em] text-[12px]" },
  { name: "Verve & Co", cls: "font-[family-name:var(--font-serif)] italic text-[16px]" },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLE_WORDS.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Cinematic scroll-linked values (stays within the light palette)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.04]);
  const textY = useTransform(scrollYProgress, [0, 0.55], [0, -70]);

  return (
    <section ref={containerRef} className="relative h-[160vh] bg-[var(--paper-0)]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background — fades and scales */}
        <motion.div
          style={{ opacity: bgOpacity, scale: heroScale }}
          className="absolute inset-0 bg-[var(--paper-0)]"
        >
          {/* Ambient drifting colour fields — stays within the warm palette */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <div
              className="animate-drift-a absolute -top-[20%] -left-[12%] w-[55vw] h-[55vw] rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle at center, var(--accent-soft) 0%, transparent 65%)",
              }}
            />
            <div
              className="animate-drift-b absolute -bottom-[25%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle at center, var(--paper-2) 0%, transparent 62%)",
              }}
            />
            {/* faint horizon hairline */}
            <div className="absolute left-0 right-0 top-[72%] h-px bg-gradient-to-r from-transparent via-[var(--line-1)] to-transparent opacity-60" />
          </div>

          {/* Editorial background image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper-0)] via-[var(--paper-0)]/50 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2400&q=80"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
            />
          </div>

          {/* Subtle grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow mb-6"
          >
            Practical AI systems for operators
          </motion.p>

          {/* Headline with masked word reveal + cycling accent word */}
          <h1 className="headline-serif text-[clamp(2.5rem,6.2vw,5.5rem)] text-center max-w-4xl mx-auto text-[var(--ink-0)]">
            <RevealText text="Automate the busywork." delay={0.15} />
            <br />
            <RevealText text="Scale what's" delay={0.5} />{" "}
            <span
              className="relative inline-block overflow-hidden align-bottom"
              style={{ height: "1.15em" }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={CYCLE_WORDS[wordIndex]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
                  className="inline-block serif-italic text-[var(--accent-0)]"
                >
                  {CYCLE_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="mt-8 text-[var(--ink-2)] text-center max-w-xl text-base sm:text-lg leading-relaxed"
          >
            Solvera designs and deploys AI agents and automations that remove
            manual work, speed up your operations, and give your team a clearer
            view of the business.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
            className="mt-10 flex items-center gap-3"
          >
            <SpotlightButton variant="primary" href="#contact">
              Book a consultation
              <span className="ml-1.5">↗</span>
            </SpotlightButton>
            <SpotlightButton variant="secondary" href="#results">
              See the results
            </SpotlightButton>
          </motion.div>

          {/* Logo bar — seamless marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
            className="mt-16 w-full max-w-3xl"
          >
            <p className="text-center eyebrow text-[var(--ink-4)] mb-5 normal-case tracking-[0.14em]">
              Trusted by operating teams
            </p>
            <div className="marquee-mask marquee-paused overflow-hidden">
              <div className="animate-marquee flex w-max items-center gap-14 pr-14">
                {[...LOGOS, ...LOGOS].map((brand, i) => (
                  <span
                    key={`${brand.name}-${i}`}
                    className={`whitespace-nowrap text-[var(--ink-3)] ${brand.cls}`}
                  >
                    {brand.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#services"
          aria-label="Scroll to services"
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
        >
          <span className="eyebrow text-[var(--ink-4)] normal-case tracking-[0.14em] text-[10px] group-hover:text-[var(--ink-2)] transition-colors">
            Scroll
          </span>
          <span className="relative w-px h-9 overflow-hidden">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-4 w-px bg-[var(--ink-3)]" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
