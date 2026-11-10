<?php
/*
 * Privacy Policy (required for the Google Play listing).
 * Based on an inspection of the Android app (com.vrislam.vrplayer) version 1.0: no analytics, advertising,
 * crash-reporting or tracking libraries; only the INTERNET permission; all video and audio bundled offline.
 * Review this page whenever the app or website starts collecting or sharing anything.
 */
$site = site();
$c = $site['contact'];
$effective = '6 November 2026';

page_start([
    'title' => 'Privacy Policy',
    'description' => 'How the ' . $site['name'] . ' app and website handle your data: no accounts, no tracking, no data collected or shared.',
    'path' => '/privacy-policy/',
]);
?>
<article class="wrap fold-left pt-8 [&>*]:mx-auto [&>*]:max-w-3xl [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
  <h1 class="t-page">Privacy Policy</h1>
  <p class="text-sm text-muted">Effective date: <?= e($effective) ?></p>

  <div class="leading-relaxed text-fg/85">
    <p>
      This Privacy Policy explains how <?= e($site['name']) ?> (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information in the <strong><?= e($site['name']) ?> Android app</strong> 
      (package <code>com.vrislam.vrplayer</code>) and on the <?= e($site['name']) ?> website. In short: <strong>we do not collect, store, sell or share any personal
      information about you.</strong>
    </p>

    <h2 class="t-card mt-10 mb-1">1. The <?= e($site['name']) ?> app</h2>
    <p>The app plays immersive 360° Islamic history experiences. The videos and audio are included inside the app and play on your device.</p>
    <ul>
      <li>
        <strong>No account or sign-in.</strong> You do not need to give us your name, email address, phone number or any other personal details.
      </li>
      <li>
        <strong>No analytics, advertising or tracking.</strong> The app contains no analytics, advertising, crash-reporting or tracking tools, and it does
        not use advertising IDs or other device identifiers.
      </li>
      <li>
        <strong>Motion sensors.</strong> To let you look around a 360° scene by moving your phone or headset, the app reads your device&apos;s motion
        sensors. This happens only on your device, only while the app is open, and the sensor data is never stored or sent anywhere.
      </li>
      <li>
        <strong>Settings on your device.</strong> The app may remember simple playback choices, such as the audio language, on your device while you use
        it. These are not sent to us.
      </li>
      <li>
        <strong>Permissions.</strong> The app requests only the standard internet permission. It does not access your location, camera, microphone,
        contacts, photos, files or accounts.
      </li>
    </ul>

    <h2 class="t-card mt-10 mb-1">2. The website</h2>
    <ul>
      <li>
        <strong>No accounts, cookies or analytics.</strong> The website has no sign-in, sets no tracking cookies and uses no analytics or advertising
        services.
      </li>
      <li>
        <strong>Watch progress.</strong> If you watch a video in the website&apos;s 360° player, your browser may remember where you stopped, so you can
        continue later. This is saved only in your own browser and is never sent to us. You can remove it by clearing your browser&apos;s site data.
      </li>
      <li>
        <strong>Hosting.</strong> Like every website, our hosting and content delivery providers receive standard technical information when you visit
        or download the app, such as your IP address, browser type and the time of the request. They use it to deliver the site and keep it secure, under
        their own privacy policies. The app download is provided through GitHub.
      </li>
    </ul>

    <h2 class="t-card mt-10 mb-1">3. How we use and share information</h2>
    <p>
      Because we do not collect personal information, we do not use it, sell it or share it with anyone. The only third parties involved are the hosting
      and content delivery providers described above, which process technical connection data in order to serve the website and the app download.
    </p>

    <h2 class="t-card mt-10 mb-1">4. Links to other services</h2>
    <p>
      The website and app link to services such as YouTube and Instagram. When you open them, their own privacy policies apply; we do not control the
      information they collect.
    </p>

    <h2 class="t-card mt-10 mb-1">5. Children</h2>
    <p>
      The app and website are suitable for a general audience, including families. We do not knowingly collect personal information from anyone,
      including children under 13.
    </p>

    <h2 class="t-card mt-10 mb-1">6. Data security and retention</h2>
    <p>
      We do not hold personal information, so there is none for us to store, keep or delete. Settings saved on your device stay there until you clear
      them or uninstall the app.
    </p>

    <h2 class="t-card mt-10 mb-1">7. Your choices</h2>
    <p>
      You can clear the app&apos;s data or uninstall it at any time from your device settings, and clear website data from your browser settings. If you
      have any question about your data, contact us using the details below.
    </p>

    <h2 class="t-card mt-10 mb-1">8. Changes to this policy</h2>
    <p>
      If the app or website changes how it handles information, we will update this page and its effective date before the change takes effect.
    </p>

    <h2 class="t-card mt-10 mb-1">9. Contact us</h2>
    <p>
      <?= e($site['name']) ?>
      <br />
      Email: 
      <a href="mailto:<?= e($c['email']) ?>" class="text-brand-ink hover:underline">
        <?= e($c['email']) ?>
      </a>
      <br />
      Phone: 
      <a href="<?= e($c['phone_href']) ?>" class="text-brand-ink hover:underline">
        <?= e($c['phone']) ?>
      </a>
    </p>
  </div>
</article>
<?php page_end();
