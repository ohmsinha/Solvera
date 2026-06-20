"use client";

/* ============================================================
   DemoMount — resolves a catalog `demo` key to the matching
   interactive mockup, and only mounts it once scrolled into
   view (the mockups auto-play on mount). For items with no
   demo, the parent renders a static visual instead.
   ============================================================ */

import { useRef } from "react";
import { useInView } from "framer-motion";
import InboxAgentDemo from "../mockups/InboxAgentDemo";
import DocumentParserDemo from "../mockups/DocumentParserDemo";
import LeadDatabaseDemo from "../mockups/LeadDatabaseDemo";

const DEMOS = {
  inbox: InboxAgentDemo,
  parser: DocumentParserDemo,
  leaddb: LeadDatabaseDemo,
};

export default function DemoMount({ demo }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const Demo = DEMOS[demo];

  if (!Demo) return null;

  return (
    <div ref={ref} className="flex justify-center w-full">
      {inView ? <Demo /> : <div className="w-[300px] max-w-full aspect-[3/4]" />}
    </div>
  );
}
