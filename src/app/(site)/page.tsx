import { Banner } from "@/components/Banner";
import { VideoGrid } from "@/components/Cards";
import { Icon, type IconName } from "@/components/Icons";
import { videos } from "@/content";

const HOW_TO: { icon: IconName; title: string; text: string }[] = [
  { icon: "headset", title: "VR headset", text: "Open this site in the headset's browser, pick a view and tap “Enter VR”." },
  { icon: "phone", title: "Phone", text: "Tap the motion button and move your phone, or drag to look around." },
  { icon: "monitor", title: "Computer", text: "Drag with the mouse or use the arrow keys. Scroll to zoom." },
];

export default function HomePage() {
  return (
    <>
      <Banner />

      <section id="views" aria-labelledby="views-title" className="wrap mt-10 scroll-mt-4">
        <h2 id="views-title" className="t-section mb-6">
          360° views
        </h2>
        <VideoGrid videos={videos} />
      </section>

      <section aria-labelledby="vr-title" className="wrap mt-16">
        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <h2 id="vr-title" className="t-card">
            How to watch
          </h2>
          <ul className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-4">
            {HOW_TO.map((h) => (
              <li key={h.title} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-ink">
                  <Icon name={h.icon} size={18} />
                </span>
                <p className="text-sm leading-relaxed text-fg/85">
                  <strong className="font-semibold text-fg">{h.title}:</strong> {h.text}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted">
            In a headset, stay seated with a clear space around you and take a break every 20–30 minutes.
          </p>
        </div>
      </section>
    </>
  );
}
