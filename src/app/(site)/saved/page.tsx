import type { Metadata } from "next";
import { SavedLibrary } from "@/components/SavedLibrary";

export const metadata: Metadata = { title: "Saved", robots: { index: false } };

export default function SavedPage() {
  return (
    <div className="wrap pt-8">
      <p className="text-xs font-semibold tracking-[0.2em] text-brand-ink uppercase">Your library</p>
      <h1 className="t-page mt-1">Saved</h1>
      <SavedLibrary />
    </div>
  );
}
