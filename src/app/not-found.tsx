import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
        <LogoMark className="h-16" />
        <h1 className="t-page mt-4">This page could not be found</h1>
        <p className="mt-3 text-muted">The page you are looking for may have moved. Try the library or search with ⌘K.</p>
        <Link href="/videos" className="mt-8 inline-flex h-11 items-center rounded-full bg-brand px-6 font-semibold text-white">
          Browse the library
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
