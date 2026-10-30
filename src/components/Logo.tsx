import { asset, site } from "@/lib/site";

const SIZES = {
  lockup: { width: 1392, height: 356 },
  mark: { width: 580, height: 356 },
};

function Img({ file, kind, className }: { file: string; kind: keyof typeof SIZES; className: string }) {
  // Lazy so the variants hidden by CSS (other theme, other screen width) are never downloaded.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(`/brand/${file}.png`)} alt="" loading="lazy" decoding="async" {...SIZES[kind]} className={`w-auto ${className}`} />;
}

/** The headset mark alone. `onDark` forces the light-on-dark version, for use over video. */
export function LogoMark({ className = "h-9", onDark = false }: { className?: string; onDark?: boolean }) {
  if (onDark) return <Img file="mark-on-dark" kind="mark" className={className} />;
  return (
    <>
      <Img file="mark-on-dark" kind="mark" className={`light:hidden ${className}`} />
      <Img file="mark-on-light" kind="mark" className={`hidden light:block ${className}`} />
    </>
  );
}

/** Full VR | ISLAM logo, falling back to the mark alone on very narrow screens. */
export function Logo({ className = "h-9 short:h-8 lg:h-10" }: { className?: string }) {
  return (
    <span role="img" aria-label={site.name} className="flex items-center">
      <Img file="logo-on-dark" kind="lockup" className={`hidden xs:block light:xs:hidden ${className}`} />
      <Img file="logo-on-light" kind="lockup" className={`hidden light:xs:block ${className}`} />
      <Img file="mark-on-dark" kind="mark" className={`xs:hidden light:hidden ${className}`} />
      <Img file="mark-on-light" kind="mark" className={`hidden light:block light:xs:hidden ${className}`} />
    </span>
  );
}
