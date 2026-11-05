import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WaysToWatch } from "@/components/WaysToWatch";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="fold-left mx-auto flex max-w-xl flex-col items-center px-4 pt-28 pb-4 text-center">
        <h1 className="t-page">This page could not be found</h1>
        <p className="mt-3 text-muted">The page you are looking for may have moved.</p>
        <Link href="/" className="mt-6 inline-flex h-11 items-center text-sm font-semibold text-brand-ink hover:underline">
          Go to the home page
        </Link>
      </main>
      <WaysToWatch />
      <SiteFooter />
    </>
  );
}
