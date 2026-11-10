/*
 * YouTube player that never gets stuck.
 *
 * Markup: <div class="yt-player" data-video-id="…" data-title="…" data-watch-url="…"> with a
 * .yt-start button (the thumbnail) inside. Pressing it loads YouTube's official IFrame Player API
 * and plays the video in place. If the API can't load, the video can't be embedded, or it doesn't
 * start in time, a message with a "Watch on YouTube" link replaces the player.
 */
(function () {
  "use strict";

  var API_URL = "https://www.youtube.com/iframe_api";
  var LOAD_TIMEOUT = 12000; // ms to wait for the API and the player
  var apiPromise = null;

  function loadApi() {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (apiPromise) return apiPromise;
    apiPromise = new Promise(function (resolve, reject) {
      var previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof previous === "function") previous();
        resolve(window.YT);
      };
      var s = document.createElement("script");
      s.src = API_URL;
      s.async = true;
      s.onerror = function () {
        apiPromise = null;
        reject(new Error("api"));
      };
      document.head.appendChild(s);
      setTimeout(function () {
        reject(new Error("timeout"));
      }, LOAD_TIMEOUT);
    });
    return apiPromise;
  }

  // YouTube error codes: 2 bad ID, 5 HTML5 player error, 100 removed/private, 101/150/153 embedding not allowed.
  function messageFor(code) {
    if (code === 100) return "This video is private or has been removed.";
    if (code === 101 || code === 150 || code === 153) return "This video can't be played here.";
    return "The video couldn't be loaded.";
  }

  function showFallback(root, message) {
    var url = root.getAttribute("data-watch-url");
    root.setAttribute("data-state", "error");
    var box = document.createElement("div");
    box.className = "yt-fallback";
    box.setAttribute("role", "alert");
    var p = document.createElement("p");
    p.textContent = message;
    var a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "Watch on YouTube";
    var retry = document.createElement("button");
    retry.type = "button";
    retry.textContent = "Try again";
    retry.addEventListener("click", function () {
      window.location.reload();
    });
    box.appendChild(p);
    box.appendChild(a);
    box.appendChild(retry);
    root.innerHTML = "";
    root.appendChild(box);
  }

  function start(root) {
    if (root.getAttribute("data-state")) return;
    root.setAttribute("data-state", "loading");
    var started = false;
    var watchdog = setTimeout(function () {
      if (!started) showFallback(root, "The video is taking too long to start.");
    }, LOAD_TIMEOUT + 8000);

    loadApi().then(
      function (YT) {
        var mount = document.createElement("div");
        root.appendChild(mount);
        new YT.Player(mount, {
          host: "https://www.youtube-nocookie.com",
          videoId: root.getAttribute("data-video-id"),
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: function (e) {
              var iframe = e.target.getIframe();
              iframe.setAttribute("title", root.getAttribute("data-title") || "YouTube video");
              iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking; fullscreen");
              iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
              // The player has loaded, so it isn't stuck. (Phones may still wait for a tap to start.)
              started = true;
              clearTimeout(watchdog);
              root.setAttribute("data-state", "ready");
              e.target.playVideo();
            },
            onStateChange: function (e) {
              if (e.data === 1) root.setAttribute("data-state", "playing");
            },
            onError: function (e) {
              clearTimeout(watchdog);
              showFallback(root, messageFor(e.data));
            },
          },
        });
      },
      function () {
        clearTimeout(watchdog);
        showFallback(root, "YouTube couldn't be reached. Check your connection, or watch it on YouTube.");
      }
    );
  }

  document.querySelectorAll(".yt-player").forEach(function (root) {
    var button = root.querySelector(".yt-start");
    if (!button) return;
    button.addEventListener("click", function () {
      start(root);
    });
    // Warm up the connection when someone is about to press play.
    button.addEventListener(
      "pointerenter",
      function () {
        loadApi().catch(function () {});
      },
      { once: true }
    );
  });
})();
