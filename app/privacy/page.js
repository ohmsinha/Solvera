import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SITE } from "../lib/site";

/* ============================================================
   Privacy Policy — STARTER DRAFT.
   Reviewed copy is required before relying on this in production,
   especially for UAE PDPL (Federal Decree-Law No. 45 of 2021)
   compliance. The contact form collects name, work email, and
   company, so a real privacy policy is genuinely needed.
   ============================================================ */

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Solvera handles personal information collected through this website.",
  alternates: { canonical: "/privacy" },
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

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--paper-0)] pt-16">
        <article className="max-w-[760px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="headline-serif text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--ink-0)] mb-5">
            Privacy Policy
          </h1>
          <p className="text-[var(--ink-3)] text-sm mb-14">
            Last updated: {UPDATED}
          </p>

          <div className="space-y-9">
            <p className="text-[var(--ink-2)] text-[15px] leading-relaxed m-0">
              {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a trading brand
              of {SITE.parent.name}, a UAE-licensed firm. This policy explains
              how we handle personal information collected through this website.
            </p>

            <Section title="What we collect">
              When you submit our contact form, we collect the information you
              provide — typically your name, work email, company name, and the
              details of your enquiry. We may also collect standard technical
              data (such as basic analytics) when you visit the site.
            </Section>

            <Section title="How we use it">
              We use this information solely to respond to your enquiry, to
              provide and discuss our services, and to maintain our business
              records. We do not sell your personal information.
            </Section>

            <Section title="Sharing">
              We do not share your personal information with third parties except
              service providers that help us operate (for example, email or
              hosting providers), and where required by law.
            </Section>

            <Section title="Retention">
              We keep enquiry information only as long as needed for the purpose
              it was collected, or as required by applicable law.
            </Section>

            <Section title="Your rights">
              You may request access to, correction of, or deletion of your
              personal information by contacting us at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--accent-0)] hover:text-[var(--accent-1)] underline"
              >
                {SITE.email}
              </a>
              . We handle personal data in line with applicable UAE data
              protection law (Federal Decree-Law No. 45 of 2021).
            </Section>

            <Section title="Contact">
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--accent-0)] hover:text-[var(--accent-1)] underline"
              >
                {SITE.email}
              </a>{" "}
              — {SITE.address.countryName}.
            </Section>

            <p className="text-[var(--ink-3)] text-[13px] leading-relaxed m-0 pt-4 border-t border-[var(--line-0)]">
              This policy may be updated from time to time.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
