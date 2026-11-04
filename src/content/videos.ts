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
  {
    slug: "al-aqsa-mosque",
    title: "Al-Aqsa Mosque, Jerusalem",
    summary: "The grey-domed mosque at the southern end of the Haram al-Sharif.",
    description:
      "Al-Aqsa Mosque, the first qibla of Islam, stands at the southern end of the Haram al-Sharif. This 360° view looks across the stone courtyard to its arcaded porch and grey dome on a clear day.",
    category: "mosque",
    location: "Jerusalem",
    format: "360-mono",
    source: {
      type: "generated",
      scene: { kind: "courtyard", sky: "day", seed: 204, shrines: [mosque({ dome: "lead", facade: "stone" })], arcade: "stone", inlay: "#7a6a4a", particles: ["pigeons"] },
    },
    poster: poster("al-aqsa-mosque"),
    thumb: thumb("al-aqsa-mosque"),
    duration: 344,
    publishedAt: "2026-10-07",
    views: 47120,
    tags: ["jerusalem", "al-quds", "first qibla"],
    credits: CREDIT,
  },
  {
    slug: "sultan-ahmed-mosque",
    title: "Sultan Ahmed Mosque (The Blue Mosque), Istanbul",
    summary: "Cascading domes and pencil minarets at sunset.",
    description:
      "Built between 1609 and 1616, the Sultan Ahmed Mosque is known for its cascade of domes, its six slender minarets and the blue Iznik tiles of its interior. Stand in its courtyard at sunset as the call to Maghrib approaches.",
    category: "mosque",
    location: "Istanbul, Türkiye",
    format: "360-mono",
    source: {
      type: "generated",
      scene: {
        kind: "courtyard",
        sky: "dusk",
        seed: 205,
        shrines: [mosque({ dome: "lead", facade: "stone", minaretPairs: 2 })],
        sideDomes: [
          { lon: 166, scale: 0.55, color: "lead", facade: "stone", minarets: false },
          { lon: 194, scale: 0.55, color: "lead", facade: "stone", minarets: false },
        ],
        arcade: "stone",
        arcadeDomes: true,
        inlay: "#3a5a7a",
        particles: ["pigeons"],
      },
    },
    poster: poster("sultan-ahmed-mosque"),
    thumb: thumb("sultan-ahmed-mosque"),
    duration: 538,
    publishedAt: "2026-09-30",
    views: 39560,
    tags: ["istanbul", "ottoman", "blue mosque"],
    credits: CREDIT,
  },
  {
    slug: "sheikh-zayed-grand-mosque",
    title: "Sheikh Zayed Grand Mosque, Abu Dhabi",
    summary: "White marble domes lit up at night.",
    description:
      "Opened in 2007, the Sheikh Zayed Grand Mosque is built of white marble and crowned by 82 domes. This night view puts you in its courtyard as the domes and minarets glow under the floodlights.",
    category: "mosque",
    location: "Abu Dhabi, UAE",
    format: "360-mono",
    source: {
      type: "generated",
      scene: {
        kind: "courtyard",
        sky: "night",
        seed: 206,
        shrines: [mosque({ dome: "white", facade: "marble", minaretPairs: 2 })],
        sideDomes: [
          { lon: 150, scale: 0.5, color: "white", facade: "marble", minarets: false },
          { lon: 210, scale: 0.5, color: "white", facade: "marble", minarets: false },
        ],
        arcade: "marble",
        inlay: "#6f9c82",
        particles: [],
      },
    },
    poster: poster("sheikh-zayed-grand-mosque"),
    thumb: thumb("sheikh-zayed-grand-mosque"),
    duration: 430,
    publishedAt: "2026-09-23",
    views: 41877,
    tags: ["abu dhabi", "white marble", "night"],
    credits: CREDIT,
  },
  {
    slug: "badshahi-mosque",
    title: "Badshahi Mosque, Lahore",
    summary: "Red sandstone and white marble domes of the Mughal era.",
    description:
      "Built between 1671 and 1673 under the Mughal emperor Aurangzeb, the Badshahi Mosque is faced with red sandstone and crowned with three white marble domes. Its vast courtyard is one of the largest of any mosque.",
    category: "mosque",
    location: "Lahore, Pakistan",
    format: "360-mono",
    source: {
      type: "generated",
      scene: {
        kind: "courtyard",
        sky: "dusk",
        seed: 207,
        shrines: [mosque({ dome: "white", facade: "sandstone", minaretPairs: 2, minaretColor: "sandstone" })],
        sideDomes: [
          { lon: 166, scale: 0.55, color: "white", facade: "sandstone", minarets: false },
          { lon: 194, scale: 0.55, color: "white", facade: "sandstone", minarets: false },
        ],
        arcade: "sandstone",
        inlay: "#9c4a32",
        particles: ["pigeons"],
      },
    },
    poster: poster("badshahi-mosque"),
    thumb: thumb("badshahi-mosque"),
    duration: 398,
    publishedAt: "2026-09-16",
    views: 33402,
    tags: ["lahore", "mughal", "sandstone"],
    credits: CREDIT,
  },
  {
    slug: "inside-a-mosque",
    title: "Inside a Mosque Prayer Hall",
    summary: "Sit among the worshippers on the carpet, facing the minbar.",
    description:
      "Step inside a mosque prayer hall: rows of carpet, chandeliers overhead and calligraphy along the walls reading “Allahu Akbar”, “SubhanAllah”, “Alhamdulillah” and “La ilaha illallah”. A calm space to learn the layout of a mosque, from the minbar to the prayer rows.",
    category: "interior",
    location: "Prayer hall",
    format: "360-mono",
    source: {
      type: "generated",
      scene: { kind: "hall", seed: 208, banners: ["الله أكبر", "سبحان الله", "الحمد لله", "لا إله إلا الله"], particles: ["motes"] },
    },
    poster: poster("inside-a-mosque"),
    thumb: thumb("inside-a-mosque"),
    duration: 600,
    publishedAt: "2026-09-09",
    views: 28940,
    tags: ["prayer hall", "minbar", "calligraphy"],
    credits: CREDIT,
  },
  {
    slug: "mina-tent-city",
    title: "Mina: The Tent City of Hajj",
    summary: "Walk among pilgrims in ihram between rows of white tents.",
    description:
      "During Hajj, pilgrims stay in Mina, a valley near Makkah filled with rows of white tents. This 360° walk puts you on the road among pilgrims in ihram, with the tents stretching away on both sides and the rocky hills beyond.",
    category: "hajj",
    location: "Mina, near Makkah",
    format: "360-mono",
    source: { type: "generated", scene: { kind: "road", sky: "day", seed: 209, crowd: 340, particles: ["dust"] } },
    poster: poster("mina-tent-city"),
    thumb: thumb("mina-tent-city"),
    duration: 655,
    publishedAt: "2026-09-02",
    views: 36218,
    tags: ["hajj", "mina", "ihram"],
    credits: CREDIT,
  },
  {
    slug: "day-of-arafah",
    title: "The Day of Arafah",
    summary: "Pilgrims gather on the plain of Arafat at dawn.",
    description:
      "On the 9th of Dhu al-Hijjah, pilgrims gather on the plain of Arafat for the most important day of Hajj, spent in prayer and remembrance. Ahead of you is Jabal al-Rahmah, the hill marked by a white pillar.",
    category: "hajj",
    location: "Arafat, near Makkah",
    format: "360-mono",
    source: { type: "generated", scene: { kind: "plain", sky: "dawn", seed: 210, mountains: true, pillarHill: true, crowd: 260, particles: ["dust"] } },
    poster: poster("day-of-arafah"),
    thumb: thumb("day-of-arafah"),
    duration: 720,
    publishedAt: "2026-08-26",
    views: 30115,
    tags: ["hajj", "arafat", "jabal al-rahmah"],
    credits: CREDIT,
  },
];
