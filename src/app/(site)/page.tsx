import { Banner } from "@/components/Banner";
import { VideoGrid } from "@/components/Cards";
import { videos } from "@/content";

export default function HomePage() {
  return (
    <>
      <Banner />

      <section id="views" aria-labelledby="views-title" className="wrap mt-[var(--section-gap)] scroll-mt-4">
        <h2 id="views-title" className="t-section mb-6">
          360° Videos
        </h2>
        <VideoGrid videos={videos} />
      </section>
    </>
  );
}
