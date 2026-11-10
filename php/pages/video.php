<?php
/*
 * A video's own page: title on top, the player at full width, then the description and the app.
 * YouTube videos play here through the YouTube player (assets/js/youtube-player.js);
 * other videos ('file') play in a standard video player.
 * Expects $video (set by the router).
 */
$site = site();
$yt = youtube_url($video);
$others = array_values(array_filter(latest_videos(), fn($v) => $v['slug'] !== $video['slug']));

// Search engines: describe the video (VideoObject).
$jsonLd = [
    '@context' => 'https://schema.org',
    '@type' => 'VideoObject',
    'name' => $video['title'],
    'description' => $video['summary'],
    'thumbnailUrl' => [absolute_url($video['poster'])],
    'uploadDate' => $video['published_at'],
    'duration' => sprintf('PT%dM%dS', intdiv($video['duration'], 60), $video['duration'] % 60),
    'embedUrl' => isset($video['youtube']) ? 'https://www.youtube.com/embed/' . $video['youtube'] : absolute_url('/embed/' . $video['slug'] . '/'),
    'url' => absolute_url('/videos/' . $video['slug'] . '/'),
];

page_start([
    'title' => $video['title'],
    'description' => $video['summary'],
    'path' => '/videos/' . $video['slug'] . '/',
    'image' => $video['poster'],
    'og_type' => 'video.other',
    'head' => ($yt ? '<link rel="preconnect" href="https://www.youtube-nocookie.com"><link rel="preconnect" href="https://www.youtube.com">' : '')
        . '<script type="application/ld+json">' . json_encode($jsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) . '</script>',
    'scripts' => $yt ? ['/assets/js/youtube-player.js'] : [],
]);
?>
<div class="wrap fold-left pt-4 short:pt-2">
    <div class="watch-col @container">
        <a href="<?= e(url('/#views')) ?>" class="-my-2 mb-2 inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-brand-ink"><?= icon('chevronLeft', 16) ?> All 360° videos</a>
        <h1 class="t-page text-[clamp(1.375rem,1.1rem+1vw,2rem)]"><?= e($video['title']) ?></h1>
        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span class="flex items-center gap-1.5"><?= icon('clock', 16) ?> <?= e(format_duration($video['duration'])) ?></span>
            <span class="flex items-center gap-1.5"><?= icon('map', 16) ?> <?= e($video['location']) ?></span>
            <span><?= e(format_date($video['published_at'])) ?></span>
        </div>

        <div class="watch-player mt-5 short:mt-3">
            <?php if ($yt) { ?>
                <div class="yt-player" data-video-id="<?= e($video['youtube']) ?>" data-title="<?= e($video['title']) ?>" data-watch-url="<?= e($yt) ?>">
                    <button type="button" class="yt-start group block cursor-pointer" aria-label="Play: <?= e($video['title']) ?>">
                        <img src="<?= e(url($video['poster'])) ?>" alt="" class="absolute inset-0 h-full w-full object-cover" fetchpriority="high">
                        <span class="absolute inset-0 bg-black/10 transition group-hover:bg-black/0"></span>
                        <span class="absolute inset-0 grid place-items-center">
                            <span class="grid size-[clamp(3.5rem,8vw,5.5rem)] place-items-center rounded-full bg-brand text-white shadow-2xl ring-4 ring-white/70 transition group-hover:scale-105 group-hover:bg-brand-strong">
                                <span class="yt-spinner size-8 animate-spin rounded-full border-4 border-white/40 border-t-white"></span>
                                <span class="[.yt-player[data-state=loading]_&]:hidden"><?= icon('play', 34) ?></span>
                            </span>
                        </span>
                    </button>
                    <noscript>
                        <iframe src="https://www.youtube-nocookie.com/embed/<?= e($video['youtube']) ?>?rel=0" title="<?= e($video['title']) ?>" referrerpolicy="strict-origin-when-cross-origin"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                    </noscript>
                </div>
            <?php } else { ?>
                <video src="<?= e(url($video['file'])) ?>" poster="<?= e(url($video['poster'])) ?>" controls playsinline preload="metadata" class="absolute inset-0 h-full w-full"></video>
            <?php } ?>
        </div>

        <div class="mt-8 grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_320px]">
            <article class="space-y-4 leading-relaxed text-fg/90">
                <p class="text-lg"><?= e($video['summary']) ?></p>
                <p class="whitespace-pre-line text-muted"><?= e($video['description']) ?></p>
            </article>

            <aside class="space-y-6">
                <div class="rounded-2xl border-2 border-brand/40 bg-brand/5 p-5">
                    <span class="grid size-11 place-items-center rounded-xl bg-white ring-1 ring-brand/20"><?php logo_mark('h-6') ?></span>
                    <h2 class="mt-4 font-semibold text-brand-ink">Watch in full 360° VR</h2>
                    <p class="mt-1.5 text-sm leading-relaxed text-muted">Step inside the full experience with the VR ISLAM app.</p>
                    <?php download_button('md', 'Download APK', 'mt-4') ?>
                    <?php download_meta('mt-2') ?>
                </div>

                <?php if ($others) { ?>
                    <div>
                        <h2 class="mb-4 text-xs font-semibold tracking-[0.18em] text-muted uppercase">Up next</h2>
                        <ul class="space-y-4">
                            <?php foreach (array_slice($others, 0, 6) as $v) { ?>
                                <li>
                                    <a href="<?= e(url('/videos/' . $v['slug'] . '/')) ?>" class="group flex gap-3">
                                        <span class="relative aspect-video w-[42%] max-w-40 shrink-0 overflow-hidden rounded-xl bg-surface-2 ring-1 ring-line">
                                            <img src="<?= e(url(thumb_of($v))) ?>" alt="" loading="lazy" class="h-full w-full object-cover transition group-hover:scale-105">
                                            <span class="absolute right-1.5 bottom-1.5 rounded bg-black/70 px-1 text-[11px] text-white tabular-nums"><?= e(format_duration($v['duration'])) ?></span>
                                        </span>
                                        <span class="line-clamp-2 min-w-0 text-sm leading-snug font-medium group-hover:text-brand-ink"><?= e($v['title']) ?></span>
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                <?php } ?>
            </aside>
        </div>
    </div>
</div>
<?php page_end(['scripts' => $yt ? ['/assets/js/youtube-player.js'] : []]);
