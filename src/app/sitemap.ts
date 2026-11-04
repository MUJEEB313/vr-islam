import type { MetadataRoute } from "next";
import { videos } from "@/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    ...videos.map((v) => ({ url: `${site.url}/videos/${v.slug}/`, lastModified: v.publishedAt, priority: 0.8 })),
  ];
}
