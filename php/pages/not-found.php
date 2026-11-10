<?php
http_response_code(404);
page_start(['title' => 'Page not found', 'noindex' => true]);
?>
<div class="fold-left mx-auto flex max-w-xl flex-col items-center px-4 pt-28 pb-4 text-center">
    <h1 class="t-page">This page could not be found</h1>
    <p class="mt-3 text-muted">The page you are looking for may have moved.</p>
    <a href="<?= e(url('/')) ?>" class="mt-6 inline-flex h-11 items-center text-sm font-semibold text-brand-ink hover:underline">Go to the home page</a>
</div>
<?php page_end();
