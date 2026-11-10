<?php
/*
 * Shared helpers: settings, content, escaping, links, formatting and icons.
 */

/** Site settings from config.php. */
function site(): array
{
    static $site = null;
    return $site ??= require __DIR__ . '/../config.php';
}

/** All videos from content.php. */
function videos(): array
{
    static $videos = null;
    return $videos ??= require __DIR__ . '/../content.php';
}

function get_video(string $slug): ?array
{
    foreach (videos() as $v) {
        if ($v['slug'] === $slug) {
            return $v;
        }
    }
    return null;
}

/** Most recently published first. */
function latest_videos(?int $n = null): array
{
    $list = videos();
    usort($list, fn($a, $b) => strcmp($b['published_at'], $a['published_at']));
    return array_slice($list, 0, $n ?? count($list));
}

/** YouTube videos open on YouTube; everything else plays on the site. */
function youtube_url(array $video): ?string
{
    return isset($video['youtube']) ? 'https://www.youtube.com/watch?v=' . $video['youtube'] : null;
}

/** Card-sized image for a video (falls back to the full poster). */
function thumb_of(array $video): string
{
    return $video['thumb'] ?? $video['poster'];
}

/** Escape text for HTML. */
function e($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Root-relative path ("/privacy-policy/") prefixed with the base path; other links unchanged. */
function url(string $path): string
{
    return str_starts_with($path, '/') ? rtrim(site()['base_path'], '/') . $path : $path;
}

/** Absolute URL on the public site, for link previews and the sitemap. */
function absolute_url(string $path): string
{
    return site()['origin'] . url($path);
}

function format_duration(int $seconds): string
{
    $s = max(0, $seconds);
    $h = intdiv($s, 3600);
    $m = intdiv($s % 3600, 60);
    $sec = str_pad((string) ($s % 60), 2, '0', STR_PAD_LEFT);
    return $h ? sprintf('%d:%02d:%s', $h, $m, $sec) : "$m:$sec";
}

/** Compact view count: 2, 950, 1.2K, 3.4M. */
function format_views(int $n): string
{
    foreach ([1_000_000_000 => 'B', 1_000_000 => 'M', 1_000 => 'K'] as $size => $unit) {
        if ($n >= $size) {
            return rtrim(rtrim(number_format($n / $size, 1, '.', ''), '0'), '.') . $unit;
        }
    }
    return (string) $n;
}

/** "6 Nov 2026" */
function format_date(string $iso): string
{
    return (new DateTimeImmutable($iso, new DateTimeZone('UTC')))->format('j M Y');
}

/** Inline SVG icon (24×24 line icons). */
function icon(string $name, int $size = 20, string $class = ''): string
{
    static $paths = [
        'play' => '<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" fill="currentColor" stroke="none" />',
        'download' => '<path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />',
        'headset' => '<path d="M3 9.5A2.5 2.5 0 0 1 5.5 7h13A2.5 2.5 0 0 1 21 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-3l-1.8-2.2a2 2 0 0 0-3.4 0L8.5 17h-3A2.5 2.5 0 0 1 3 14.5v-5Z" />',
        'phone' => '<path d="M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm4 15h2" />',
        'call' => '<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.5 1.5C10.4 20.5 3.5 13.6 3.5 5.5A1.5 1.5 0 0 1 5 4Z" />',
        'mail' => '<path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm-.5 1 8.5 6.5L20.5 7" />',
        'youtube' => '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />',
        'instagram' => '<g><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" /></g>',
        'book' => '<path d="M12 6.5C10.4 5.3 8 4.7 4.5 4.8v13.5c3.5-.1 5.9.5 7.5 1.7m0-13.5c1.6-1.2 4-1.8 7.5-1.7v13.5c-3.5-.1-5.9.5-7.5 1.7m0-13.5V20" />',
        'mosque' => '<path d="M4 20h16M6 20v-6h12v6M7.5 14c0-3.4 2.4-5 4.5-6 2.1 1 4.5 2.6 4.5 6M12 8V5.5M12 3.5a1 1 0 1 0 0 .01M3 20V9.5m0 0 1-1.5 1 1.5V20" />',
        'people' => '<path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.5 9v-1.5A4.5 4.5 0 0 1 11 14h2a4.5 4.5 0 0 1 4.5 4.5V20M5 12.5a2.25 2.25 0 1 0 0-4.5M19 12.5a2.25 2.25 0 1 0 0-4.5M2.5 19v-1a3.3 3.3 0 0 1 2.7-3.2M21.5 19v-1a3.3 3.3 0 0 0-2.7-3.2" />',
        'chevronLeft' => '<path d="m15 6-6 6 6 6" />',
        'clock' => '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5V12l3 2" />',
        'eye' => '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Zm9.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />',
        'map' => '<path d="M12 21s-6.5-5.4-6.5-11a6.5 6.5 0 0 1 13 0c0 5.6-6.5 11-6.5 11Zm0-13.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />',
    ];
    $class = $class !== '' ? ' class="' . e($class) . '"' : '';
    return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' . $class . '>' . $paths[$name] . '</svg>';
}
