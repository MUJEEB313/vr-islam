/**
 * Sub-path the site is served from (e.g. "/my-repo" on GitHub Pages).
 * Set at build time; empty when served from a domain root.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative public file path (e.g. "/media/x.jpg") with the base path. */
export const asset = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);

const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://example.com";
const youtube = "https://www.youtube.com/@vrIslamofficial";

/** Site-wide settings. Rename the site here. */
export const site = {
  name: "VR ISLAM",
  tagline: "Experience Islam beyond imagination",
  // From the YouTube channel's description.
  description: "Experience Islam Beyond Imagination. Relive History Through Virtual Reality. Don't Just Learn History. Experience It.",
  /** Scheme + host, e.g. "https://name.github.io". Set NEXT_PUBLIC_SITE_ORIGIN at build time. */
  origin,
  /** Full public URL of the site root, including the base path. */
  url: `${origin}${basePath}`,
  contact: {
    phone: "(+91) 89763 80690",
    phoneHref: "tel:+918976380690",
    email: "info@arbaeenmemories.com",
    youtube,
    youtubeHandle: "@vrIslamofficial",
    instagram: [
      { label: "Arbaeen Memories", href: "https://www.instagram.com/arbaeenmemories?cplk=N2NhdjJscnRwOGJo" },
      { label: "VR ISLAM", href: "https://www.instagram.com/vrislamofficial?obrf=MWh3MGtrYW1seHducg==" },
    ],
  },
  /** Sister projects in the footer. Without `href` an entry is plain text, shown with a "#" in front. */
  initiatives: [
    { name: "www.arbaeenmemories.com", href: "https://arbaeenmemories.com" },
    { name: "www.vrislam.com", href: "https://www.vrislam.com" },
    { name: "www.yakeenmedia" },
  ] as { name: string; href?: string }[],
};
