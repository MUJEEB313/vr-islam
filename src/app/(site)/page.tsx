import Link from "next/link";
import { CollectionCard, SectionHeading, ShrineCard, VideoRail } from "@/components/Cards";
import { ContinueWatching } from "@/components/ContinueWatching";
import { Hero } from "@/components/Hero";
import { Icon, type IconName } from "@/components/Icons";
import { OccasionBanner } from "@/components/OccasionBanner";
import { Rail } from "@/components/Rail";
import { collections, getVideo, latestVideos, popularVideos, shrines, videos } from "@/content";

const DEVICES: { icon: IconName; title: string; body: string }[] = [
  { icon: "phone", title: "Phone", body: "Turn on motion control and move your phone to look around the shrine." },
  { icon: "headset", title: "VR headset", body: "Open the site in Meta Quest or Vision Pro and tap “Enter VR” for full immersion." },
  { icon: "monitor", title: "Computer", body: "Drag with the mouse or use the arrow keys. Scroll to zoom in on the tilework." },
];

export default function HomePage() {
  const hero = getVideo("night-at-the-haram-of-imam-husayn") ?? videos[0];
  return (
    <>
      <Hero video={hero} />

      <div className="wrap mt-6">
        <OccasionBanner />
      </div>

      <ContinueWatching />

      <section className="wrap mt-16">
        <SectionHeading eyebrow="Curated journeys" title="Collections" href="/collections" />
        <div className="grid-split">
          {collections.slice(0, 3).map((c) => (
            <CollectionCard key={c.slug} collection={c} />
          ))}
        </div>
      </section>

      <section className="wrap mt-16">
        <SectionHeading eyebrow="Virtual ziyarat" title="Visit the holy shrines" href="/shrines" linkLabel="All shrines" />
        <Rail label="Shrines" tiles>
          {shrines.map((s) => (
            <div key={s.slug}>
              <ShrineCard shrine={s} />
            </div>
          ))}
        </Rail>
      </section>

      <section className="wrap mt-16">
        <SectionHeading eyebrow="Just added" title="New in 360°" href="/videos?sort=newest" />
        <VideoRail label="New videos" videos={latestVideos().slice(0, 8)} />
      </section>

      <section className="wrap mt-16">
        <SectionHeading eyebrow="Most visited" title="Most watched" href="/videos?sort=popular" />
        <VideoRail label="Most watched videos" videos={popularVideos().slice(0, 8)} />
      </section>

      <section className="wrap mt-20">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-[clamp(1rem,3vw,2.5rem)]">
          <div className="bg-girih pointer-events-none absolute inset-0 opacity-[0.05]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-brand-ink uppercase">Any device, no app</p>
              <h2 className="t-section">Three ways to step inside</h2>
              <p className="mt-3 text-muted">Every video plays in the browser you already have. In a headset, the shrine surrounds you, and the trigger plays and pauses.</p>
              <Link href="/how-to-watch" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink hover:underline">
                Read the viewing guide <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-4">
              {DEVICES.map((d) => (
                <div key={d.title} className="rounded-2xl border border-line bg-bg/60 p-5">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-ink/15 text-brand-ink">
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

      <section className="narrow mt-20 text-center">
        <p className="arabic text-[clamp(1.5rem,1.2rem+1.6vw,2.25rem)] leading-[1.9] text-brand-ink">قُل لَّا أَسْأَلُكُمْ عَلَيْهِ أَجْرًا إِلَّا الْمَوَدَّةَ فِي الْقُرْبَىٰ</p>
        <p className="t-card mt-4 font-normal text-fg/90">“Say: I ask of you no reward for it except love for my near kin.”</p>
        <p className="mt-2 text-sm text-muted">Holy Qur&apos;an, Surat al-Shura 42:23</p>
      </section>
    </>
  );
}
