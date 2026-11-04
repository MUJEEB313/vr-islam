/**
 * Builds every brand asset from the logo in ./logo (drawn on a white background):
 *   public/brand/  transparent logo, plus the headset mark alone for small spaces
 *   public/icons/, src/app/  favicon, home-screen and app icons
 *   node scripts/make-brand.mjs
 * The mark is split from the "ISLAM" wordmark at the widest blank band of rows.
 */
import { readdirSync } from "node:fs";
import sharp from "sharp";

const source = `logo/${readdirSync("logo").find((f) => /\.(jpe?g|png)$/i.test(f))}`;
const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Recover colour and alpha from a logo drawn on white. `paint` may recolour each pixel. */
function cutOut(paint) {
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
    // Treat near-white JPEG noise as fully transparent.
    const a = clamp((1 - Math.min(r, g, b) / 255 - 0.05) / 0.88);
    const un = (c) => (a > 0 ? clamp((c - 255 * (1 - a)) / a, 0, 255) : 0);
    const [R, G, B] = paint(un(r), un(g), un(b));
    out[i * 4] = R;
    out[i * 4 + 1] = G;
    out[i * 4 + 2] = B;
    out[i * 4 + 3] = Math.round(a * 255);
  }
  return out;
}

const asIs = (r, g, b) => [r, g, b];
/** For dark backgrounds (over video): navy turns white, the blue of the headset is kept and lifted. */
const onDark = (r, g, b) => {
  const blueness = smooth(128, 150, b);
  const lift = (c, to) => c + (to - c) * 0.45;
  return [240 + (lift(r, 30) - 240) * blueness, 246 + (lift(g, 165) - 246) * blueness, 255 + (lift(b, 255) - 255) * blueness];
};

// Find the drawing's bounds and the blank band separating the mark from the wordmark.
const ink = (x, y) => Math.min(data[(y * W + x) * 3], data[(y * W + x) * 3 + 1], data[(y * W + x) * 3 + 2]) < 200;
const rows = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_, x) => ink(x, y)).some(Boolean));
const cols = Array.from({ length: W }, (_, x) => rows.some((r, y) => r && ink(x, y)));
const top = rows.indexOf(true);
const bottom = rows.lastIndexOf(true);
const left = cols.indexOf(true);
const right = cols.lastIndexOf(true);
let gap = { start: bottom, size: 0 };
for (let y = top, start = -1; y <= bottom; y++) {
  if (!rows[y] && start < 0) start = y;
  if (rows[y] && start >= 0) {
    if (y - start > gap.size) gap = { start, size: y - start };
    start = -1;
  }
}
const pad = 6;
const box = (y0, y1) => {
  const ys = [y0, y1];
  const xs = [W, 0];
  for (let y = y0; y <= y1; y++) {
    for (let x = left; x <= right; x++) {
      if (!ink(x, y)) continue;
      xs[0] = Math.min(xs[0], x);
      xs[1] = Math.max(xs[1], x);
    }
  }
  const l = Math.max(0, xs[0] - pad);
  const t = Math.max(0, ys[0] - pad);
  return { left: l, top: t, width: Math.min(W, xs[1] + pad) - l, height: Math.min(H, ys[1] + pad) - t };
};
const LOGO = box(top, bottom);
const MARK = box(top, gap.start - 1);

const raster = (buf) => sharp(buf, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const lightPng = await raster(cutOut(asIs));
const darkPng = await raster(cutOut(onDark));

async function save(buf, region, out) {
  await sharp(buf).extract(region).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(out);
  console.log("✓", out, `${region.width}x${region.height}`);
}
await save(lightPng, LOGO, "public/brand/logo.png");
await save(lightPng, MARK, "public/brand/mark.png");
await save(darkPng, MARK, "public/brand/mark-on-dark.png");

/** A logo region centred on a white square. `fit` is its share of the square's width. */
async function icon(out, size, fit, region) {
  const img = await sharp(lightPng).extract(region).resize({ width: Math.round(size * fit), height: Math.round(size * fit), fit: "inside" }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: img, gravity: "center" }])
    .png()
    .toFile(out);
  console.log("✓", out);
}
await icon("public/icons/icon-192.png", 192, 0.82, LOGO);
await icon("public/icons/icon-512.png", 512, 0.82, LOGO);
await icon("public/icons/maskable-512.png", 512, 0.62, LOGO); // Android may crop to a circle
await icon("src/app/apple-icon.png", 180, 0.78, LOGO);
await icon("src/app/icon.png", 64, 0.94, MARK);
