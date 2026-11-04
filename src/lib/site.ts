/**
 * Sub-path the site is served from (e.g. "/my-repo" on GitHub Pages).
 * Set at build time; empty when served from a domain root.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative public file path (e.g. "/media/x.jpg") with the base path. */
export const asset = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);

const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://example.com";

/** Site-wide settings. Rename the site here. */
export const site = {
  name: "VR Islam",
  tagline: "Experience Islam beyond imagination",
  description:
    "Relive history through virtual reality. Explore real stories, visit historic places and feel the experience: 360° and VR views of Masjid al-Haram, Masjid an-Nabawi, Al-Aqsa and the great mosques of the world, in your browser or VR headset.",
  /** Scheme + host, e.g. "https://name.github.io". Set NEXT_PUBLIC_SITE_ORIGIN at build time. */
  origin,
  /** Full public URL of the site root, including the base path. */
  url: `${origin}${basePath}`,
  contact: {
    phone: "(+91) 89763 80690",
    phoneHref: "tel:+918976380690",
    email: "info@arbaeenmemories.com",
  },
};
