import Link from "next/link";
import { getShrine } from "@/content";
import type { Video } from "@/lib/types";
import { Icon } from "./Icons";
import { HeroScene } from "./HeroScene";

/** Full-width hero with a live, slowly turning 360° scene behind the copy. */
export function Hero({ video }: { video: Video }) {
  const shrine = getShrine(video.shrine);
  return (
    <section className="wrap-wide relative">
      <div className="hero-frame relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] ring-1 ring-line">
        <HeroScene video={video} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020c1f]/90 via-[#020c1f]/25 to-black/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020c1f]/75 via-[#020c1f]/15 to-transparent" />
        <div className="hero-copy pointer-events-none absolute bottom-0 left-0 w-full p-[clamp(1rem,3.2vw,3.5rem)] text-white">
          <p className="arabic mb-2 text-[clamp(1.25rem,1rem+1.3vw,1.9rem)] text-brand-bright [text-shadow:0_1px_10px_rgb(2_12_31/0.9)] short:mb-0 short:text-lg">السَّلامُ عَلَيْكَ يا أبا عَبْدِ الله</p>
          <h1 className="t-hero max-w-[20ch] drop-shadow-lg">
            Stand before the Haram, from anywhere in the world.
          </h1>
          <p className="hero-sub mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/80 sm:mt-4 sm:text-lg">
            360° and VR ziyarat of the holy shrines, the Arbaeen walk and the majalis of Muharram. Watch in your browser, move your phone to look around, or step inside with a headset.
          </p>
          <div className="pointer-events-auto mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center short:mt-3 short:flex-row short:gap-2">
            <Link
              href={`/videos/${video.slug}`}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-brand-strong short:h-11 short:px-5"
            >
              <Icon name="play" size={20} /> Begin virtual ziyarat
            </Link>
            <Link href="/shrines" className="flex h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-6 font-medium ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 short:h-11 short:px-5">
              Explore the shrines
            </Link>
          </div>
          <p className="mt-5 hidden items-center gap-2 text-xs text-white/60 sm:flex short:hidden">
            <Icon name="drag" size={14} /> Drag the scene to look around · Now showing: {shrine?.name ?? video.title}
          </p>
        </div>
      </div>
    </section>
  );
}
