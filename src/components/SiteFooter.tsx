import { site } from "@/lib/site";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

/** Simple footer: the logo in the centre, contact details and a copyright line. */
export function SiteFooter() {
  const { phone, phoneHref, email } = site.contact;
  return (
    <footer className="mt-16 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="wrap flex flex-col items-center gap-4 py-10 text-center">
        <Logo className="h-14 sm:h-16" />
        <address className="flex flex-wrap justify-center gap-x-6 text-sm not-italic">
          <a href={phoneHref} className="inline-flex h-11 items-center gap-2 text-fg/85 transition hover:text-brand-ink">
            <Icon name="call" size={18} className="text-brand" /> {phone}
          </a>
          <a href={`mailto:${email}`} className="inline-flex h-11 items-center gap-2 text-fg/85 transition hover:text-brand-ink">
            <Icon name="mail" size={18} className="text-brand" /> {email}
          </a>
        </address>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
