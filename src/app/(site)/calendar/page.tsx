import type { Metadata } from "next";
import { CalendarList } from "@/components/CalendarList";

export const metadata: Metadata = {
  title: "Islamic Calendar",
  description: "Upcoming births, martyrdoms and Eids of the Ahl al-Bayt (a.s.), each linked to its 360° ziyarat.",
};

export default function CalendarPage() {
  return (
    <div className="narrow pt-8">
      <p className="text-xs font-semibold tracking-[0.2em] text-brand-ink uppercase">The year of the Ahl al-Bayt (a.s.)</p>
      <h1 className="t-page mt-1">Islamic calendar</h1>
      <p className="mt-3 text-muted">
        The births, martyrdoms and Eids of the coming year, each linked to a shrine or collection, so you can mark the day with a ziyarat. Dates
        follow the Umm al-Qura calendar. Local moon sighting and differing narrations can shift some dates by a day or more.
      </p>
      <CalendarList />
    </div>
  );
}
