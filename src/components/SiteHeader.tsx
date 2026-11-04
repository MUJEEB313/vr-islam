import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

/** Logo in the centre, nothing else. */
export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface pt-[env(safe-area-inset-top)]">
      <div className="wrap fold-left flex justify-center py-3 short:py-1.5">
        <Link href="/" aria-label={`${site.name} home`} className="rounded-lg">
          <Logo className="h-16 sm:h-20 short:h-12" />
        </Link>
      </div>
    </header>
  );
}
