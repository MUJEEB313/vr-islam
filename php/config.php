<?php
/*
 * Site-wide settings. Edit text, links and contact details here.
 */
return [
    'name' => 'VR ISLAM',
    'tagline' => 'Experience Islam beyond imagination',
    // From the YouTube channel's description.
    'description' => "Experience Islam Beyond Imagination. Relive History Through Virtual Reality. Don't Just Learn History. Experience It.",

    // Home page title and description (SEO brief).
    'home_title' => 'VR Islam – Islamic History Through Virtual Reality',
    'home_description' => 'Explore Islamic history through immersive virtual reality, 360° videos and historic Islamic places. Experience Islamic heritage like never before.',

    // Public address of the site, used for absolute links (sitemap, link previews).
    'origin' => 'https://vrislam.net',
    // Sub-folder the site lives in, e.g. '/vr-islam'. Leave empty when it sits at the domain root.
    'base_path' => '',

    // Link-preview image. Use a new file name whenever the image changes, so apps refetch it.
    'share_image' => '/brand/share-v4.jpg',

    'contact' => [
        'phone' => '(+91) 89763 80690',
        'phone_href' => 'tel:+918976380690',
        'email' => 'info@arbaeenmemories.com',
        'youtube' => 'https://www.youtube.com/@vrIslamofficial',
        'youtube_handle' => '@vrIslamofficial',
        'instagram' => [
            ['label' => 'Arbaeen Memories', 'href' => 'https://www.instagram.com/arbaeenmemories?cplk=N2NhdjJscnRwOGJo'],
            ['label' => 'VR ISLAM', 'href' => 'https://www.instagram.com/vrislamofficial?obrf=MWh3MGtrYW1seHducg=='],
        ],
    ],

    /*
     * Android app. The file is a GitHub Release asset; "latest/download" always points at the newest
     * release, so a new version only needs a new release with an asset named VR-Islam.apk.
     */
    'app' => [
        'apk_url' => 'https://github.com/MUJEEB313/vr-islam/releases/latest/download/VR-Islam.apk',
        'version' => '1.0',
        'size_mb' => 88,
    ],

    /*
     * Sister projects in the footer. An href starting with "/" or "#" stays on this site;
     * full URLs open in a new tab.
     */
    'initiatives' => [
        ['name' => 'Arbaeen Memories', 'href' => 'https://arbaeenmemories.com'],
        ['name' => 'VR ISLAM', 'href' => '/'],
        // PLACEHOLDER: "#" until Yaqeen Media has a website.
        ['name' => 'Yaqeen Media', 'href' => '#'],
    ],
];
