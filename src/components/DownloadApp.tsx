import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

/** "Download APK" button for the Android app, used in the intro, the app card and the footer. */
export function DownloadAppButton({ size = "md", label = "Download APK", className = "" }: { size?: "md" | "lg"; label?: string; className?: string }) {
  // The large button may wrap onto two lines on very narrow screens (e.g. fold cover screens).
  const sizing = size === "lg" ? "min-h-12 max-w-full px-6 py-2 text-center text-base" : "h-11 px-4 text-sm whitespace-nowrap pointer-fine:h-10";
  return (
    <a
      href={site.app.apkUrl}
      download
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white shadow-sm transition hover:bg-brand-strong ${sizing} ${className}`}
    >
      <Icon name="download" size={size === "lg" ? 20 : 18} /> {label}
    </a>
  );
}

/** Platform, version, size and a link to the privacy policy, shown under a download button. */
export function DownloadAppMeta({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-muted ${className}`}>
      Android · v{site.app.version} · {site.app.sizeMb} MB ·{" "}
      <Link href="/privacy-policy" className="underline-offset-2 hover:text-brand-ink hover:underline">
        Privacy policy
      </Link>
    </p>
  );
}
