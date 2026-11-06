import type { Video } from "@/lib/types";

/*
 * The videos listed on the site.
 * - YouTube: { type: "youtube", id: "…" } plays in YouTube's own player.
 * - File: { type: "file", src: "…" } plays an equirectangular 360° video in the site's VR player.
 * Posters live in public/media/videos/; run `npm run thumbs` to create each `-thumb.jpg`.
 */

export const videos: Video[] = [
  {
    slug: "jannat-al-baqi",
    // Title and description are taken from the YouTube video.
    title: "Teaser - Jannat-ul-Baqi VR | Experience the Untold History of Baqi | A Journey Through Time",
    summary: "What if you could stand in Jannat-ul-Baqi and witness the history that time could never erase?",
    description: [
      "Experience the sacred cemetery of Jannat-ul-Baqi in Madinah through an immersive Virtual Reality journey.",
      "A place where some of the most beloved members of the Holy Prophet Muhammad's (PBUH & His Family) household rest. A place that holds centuries of Islamic history, sacrifice, love, and remembrance.",
      "Through this VR experience, discover:\n🕌 The historical significance of Jannat-ul-Baqi\n📜 The history of the destruction of the shrines of Baqi\n🤲 The emotional connection of millions of believers with this sacred place",
      "Some places are not just visited. They are felt.",
      "🎥 An immersive experience presented by VR ISLAM. Our Mission: Bringing Islamic History to Life Through Virtual Reality.",
    ].join("\n\n"),
    category: "site",
    location: "Madinah, Saudi Arabia",
    format: "flat",
    source: { type: "youtube", id: "KmqAIfs85J8" },
    poster: "/media/videos/jannat-al-baqi-teaser.jpg",
    thumb: "/media/videos/jannat-al-baqi-teaser-thumb.jpg",
    duration: 36,
    publishedAt: "2026-11-06",
    views: 2,
    tags: ["madinah", "baqi", "teaser"],
  },
];
