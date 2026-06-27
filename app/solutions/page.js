import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollectionView from "../components/CollectionView";
import { SOLUTIONS, itemHref } from "../lib/catalog";
import { SITE } from "../lib/site";

export const metadata = {
  title: "Solutions",
  description:
    "Solvera's system patterns: Inbox Agent, Pipeline, Parser, Desk, Pulse, and Scout — proven approaches we configure to your data and your tools, and deploy in weeks rather than building from a blank page.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions — Solvera",
    description:
      "Six reusable AI system patterns, configured to your data and your tools, and deployed in weeks.",
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
        name: "Solutions — Solvera",
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
          intro="Patterns we build from — proven approaches we configure to your data and your tools, rather than starting from a blank page. Each one owns a workflow end to end."
          items={SOLUTIONS}
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
