<?php
/*
 * Chrome-less player for embedding on other websites via <iframe>.
 * Expects $video (set by the router).
 */
page_start(['title' => $video['title'], 'noindex' => true, 'bare' => true]);
?>
<div class="fixed inset-0 bg-black">
    <?php if (isset($video['youtube'])) { ?>
        <iframe class="absolute inset-0 h-full w-full" src="https://www.youtube-nocookie.com/embed/<?= e($video['youtube']) ?>?rel=0&amp;modestbranding=1"
                title="<?= e($video['title']) ?>" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
    <?php } else { ?>
        <video src="<?= e(url($video['file'])) ?>" poster="<?= e(url($video['poster'])) ?>" controls playsinline class="h-full w-full"></video>
    <?php } ?>
    <a href="<?= e(url('/videos/' . $video['slug'] . '/')) ?>" target="_blank"
       class="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 py-1 pr-3 pl-1.5 text-xs text-white backdrop-blur hover:bg-black/75">
        <?php logo_mark('h-5', true) ?> Watch on <?= e(site()['name']) ?>
    </a>
</div>
<?php page_end(['bare' => true]);
