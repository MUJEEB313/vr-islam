/**
 * Renders public/brand/og-image.jpg, the preview shown when the site is shared:
 * the logo centred on a light patterned background.
 *   node scripts/make-share-image.mjs
 * A real .jpg (rather than a generated route) so static hosts send the right
 * content type, and small enough for chat apps to accept.
 */
import { readFileSync } from "node:fs";
import { chromium } from "playwright-core";
import sharp from "sharp";

const data = (path, type) => `data:${type};base64,${readFileSync(path).toString("base64")}`;
const logo = data("public/brand/logo.png", "image/png");
const pattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%230172ce' stroke-width='1'%3E%3Cpath d='M32 10 38.5 25.5 54 32 38.5 38.5 32 54 25.5 38.5 10 32 25.5 25.5Z'/%3E%3Crect x='19' y='19' width='26' height='26' transform='rotate(45 32 32)'/%3E%3Crect x='19' y='19' width='26' height='26'/%3E%3C/g%3E%3C/svg%3E")`;

const html = `<!doctype html><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600&display=swap">
<body style="margin:0;width:1200px;height:630px;position:relative;overflow:hidden;background:linear-gradient(#f4f8ff,#dceafc);font-family:Sora,sans-serif">
  <div style="position:absolute;inset:0;background-image:${pattern};background-size:64px 64px;opacity:.13"></div>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;color:#00193f">
    <img src="${logo}" style="height:300px">
    <div style="font-size:44px;letter-spacing:-.01em;font-weight:600">Islamic heritage in 360° &amp; VR</div>
  </div>
</body>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot();
await browser.close();

const info = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toFile("public/brand/og-image.jpg");
console.log(`✓ public/brand/og-image.jpg (${(info.size / 1024).toFixed(0)} KB)`);
