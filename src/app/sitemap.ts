import type { MetadataRoute } from "next";
import { videos, youtubeUrl } from "@/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    // YouTube videos have no page of their own here; they open on YouTube.
    ...videos.filter((v) => !youtubeUrl(v)).map((v) => ({ url: `${site.url}/videos/${v.slug}/`, lastModified: v.publishedAt, priority: 0.8 })),
  ];
}
