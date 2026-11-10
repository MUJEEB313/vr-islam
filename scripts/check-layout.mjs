/**
 * Layout check across screen types:
 *   node scripts/check-layout.mjs [base-url]      (default http://localhost:3000)
 * - 22 device sizes: no sideways scrolling, nothing off-screen
 * - dual-screen foldables: no text or image straddling the hinge
 * Uses the local Chrome at /usr/bin/google-chrome (override with CHROME_PATH).
 */
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const ROUTES = ["/", "/privacy-policy", "/videos/jannat-al-baqi", "/nope"];
const DEVICES = [
  ["Galaxy Fold cover", 280, 653, 1], ["iPhone SE (1st)", 320, 568, 1], ["Z Fold cover", 344, 882, 1], ["Android small", 360, 640, 1],
  ["iPhone 14", 390, 844, 1], ["Z Flip / Pixel", 412, 915, 1], ["iPhone Pro Max", 430, 932, 1],
  ["SE landscape", 568, 320, 1], ["iPhone 8 land", 667, 375, 1], ["iPhone 14 land", 844, 390, 1],
  ["iPad mini", 768, 1024, 1], ["iPad Air", 820, 1180, 1], ["Z Fold inner", 884, 1104, 1], ["Surface Pro", 912, 1368, 1],
  ["Nest Hub", 1024, 600, 1], ["iPad landscape", 1180, 820, 1], ["Laptop 720p", 1280, 720, 0], ["MacBook", 1440, 900, 0],
  ["Full HD", 1920, 1080, 0], ["QHD", 2560, 1440, 0], ["Ultrawide", 3440, 1440, 0], ["4K TV", 3840, 2160, 0],
];

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome", args: ["--enable-experimental-web-platform-features"] });
let problems = 0;

for (const [label, w, h, touch] of DEVICES) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, isMobile: !!touch, hasTouch: !!touch });
  const issues = [];
  for (const route of ROUTES) {
    await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const off = [...document.querySelectorAll("h1,h2,h3,p,a,img,li,button")]
        .filter((e) => { const b = e.getBoundingClientRect(); return b.width && (b.right > vw + 1 || b.left < -1); })
        .map((e) => `${e.tagName}:${(e.textContent || "").trim().slice(0, 20)}`);
      return { over: document.documentElement.scrollWidth - vw, off: off.slice(0, 3) };
    });
    if (r.over > 0 || r.off.length) issues.push(`${route} overflow=${r.over} ${r.off.join(", ")}`);
  }
  problems += issues.length;
  console.log(`${label.padEnd(18)} ${w}x${h}`.padEnd(30), issues.length ? issues.join(" | ") : "ok");
  await page.close();
}

// Side-by-side dual screen: list visible text/images that cross the hinge.
for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1114, height: 720 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1114, height: 720, deviceScaleFactor: 1, mobile: true, displayFeature: { orientation: "vertical", offset: 540, maskLength: 34 } });
  await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(600);
  const crossing = await page.evaluate(() => {
    const s = window.viewport?.segments ?? [];
    if (s.length < 2) return ["no hinge reported"];
    const a = s[0].x + s[0].width, z = s[1].x, out = [];
    const hits = (b) => b.width && b.height && b.left < z - 1 && b.right > a + 1;
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement, cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || el.closest("script,style,svg,.sr-only")) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      if ([...range.getClientRects()].some(hits)) out.push(n.textContent.trim().slice(0, 24));
    }
    for (const i of document.querySelectorAll("img")) if (getComputedStyle(i).display !== "none" && hits(i.getBoundingClientRect())) out.push(`img ${i.alt}`);
    return out;
  });
  problems += crossing.length ? 1 : 0;
  console.log(`Dual screen ${route}`.padEnd(30), crossing.length ? `on hinge: ${crossing.slice(0, 5).join(" | ")}` : "ok");
  await ctx.close();
}

console.log("problems:", problems);
await browser.close();
process.exitCode = problems ? 1 : 0;
