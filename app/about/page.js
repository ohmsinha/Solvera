import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SpotlightButton from "../components/SpotlightButton";
import { MessagesSquare, FileSearch, Mail } from "lucide-react";
import { SITE } from "../lib/site";

/* ============================================================
   About — the founder-led trust page. Uses only true facts:
   a brand-new UAE AI automation consultancy whose genuine proof
   is real automation built for an ISO/IEC 17025 testing lab.
   No fabricated clients, metrics, or testimonials.
   ============================================================ */

export const metadata = {
  title: "About",
  description:
    "Solvera is an AI automation consultancy in the UAE. We design, build, and run practical automation that removes repetitive manual work and gives teams a clearer view of their operations.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Solvera",
    description:
      "A UAE AI automation consultancy. Our early work was built for an ISO/IEC 17025-accredited testing laboratory.",
    url: "/about",
    type: "website",
  },
};

/* The real prior work — described honestly, without confidential client
   detail. This is the genuine proof that replaces the removed fake case
   studies. */
const BUILT = [
  {
    icon: MessagesSquare,
    title: "WhatsApp report-retrieval agent",
    body: "A WhatsApp-based system that lets staff request reports by message and receive them back automatically — no logging into a portal, no waiting on a colleague.",
  },
  {
    icon: FileSearch,
    title: "CRM report scraper",
    body: "Automated retrieval of records and reports from the lab's internal CRM, turning a manual look-up-and-download chore into a background task.",
  },
  {
    icon: Mail,
    title: "Email-campaign infrastructure",
    body: "The infrastructure behind the lab's email communications — set up so its campaigns send reliably and consistently.",
  },
];

function jsonLd() {
  const url = `${SITE.url}/about`;
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    url,
    name: `About — ${SITE.name}`,
    description: metadata.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
  };
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <Navbar />
      <main className="bg-[var(--paper-0)] pt-16">
        {/* ── Hero ── */}
        <section className="px-6 sm:px-10 pt-16 pb-16 sm:pt-20 sm:pb-20 border-b border-[var(--line-0)]">
          <div className="max-w-[820px] mx-auto">
            <p className="eyebrow mb-4">About</p>
            <h1 className="headline-serif text-[clamp(2.4rem,5.5vw,4rem)] text-[var(--ink-0)] mb-6">
              About {SITE.name}
            </h1>
            <p className="text-[var(--ink-2)] text-lg leading-relaxed max-w-2xl">
              {SITE.name} is an AI automation consultancy based in the UAE. We
              design, build, and run practical automation — agents, workflow
              automations, and internal tools — that remove repetitive manual
              work and give teams a clearer view of their operations.
            </p>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="px-6 sm:px-10 py-20 sm:py-24">
          <div className="max-w-[820px] mx-auto space-y-6">
            <p className="text-[var(--ink-2)] text-[17px] leading-relaxed">
              We started where most useful automation actually starts: with real
              operational problems. Our early work was built for an ISO/IEC
              17025-accredited testing laboratory — and it is the foundation of
              how we approach every engagement: start with one workflow that
              genuinely costs time, ship something that works, then expand.
            </p>
          </div>
        </section>

        {/* ── What we've built ── */}
        <section
          id="work"
          className="bg-[var(--paper-1)] border-t border-[var(--line-0)] px-6 sm:px-10 py-20 sm:py-24"
        >
          <div className="max-w-[1100px] mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="eyebrow mb-4">What we&rsquo;ve built</p>
              <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,2.75rem)] text-[var(--ink-0)] mb-5">
                Real systems, built for a working lab.
              </h2>
              <p className="text-[var(--ink-2)] text-base leading-relaxed">
                For an ISO/IEC 17025-accredited testing laboratory, we built and
                ran the following — described here without confidential detail.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BUILT.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="editorial-card h-full p-7 flex flex-col"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-line)] flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-[var(--accent-0)]" strokeWidth={2} />
                    </div>
                    <h3 className="text-[var(--ink-0)] text-lg font-semibold tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-[var(--ink-2)] text-[15px] leading-relaxed m-0">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How we work ── */}
        <section className="px-6 sm:px-10 py-20 sm:py-24 border-t border-[var(--line-0)]">
          <div className="max-w-[820px] mx-auto">
            <p className="eyebrow mb-4">How we work</p>
            <h2 className="headline-serif text-[clamp(1.8rem,3.6vw,2.75rem)] text-[var(--ink-0)] mb-5">
              Straight with clients.
            </h2>
            <p className="text-[var(--ink-2)] text-[17px] leading-relaxed">
              We scope around a measurable outcome, tell you honestly whether
              automation is worth it for your situation, and keep a human in the
              loop wherever accuracy matters.
            </p>
            <p className="text-[var(--ink-3)] text-sm leading-relaxed mt-8 pt-6 border-t border-[var(--line-0)]">
              {SITE.name} operates as a trading brand of {SITE.parent.name}, a
              UAE-licensed firm.
            </p>

            {/* Optional founder section — add once details are confirmed
                (name, role, short background). Keep factual; no stock photo. */}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[var(--ink-bg-0)] px-6 sm:px-10 py-20 sm:py-24">
          <div className="max-w-[820px] mx-auto text-center">
            <h2 className="headline-serif text-[clamp(1.8rem,4vw,3rem)] text-[var(--on-ink-0)] mb-8">
              Have a workflow that&rsquo;s costing you time?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <SpotlightButton variant="inverted" href="/#contact">
                Book a consultation
                <span className="ml-1.5">↗</span>
              </SpotlightButton>
              <SpotlightButton variant="on-dark" href="/#services">
                Explore what we do
              </SpotlightButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
