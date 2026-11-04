import type { MetadataRoute } from "next";
import { asset, basePath, site } from "@/lib/site";

export const dynamic = "force-static";

/** Makes the site installable ("Add to Home Screen") with an app-like, full-screen launch. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: Experience Islam Beyond Imagination`,
    short_name: site.name,
    description: site.description,
    id: `${basePath}/`,
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["education", "lifestyle", "entertainment"],
    icons: [
      { src: asset("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icons/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: asset("/icons/maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
