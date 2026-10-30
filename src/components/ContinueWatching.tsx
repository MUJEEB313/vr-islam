"use client";

import { videos } from "@/content";
import { useProgress } from "@/lib/storage";
import { SectionHeading, VideoCard } from "./Cards";

/** "Continue watching" rail; renders nothing for first-time visitors. */
export function ContinueWatching() {
  const progress = useProgress();
  const items = Object.entries(progress)
    .sort((a, b) => b[1].at - a[1].at)
    .map(([slug, p]) => ({ video: videos.find((v) => v.slug === slug), p }))
    .filter((x) => x.video)
    .slice(0, 4);
  if (!items.length) return null;
  return (
    <section className="wrap mt-16">
      <SectionHeading eyebrow="Pick up where you left off" title="Continue watching" href="/saved" linkLabel="Your library" />
      <div className="grid-cards">
        {items.map(({ video, p }) => (
          <VideoCard key={video!.slug} video={video!} progress={p.t / p.d} />
        ))}
      </div>
    </section>
  );
}
