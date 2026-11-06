import { Icon, type IconName } from "./Icons";
import { LogoMark } from "./Logo";

const DEVICES: { icon: IconName; title: string; body: string }[] = [
  { icon: "headset", title: "VR headset", body: "Open the site in Meta Quest or Vision Pro and tap “Enter VR” for full immersion." },
  { icon: "phone", title: "Android", body: "Turn on motion control and move your Android phone to look around the mosque." },
];

/** "App, headset or Android" guide, shown above the footer on every page. */
export function WaysToWatch() {
  return (
    <section aria-labelledby="vr-title" className="wrap mt-[var(--section-gap)]">
      <div className="fold-flat relative overflow-hidden rounded-3xl border border-line bg-surface p-[clamp(1.25rem,3vw,2.5rem)]">
        <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="fold-cols relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-brand-ink uppercase">App, headset or Android</p>
            <h2 id="vr-title" className="t-section">
              Three ways to step inside
            </h2>
            <p className="mt-3 text-muted">
              For the most immersive experience, watch in the <strong className="font-semibold text-fg">VR ISLAM app</strong>. Or play any video right here in
              your browser: in a headset, the mosque surrounds you, and the trigger plays and pauses.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-4">
            <div className="rounded-2xl border-2 border-brand/40 bg-brand/5 p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-white ring-1 ring-brand/20">
                <LogoMark className="h-6" />
              </span>
              <h3 className="mt-4 font-semibold text-brand-ink">VR ISLAM app</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">Watch every video in full immersion with the VR ISLAM app.</p>
            </div>
            {DEVICES.map((d) => (
              <div key={d.title} className="rounded-2xl border border-line bg-bg/60 p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand-ink">
                  <Icon name={d.icon} size={22} />
                </span>
                <h3 className="mt-4 font-medium">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
