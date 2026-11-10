<?php
$videos = videos();
$single = count($videos) === 1;

page_start(['path' => '/']);
banner();
?>
<section aria-labelledby="intro-title" class="wrap fold-left mt-[var(--section-gap)]">
    <div class="mx-auto max-w-3xl text-center">
        <h1 id="intro-title" class="t-section">Experience Islam Through Virtual Reality</h1>
        <div class="mt-4 space-y-3 leading-relaxed text-muted">
            <p>
                Discover a new way to explore Islamic history and current events with VR ISLAM. Through immersive virtual reality experiences and 360° videos,
                visitors can explore historically significant Islamic history, current affairs and connect with real Islam.
            </p>
            <p>
                VR ISLAM brings history closer through digital experiences that combine technology, visual storytelling and educational exploration. Whether you
                are using a VR headset, smartphone or desktop browser, you can discover Islamic heritage from a new perspective.
            </p>
            <p class="font-medium text-fg">Don&apos;t just learn about history. Experience it through virtual reality.</p>
        </div>
        <div class="mt-6 flex flex-col items-center">
            <?php download_button('lg', 'Download the VR ISLAM app') ?>
            <?php download_meta('mt-2') ?>
        </div>
    </div>
</section>

<section id="views" aria-labelledby="views-title" class="wrap mt-[var(--section-gap)] scroll-mt-4<?= $single ? ' fold-left' : '' ?>">
    <h2 id="views-title" class="t-section mb-6<?= $single ? ' text-center' : '' ?>">360° Videos</h2>
    <?php video_grid($videos) ?>
</section>
<?php page_end();
