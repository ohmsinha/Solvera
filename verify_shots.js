/* Verification screenshots: full-page desktop + mobile, plus mobile menu open.
   Disables animations via prefers-reduced-motion so every section is visible. */
const { chromium } = require("playwright");
const path = require("path");

const OUT = path.join(__dirname, "screenshots");
const URL = "http://localhost:3000";

async function fullPage(browser, { width, height, name, reducedMotion }) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // walk the page so IntersectionObserver-driven reveals fire
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 1; i <= 20; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), (scrollHeight / 20) * i);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
  console.log(`saved ${name}.png`);
  return { ctx, page };
}

async function main() {
  const fs = require("fs");
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  // Desktop full page (reduced motion so nothing is mid-transition)
  const d = await fullPage(browser, {
    width: 1440,
    height: 900,
    name: "verify-desktop",
    reducedMotion: true,
  });
  await d.ctx.close();

  // Mobile full page
  const m = await fullPage(browser, {
    width: 375,
    height: 812,
    name: "verify-mobile",
    reducedMotion: true,
  });

  // Mobile menu open
  await m.page.evaluate(() => window.scrollTo(0, 0));
  await m.page.click('button[aria-controls="mobile-menu"]');
  await m.page.waitForTimeout(700);
  await m.page.screenshot({ path: path.join(OUT, "verify-mobile-menu.png") });
  console.log("saved verify-mobile-menu.png");
  await m.ctx.close();

  // Hero with animations ON (desktop, viewport only)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT, "verify-hero-motion.png") });
  console.log("saved verify-hero-motion.png");
  await ctx.close();

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
