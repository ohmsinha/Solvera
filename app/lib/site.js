/* ============================================================
   Single source of truth for site-wide facts.
   Used by layout metadata, JSON-LD structured data, the footer,
   and the contact section — keep visible copy and schema in sync
   (consistency between page text and structured data is what
   answer engines reward).
   TODO: set NEXT_PUBLIC_SITE_URL (or edit the fallback) once the
   production domain is live, and fill in the real contact details.
   ============================================================ */

export const SITE = {
  name: "Solvera AI",
  legalName: "Solvera AI",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.solvera.ai",

  // Licensed contracting entity behind the Solvera AI brand.
  // Solvera AI is a trading brand; the entity on the trade license is the
  // party that contracts/invoices. Shown in the footer and on legal pages.
  // TODO: confirm exact legal name as printed on the trade license + add
  // the license number and issuing authority (DED/DET) before going live.
  parent: {
    name: "Al Batra Consultants",
    website: "https://albatraconsultants.com",
    licenseNo: "", // TODO: trade license number
    authority: "Department of Economy & Tourism, Dubai",
    locality: "Dubai",
    country: "United Arab Emirates",
  },
  tagline: "Practical AI systems for modern teams",
  description:
    "Solvera AI is an AI consultancy in Dubai that designs, deploys, and operates practical AI systems — agents, automations, and internal tools — that remove manual work and measurably improve operations.",
  email: "hello@solvera.ai",
  phone: "+971-0-000-0000", // TODO: real number
  address: {
    locality: "Dubai",
    country: "AE",
    countryName: "United Arab Emirates",
  },
  geo: { latitude: 25.2048, longitude: 55.2708 },
  social: {
    linkedin: "https://www.linkedin.com/company/solvera-ai", // TODO: confirm handles
    x: "https://x.com/solveraai",
    instagram: "https://www.instagram.com/solvera.ai",
  },
  services: [
    "AI agents",
    "Workflow automation",
    "Conversational AI",
    "Document intelligence",
    "Sales & CRM automation",
    "Custom models & integrations",
  ],
};
