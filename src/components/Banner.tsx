/**
 * Home banner: a small, full-width rectangle with an Islamic geometric
 * pattern and a mosque skyline. Text only, no buttons.
 */
export function Banner() {
  return (
    <section aria-label="Welcome" className="relative overflow-hidden border-b border-line bg-gradient-to-b from-[#eef5ff] to-[#dceafc]">
      <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.13]" />
      <Skyline />
      <div className="wrap relative flex min-h-[clamp(9.5rem,20vw,15rem)] flex-col items-center justify-center pt-6 pb-[clamp(3.5rem,7vw,5.5rem)] text-center">
        <p className="arabic text-center text-[clamp(1.2rem,1rem+1vw,1.75rem)] text-brand-ink">السلام عليكم</p>
        <h1 className="t-banner mt-1 max-w-3xl text-navy">Explore the holy mosques of Islam in 360°</h1>
        <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">Masjid al-Haram, Masjid an-Nabawi, Al-Aqsa and the great mosques of the world, in your browser or VR headset.</p>
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
