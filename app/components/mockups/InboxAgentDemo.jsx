"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  MoreHorizontal,
  Paperclip,
  Camera,
  ArrowRight,
  MessagesSquare,
} from "lucide-react";

const EASE = [0.22, 0.61, 0.36, 1];

/* Step model: 0 nothing · 1 user bubble · 2 typing · 3 ai reply */
export default function InboxAgentDemo() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce) {
      setStep(3);
      return;
    }
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 450);
    const t2 = setTimeout(() => setStep(2), 1250);
    const t3 = setTimeout(() => setStep(3), 2250);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [reduce]);

  return (
    <div className="w-[300px] max-w-full rounded-[20px] bg-[var(--surface-card)] border border-[var(--line-1)] shadow-[0_24px_60px_-30px_rgba(22,20,15,0.4)] overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[var(--line-0)]">
        <div className="flex items-center justify-between text-[var(--ink-3)]">
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            <span className="text-[12px] font-medium text-[var(--ink-2)]">
              WhatsApp
            </span>
            <MessagesSquare className="w-3.5 h-3.5" strokeWidth={2} />
          </div>
          <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
        </div>
        <h4 className="headline-serif text-[var(--ink-0)] text-[26px] mt-1.5">
          AI Assistant
        </h4>
      </div>

      {/* Chat area */}
      <div className="px-4 py-5 h-[300px] flex flex-col justify-end gap-3">
        {/* User bubble */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="self-end max-w-[80%] bg-[var(--paper-2)] text-[var(--ink-0)] text-[13px] leading-snug rounded-2xl rounded-br-md px-3.5 py-2.5"
            >
              I need to book a consultation for tomorrow.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing / AI reply */}
        <div className="self-start max-w-[82%]">
          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-[var(--accent-0)] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--on-ink-0)]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.18,
                    }}
                  />
                ))}
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div
                key="reply"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="bg-[var(--accent-0)] text-[var(--on-ink-0)] text-[13px] leading-snug rounded-2xl rounded-bl-md px-3.5 py-2.5"
              >
                I can help with that. Are you looking for morning or afternoon?
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input bar */}
      <div className="px-4 py-3.5 border-t border-[var(--line-0)] flex items-center gap-3">
        <div className="flex-1 border-b border-[var(--line-1)] pb-1 text-[13px] text-[var(--ink-4)]">
          Type a message…
        </div>
        <Paperclip className="w-4 h-4 text-[var(--ink-3)]" strokeWidth={2} />
        <Camera className="w-4 h-4 text-[var(--ink-3)]" strokeWidth={2} />
        <div className="w-7 h-7 rounded-full bg-[var(--paper-2)] flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-[var(--ink-2)]" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
