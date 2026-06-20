import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DetailView from "../../components/detail/DetailView";
import DetailJsonLd from "../../components/detail/DetailJsonLd";
import { INDUSTRIES, getItem, getRelated } from "../../lib/catalog";

/* Prerender one static page per industry at build time. */
export function generateStaticParams() {
  return INDUSTRIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item || item.kind !== "industry") return {};
  return {
    title: `AI for ${item.name}`, // layout template → "AI for … — Solvera AI"
    description: item.summary,
    alternates: { canonical: `/industries/${item.slug}` },
    openGraph: {
      title: `AI for ${item.name} — Solvera AI`,
      description: item.summary,
      url: `/industries/${item.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `AI for ${item.name} — Solvera AI`,
      description: item.summary,
    },
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item || item.kind !== "industry") notFound();

  const related = getRelated(item);

  return (
    <>
      <DetailJsonLd item={item} />
      <Navbar />
      <main>
        <DetailView item={item} related={related} />
      </main>
      <Footer />
    </>
  );
}
