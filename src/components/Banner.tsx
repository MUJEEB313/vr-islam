import { asset } from "@/lib/site";
import { Icon, type IconName } from "./Icons";

// A curved row of views, like a panorama wrapping around someone in a headset.
const PANELS = [
  { file: "masjid-an-nabawi", turn: 38, hide: true },
  { file: "dome-of-the-rock", turn: 22, hide: false },
  { file: "masjid-al-haram", turn: 0, hide: false },
  { file: "sultan-ahmed-mosque", turn: -22, hide: false },
  { file: "badshahi-mosque", turn: -38, hide: true },
];

const PILLARS: { icon: IconName; title: string; text: string }[] = [
  { icon: "book", title: "Explore", text: "Real stories" },
  { icon: "mosque", title: "Visit", text: "Historic places" },
  { icon: "people", title: "Feel", text: "The experience" },
];

/** Home banner: a full-width rectangle. Text and imagery only, no buttons. */
export function Banner() {
  return (
    <section aria-label="Welcome" className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white via-[#eef5ff] to-[#d9e8fb]">
      <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-[#5cbbff]/25 blur-3xl" />

      <div className="wrap relative flex flex-col items-center pt-[clamp(1.5rem,4vw,2.75rem)] pb-[clamp(1.25rem,3vw,2rem)] text-center">
        <h1 className="font-display leading-[1.05] font-bold tracking-[0.02em] uppercase">
          <span className="block text-[clamp(1.6rem,1rem+3vw,3.4rem)] text-brand">Experience Islam</span>
          <span className="mt-1 block text-[clamp(1.05rem,0.75rem+1.6vw,2.05rem)] font-semibold tracking-[0.12em] text-navy">Beyond imagination</span>
        </h1>
        <div className="mt-3 h-px w-[min(28rem,80%)] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        <p className="mt-3 text-[clamp(0.68rem,0.6rem+0.45vw,0.95rem)] font-medium tracking-[0.22em] text-muted uppercase">Relive history through virtual reality</p>

        <div className="mt-[clamp(1rem,3vw,1.75rem)] flex w-full justify-center [perspective:900px]" aria-hidden="true">
          {PANELS.map((p) => (
            <div
              key={p.file}
              className={`-mx-[1.5%] w-[clamp(7.5rem,20vw,15.5rem)] shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-xl shadow-brand/15 ${p.hide ? "hidden sm:block" : ""}`}
              style={{ transform: `rotateY(${p.turn}deg) scale(${p.turn ? 0.94 : 1})`, zIndex: 10 - Math.abs(p.turn) / 10 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(`/media/placeholder/posters/${p.file}-thumb.jpg`)} alt="" className="aspect-[4/3] w-full object-cover" />
            </div>
          ))}
        </div>

        <ul className="mt-[clamp(1.25rem,3vw,2rem)] grid w-full max-w-3xl grid-cols-3 divide-x divide-line">
          {PILLARS.map((p) => (
            <li key={p.title} className="flex flex-col items-center px-2">
              <span className="grid size-[clamp(2.6rem,2rem+2vw,3.5rem)] place-items-center rounded-full border-2 border-brand bg-white text-brand shadow-sm">
                <Icon name={p.icon} size={22} />
              </span>
              <span className="mt-2 font-display text-[clamp(0.8rem,0.7rem+0.5vw,1.05rem)] font-semibold tracking-[0.12em] text-navy uppercase">{p.title}</span>
              <span className="text-[clamp(0.62rem,0.58rem+0.3vw,0.8rem)] tracking-[0.12em] text-muted uppercase">{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
