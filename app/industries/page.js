import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollectionView from "../components/CollectionView";
import { INDUSTRIES, itemHref } from "../lib/catalog";
import { SITE } from "../lib/site";

export const metadata = {
  title: "Industries",
  description:
    "AI systems for operations-heavy sectors across the UAE: real estate, clinics and aesthetics, logistics and trading, professional services, e-commerce and retail, and financial and insurance — built where slow response and manual paperwork cost the most.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries — Solvera",
    description:
      "AI systems built for operations-heavy sectors across the UAE.",
    url: "/industries",
    type: "website",
  },
};

function jsonLd() {
  const url = `${SITE.url}/industries`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Industries — Solvera",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
        description: metadata.description,
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: INDUSTRIES.map((s, i) => ({
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
          { "@type": "ListItem", position: 2, name: "Industries", item: url },
        ],
      },
    ],
  };
}

export default function IndustriesIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <Navbar />
      <main>
        <CollectionView
          kind="industry"
          eyebrow="Industries"
          title="Built for how UAE businesses operate."
          accentWords={["operate."]}
          intro="We work with operators in the sectors where manual work and slow response cost the most — configuring proven AI patterns to how each one actually runs, across the UAE."
          items={INDUSTRIES}
          counterpart={{
            href: "/solutions",
            label: "Browse solutions",
            blurb: "See the pre-built systems we deploy across these sectors.",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
