<?php
/*
 * Page parts shared across pages. Each function prints its HTML.
 */

/** The full VR ISLAM logo (headset and wordmark). Size it with a height class. */
function logo(string $class = 'h-16'): void
{ ?>
    <img src="<?= e(url('/brand/logo.png')) ?>" alt="<?= e(site()['name']) ?>" width="1134" height="826" class="w-auto <?= e($class) ?>">
<?php }

/** The headset mark alone. $onDark gives the version for use over video. */
function logo_mark(string $class = 'h-9', bool $onDark = false): void
{ ?>
    <img src="<?= e(url('/brand/' . ($onDark ? 'mark-on-dark' : 'mark') . '.png')) ?>" alt="" width="1134" height="658" class="w-auto <?= e($class) ?>">
<?php }

/** "Download APK" button for the Android app (intro, app card and footer). */
function download_button(string $size = 'md', string $label = 'Download APK', string $class = ''): void
{
    // The large button may wrap onto two lines on very narrow screens (e.g. fold cover screens).
    $sizing = $size === 'lg'
        ? 'min-h-12 max-w-full px-6 py-2 text-center text-base'
        : 'h-11 px-4 text-sm whitespace-nowrap pointer-fine:h-10'; ?>
    <a href="<?= e(site()['app']['apk_url']) ?>" download
       class="inline-flex items-center justify-center gap-2 rounded-full bg-brand font-semibold text-white shadow-sm transition hover:bg-brand-strong <?= $sizing ?> <?= e($class) ?>">
        <?= icon('download', $size === 'lg' ? 20 : 18) ?> <?= e($label) ?>
    </a>
<?php }

/** Platform, version, size and a link to the privacy policy, shown under a download button. */
function download_meta(string $class = ''): void
{
    $app = site()['app']; ?>
    <p class="text-xs text-muted <?= e($class) ?>">
        Android · v<?= e($app['version']) ?> · <?= e($app['size_mb']) ?> MB ·
        <a href="<?= e(url('/privacy-policy/')) ?>" class="underline-offset-2 hover:text-brand-ink hover:underline">Privacy policy</a>
    </p>
<?php }

/** Opening tag of a link to a video: YouTube videos open YouTube in a new tab, others their page here. */
function video_link_open(array $video, string $class): string
{
    $yt = youtube_url($video);
    return $yt
        ? '<a href="' . e($yt) . '" target="_blank" rel="noopener noreferrer" class="' . e($class) . '">'
        : '<a href="' . e(url('/videos/' . $video['slug'] . '/')) . '" class="' . e($class) . '">';
}

/** A video card: poster, duration and title. */
function video_card(array $video): void
{ ?>
    <?= video_link_open($video, 'group block rounded-2xl focus-visible:outline-none') ?>
        <div class="relative aspect-video overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line transition group-hover:shadow-lg group-hover:shadow-brand/10 group-hover:ring-brand-ink/40 group-focus-visible:ring-2 group-focus-visible:ring-brand-ink">
            <img src="<?= e(url(thumb_of($video))) ?>" decoding="async" alt="" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]">
            <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
            <span class="absolute right-2.5 bottom-2.5 rounded-md bg-black/65 px-1.5 py-0.5 text-xs text-white tabular-nums"><?= e(format_duration($video['duration'])) ?></span>
            <span class="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
                <span class="grid size-14 place-items-center rounded-full bg-white/90 text-brand shadow-lg"><?= icon('play', 24) ?></span>
            </span>
        </div>
        <div class="mt-3 px-0.5">
            <h3 class="text-[0.95rem] leading-snug font-semibold text-balance transition group-hover:text-brand-ink"><?= e($video['title']) ?></h3>
        </div>
    </a>
<?php }

function video_grid(array $videos): void
{
    if (count($videos) === 1) {
        // A single video sits in the middle instead of in the first grid column. ?>
        <div class="mx-auto w-full max-w-lg text-center"><?php video_card($videos[0]) ?></div>
        <?php return;
    } ?>
    <div class="grid-cards">
        <?php foreach ($videos as $v) { video_card($v); } ?>
    </div>
<?php }

/** Logo in the centre, nothing else. */
function site_header(): void
{ ?>
    <header class="border-b border-line bg-surface pt-[env(safe-area-inset-top)]">
        <div class="wrap fold-left flex justify-center py-3 short:py-1.5">
            <a href="<?= e(url('/')) ?>" aria-label="<?= e(site()['name']) ?> home" class="rounded-lg">
                <?php logo('h-16 sm:h-20 short:h-12') ?>
            </a>
        </div>
    </header>
<?php }

/**
 * Home banner: a small, full-width rectangle with an Islamic geometric
 * pattern and a mosque skyline. Text and icons only, no buttons.
 */
function banner(): void
{
    $pillars = [
        ['icon' => 'book', 'title' => 'Explore', 'text' => 'Real stories'],
        ['icon' => 'mosque', 'title' => 'Visit', 'text' => 'Historic places'],
        ['icon' => 'people', 'title' => 'Feel', 'text' => 'The experience'],
    ]; ?>
    <section aria-label="Welcome" class="relative overflow-hidden border-b border-line bg-gradient-to-b from-[#eef5ff] to-[#dceafc]">
        <div class="bg-girih pointer-events-none absolute inset-0 opacity-[0.13]"></div>
        <svg aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(2.5rem,6vw,4.5rem)] w-full text-brand" preserveAspectRatio="none" viewBox="0 0 1200 80">
            <defs>
                <pattern id="skyline" width="300" height="80" patternUnits="userSpaceOnUse">
                    <g fill="currentColor" opacity="0.18">
                        <path d="M110 80V52h80v28Z" />
                        <path d="M118 52c0-14 10-22 20-27 6-3 10-7 12-13 2 6 6 10 12 13 10 5 20 13 20 27Z" />
                        <rect x="148.5" y="2" width="3" height="10" />
                        <path d="M92 80V30l3-6 3 6v50Z" />
                        <path d="M202 80V30l3-6 3 6v50Z" />
                        <path d="M20 80V64h50v16Z" />
                        <path d="M25 64c0-9 8-15 20-17 12 2 20 8 20 17Z" />
                        <path d="M232 80V62h52v18Z" />
                        <path d="M238 62c0-9 8-15 20-17 12 2 20 8 20 17Z" />
                    </g>
                </pattern>
            </defs>
            <rect width="1200" height="80" fill="url(#skyline)" />
        </svg>
        <div class="wrap fold-left relative flex flex-col items-center py-[calc((clamp(2.5rem,6vw,4.5rem)*0.725+clamp(1rem,1.8vw,1.5rem)*2)/2)] text-center">
            <p class="font-display leading-[1.05] font-bold tracking-[0.02em] uppercase">
                <span class="block text-[clamp(1.5rem,1rem+2.6vw,3rem)] text-brand">Experience Islam</span>
                <span class="mt-1 block text-[clamp(1rem,0.75rem+1.4vw,1.85rem)] font-semibold tracking-[0.12em] text-navy">Beyond imagination</span>
            </p>
            <div class="mt-3 h-px w-[min(26rem,80%)] bg-gradient-to-r from-transparent via-brand/40 to-transparent"></div>
            <p class="mt-3 text-[clamp(0.66rem,0.6rem+0.4vw,0.9rem)] font-medium tracking-[0.22em] text-muted uppercase">Relive history through virtual reality</p>
            <ul class="mt-[clamp(1rem,2.5vw,1.5rem)] grid w-full max-w-2xl grid-cols-3 divide-x divide-brand/15">
                <?php foreach ($pillars as $p) { ?>
                    <li class="flex flex-col items-center px-2">
                        <span class="grid size-[clamp(2.25rem,1.9rem+1.4vw,3rem)] place-items-center rounded-full border-2 border-brand bg-white text-brand shadow-sm"><?= icon($p['icon'], 20) ?></span>
                        <span class="mt-1.5 font-display text-[clamp(0.75rem,0.68rem+0.4vw,0.95rem)] font-semibold tracking-[0.12em] text-navy uppercase"><?= e($p['title']) ?></span>
                        <span class="text-[clamp(0.6rem,0.56rem+0.25vw,0.75rem)] tracking-[0.1em] text-muted uppercase"><?= e($p['text']) ?></span>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </section>
<?php }

/** "App, headset or Android" guide, shown above the footer on every page. */
function ways_to_watch(): void
{
    $devices = [
        ['icon' => 'headset', 'title' => 'VR headset', 'body' => 'Open the site in Meta Quest or Vision Pro and tap “Enter VR” for full immersion.'],
        ['icon' => 'phone', 'title' => 'Android', 'body' => 'Turn on motion control and move your Android phone to look around the mosque.'],
    ]; ?>
    <section aria-labelledby="vr-title" class="wrap mt-[var(--section-gap)]">
        <div class="fold-flat relative overflow-hidden rounded-3xl border border-line bg-surface p-[clamp(1.25rem,3vw,2.5rem)]">
            <div class="bg-girih pointer-events-none absolute inset-0 opacity-[0.05]"></div>
            <div class="fold-cols relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
                <div>
                    <p class="mb-2 text-xs font-semibold tracking-[0.2em] text-brand-ink uppercase">App, headset or Android</p>
                    <h2 id="vr-title" class="t-section">Three ways to step inside</h2>
                    <p class="mt-3 text-muted">
                        For the most immersive experience, watch in the <strong class="font-semibold text-fg">VR ISLAM app</strong>. Or play any video right here in
                        your browser: in a headset, the mosque surrounds you, and the trigger plays and pauses.
                    </p>
                </div>
                <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-4">
                    <div class="rounded-2xl border-2 border-brand/40 bg-brand/5 p-5">
                        <span class="grid size-11 place-items-center rounded-xl bg-white ring-1 ring-brand/20"><?php logo_mark('h-6') ?></span>
                        <h3 class="mt-4 font-semibold text-brand-ink">VR ISLAM app</h3>
                        <p class="mt-1.5 text-sm leading-relaxed text-muted">Watch every video in full immersion with the VR ISLAM app.</p>
                        <?php download_button('md', 'Download APK', 'mt-4') ?>
                        <?php download_meta('mt-2') ?>
                    </div>
                    <?php foreach ($devices as $d) { ?>
                        <div class="rounded-2xl border border-line bg-bg/60 p-5">
                            <span class="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand-ink"><?= icon($d['icon'], 22) ?></span>
                            <h3 class="mt-4 font-medium"><?= e($d['title']) ?></h3>
                            <p class="mt-1.5 text-sm leading-relaxed text-muted"><?= e($d['body']) ?></p>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </section>
<?php }

/** Four columns: logo and description | latest videos | our initiatives | contact. */
function site_footer(): void
{
    $site = site();
    $c = $site['contact']; ?>
    <footer class="mt-[var(--section-gap)] border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]">
        <div class="wrap fold-cols grid gap-x-10 gap-y-10 py-12 sm:grid-cols-[auto_auto] sm:justify-between lg:flex lg:justify-between">
            <div>
                <a href="<?= e(url('/')) ?>" aria-label="<?= e($site['name']) ?> home" class="inline-block rounded-lg"><?php logo('h-16') ?></a>
                <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                    <span class="block">Experience Islam beyond imagination.</span>
                    <span class="block">Relive history through virtual reality.</span>
                    <span class="block">Don&apos;t just learn history.</span>
                    <span class="block">Experience it.</span>
                </p>
                <?php download_button('md', 'Download APK', 'mt-5') ?>
            </div>

            <div class="lg:max-w-xs">
                <h2 class="mb-4 text-xs font-semibold tracking-[0.18em] text-brand-ink uppercase">Collection</h2>
                <ul class="space-y-3">
                    <?php foreach (latest_videos(3) as $v) { ?>
                        <li>
                            <?= video_link_open($v, 'group flex items-center gap-3') ?>
                                <img src="<?= e(url(thumb_of($v))) ?>" alt="" loading="lazy" class="aspect-video w-20 shrink-0 rounded-lg object-cover ring-1 ring-line">
                                <span class="line-clamp-2 text-sm leading-snug text-fg/85 transition group-hover:text-brand-ink"><?= e($v['title']) ?></span>
                            </a>
                        </li>
                    <?php } ?>
                </ul>
            </div>

            <div class="lg:shrink-0">
                <h2 class="mb-4 text-xs font-semibold tracking-[0.18em] text-brand-ink uppercase">Our initiative</h2>
                <ul class="space-y-2.5 text-sm text-fg/85">
                    <?php foreach ($site['initiatives'] as $i) {
                        $href = $i['href'] ?? null; ?>
                        <li class="flex items-center gap-2 break-all">
                            <span class="size-1.5 shrink-0 rotate-45 bg-brand" aria-hidden="true"></span>
                            <?php if ($href === null) { ?>
                                <span>#<?= e($i['name']) ?></span>
                            <?php } elseif (str_starts_with($href, '/') || str_starts_with($href, '#')) { ?>
                                <a href="<?= e(url($href)) ?>" class="transition hover:text-brand-ink"><?= e($i['name']) ?></a>
                            <?php } else { ?>
                                <a href="<?= e($href) ?>" target="_blank" rel="noopener noreferrer" class="transition hover:text-brand-ink"><?= e($i['name']) ?></a>
                            <?php } ?>
                        </li>
                    <?php } ?>
                </ul>
            </div>

            <div class="lg:shrink-0">
                <h2 class="mb-4 text-xs font-semibold tracking-[0.18em] text-brand-ink uppercase">Contact</h2>
                <address class="flex flex-col items-start text-sm not-italic">
                    <a href="<?= e($c['phone_href']) ?>" class="-my-1 inline-flex h-10 items-center gap-2 text-fg/85 transition hover:text-brand-ink"><?= icon('call', 18, 'text-brand') ?> <?= e($c['phone']) ?></a>
                    <a href="mailto:<?= e($c['email']) ?>" class="-my-1 inline-flex h-10 items-center gap-2 break-all text-fg/85 transition hover:text-brand-ink"><?= icon('mail', 18, 'shrink-0 text-brand') ?> <?= e($c['email']) ?></a>
                    <a href="<?= e($c['youtube']) ?>" target="_blank" rel="noopener noreferrer" class="-my-1 inline-flex h-10 items-center gap-2 text-fg/85 transition hover:text-brand-ink"><?= icon('youtube', 18, 'text-brand') ?> <?= e($c['youtube_handle']) ?></a>
                    <?php foreach ($c['instagram'] as $ig) { ?>
                        <a href="<?= e($ig['href']) ?>" target="_blank" rel="noopener noreferrer" class="-my-1 inline-flex h-10 items-center gap-2 text-fg/85 transition hover:text-brand-ink"><?= icon('instagram', 18, 'text-brand') ?> <?= e($ig['label']) ?></a>
                    <?php } ?>
                </address>
            </div>
        </div>
        <p class="border-t border-line py-4 text-center text-xs text-muted">
            <span class="fold-left block">
                © <?= date('Y') ?>
                <a href="<?= e(url('/')) ?>" class="transition hover:text-brand-ink hover:underline"><?= e($site['name']) ?></a>
                ·
                <a href="<?= e(url('/privacy-policy/')) ?>" class="transition hover:text-brand-ink hover:underline">Privacy Policy</a>
            </span>
        </p>
    </footer>
<?php }
