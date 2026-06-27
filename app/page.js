import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import SolutionsSection from "./components/SolutionsSection";
import IntegrationsBand from "./components/IntegrationsBand";
import ShowcaseSection from "./components/ShowcaseSection";
import ROICalculator from "./components/ROICalculator";
import StickyProcessSection from "./components/StickyProcessSection";
import IndustriesSection from "./components/IndustriesSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { SITE } from "./lib/site";
import { FAQS } from "./lib/faq";

/* ============================================================
   JSON-LD structured data (SEO / AEO / GEO)
   ------------------------------------------------------------
   One @graph with: ProfessionalService (the UAE business),
   WebSite, WebPage, and FAQPage (mirrors the visible FAQ
   accordion exactly — answer engines cross-check the two).
   ============================================================ */
function structuredData() {
  const orgId = `${SITE.url}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        description: SITE.description,
        email: SITE.email,
        slogan: SITE.tagline,
        address: {
          "@type": "PostalAddress",
          addressCountry: SITE.address.country,
        },
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
        sameAs: Object.values(SITE.social),
        knowsAbout: [
          "artificial intelligence consulting",
          "AI agents",
          "workflow automation",
          "conversational AI",
          "document intelligence",
          "CRM automation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI consulting services",
          itemListElement: SITE.services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s, provider: { "@id": orgId } },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: `${SITE.name} — ${SITE.tagline}`,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": orgId },
        description: SITE.description,
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <SolutionsSection />
        <IntegrationsBand />
        <ShowcaseSection />
        <ROICalculator />
        <StickyProcessSection />
        <IndustriesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
