import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DetailView from "../../components/detail/DetailView";
import DetailJsonLd from "../../components/detail/DetailJsonLd";
import { SERVICES, getItem, getRelated } from "../../lib/catalog";

/* Prerender one static page per service at build time. */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item || item.kind !== "service") return {};
  return {
    title: item.name, // layout template → "Name — Solvera"
    description: item.summary,
    alternates: { canonical: `/services/${item.slug}` },
    openGraph: {
      title: `${item.name} — Solvera`,
      description: item.summary,
      url: `/services/${item.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} — Solvera`,
      description: item.summary,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item || item.kind !== "service") notFound();

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
