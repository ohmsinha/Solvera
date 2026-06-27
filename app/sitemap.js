import { SITE } from "./lib/site";
import { CATALOG, itemHref } from "./lib/catalog";

/* Full sitemap: homepage + the three index pages + every service,
   solution, and industry detail page (driven by the catalog, so new
   entries appear automatically). */
export default function sitemap() {
  const now = new Date();
  const base = SITE.url;

  const top = [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/solutions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/industries`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const details = CATALOG.map((item) => ({
    url: `${base}${itemHref(item)}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...top, ...details].map((entry) => ({ ...entry, lastModified: now }));
}
