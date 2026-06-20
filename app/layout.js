import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "./lib/site";

/* Editorial display serif — hero & feature headlines, italic accent word */
const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Workhorse sans — UI, body, most headings */
const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Mono — eyebrows, labels, metrics */
const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const TITLE = `${SITE.name} — ${SITE.tagline}`;
const DESCRIPTION =
  "AI consultancy in Dubai. We design, deploy, and operate practical AI systems — agents, automations, and internal tools — that remove manual work and measurably improve operations. First production deployment in 4–6 weeks.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s — ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "AI consultancy Dubai",
    "AI agency UAE",
    "AI agents",
    "workflow automation",
    "conversational AI",
    "WhatsApp automation",
    "document intelligence",
    "CRM automation",
    "AI consulting",
    "business process automation Dubai",
  ],
  category: "technology",
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Geo targeting (GEO) — legacy but still read by several engines
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
    ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf7",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} ${plexMono.variable} antialiased`}
    >
      <body className="bg-[var(--surface-page)] text-[var(--text-body)] font-[family-name:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
