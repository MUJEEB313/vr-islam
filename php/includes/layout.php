<?php
/*
 * Page shell: <head> metadata, header, viewing guide and footer.
 *
 * $meta keys (all optional):
 *   title        page title; " · VR ISLAM" is appended. Omit on the home page.
 *   description  meta description
 *   path         page path for the canonical URL, e.g. "/privacy-policy/"
 *   image        link-preview image path
 *   og_type      "website" (default) or e.g. "video.other"
 *   noindex      true to keep the page out of search engines
 *   bare         true for chrome-less pages (embed): no header, guide or footer
 */

function page_start(array $meta = []): void
{
    $site = site();
    $title = isset($meta['title']) ? $meta['title'] . ' · ' . $site['name'] : $site['home_title'];
    $description = $meta['description'] ?? $site['home_description'];
    $image = absolute_url($meta['image'] ?? $site['share_image']);
    $canonical = isset($meta['path']) ? absolute_url($meta['path']) : null;
    // Schema markup (SEO brief).
    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        '@id' => 'https://vrislam.net/#website',
        'name' => 'VR ISLAM',
        'url' => 'https://vrislam.net/',
        'publisher' => ['@id' => 'https://vrislam.net/#organization'],
    ]; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#ffffff">
    <title><?= e($title) ?></title>
    <meta name="description" content="<?= e($description) ?>">
    <?php if (!empty($meta['noindex'])) { ?><meta name="robots" content="noindex"><?php } ?>
    <?php if ($canonical) { ?><link rel="canonical" href="<?= e($canonical) ?>"><?php } ?>

    <meta property="og:title" content="<?= e($title) ?>">
    <meta property="og:description" content="<?= e($description) ?>">
    <meta property="og:site_name" content="<?= e($site['name']) ?>">
    <meta property="og:locale" content="en">
    <meta property="og:type" content="<?= e($meta['og_type'] ?? 'website') ?>">
    <meta property="og:image" content="<?= e($image) ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= e($title) ?>">
    <meta name="twitter:description" content="<?= e($description) ?>">
    <meta name="twitter:image" content="<?= e($image) ?>">

    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="<?= e($site['name']) ?>">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="format-detection" content="telephone=no">
    <link rel="manifest" href="<?= e(url('/manifest.webmanifest')) ?>">
    <link rel="icon" href="<?= e(url('/icon.png')) ?>" type="image/png" sizes="64x64">
    <link rel="apple-touch-icon" href="<?= e(url('/apple-icon.png')) ?>" sizes="180x180">

    <link rel="preload" href="<?= e(url('/assets/fonts/e4af272ccee01ff0-s.p.woff2')) ?>" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="<?= e(url('/assets/fonts/0c622b6f37b8ee47-s.p.woff2')) ?>" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="<?= e(url('/assets/css/site.css')) ?>?v=<?= @filemtime(__DIR__ . '/../assets/css/site.css') ?>">

    <script type="application/ld+json"><?= json_encode($schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) ?></script>
    <?= $meta['head'] ?? '' ?>
</head>
<body class="min-h-dvh antialiased">
<?php if (empty($meta['bare'])) { ?>
    <a href="#main" class="sr-only z-50 rounded-full bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">Skip to content</a>
    <?php site_header() ?>
    <main id="main">
<?php }
}

function page_end(array $meta = []): void
{
    if (empty($meta['bare'])) { ?>
        <?php ways_to_watch() ?>
    </main>
    <?php site_footer() ?>
<?php } ?>
</body>
</html>
<?php }
