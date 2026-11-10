<?php
/*
 * A video's own page. YouTube videos have no page here: the address forwards to YouTube.
 * Other videos ('file') play in a standard video player.
 * Expects $video (set by the router).
 */
$yt = youtube_url($video);
if ($yt) {
    header('Location: ' . $yt, true, 302);
    exit;
}

page_start([
    'title' => $video['title'],
    'description' => $video['summary'],
    'path' => '/videos/' . $video['slug'] . '/',
    'image' => $video['poster'],
    'og_type' => 'video.other',
]);
?>
<div class="wrap fold-left pt-4 pb-5">
    <a href="<?= e(url('/#views')) ?>" class="-my-2 mb-2 inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-brand-ink"><?= icon('chevronLeft', 16) ?> All 360° videos</a>
    <h1 class="t-page"><?= e($video['title']) ?></h1>
    <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
        <span class="flex items-center gap-1.5"><?= icon('clock', 16) ?> <?= e(format_duration($video['duration'])) ?></span>
        <span class="flex items-center gap-1.5"><?= icon('eye', 16) ?> <?= e(format_views($video['views'])) ?> views</span>
        <span class="flex items-center gap-1.5"><?= icon('map', 16) ?> <?= e($video['location']) ?></span>
        <span><?= e(format_date($video['published_at'])) ?></span>
    </div>
</div>
<div class="watch-frame watch-frame-flat overflow-hidden bg-black">
    <video src="<?= e(url($video['file'])) ?>" poster="<?= e(url($video['poster'])) ?>" controls playsinline preload="metadata" class="h-full w-full"></video>
</div>
<div class="wrap mt-5">
    <div class="max-w-3xl space-y-4 leading-relaxed text-fg/90">
        <p class="text-lg"><?= e($video['summary']) ?></p>
        <p class="whitespace-pre-line text-muted"><?= e($video['description']) ?></p>
    </div>
</div>
<?php page_end();
