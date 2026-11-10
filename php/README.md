# VR ISLAM — PHP version

The same site as the Next.js version in the project root, as plain PHP (8.1 or newer). No database, no frameworks.

## Run locally

```bash
cd php
php -S localhost:8080 index.php
```

Then open http://localhost:8080

## Put it online (Apache / cPanel / most shared hosting)

Upload **everything inside this `php/` folder** to the website's root folder (often `public_html`). `.htaccess` routes every page through `index.php`. If the site lives in a sub-folder, set `base_path` in `config.php` (e.g. `'/vr-islam'`).

On nginx, send requests that aren't real files to `index.php`:

```nginx
location / { try_files $uri /index.php$is_args$args; }
```

## Where things are

| File | What it holds |
| --- | --- |
| `config.php` | Site name, home title/description, domain, contact details, app download, footer initiatives |
| `content.php` | The videos (YouTube ID or video file, title, description, thumbnail) |
| `pages/` | One file per page: home, privacy policy, video, embed, not found |
| `includes/components.php` | Shared parts: header, banner, video cards, download buttons, "Three ways to step inside", footer |
| `includes/layout.php` | `<head>` (title, description, link previews, schema markup) and the page shell |
| `includes/helpers.php` | Small helpers and the icons |
| `index.php` | Router: `/`, `/privacy-policy/`, `/videos/<slug>/`, `/embed/<slug>/`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` |
| `llms.txt`, `brand/`, `icons/`, `media/`, `assets/` | Static files served as-is |

Each video has its own page (`/videos/<slug>/`). YouTube videos play there through the official YouTube IFrame Player API (`assets/js/youtube-player.js`): a thumbnail with a play button shows first, and if YouTube can't load or refuses to play, a message with a "Watch on YouTube" link appears instead of a stuck player.

## Styling

`assets/css/site.css` is generated from `tailwind/site.css` (the same design system as the Next.js site) and contains only the classes the PHP templates use. After changing classes in any `.php` file, rebuild it from the project root:

```bash
npm run php:css
```

Text and content changes in `config.php`, `content.php` or `pages/` don't need a rebuild.
