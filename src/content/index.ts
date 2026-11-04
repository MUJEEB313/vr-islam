import type { Video } from "@/lib/types";
import { videos } from "./videos";

export { videos };

/** Card-sized image for a video (falls back to the full poster). */
export const thumbOf = (v: Pick<Video, "poster" | "thumb">) => v.thumb ?? v.poster;

export const getVideo = (slug: string) => videos.find((v) => v.slug === slug);

/** Most recently published first. */
export const latestVideos = (n = videos.length) => [...videos].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, n);

/** Related videos: same category first, then most popular. */
export function relatedVideos(video: Video, n = 8) {
  const score = (v: Video) => (v.category === video.category ? 1 : 0) + v.views / 1e7;
  return videos
    .filter((v) => v.slug !== video.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, n);
}
