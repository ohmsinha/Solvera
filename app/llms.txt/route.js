import { SITE } from "../lib/site";
import { SERVICES, SOLUTIONS, INDUSTRIES, itemHref } from "../lib/catalog";

/* /llms.txt — a markdown map of the site for AI assistants and answer
   engines: what Solvera AI is, the topics it covers, and the canonical
   URLs worth citing. Prerendered as a static file at build time. */
export const dynamic = "force-static";

const list = (items, base) =>
  items
    .map((i) => `- [${i.name}](${base}${itemHref(i)}): ${i.tagline}`)
    .join("\n");

export function GET() {
  const base = SITE.url;

  const body = `# ${SITE.name}

> ${SITE.tagline}. ${SITE.description}

${SITE.name} is an AI consultancy based in ${SITE.address.locality}, ${SITE.address.countryName}. We design, deploy, and operate practical AI systems — agents, automations, and internal tools — that remove manual work and measurably improve operations. A typical engagement reaches a first production deployment within four to six weeks, scoped around a single measurable outcome. ${SITE.name} is a trading brand of ${SITE.parent.name}, licensed in ${SITE.parent.locality}, ${SITE.parent.country}.

## Services (capabilities we deliver)
${list(SERVICES, base)}

## Solutions (pre-built systems, deployable in weeks)
${list(SOLUTIONS, base)}

## Industries (sector-specific AI for Dubai & the UAE)
${list(INDUSTRIES, base)}

## Key pages
- [Home](${base}/): Overview, services, solutions, ROI calculator, process, and FAQ.
- [Services](${base}/services): The six AI capabilities Solvera delivers.
- [Solutions](${base}/solutions): Production-tested systems, tuned to your data.
- [Industries](${base}/industries): How Solvera applies AI within each sector.

## About
- What we do: AI agents, workflow automation, conversational AI, document intelligence, sales & CRM automation, and custom models & integrations.
- Where: ${SITE.address.locality}, ${SITE.address.countryName} (serving Dubai and the wider UAE).
- Tools we integrate with: WhatsApp Business, HubSpot, Zoho, Gmail, Google Sheets, Notion, Stripe, Zapier, and most major CRMs and ERPs.
- Typical time to first production deployment: 4–6 weeks.

## Contact
- Email: ${SITE.email}
- Location: ${SITE.address.locality}, ${SITE.address.countryName}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
