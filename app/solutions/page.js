import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollectionView from "../components/CollectionView";
import { SOLUTIONS, itemHref } from "../lib/catalog";
import { SITE } from "../lib/site";

export const metadata = {
  title: "Solutions",
  description:
    "Solvera AI's pre-built systems: Inbox Agent, Pipeline, Parser, Desk, Pulse, and Scout — production-tested AI you can deploy in weeks, tuned to your data rather than rebuilt from scratch.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions — Solvera AI",
    description:
      "Six production-tested AI systems, tuned to your data and live in weeks — not rebuilt from scratch.",
    url: "/solutions",
    type: "website",
  },
};

function jsonLd() {
  const url = `${SITE.url}/solutions`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Solutions — Solvera AI",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#organization` },
        description: metadata.description,
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: SOLUTIONS.map((s, i) => ({
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
          { "@type": "ListItem", position: 2, name: "Solutions", item: url },
        ],
      },
    ],
  };
}

export default function SolutionsIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <Navbar />
      <main>
        <CollectionView
          kind="solution"
          eyebrow="Solutions"
          title="Pre-built systems, deployed in weeks."
          accentWords={["weeks."]}
          intro="Production-tested systems we've shipped before — tuned to your data and live fast, not rebuilt from scratch. Each one owns a workflow end to end and reports against a number that matters."
          items={SOLUTIONS}
          bandHeadline="Live in weeks, not quarters — and measured from day one."
          stats={[
            { value: "1.2 sec", label: "Inbound response time" },
            { value: "0", label: "Leads dropped overnight" },
            { value: "45 sec", label: "Per document, end to end" },
            { value: "40%", label: "Faster support resolution" },
          ]}
          counterpart={{
            href: "/services",
            label: "Browse services",
            blurb: "Need something bespoke? Start from our capabilities instead.",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
