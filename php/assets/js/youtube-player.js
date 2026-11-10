/*
 * YouTube player that never looks stuck.
 *
 * Markup: <div class="yt-player" data-video-id="…" data-title="…" data-watch-url="…"> with a
 * .yt-start button (thumbnail + play button) inside.
 *
 * - YouTube's official IFrame Player API and the player load in the background as soon as the
 *   page opens, hidden under the thumbnail, so pressing play starts the video right away.
 * - The thumbnail and a spinner stay on screen until the video is really playing (no black box).
 * - If the browser won't start it (some phones block autoplay), YouTube's own player is shown
 *   after a few seconds so one more tap plays it.
 * - If YouTube can't be reached or refuses to play the video, a message with
 *   "Watch on YouTube" and "Try again" replaces the player.
 */
(function () {
  "use strict";

  var API_URL = "https://www.youtube.com/iframe_api";
  var API_TIMEOUT = 15000; // ms to wait for YouTube's script
  var START_TIMEOUT = 5000; // ms after pressing play before YouTube's own controls are shown
  var READY_TIMEOUT = 20000; // ms after pressing play before giving up on a player that never loads
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
        reject(new Error("api"));
      };
      document.head.appendChild(s);
      setTimeout(function () {
        reject(new Error("timeout"));
      }, API_TIMEOUT);
    });
    apiPromise.catch(function () {
      apiPromise = null; // allow another try
    });
    return apiPromise;
  }

  // YouTube error codes: 2 bad ID, 5 HTML5 player error, 100 removed/private, 101/150/153 embedding not allowed.
  function messageFor(code) {
    if (code === 100) return "This video is private or has been removed.";
    if (code === 101 || code === 150 || code === 153) return "This video can't be played here.";
    return "The video couldn't be loaded.";
  }

  function setup(root) {
    var button = root.querySelector(".yt-start");
    if (!button) return;
    var player = null;
    var ready = false;
    var wantPlay = false;
    var failed = false;
    var startTimer = null;
    var readyTimer = null;

    function state(s) {
      root.setAttribute("data-state", s);
    }

    function clearTimers() {
      clearTimeout(startTimer);
      clearTimeout(readyTimer);
    }

    function fail(message) {
      if (failed) return;
      failed = true;
      clearTimers();
      state("error");
      var box = document.createElement("div");
      box.className = "yt-fallback";
      box.setAttribute("role", "alert");
      var p = document.createElement("p");
      p.textContent = message;
      var a = document.createElement("a");
      a.href = root.getAttribute("data-watch-url");
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

    function play() {
      if (!ready || failed) return;
      player.playVideo();
      // Still not playing after a while (autoplay blocked): show YouTube's own play button.
      clearTimeout(startTimer);
      startTimer = setTimeout(function () {
        if (root.getAttribute("data-state") === "loading") state("ready");
      }, START_TIMEOUT);
    }

    function create() {
      if (player || failed) return Promise.resolve();
      return loadApi().then(function (YT) {
        if (player) return;
        var mount = document.createElement("div");
        root.insertBefore(mount, root.firstChild);
        player = new YT.Player(mount, {
          host: "https://www.youtube-nocookie.com",
          videoId: root.getAttribute("data-video-id"),
          width: "100%",
          height: "100%",
          playerVars: { playsinline: 1, rel: 0, modestbranding: 1, origin: window.location.origin },
          events: {
            onReady: function (e) {
              var iframe = e.target.getIframe();
              iframe.setAttribute("title", root.getAttribute("data-title") || "YouTube video");
              iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
              ready = true;
              clearTimeout(readyTimer);
              if (wantPlay) play();
            },
            onStateChange: function (e) {
              // 1 playing, 0 ended, 2 paused: the video is running, so drop the thumbnail for good.
              if (e.data === 1 || e.data === 0 || e.data === 2) {
                clearTimers();
                state("playing");
              }
            },
            onError: function (e) {
              fail(messageFor(e.data));
            },
          },
        });
      });
    }

    // Load the player in the background once the page itself has finished loading.
    function preload() {
      if (!wantPlay) {
        create().catch(function () {
          /* tried again when play is pressed */
        });
      }
    }
    if (document.readyState === "complete") preload();
    else window.addEventListener("load", preload, { once: true });

    button.addEventListener("click", function () {
      if (wantPlay) return;
      wantPlay = true;
      state("loading");
      readyTimer = setTimeout(function () {
        if (!ready) fail("The video is taking too long to load. Check your connection, or watch it on YouTube.");
      }, READY_TIMEOUT);
      if (ready) {
        play();
      } else {
        create().catch(function () {
          fail("YouTube couldn't be reached. Check your connection, or watch it on YouTube.");
        });
      }
    });
  }

  document.querySelectorAll(".yt-player").forEach(setup);
})();
