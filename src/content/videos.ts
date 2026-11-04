import type { ShrineOpts } from "@/lib/scene/types";
import type { Video } from "@/lib/types";

/*
 * PLACEHOLDER CONTENT
 * Every video below uses a procedurally generated 360° scene. To publish real
 * footage, replace `source` with { type: "file", src: "/media/your-video.mp4" }
 * (or { type: "youtube", id: "…" }), set the real `format`, and point `poster`
 * at a real 16:9 still (run `npm run thumbs` to create its `-thumb.jpg`).
 */

const poster = (slug: string) => `/media/placeholder/posters/${slug}.jpg`;
const thumb = (slug: string) => `/media/placeholder/posters/${slug}-thumb.jpg`;
const CREDIT = "Placeholder scene, generated in your browser. Replace with real footage.";

const mosque = (extra: Partial<ShrineOpts> & Pick<ShrineOpts, "dome" | "facade">): ShrineOpts => ({
  lon: 180,
  minaretPairs: 0,
  minaretColor: "white",
  ...extra,
});

export const videos: Video[] = [
  {
    slug: "masjid-al-haram",
    title: "Masjid al-Haram and the Kaaba, Makkah",
    summary: "Stand in the mataf as pilgrims circle the Kaaba at night.",
    description:
      "Masjid al-Haram in Makkah surrounds the Kaaba, the qibla towards which Muslims everywhere turn in prayer. This 360° view places you on the marble of the mataf after dark, among the pilgrims performing tawaf, with the arcades and minarets of the mosque all around you.",
    category: "mosque",
    location: "Makkah, Saudi Arabia",
    format: "360-mono",
    source: {
      type: "generated",
      scene: { kind: "courtyard", sky: "night", seed: 201, shrines: [], kaaba: true, arcade: "marble", arcadeDomes: true, towers: [120, 150, 210, 240, 300, 60], inlay: "#d6d9dc", particles: [] },
    },
    poster: poster("masjid-al-haram"),
    thumb: thumb("masjid-al-haram"),
    duration: 486,
    publishedAt: "2026-10-28",
    views: 84210,
    tags: ["makkah", "kaaba", "tawaf", "night"],
    credits: CREDIT,
  },
  {
    slug: "masjid-an-nabawi",
    title: "Masjid an-Nabawi, Madinah",
    summary: "The courtyard of the Prophet's Mosque beneath the Green Dome.",
    description:
      "Masjid an-Nabawi was established by the Prophet Muhammad ﷺ after the Hijrah to Madinah. Stand in its white marble courtyard on a bright morning, with the Green Dome ahead of you and the mosque's minarets rising on either side.",
    category: "mosque",
    location: "Madinah, Saudi Arabia",
    format: "360-mono",
    source: {
      type: "generated",
      scene: { kind: "courtyard", sky: "day", seed: 202, shrines: [mosque({ dome: "green", facade: "marble", minaretPairs: 2 })], arcade: "marble", inlay: "#b9c2cc", particles: ["pigeons"] },
    },
    poster: poster("masjid-an-nabawi"),
    thumb: thumb("masjid-an-nabawi"),
    duration: 412,
    publishedAt: "2026-10-21",
    views: 71356,
    tags: ["madinah", "green dome", "masjid an-nabawi"],
    credits: CREDIT,
  },
  {
    slug: "jannat-al-baqi",
    title: "Jannat al-Baqi', Madinah",
    summary: "The historic cemetery of Madinah, beside the Prophet's Mosque.",
    description:
      "Jannat al-Baqi' is the main cemetery of Madinah and one of the oldest in Islam, lying just to the south-east of Masjid an-Nabawi, whose Green Dome you can see in the distance. Many members of the family of the Prophet Muhammad ﷺ and many of his Companions are buried here, their graves marked by simple stones.",
    category: "site",
    location: "Madinah, Saudi Arabia",
    format: "360-mono",
    source: { type: "generated", scene: { kind: "plain", sky: "day", seed: 211, wall: true, graves: 180, distantMosqueLon: 205, particles: [] } },
    poster: poster("jannat-al-baqi"),
    thumb: thumb("jannat-al-baqi"),
    duration: 268,
    publishedAt: "2026-11-03",
    views: 20733,
    tags: ["madinah", "baqi", "companions"],
    credits: CREDIT,
  },
  {
    slug: "dome-of-the-rock",
    title: "The Dome of the Rock, Jerusalem",
    summary: "Dawn over the golden dome on the Haram al-Sharif.",
    description:
      "Completed in 691–692 CE, the Dome of the Rock is among the oldest surviving monuments of Islamic architecture. Its golden dome rises above an octagon clad in blue tilework on the Haram al-Sharif in Jerusalem. This view is set at first light, as the stone of the esplanade warms.",
    category: "mosque",
    location: "Jerusalem",
    format: "360-mono",
    source: {
      type: "generated",
      scene: { kind: "courtyard", sky: "dawn", seed: 203, shrines: [mosque({ dome: "gold", facade: "tile", scale: 0.95 })], arcade: "stone", inlay: "#8a7a5a", particles: ["pigeons"] },
    },
    poster: poster("dome-of-the-rock"),
    thumb: thumb("dome-of-the-rock"),
    duration: 365,
    publishedAt: "2026-10-14",
    views: 52874,
    tags: ["jerusalem", "al-quds", "haram al-sharif"],
    credits: CREDIT,
  },
];
