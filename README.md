# VR Islam

**Experience Islam beyond imagination**: relive history through virtual reality. 360° and VR views of Masjid al-Haram, Masjid an-Nabawi, Jannat al-Baqi', Al-Aqsa, great mosques of the world and the journey of Hajj. Views play in the browser on desktop and phones (drag or gyroscope) and in VR headsets via WebXR (Meta Quest, Vision Pro, Pico).

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and three.js.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out (plain HTML/CSS/JS, host anywhere)
npx serve out      # preview the production build
```

## Deployment

Every push to `main` is built and published to **GitHub Pages** by `.github/workflows/deploy.yml`. The workflow sets `NEXT_PUBLIC_BASE_PATH` (e.g. `/vr-islam`) and `NEXT_PUBLIC_SITE_ORIGIN` automatically from the repository's Pages settings. With a custom domain the base path becomes empty and nothing else needs to change.

> If the build fails with `Failed to fetch … from Google Fonts` / `ETIMEDOUT`, your network has broken IPv6. Run
> `NODE_OPTIONS=--dns-result-order=ipv4first npm run build`.

## Pages

- **Home**: the logo, a small banner ("Experience Islam beyond imagination" with Explore / Visit / Feel), the 360° videos, the "Four ways to step inside" guide (VR Islam app, headset, phone, computer), and a footer with the latest videos, our initiatives and contact details.
- **Watch** (`/videos/<slug>`): the title on top, the 360° player at full width, then details, share/embed and "Up next".
- **Embed** (`/embed/<slug>`): a chrome-less player for other websites' `<iframe>`s.

## Adding real videos

All views are listed in `src/content/videos.ts`. The current ones are **placeholders**: 360° scenes generated in the browser (`source.type: "generated"`). To publish real footage, edit an entry:

```ts
source: { type: "file", src: "https://cdn.example.com/masjid-an-nabawi-8k.mp4" },
format: "360-mono",          // or "360-stereo-tb" (3D top/bottom) or "180-stereo-sbs" (VR180)
poster: "/media/masjid-an-nabawi.jpg",   // 16:9 still; run `npm run thumbs` for its card thumbnail
location: "Madinah, Saudi Arabia",
duration: 412,
```

- Video files must be **equirectangular**. Serve them from a CDN with CORS enabled (`Access-Control-Allow-Origin`), since WebGL needs cross-origin access to draw them.
- A YouTube 360° video can be listed without re-hosting: `source: { type: "youtube", id: "VIDEO_ID" }`.
- Replace `views` with real numbers from your analytics and remove the `credits` placeholder line.

## Player

`src/components/player/Vr360Player.tsx`: drag/pinch/wheel, keyboard shortcuts, gyroscope on phones, "Enter VR" (WebXR, with the controller trigger to play/pause), stereo 3D and VR180, resume where you left off, an iPhone full-screen fallback, and pausing when off-screen.

## Brand

The logo source is in `logo/`. `node scripts/make-brand.mjs` regenerates the transparent logo and headset mark in `public/brand/` and the app icons; `node scripts/make-share-image.mjs` regenerates the link-preview image. Colours and fluid type live in `src/app/globals.css` (light theme).

## Screens

Layouts are fluid rather than tied to a few breakpoints: grids choose their own column count and type scales with the screen. Tap targets follow the pointer type, so touch tablets get touch-sized controls. Phones on their side get a compact layout (`short:` variant), and foldables/dual screens use the Viewport Segments API (`fold-h:` / `fold-v:` and the `@media` block in `globals.css`) so nothing sits on the hinge.

## Placeholder scenes & posters

Generated scenes are described by a `SceneSpec` (`src/lib/scene/types.ts`) and drawn by `src/lib/scene/`. Their posters are pre-rendered JPGs in `public/media/placeholder/posters/`. If you change a scene, regenerate its poster:

```bash
npm run dev
npm run posters                 # all, or: npm run posters <slug> …
npm run thumbs                  # 800px card thumbnails (-thumb.jpg) for every poster
```

This uses the local Chrome at `/usr/bin/google-chrome` (override with `CHROME_PATH`) and the dev-only route `/dev/capture?slug=<slug>`, which renders nothing in production builds.
