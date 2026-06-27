import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SITE } from "../lib/site";

/* ============================================================
   Terms of Use — STARTER DRAFT.
   Have this reviewed (ideally by a professional) before relying
   on it in production.
   ============================================================ */

export const metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern use of the Solvera website.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "27 June 2026";

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-[var(--ink-0)] text-lg font-semibold tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-[var(--ink-2)] text-[15px] leading-relaxed m-0">
        {children}
      </p>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--paper-0)] pt-16">
        <article className="max-w-[760px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="headline-serif text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--ink-0)] mb-5">
            Terms of Use
          </h1>
          <p className="text-[var(--ink-3)] text-sm mb-14">
            Last updated: {UPDATED}
          </p>

          <div className="space-y-9">
            <p className="text-[var(--ink-2)] text-[15px] leading-relaxed m-0">
              This website is operated by {SITE.name}, a trading brand of{" "}
              {SITE.parent.name}. By using this site you agree to these terms.
            </p>

            <Section title="Information only">
              Content on this site is provided for general information about our
              services and does not constitute a binding offer or professional
              advice. Specific engagements are governed by a separate written
              agreement.
            </Section>

            <Section title="No guarantees">
              Any timelines, outcomes, or estimates shown (including any savings
              calculator) are illustrative and depend on the specifics of each
              engagement; they are not promises of a particular result.
            </Section>

            <Section title="Intellectual property">
              The {SITE.name} name, logo, and site content are owned by us or our
              licensors and may not be reproduced without permission.
            </Section>

            <Section title="Liability">
              To the extent permitted by law, we are not liable for any loss
              arising from use of this website.
            </Section>

            <Section title="Governing law">
              These terms are governed by the laws of the United Arab Emirates.
            </Section>

            <Section title="Contact">
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--accent-0)] hover:text-[var(--accent-1)] underline"
              >
                {SITE.email}
              </a>
              .
            </Section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
