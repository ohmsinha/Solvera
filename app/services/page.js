import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollectionView from "../components/CollectionView";
import { SERVICES, itemHref } from "../lib/catalog";
import { SITE } from "../lib/site";

export const metadata = {
  title: "Services",
  description:
    "Solvera AI's services: AI agents, workflow automation, conversational AI, document intelligence, sales & CRM automation, and custom models & integrations — each scoped around a measurable business outcome and shipped to production in weeks.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Solvera AI",
    description:
      "Six AI capabilities, each scoped around a measurable outcome and shipped to production in weeks.",
    url: "/services",
    type: "website",
  },
};

function jsonLd() {
  const url = `${SITE.url}/services`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Services — Solvera AI",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
        description: metadata.description,
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: `${SITE.url}${itemHref(s)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: url },
        ],
      },
    ],
  };
}

export default function ServicesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <Navbar />
      <main>
        <CollectionView
          kind="service"
          eyebrow="Services"
          title="AI systems built around business outcomes."
          accentWords={["outcomes."]}
          intro="We design and deploy practical AI — not demos. Each capability is scoped around a number worth moving, then shipped to production in weeks and operated as your volumes grow."
          items={SERVICES}
          bandHeadline="Scoped to a metric. Shipped to production. Operated for the long run."
          stats={[
            { value: "6 wks", label: "To first deployment" },
            { value: "10M+", label: "Requests resolved monthly" },
            { value: "99%", label: "Uptime reliability" },
            { value: "3.2×", label: "Faster lead response" },
          ]}
          counterpart={{
            href: "/solutions",
            label: "Browse solutions",
            blurb: "Prefer a pre-built system? See the ones we've shipped before.",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
