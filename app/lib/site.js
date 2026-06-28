/* ============================================================
   Single source of truth for site-wide facts.
   Used by layout metadata, JSON-LD structured data, the footer,
   and the contact section — keep visible copy and schema in sync
   (consistency between page text and structured data is what
   answer engines reward).
   Primary domain: solverame.com (owned). If solvera.ae is secured
   later, set NEXT_PUBLIC_SITE_URL and update the email below.
   ============================================================ */

export const SITE = {
  name: "Solvera",
  // Legal entity behind the Solvera trading brand (used as legalName in schema).
  legalName: "AL BATRA MANAGEMENT CONSULTANTS",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://solverame.com",

  // Licensed contracting entity behind the Solvera brand.
  // Solvera is a trading brand; the entity on the trade license is the
  // party that contracts/invoices. Shown in the footer and on legal pages.
  // UAE-licensed firm registered in Sharjah (SEDD) — not Dubai.
  // TODO: add the trade license number once confirmed with SEDD.
  parent: {
    name: "AL BATRA MANAGEMENT CONSULTANTS",
    licenseNo: "", // TODO: trade license number (SEDD)
    authority: "Sharjah Economic Development Department (SEDD)",
    country: "United Arab Emirates",
  },
  tagline: "Practical AI systems for modern teams",
  description:
    "Solvera is an AI automation consultancy in the UAE that designs, deploys, and operates practical AI systems — agents, automations, and internal tools — that remove manual work and measurably improve operations.",
  email: "info@solverame.com",
  phone: "", // TODO: real number once a business line is live
  address: {
    country: "AE",
    countryName: "United Arab Emirates",
  },
  // Social profiles not yet created — placeholders kept per owner request;
  // real handles to be supplied later. TODO: replace with live URLs.
  social: {
    linkedin: "https://www.linkedin.com/company/solvera-ai", // TODO: real handle
    x: "https://x.com/solveraai", // TODO: real handle
    instagram: "https://www.instagram.com/solvera.ai", // TODO: real handle
  },
  services: [
    "Custom models & integrations",
    "Sales & CRM automation",
    "Conversational AI",
    "Document intelligence",
    "Workflow automation",
    "AI agents",
  ],
};
