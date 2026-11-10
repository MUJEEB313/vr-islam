<?php
/*
 * Front controller: every request that isn't a real file comes here.
 * - Apache: .htaccess sends requests here.
 * - Local:  php -S localhost:8080 index.php
 */
require __DIR__ . '/includes/helpers.php';
require __DIR__ . '/includes/components.php';
require __DIR__ . '/includes/layout.php';

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$base = rtrim(site()['base_path'], '/');
if ($base !== '' && str_starts_with($path, $base)) {
    $path = substr($path, strlen($base)) ?: '/';
}

// Code, settings and stylesheet sources are never served directly.
$private = '#^/(config\.php|content\.php|index\.php|includes/|pages/|tailwind/|\.ht)#';

// PHP's built-in server: let it send real files (images, CSS, fonts, llms.txt) itself.
if (PHP_SAPI === 'cli-server' && $path !== '/' && !preg_match($private, $path)) {
    $file = realpath(__DIR__ . $path);
    if ($file && str_starts_with($file, __DIR__ . DIRECTORY_SEPARATOR) && is_file($file)) {
        return false;
    }
}

function redirect(string $to, int $status = 301): never
{
    header('Location: ' . $to, true, $status);
    exit;
}

// Pages use a trailing slash (/privacy-policy/), as on the original site.
if (preg_match('#^/(privacy-policy|videos/[a-z0-9-]+|embed/[a-z0-9-]+)$#', $path)) {
    redirect(url($path . '/'));
}

switch (true) {
    case $path === '/':
        require __DIR__ . '/pages/home.php';
        break;

    case $path === '/privacy-policy/':
        require __DIR__ . '/pages/privacy-policy.php';
        break;

    case (bool) preg_match('#^/(videos|embed)/([a-z0-9-]+)/$#', $path, $m) && ($video = get_video($m[2])):
        require __DIR__ . '/pages/' . ($m[1] === 'videos' ? 'video' : 'embed') . '.php';
        break;

    case $path === '/sitemap.xml':
        header('Content-Type: application/xml; charset=utf-8');
        $urls = [['/', 'weekly', '1'], ['/privacy-policy/', 'yearly', '0.3']];
        // YouTube videos have no page of their own here; they open on YouTube.
        foreach (videos() as $v) {
            if (!youtube_url($v)) {
                $urls[] = ['/videos/' . $v['slug'] . '/', null, '0.8'];
            }
        }
        echo '<?xml version="1.0" encoding="UTF-8"?>', "\n", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', "\n";
        foreach ($urls as [$u, $freq, $prio]) {
            echo '<url><loc>', e(absolute_url($u)), '</loc>', $freq ? "<changefreq>$freq</changefreq>" : '', "<priority>$prio</priority></url>\n";
        }
        echo '</urlset>', "\n";
        break;

    case $path === '/robots.txt':
        header('Content-Type: text/plain; charset=utf-8');
        echo "User-Agent: *\nAllow: /\nDisallow: /embed/\n\nSitemap: ", absolute_url('/sitemap.xml'), "\n";
        break;

    case $path === '/manifest.webmanifest':
        // Makes the site installable ("Add to Home Screen").
        header('Content-Type: application/manifest+json');
        $s = site();
        echo json_encode([
            'name' => $s['name'] . ': Experience Islam Beyond Imagination',
            'short_name' => $s['name'],
            'description' => $s['description'],
            'id' => url('/'),
            'start_url' => url('/'),
            'scope' => url('/'),
            'display' => 'standalone',
            'orientation' => 'any',
            'background_color' => '#ffffff',
            'theme_color' => '#ffffff',
            'categories' => ['education', 'lifestyle', 'entertainment'],
            'icons' => [
                ['src' => url('/icons/icon-192.png'), 'sizes' => '192x192', 'type' => 'image/png'],
                ['src' => url('/icons/icon-512.png'), 'sizes' => '512x512', 'type' => 'image/png'],
                ['src' => url('/icons/maskable-512.png'), 'sizes' => '512x512', 'type' => 'image/png', 'purpose' => 'maskable'],
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        break;

    default:
        require __DIR__ . '/pages/not-found.php';
}
