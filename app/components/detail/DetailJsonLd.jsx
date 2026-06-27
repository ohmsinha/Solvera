/* ============================================================
   DetailJsonLd — per-page structured data for a catalog item.
   Server component (no client code). Emits Service +
   BreadcrumbList + FAQPage in one @graph, mirroring the visible
   page so answer engines cross-check and trust it. The FAQ here
   matches the accordion in <DetailView/> exactly.
   ============================================================ */

import { SITE } from "../../lib/site";
import { itemHref } from "../../lib/catalog";

export default function DetailJsonLd({ item }) {
  const orgId = `${SITE.url}/#organization`;
  const url = `${SITE.url}${itemHref(item)}`;
  const SEG = {
    service: ["services", "Services"],
    solution: ["solutions", "Solutions"],
    industry: ["industries", "Industries"],
  };
  const [anchor, sectionName] = SEG[item.kind] || SEG.service;
  const isIndustry = item.kind === "industry";
  const published = "2026-06-15";
  const modified = new Date().toISOString().slice(0, 10);
  const pageName = isIndustry ? `AI for ${item.name} — ${SITE.name}` : `${item.name} — ${SITE.name}`;

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: isIndustry ? `AI systems for ${item.name}` : item.name,
    serviceType: isIndustry ? "AI consulting" : item.label,
    description: item.summary,
    url,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    inLanguage: "en",
  };
  // Industry pages target an audience — useful signal for answer engines (GEO).
  if (isIndustry) {
    service.audience = { "@type": "Audience", audienceType: item.name };
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      service,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: pageName,
        description: item.summary,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": orgId },
        mainEntity: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: `${SITE.url}/opengraph-image`,
        inLanguage: "en",
        datePublished: published,
        dateModified: modified,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: sectionName, item: `${SITE.url}/${anchor}` },
          { "@type": "ListItem", position: 3, name: item.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#webpage` },
        inLanguage: "en",
        mainEntity: item.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
