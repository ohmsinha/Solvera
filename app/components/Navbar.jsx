"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SpotlightButton from "./SpotlightButton";

// Root-relative hashes so the links resolve from detail pages too
// (next/link scrolls in-page on the homepage, navigates home elsewhere).
const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Impact", href: "/#roi" },
  { label: "Process", href: "/#process" },
  { label: "Industries", href: "/#industries" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Reading-progress hairline along the bottom edge of the navbar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-[rgba(251,250,247,0.82)] backdrop-blur-xl border-b border-[var(--line-0)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Solvera AI — home"
        >
          <div className="w-7 h-7 rounded-md bg-[var(--accent-0)] flex items-center justify-center">
            <span className="text-[var(--paper-0)] text-xs font-bold tracking-tight">
              S
            </span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-[var(--ink-0)]">
            Solvera AI
          </span>
        </Link>

        {/* Nav Links — desktop */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[var(--ink-2)] hover:text-[var(--ink-0)]
                px-3 py-2 rounded-md hover:bg-[var(--paper-1)] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* CTA — desktop */}
          <div className="hidden sm:block">
            <SpotlightButton variant="primary" href="#contact">
              Book a consultation
              <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </SpotlightButton>
          </div>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg
              text-[var(--ink-1)] hover:bg-[var(--paper-1)] transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--focus-ring)]"
          >
            {open ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Reading progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent-0)]"
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-[var(--line-0)]
              bg-[rgba(251,250,247,0.97)] backdrop-blur-xl"
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
              }}
              className="px-6 py-6 flex flex-col gap-1"
            >
              {LINKS.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  className="flex items-center justify-between py-3.5 px-2 border-b border-[var(--line-0)]
                    text-[15px] font-medium text-[var(--ink-1)] hover:text-[var(--ink-0)]"
                >
                  {item.label}
                  <ArrowUpRight
                    className="w-4 h-4 text-[var(--ink-4)]"
                    strokeWidth={2}
                  />
                </motion.a>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="pt-5"
              >
                <SpotlightButton
                  variant="primary"
                  href="#contact"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Book a consultation
                  <span className="ml-1.5">↗</span>
                </SpotlightButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
