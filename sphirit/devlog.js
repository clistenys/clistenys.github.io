// Daily devlog: reads assets/devlog.json and fills every [data-devlog] on the page.
// data-limit="3" shows only the latest days (home); without it, the whole log grouped by month.
// The JSON is newest first, one entry per day: {"d": "YYYY-MM-DD", "en": {"t", "i": []}, "pt": {...}}.
(function () {
  var boxes = document.querySelectorAll("[data-devlog]");
  if (!boxes.length) return;
  var pt = document.documentElement.lang.indexOf("pt") === 0;
  var root = document.documentElement.dataset.assetsRoot || (pt ? "../" : "");
  var locale = pt ? "pt-BR" : "en-US";
  var day = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  var month = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" });

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function entry(item, preview) {
    var txt = item[pt ? "pt" : "en"];
    var date = new Date(item.d + "T00:00:00Z");
    var art = el("article", "log-day");
    var time = el("time", "label log-date", day.format(date).replace(".", ""));
    time.dateTime = item.d;
    art.appendChild(time);
    art.appendChild(el("h3", "log-title", txt.t));
    var ul = el("ul", "perks");
    txt.i.forEach(function (line) { ul.appendChild(el("li", "", pt && preview ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : line)); });
    art.appendChild(ul);
    return art;
  }

  (location.protocol === "file:" ? Promise.resolve(window.sphiritOffline.devlog) : fetch(root + "assets/devlog.json?v=oct30").then(function (r) { return r.json(); }))
    .then(function (log) {
      log.sort(function (a, b) { return a.d < b.d ? 1 : -1; });
      boxes.forEach(function (box) {
        var limit = parseInt(box.dataset.limit, 10);
        if (limit) {
          log.slice(0, limit).forEach(function (item) { box.appendChild(entry(item, true)); });
        } else {
          var current = "";
          log.forEach(function (item) {
            var m = item.d.slice(0, 7);
            if (m !== current) {
              current = m;
              var h = el("h2", "label log-month", month.format(new Date(m + "-01T00:00:00Z")));
              box.appendChild(h);
            }
            box.appendChild(entry(item));
          });
        }
        var count = document.querySelector("[data-devlog-count]");
        if (count) count.textContent = String(log.length);
        box.removeAttribute("aria-busy");
      });
    })
    .catch(function () { boxes.forEach(function (box) { box.hidden = true; }); });
})();
