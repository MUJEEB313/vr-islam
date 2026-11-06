import Link from "next/link";
import { latestVideos, thumbOf } from "@/content";
import { asset, site } from "@/lib/site";
import { VideoLink } from "./Cards";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

/** Four columns: logo and description | latest videos | our initiatives | contact. */
export function SiteFooter() {
  const { phone, phoneHref, email, youtube, youtubeHandle, instagram } = site.contact;
  return (
    <footer className="mt-[var(--section-gap)] border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="wrap fold-cols grid gap-x-10 gap-y-10 py-12 sm:grid-cols-[auto_auto] sm:justify-between lg:flex lg:justify-between">
        <div>
          <Link href="/" aria-label={`${site.name} home`} className="inline-block rounded-lg">
            <Logo className="h-16" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            <span className="block">Experience Islam beyond imagination.</span>
            <span className="block">Relive history through virtual reality.</span>
            <span className="block">Don&apos;t just learn history.</span>
            <span className="block">Experience it.</span>
          </p>
        </div>

        <FooterCol title="Collection" className="lg:max-w-xs">
          <ul className="space-y-3">
            {latestVideos(3).map((v) => (
              <li key={v.slug}>
                <VideoLink video={v} className="group flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(thumbOf(v))} alt="" loading="lazy" className="aspect-video w-20 shrink-0 rounded-lg object-cover ring-1 ring-line" />
                  <span className="line-clamp-2 text-sm leading-snug text-fg/85 transition group-hover:text-brand-ink">{v.title}</span>
                </VideoLink>
              </li>
            ))}
          </ul>
        </FooterCol>

        <FooterCol title="Our initiative" className="lg:shrink-0">
          <ul className="space-y-2.5 text-sm text-fg/85">
            {site.initiatives.map(({ name, href }) => (
              <li key={name} className="flex items-center gap-2 break-all">
                <span className="size-1.5 shrink-0 rotate-45 bg-brand" aria-hidden="true" />
                {href?.startsWith("/") ? (
                  <Link href={href} className="transition hover:text-brand-ink">
                    {name}
                  </Link>
                ) : href?.startsWith("#") ? (
                  <a href={href} className="transition hover:text-brand-ink">
                    {name}
                  </a>
                ) : href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="transition hover:text-brand-ink">
                    {name}
                  </a>
                ) : (
                  <span>#{name}</span>
                )}
              </li>
            ))}
          </ul>
        </FooterCol>

        <FooterCol title="Contact" className="lg:shrink-0">
          <address className="flex flex-col items-start text-sm not-italic">
            <a href={phoneHref} className="-my-1 inline-flex h-10 items-center gap-2 text-fg/85 transition hover:text-brand-ink">
              <Icon name="call" size={18} className="text-brand" /> {phone}
            </a>
            <a href={`mailto:${email}`} className="-my-1 inline-flex h-10 items-center gap-2 break-all text-fg/85 transition hover:text-brand-ink">
              <Icon name="mail" size={18} className="shrink-0 text-brand" /> {email}
            </a>
            <a
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="-my-1 inline-flex h-10 items-center gap-2 text-fg/85 transition hover:text-brand-ink"
            >
              <Icon name="youtube" size={18} className="text-brand" /> {youtubeHandle}
            </a>
            {instagram.map((ig) => (
              <a
                key={ig.href}
                href={ig.href}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-1 inline-flex h-10 items-center gap-2 text-fg/85 transition hover:text-brand-ink"
              >
                <Icon name="instagram" size={18} className="text-brand" /> {ig.label}
              </a>
            ))}
          </address>
        </FooterCol>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">
        <span className="fold-left block">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="transition hover:text-brand-ink hover:underline">
            {site.name}
          </Link>
        </span>
      </p>
    </footer>
  );
}

function FooterCol({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="mb-4 text-xs font-semibold tracking-[0.18em] text-brand-ink uppercase">{title}</h2>
      {children}
    </div>
  );
}
