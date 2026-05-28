// YouTube PiP Hotkey — toggle Picture-in-Picture with Option+G (Alt+G).
//
// Runs entirely in the page, so the PiP call happens inside a real keydown
// handler and therefore carries transient user activation. That is what makes
// this reliable: no AppleScript, no Chrome scripting interface, no "works
// sometimes". Hammerspoon watches for the resulting "Picture in Picture" window
// and pins it top-right + sticky.
(() => {
  "use strict";

  // Pick the video the user is actually watching: prefer a playing, visible one;
  // fall back to any visible video, then the first one on the page.
  function pickVideo() {
    const vids = [...document.querySelectorAll("video")];
    return (
      vids.find((v) => !v.paused && v.readyState > 2 && v.offsetWidth > 0) ||
      vids.find((v) => v.offsetWidth > 0) ||
      vids[0] ||
      null
    );
  }

  async function togglePiP() {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        return;
      }
      const v = pickVideo();
      if (!v) return;
      // YouTube sometimes sets this; clearing it lets PiP open.
      if (v.disablePictureInPicture) v.disablePictureInPicture = false;
      await v.requestPictureInPicture();
    } catch (err) {
      console.warn("[yt-pip-hotkey]", err);
    }
  }

  function isTypingTarget(el) {
    if (!el) return false;
    if (el.isContentEditable) return true;
    return /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName || "");
  }

  // Capture phase so we beat YouTube's own key handlers. e.code is layout- and
  // Option-dead-key independent ("KeyG" even though Option+G types "©").
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.code !== "KeyG" || !e.altKey || e.metaKey || e.ctrlKey) return;
      if (isTypingTarget(e.target)) return; // don't hijack the search box
      e.preventDefault();
      e.stopPropagation();
      togglePiP();
    },
    true
  );

  console.log("[yt-pip-hotkey] loaded");
})();
