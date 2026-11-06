import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icons";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { getVideo, relatedVideos, thumbOf, videos, youtubeUrl } from "@/content";
import { formatDate, formatDuration, formatViews } from "@/lib/format";
import { asset, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const video = getVideo((await params).slug);
  if (!video) return {};
  return {
    ...(youtubeUrl(video) ? { robots: { index: false } } : {}),
    title: video.title,
    description: video.summary,
    alternates: { canonical: `${site.url}/videos/${video.slug}/` },
    openGraph: { title: video.title, description: video.summary, type: "video.other", images: [{ url: asset(video.poster), width: 1280, height: 720 }] },
  };
}

export default async function WatchPage({ params }: Props) {
  const video = getVideo((await params).slug);
  if (!video) notFound();
  const yt = youtubeUrl(video);
  if (yt) {
    // Static hosting can't send a server redirect, so the page forwards itself.
    return (
      <>
        <meta httpEquiv="refresh" content={`0; url=${yt}`} />
        <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(yt)})` }} />
        <div className="wrap py-24 text-center">
          <p className="text-muted">Opening on YouTube…</p>
          <a href={yt} className="mt-3 inline-flex h-11 items-center text-sm font-semibold text-brand-ink hover:underline">
            Watch “{video.title}” on YouTube
          </a>
        </div>
      </>
    );
  }
  const related = relatedVideos(video, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [`${site.origin}${asset(video.poster)}`],
    uploadDate: video.publishedAt,
    duration: `PT${Math.floor(video.duration / 60)}M${video.duration % 60}S`,
    embedUrl: `${site.url}/embed/${video.slug}`,
    ...(video.source.type === "file"
      ? { contentUrl: video.source.src.startsWith("http") ? video.source.src : `${site.origin}${asset(video.source.src)}` }
      : {}),
    interactionStatistic: { "@type": "InteractionCounter", interactionType: { "@type": "WatchAction" }, userInteractionCount: video.views },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="watch-page">
        <div className="watch-title wrap fold-left pt-4 pb-5 short:pt-2 short:pb-3">
          <Link href="/#views" className="-my-2 mb-2 inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-brand-ink">
            <Icon name="chevronLeft" size={16} /> All 360° videos
          </Link>
          <h1 className="t-page">{video.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Icon name="clock" size={16} /> {formatDuration(video.duration)}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="eye" size={16} /> {formatViews(video.views)} views
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="map" size={16} /> {video.location}
            </span>
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        </div>
        <div className="watch">
          <div className="watch-stage">
            <div className={`watch-frame overflow-hidden bg-black ${video.format === "flat" ? "watch-frame-flat" : ""}`}>
              <VideoPlayer video={video} className="h-full w-full" />
            </div>
          </div>

          <div className="watch-details @container wrap mt-5">
            <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_360px]">
              <article>
                <div className="max-w-3xl space-y-4 leading-relaxed text-fg/90">
                  <p className="text-lg">{video.summary}</p>
                  <p className="whitespace-pre-line text-muted">{video.description}</p>
                </div>
              </article>

              {related.length > 0 && (
                <aside aria-label="Up next">
                  <h2 className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted uppercase">Up next</h2>
                  <ul className="grid-list">
                    {related.map((v) => (
                      <li key={v.slug}>
                        <Link href={`/videos/${v.slug}`} prefetch={false} className="group flex gap-3">
                          <span className="relative aspect-video w-[42%] max-w-40 shrink-0 overflow-hidden rounded-xl bg-surface-2 ring-1 ring-line">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={asset(thumbOf(v))} alt="" loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
                            <span className="absolute right-1.5 bottom-1.5 rounded bg-black/70 px-1 text-[11px] text-white tabular-nums">
                              {formatDuration(v.duration)}
                            </span>
                          </span>
                          <span className="min-w-0">
                            <span className="line-clamp-2 text-sm leading-snug font-medium group-hover:text-brand-ink">{v.title}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
