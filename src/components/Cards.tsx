import Link from "next/link";
import { thumbOf, youtubeUrl } from "@/content";
import { formatDuration } from "@/lib/format";
import { asset } from "@/lib/site";
import type { Video } from "@/lib/types";
import { Icon } from "./Icons";

/** Link to a video: YouTube videos open YouTube in a new tab, others go to their page on this site. */
export function VideoLink({ video, className, children }: { video: Video; className?: string; children: React.ReactNode }) {
  const yt = youtubeUrl(video);
  if (yt) {
    return (
      <a href={yt} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/videos/${video.slug}`} prefetch={false} className={className}>
      {children}
    </Link>
  );
}

/** A video card: poster, duration and title. */
export function VideoCard({ video }: { video: Video }) {
  return (
    <VideoLink video={video} className="group block rounded-2xl focus-visible:outline-none">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line transition group-hover:shadow-lg group-hover:shadow-brand/10 group-hover:ring-brand-ink/40 group-focus-visible:ring-2 group-focus-visible:ring-brand-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(thumbOf(video))}
          decoding="async"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute right-2.5 bottom-2.5 rounded-md bg-black/65 px-1.5 py-0.5 text-xs text-white tabular-nums">
          {formatDuration(video.duration)}
        </span>
        <span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
          <span className="grid size-14 place-items-center rounded-full bg-white/90 text-brand shadow-lg">
            <Icon name="play" size={24} />
          </span>
        </span>
      </div>
      <div className="mt-3 px-0.5">
        <h3 className="text-[0.95rem] leading-snug font-semibold text-balance transition group-hover:text-brand-ink">{video.title}</h3>
      </div>
    </VideoLink>
  );
}

export function VideoGrid({ videos }: { videos: Video[] }) {
  if (videos.length === 1) {
    // A single video sits in the middle instead of in the first grid column.
    return (
      <div className="mx-auto w-full max-w-xl">
        <VideoCard video={videos[0]} />
      </div>
    );
  }
  return (
    <div className="grid-cards">
      {videos.map((v) => (
        <VideoCard key={v.slug} video={v} />
      ))}
    </div>
  );
}
