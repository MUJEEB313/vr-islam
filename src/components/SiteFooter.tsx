import Link from "next/link";
import { latestVideos, thumbOf } from "@/content";
import { asset, site } from "@/lib/site";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

/** Four columns: logo and description | latest videos | our initiatives | contact. */
export function SiteFooter() {
  const { phone, phoneHref, email, youtube, youtubeHandle } = site.contact;
  return (
    <footer className="mt-16 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-x-10 gap-y-10 py-12 lg:grid-cols-[1.2fr_1.3fr_0.8fr_1fr]">
        <div>
          <Logo className="h-16" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Experience Islam beyond imagination. Relive history through virtual reality. Don&apos;t just learn history. Experience it.
          </p>
        </div>

        <FooterCol title="Collection">
          <ul className="space-y-3">
            {latestVideos(3).map((v) => (
              <li key={v.slug}>
                <Link href={`/videos/${v.slug}`} prefetch={false} className="group flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(thumbOf(v))} alt="" loading="lazy" className="aspect-video w-20 shrink-0 rounded-lg object-cover ring-1 ring-line" />
                  <span className="text-sm leading-snug text-fg/85 transition group-hover:text-brand-ink">{v.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </FooterCol>

        <FooterCol title="Our initiative">
          <ul className="space-y-2.5 text-sm text-fg/85">
            {site.initiatives.map((name) => (
              <li key={name} className="flex items-center gap-2">
                <span className="size-1.5 rotate-45 bg-brand" aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
        </FooterCol>

        <FooterCol title="Contact">
          <address className="flex flex-col items-start text-sm not-italic">
            <a href={phoneHref} className="-my-1 inline-flex h-10 items-center gap-2 text-fg/85 transition hover:text-brand-ink">
              <Icon name="call" size={18} className="text-brand" /> {phone}
            </a>
            <a href={`mailto:${email}`} className="-my-1 inline-flex h-10 items-center gap-2 break-all text-fg/85 transition hover:text-brand-ink">
              <Icon name="mail" size={18} className="shrink-0 text-brand" /> {email}
            </a>
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="-my-1 inline-flex h-10 items-center gap-2 text-fg/85 transition hover:text-brand-ink">
              <Icon name="youtube" size={18} className="text-brand" /> {youtubeHandle}
            </a>
          </address>
        </FooterCol>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-semibold tracking-[0.18em] text-brand-ink uppercase">{title}</h2>
      {children}
    </div>
  );
}
