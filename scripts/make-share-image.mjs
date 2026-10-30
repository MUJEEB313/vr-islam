/**
 * Renders public/brand/og-image.jpg, the preview shown when the site is shared.
 *   node scripts/make-share-image.mjs
 * A real .jpg (rather than a generated route) so static hosts send the right
 * content type, and small enough for chat apps to accept.
 */
import { readFileSync } from "node:fs";
import { chromium } from "playwright-core";
import sharp from "sharp";

const data = (path, type) => `data:${type};base64,${readFileSync(path).toString("base64")}`;
const poster = data("public/media/placeholder/posters/night-at-the-haram-of-imam-husayn.jpg", "image/jpeg");
const logo = data("public/brand/logo-on-dark.png", "image/png");

const html = `<!doctype html><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600&display=swap">
<body style="margin:0;width:1200px;height:630px;position:relative;overflow:hidden;background:#020c1f;font-family:Sora,sans-serif">
  <img src="${poster}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%">
  <div style="position:absolute;inset:0;background:linear-gradient(to top,rgb(2 12 31/.97) 12%,rgb(2 12 31/.72) 42%,rgb(2 12 31/0) 72%)"></div>
  <div style="position:absolute;left:64px;right:64px;bottom:52px;color:#fff">
    <img src="${logo}" style="height:92px;display:block;margin-bottom:22px">
    <div style="font-size:54px;line-height:1.14;letter-spacing:-.02em;font-weight:600">Virtual ziyarat of the holy shrines in 360° &amp; VR</div>
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
