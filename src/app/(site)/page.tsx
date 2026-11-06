import { Banner } from "@/components/Banner";
import { VideoGrid } from "@/components/Cards";
import { DownloadAppButton, DownloadAppMeta } from "@/components/DownloadApp";
import { videos } from "@/content";

export default function HomePage() {
  return (
    <>
      <Banner />

      <section aria-labelledby="intro-title" className="wrap fold-left mt-[var(--section-gap)]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 id="intro-title" className="t-section">
            Experience Islam Through Virtual Reality
          </h1>
          <div className="mt-4 space-y-3 leading-relaxed text-muted">
            <p>
              Discover a new way to explore Islamic history and current events with VR ISLAM. Through immersive virtual reality experiences and 360° videos,
              visitors can explore historically significant Islamic history, current affairs and connect with real Islam.
            </p>
            <p>
              VR ISLAM brings history closer through digital experiences that combine technology, visual storytelling and educational exploration. Whether you
              are using a VR headset, smartphone or desktop browser, you can discover Islamic heritage from a new perspective.
            </p>
            <p className="font-medium text-fg">Don&apos;t just learn about history. Experience it through virtual reality.</p>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <DownloadAppButton size="lg" label="Download the VR ISLAM app" />
            <DownloadAppMeta className="mt-2" />
          </div>
        </div>
      </section>

      <section id="views" aria-labelledby="views-title" className={`wrap mt-[var(--section-gap)] scroll-mt-4${videos.length === 1 ? " fold-left" : ""}`}>
        <h2 id="views-title" className={`t-section mb-6${videos.length === 1 ? " text-center" : ""}`}>
          360° Videos
        </h2>
        <VideoGrid videos={videos} />
      </section>
    </>
  );
}
