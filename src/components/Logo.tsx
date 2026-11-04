import { asset, site } from "@/lib/site";

// Pixel sizes of the files written by scripts/make-brand.mjs, so the browser reserves space before they load.
const LOGO = { width: 1134, height: 826 };
const MARK = { width: 1134, height: 658 };

/** The full VR Islam logo (headset and wordmark). Size it with a height class. */
export function Logo({ className = "h-16" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset("/brand/logo.png")} alt={site.name} {...LOGO} className={`w-auto ${className}`} />;
}

/** The headset mark alone. `onDark` gives the version for use over video. */
export function LogoMark({ className = "h-9", onDark = false }: { className?: string; onDark?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(`/brand/${onDark ? "mark-on-dark" : "mark"}.png`)} alt="" {...MARK} className={`w-auto ${className}`} />;
}
