/**
 * Builds every brand asset from the logo in ./logo (a JPEG on white):
 *   public/brand/  transparent logo + mark, for light and dark backgrounds
 *   public/icons/, src/app/  favicon, home-screen and app icons
 *   node scripts/make-brand.mjs
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
/** For dark backgrounds: the navy lettering turns white, the blue of the headset is kept and lifted. */
const onDark = (r, g, b) => {
  const blueness = smooth(128, 150, b);
  const lift = (c, to) => c + (to - c) * 0.45;
  return [240 + (lift(r, 30) - 240) * blueness, 246 + (lift(g, 165) - 246) * blueness, 255 + (lift(b, 255) - 255) * blueness];
};

const raster = (buf) => sharp(buf, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const lightPng = await raster(cutOut(asIs));
const darkPng = await raster(cutOut(onDark));

const MARK = { left: 104, top: 74, width: 580, height: 356 };
const LOCKUP = { left: 104, top: 74, width: 1392, height: 356 };

async function save(buf, region, out) {
  await sharp(buf).extract(region).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(out);
  console.log("✓", out);
}
await save(lightPng, LOCKUP, "public/brand/logo-on-light.png");
await save(darkPng, LOCKUP, "public/brand/logo-on-dark.png");
await save(lightPng, MARK, "public/brand/mark-on-light.png");
await save(darkPng, MARK, "public/brand/mark-on-dark.png");

/** The mark centred on a white square, as the logo was designed to be seen. `fit` is its share of the width. */
async function icon(out, size, fit) {
  const mark = await sharp(lightPng).extract(MARK).resize({ width: Math.round(size * fit) }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(out);
  console.log("✓", out);
}
await icon("public/icons/icon-192.png", 192, 0.86);
await icon("public/icons/icon-512.png", 512, 0.86);
await icon("public/icons/maskable-512.png", 512, 0.68); // Android may crop to a circle
await icon("src/app/apple-icon.png", 180, 0.8);
await icon("src/app/icon.png", 64, 0.94);
