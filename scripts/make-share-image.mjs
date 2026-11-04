/**
 * Renders public/brand/share-v2.jpg, the preview shown when the site is shared:
 * the logo, the tagline and a curved row of views, on a light background.
 *   node scripts/make-share-image.mjs
 * A real .jpg (rather than a generated route) so static hosts send the right
 * content type, and small enough for chat apps to accept.
 */
import { readFileSync } from "node:fs";
import { chromium } from "playwright-core";
import sharp from "sharp";

const data = (path, type) => `data:${type};base64,${readFileSync(path).toString("base64")}`;
const logo = data("public/brand/logo.png", "image/png");
const panel = (slug) => data(`public/media/placeholder/posters/${slug}-thumb.jpg`, "image/jpeg");
const pattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%230172ce' stroke-width='1'%3E%3Cpath d='M32 10 38.5 25.5 54 32 38.5 38.5 32 54 25.5 38.5 10 32 25.5 25.5Z'/%3E%3Crect x='19' y='19' width='26' height='26' transform='rotate(45 32 32)'/%3E%3Crect x='19' y='19' width='26' height='26'/%3E%3C/g%3E%3C/svg%3E")`;
const panels = [
  ["masjid-an-nabawi", 36],
  ["dome-of-the-rock", 20],
  ["masjid-al-haram", 0],
  ["sultan-ahmed-mosque", -20],
  ["badshahi-mosque", -36],
]
  .map(([slug, turn]) => `<img src="${panel(slug)}" style="width:236px;height:150px;object-fit:cover;border:3px solid #fff;border-radius:14px;margin:0 -6px;box-shadow:0 12px 30px rgb(1 114 206/.22);transform:rotateY(${turn}deg) scale(${turn ? 0.94 : 1});position:relative;z-index:${10 - Math.abs(turn) / 10}">`)
  .join("");

const html = `<!doctype html><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&display=swap">
<body style="margin:0;width:1200px;height:630px;position:relative;overflow:hidden;background:linear-gradient(#ffffff,#eef5ff 55%,#d9e8fb);font-family:Sora,sans-serif;text-align:center">
  <div style="position:absolute;inset:0;background-image:${pattern};background-size:64px 64px;opacity:.08"></div>
  <div style="position:relative;display:flex;flex-direction:column;align-items:center;padding-top:20px">
    <img src="${logo}" style="height:140px">
    <div style="margin-top:14px;font-size:56px;line-height:1;font-weight:700;letter-spacing:.02em;color:#0172ce">EXPERIENCE ISLAM</div>
    <div style="margin-top:8px;font-size:32px;font-weight:600;letter-spacing:.12em;color:#00193f">BEYOND IMAGINATION</div>
    <div style="margin-top:14px;font-size:17px;letter-spacing:.22em;color:#4f6385">RELIVE HISTORY THROUGH VIRTUAL REALITY</div>
    <div style="margin-top:26px;display:flex;justify-content:center;perspective:900px">${panels}</div>
    <div style="margin-top:34px;display:flex;gap:34px;font-size:16px;font-weight:600;letter-spacing:.14em;color:#00193f">
      <span>EXPLORE <span style="color:#4f6385;font-weight:400">REAL STORIES</span></span><span style="color:#0172ce">|</span>
      <span>VISIT <span style="color:#4f6385;font-weight:400">HISTORIC PLACES</span></span><span style="color:#0172ce">|</span>
      <span>FEEL <span style="color:#4f6385;font-weight:400">THE EXPERIENCE</span></span>
    </div>
  </div>
</body>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot();
await browser.close();

const info = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toFile("public/brand/share-v2.jpg");
console.log(`✓ public/brand/share-v2.jpg (${(info.size / 1024).toFixed(0)} KB)`);
