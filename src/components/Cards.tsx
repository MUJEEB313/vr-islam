import Link from "next/link";
import { thumbOf } from "@/content";
import { formatDuration, formatLabel, formatViews } from "@/lib/format";
import { asset } from "@/lib/site";
import type { Video } from "@/lib/types";
import { Icon } from "./Icons";

/** A 360° view card: poster, format badge, duration, title and place. */
export function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/videos/${video.slug}`} prefetch={false} className="group block rounded-2xl focus-visible:outline-none">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line transition group-hover:shadow-lg group-hover:shadow-brand/10 group-hover:ring-brand-ink/40 group-focus-visible:ring-2 group-focus-visible:ring-brand-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(thumbOf(video))} decoding="async" alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-brand-ink shadow-sm">
          {formatLabel[video.format]}
        </span>
        <span className="absolute right-2.5 bottom-2.5 rounded-md bg-black/65 px-1.5 py-0.5 text-xs text-white tabular-nums">{formatDuration(video.duration)}</span>
        <span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
          <span className="grid size-14 place-items-center rounded-full bg-white/90 text-brand shadow-lg">
            <Icon name="play" size={24} />
          </span>
        </span>
      </div>
      <div className="mt-3 px-0.5">
        <h3 className="text-[0.95rem] leading-snug font-semibold text-balance transition group-hover:text-brand-ink">{video.title}</h3>
        <p className="mt-1 text-xs text-muted">
          {video.location} · {formatViews(video.views)} views
        </p>
      </div>
    </Link>
  );
}

export function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid-cards">
      {videos.map((v) => (
        <VideoCard key={v.slug} video={v} />
      ))}
    </div>
  );
}
