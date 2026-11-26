// Runs in <head> before the page paints: decides whether the intro plays.
(function () {
  var force = new URLSearchParams(location.search).has("intro"), seen = false;
  try { seen = sessionStorage.getItem("cm-intro") === "1"; } catch (e) {}
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // A link straight to a section (e.g. /pt/#access from the Instagram bio) skips the intro.
  if (location.hash.length > 1 && !force) seen = true;
  document.documentElement.classList.add((force || (!seen && !calm)) ? "intro-run" : "intro-off");
})();
