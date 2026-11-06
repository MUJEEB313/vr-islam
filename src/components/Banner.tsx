import { Icon, type IconName } from "./Icons";

const PILLARS: { icon: IconName; title: string; text: string }[] = [
  { icon: "book", title: "Explore", text: "Real stories" },
  { icon: "mosque", title: "Visit", text: "Historic places" },
  { icon: "people", title: "Feel", text: "The experience" },
];

/**
 * Home banner: a small, full-width rectangle with an Islamic geometric
 * pattern and a mosque skyline. Text and icons only, no buttons.
 */
export function Banner() {
  return (
    <section aria-label="Welcome" className="relative overflow-hidden border-b border-line bg-gradient-to-b from-[#eef5ff] to-[#dceafc]">
      <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.13]" />
      <Skyline />
      <div className="wrap fold-left relative flex flex-col items-center pt-[clamp(1rem,1.8vw,1.5rem)] pb-[calc(clamp(2.5rem,6vw,4.5rem)*0.725+clamp(1rem,1.8vw,1.5rem))] text-center">
        <h1 className="font-display leading-[1.05] font-bold tracking-[0.02em] uppercase">
          <span className="block text-[clamp(1.5rem,1rem+2.6vw,3rem)] text-brand">Experience Islam</span>
          <span className="mt-1 block text-[clamp(1rem,0.75rem+1.4vw,1.85rem)] font-semibold tracking-[0.12em] text-navy">Beyond imagination</span>
        </h1>
        <div className="mt-3 h-px w-[min(26rem,80%)] bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        <p className="mt-3 text-[clamp(0.66rem,0.6rem+0.4vw,0.9rem)] font-medium tracking-[0.22em] text-muted uppercase">Relive history through virtual reality</p>
        <ul className="mt-[clamp(1rem,2.5vw,1.5rem)] grid w-full max-w-2xl grid-cols-3 divide-x divide-brand/15">
          {PILLARS.map((p) => (
            <li key={p.title} className="flex flex-col items-center px-2">
              <span className="grid size-[clamp(2.25rem,1.9rem+1.4vw,3rem)] place-items-center rounded-full border-2 border-brand bg-white text-brand shadow-sm">
                <Icon name={p.icon} size={20} />
              </span>
              <span className="mt-1.5 font-display text-[clamp(0.75rem,0.68rem+0.4vw,0.95rem)] font-semibold tracking-[0.12em] text-navy uppercase">{p.title}</span>
              <span className="text-[clamp(0.6rem,0.56rem+0.25vw,0.75rem)] tracking-[0.1em] text-muted uppercase">{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A row of domes and minarets along the bottom edge, drawn to repeat across any width. */
function Skyline() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(2.5rem,6vw,4.5rem)] w-full text-brand" preserveAspectRatio="none" viewBox="0 0 1200 80">
      <defs>
        <pattern id="skyline" width="300" height="80" patternUnits="userSpaceOnUse">
          <g fill="currentColor" opacity="0.18">
            {/* Central dome on its drum, with two minarets */}
            <path d="M110 80V52h80v28Z" />
            <path d="M118 52c0-14 10-22 20-27 6-3 10-7 12-13 2 6 6 10 12 13 10 5 20 13 20 27Z" />
            <rect x="148.5" y="2" width="3" height="10" />
            <path d="M92 80V30l3-6 3 6v50Z" />
            <path d="M202 80V30l3-6 3 6v50Z" />
            {/* Smaller domes */}
            <path d="M20 80V64h50v16Z" />
            <path d="M25 64c0-9 8-15 20-17 12 2 20 8 20 17Z" />
            <path d="M232 80V62h52v18Z" />
            <path d="M238 62c0-9 8-15 20-17 12 2 20 8 20 17Z" />
          </g>
        </pattern>
      </defs>
      <rect width="1200" height="80" fill="url(#skyline)" />
    </svg>
  );
}
