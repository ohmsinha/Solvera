import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DetailView from "../../components/detail/DetailView";
import DetailJsonLd from "../../components/detail/DetailJsonLd";
import { SOLUTIONS, getItem, getRelated } from "../../lib/catalog";

/* Prerender one static page per solution at build time. */
export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item || item.kind !== "solution") return {};
  return {
    title: item.name, // layout template → "Name — Solvera AI"
    description: item.summary,
    alternates: { canonical: `/solutions/${item.slug}` },
    openGraph: {
      title: `${item.name} — Solvera AI`,
      description: item.summary,
      url: `/solutions/${item.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} — Solvera AI`,
      description: item.summary,
    },
  };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item || item.kind !== "solution") notFound();

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
