// Sphirit site. No dependencies.

// Where the closed beta form posts: api/inscricao.php saves to MySQL on Hostinger
// and copies the row to the Google Sheet. Set to null to switch the form off.
// The Portuguese page lives in pt/ and loads this same file: PT picks its texts, ROOT fixes the paths.
const PT = document.documentElement.lang.startsWith("pt");
const ROOT = document.documentElement.dataset.assetsRoot || (PT ? "../" : "");
const tr = (en, pt) => (PT ? pt : en);

const ACCESS_ENDPOINT = null;
const pageStart = Date.now();

const SPR = ROOT + "assets/sprites/";
const VID = ROOT + "assets/video/";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const unit = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--u")) || 3;

/* ------------------------------------------------------------ pixel icons (icone_pixel.gd) */
(location.protocol === "file:" ? Promise.resolve(window.sphiritOffline.icons) : fetch(ROOT + "assets/icons.json").then((r) => r.json())).then((icons) => {
  const draw = () => {
    const u = unit();
    document.querySelectorAll(".px[data-icon]").forEach((el) => {
      const rows = icons[el.dataset.icon];
      if (!rows) return;
      const w = rows[0].length, h = rows.length;
      let rects = "";
      rows.forEach((row, y) => [...row].forEach((c, x) => { if (c === "#") rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }));
      el.innerHTML = `<svg width="${w * u}" height="${h * u}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${rects}</svg>`;
    });
  };
  draw();
  matchMedia("(max-width: 1100px)").addEventListener("change", draw);
});


const el = id => document.getElementById(id);
function setupGallery(id, names, animated) {
  const section = el(id);
  const tabs = section.querySelector('[role="tablist"]');
  const panel = section.querySelector('[role="tabpanel"]');
  const preview = panel.querySelector('img');
  const pause = panel.querySelector('button');
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let moving = animated && !preference.matches;
  let active = 0;
  const url = name => ROOT + "assets/" + (animated ? "spirits/" : "cards/") + name + (moving ? ".gif" : ".png");
  function label(name) { return name.replace(/([a-z])([A-Z])/g, "$1 $2"); }
  function show(index) {
    active = index;
    const button = tabs.children[index];
    for (const tab of tabs.children) {
      tab.tabIndex = tab === button ? 0 : -1;
      tab.setAttribute("aria-selected", String(tab === button));
    }
    select(button);
    panel.setAttribute("aria-labelledby", button.id);
    panel.querySelector("h3").textContent = label(names[index]);
    preview.src = url(names[index]);
    preview.alt = label(names[index]);
  }
  function updateMotion() {
    names.forEach((name,i) => tabs.children[i].querySelector("img").src = url(name));
    preview.src = url(names[active]);
    pause.textContent = moving ? tr("Pause animation","Pausar animação") : tr("Play animation","Reproduzir animação");
  }
  names.forEach((name,i) => {
    const button = document.createElement("button");
    button.className = "card"; button.id = id + "-tab-" + i;
    button.setAttribute("role","tab"); button.setAttribute("aria-controls",panel.id);
    const image = new Image(); image.src = url(name); image.alt = "";
    const title = document.createElement("span"); title.textContent = label(name);
    button.append(image,title); tabs.append(button);
    button.onclick = () => show(i);
    button.onkeydown = event => {
      const next = {ArrowRight:(i+1)%names.length,ArrowLeft:(i+names.length-1)%names.length,Home:0,End:names.length-1}[event.key];
      if(next === undefined) return;
      event.preventDefault(); show(next); tabs.children[next].focus();
    };
  });
  show(0);
  if(animated) {
    updateMotion();
    pause.onclick = () => { moving = !moving; updateMotion(); };
    preference.addEventListener("change", () => { moving = !preference.matches; updateMotion(); });
  }
}
setupGallery("spirits", ["Airdra","Aivalf","Baray","Batryl","Bolturk","DarkNite","Ignithar","Lumibun","Mariposa","Mumbra","Rosalys","Serpyron","Sidralin","Velarion","Whirlven","Zoroark"], true);
setupGallery("cards", ["AegisBreaker","CobaltEssence","DivineBreath","PurifyingRemedy","ReflectorShield","RisingBlade","RusticArmor","VitalLeaf","VolcanicEruption"], false);
/* ------------------------------------------------------------ pixel-perfect game footage */
// The game draws at 320x180 and the clips are whole multiples of it (3x, 4x, 6x).
// Shown at an odd width, every art pixel becomes 2 or 3 screen pixels at random and
// text and outlines look uneven. So each clip is sized to the largest whole multiple of
// 320 device pixels that fits; if that wastes too much room, it fills the space with
// smooth scaling instead (even pixels, slightly soft).
const ART_W = 320;
function snapVideo(v) {
  const frame = v.closest(".sel") || v;
  frame.style.width = "";
  const box = frame.getBoundingClientRect().width;
  if (!box) return;
  const border = (v.offsetWidth - v.clientWidth) / 2;
  const dpr = devicePixelRatio || 1;
  const k = Math.floor(((box - 2 * border) * dpr) / ART_W);
  const crisp = k >= 1 && (k * ART_W) / dpr >= 0.8 * (box - 2 * border);
  v.classList.toggle("px-crisp", crisp);
  if (crisp) frame.style.width = (k * ART_W) / dpr + 2 * border + "px";
}
const snapAll = () => document.querySelectorAll(".screen video").forEach((v) => { if (!v.closest(".reel")) snapVideo(v); });
snapAll();
addEventListener("resize", snapAll);
matchMedia("(resolution: 1dppx)").addEventListener?.("change", snapAll);   // window moved to another screen

/* ------------------------------------------------------------ autoplay, with a play button when it's blocked */
// Phones can refuse autoplay (iPhone low power mode, Android data saver), and
// reduced-motion visitors never get it: then the clip shows a play button instead
// of sitting frozen.
function tryPlay(v) {
  if (reduced) { showTap(v); return; }
  const p = v.play();
  if (p) p.then(() => hideTap(v)).catch(() => showTap(v));
}
function showTap(v) {
  const box = v.parentElement;
  let b = box.querySelector(":scope > .tap-play");
  if (!b) {
    b = document.createElement("button");
    b.type = "button";
    b.className = "tap-play";
    b.setAttribute("aria-label", tr("Play video", "Tocar vídeo"));
    b.addEventListener("click", () => v.play().then(() => hideTap(v)).catch(() => {}));
    box.classList.add("has-tap");
    box.append(b);
  }
  b.style.top = v.offsetTop + v.offsetHeight / 2 + "px";
  b.hidden = false;
}
function hideTap(v) {
  const b = v.parentElement.querySelector(":scope > .tap-play");
  if (b) b.hidden = true;
}

/* ------------------------------------------------------------ play videos only while visible */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) tryPlay(e.target);
    else e.target.pause();
  });
}, { threshold: 0.4 });
document.querySelectorAll("video").forEach((v) => io.observe(v));

/* ------------------------------------------------------------ living tiles (tile_pixel.gd) */
// Every tile, card and button gets the effect layers; the cursor lights the
// borders of everything in its group, and a click selects with the full
// animation and opens the link.
function addFx(el, full) {
  if (el.querySelector(":scope > .fx")) return;
  const clip = full ? `<span class="fx fx-clip"><span class="fx-glow"></span><span class="fx-wipe"></span><span class="fx-shine"></span></span>`
                    : `<span class="fx fx-clip"><span class="fx-glow"></span></span>`;
  el.insertAdjacentHTML("afterbegin", clip + `<span class="fx fx-edge"></span>` + (full ? `<span class="fx fx-wave"></span><span class="fx fx-br"></span>` : ""));
}

function select(el, animate = true) {
  const group = el.closest("[data-group]") || el.parentElement;
  group.querySelectorAll(".is-sel").forEach((t) => { if (t !== el) t.classList.remove("is-sel", "anim"); });
  el.classList.remove("anim");
  void el.offsetWidth;                 // restart the animations
  el.classList.add("is-sel");
  if (animate && !reduced) el.classList.add("anim");
}

function lightUp(container) {
  const items = () => container.querySelectorAll(".tile, .card, .btn");
  container.addEventListener("pointermove", (e) => {
    items().forEach((t) => {
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", e.clientX - r.left + "px");
      t.style.setProperty("--my", e.clientY - r.top + "px");
      t.style.setProperty("--edge", 1);
    });
  });
  container.addEventListener("pointerleave", () => items().forEach((t) => t.style.setProperty("--edge", 0)));
}

function wireTiles() {
  document.querySelectorAll(".tile").forEach((t) => addFx(t, true));
  document.querySelectorAll(".btn").forEach((b) => addFx(b, false));
  document.querySelectorAll(".card").forEach((c) => {
    addFx(c, true);
    c.querySelector(".fx-clip").remove();
    if (c.getAttribute("aria-selected") === "true") c.classList.add("is-sel");
  });

  document.querySelectorAll("[data-group], .cards, [data-glow], .army, .final, .devlog-head").forEach(lightUp);
  document.querySelectorAll("#devlog, .foot").forEach(lightUp);

  document.querySelectorAll("[data-group] .tile").forEach((t) => {
    t.addEventListener("click", (e) => {
      select(t);
      // one click selects and opens; in-page links wait a moment so the selection animation shows
      const href = t.getAttribute("href") || "";
      if (t.tagName === "A" && href.startsWith("#") && !reduced) {
        e.preventDefault();
        setTimeout(() => { location.hash = href; }, 380);
      }
    });
    t.addEventListener("keydown", (e) => {
      if (t.tagName === "ARTICLE" && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(t); }
    });
  });

  // the preselected tile animates in the first time it scrolls into view
  document.querySelectorAll("[data-selected]").forEach((t) => {
    t.classList.add("is-sel");
    const watch = () => new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { select(t); obs.disconnect(); }
    }, { threshold: 0.6 }).observe(t);
    // with the intro running, wait until the hero has cascaded in
    if (document.documentElement.classList.contains("intro-run")) addEventListener("cm:intro-done", () => setTimeout(() => select(t), 420), { once: true });
    else watch();
  });
}
wireTiles();

/* ------------------------------------------------------------ site intro */
(function intro() {
  const root = document.documentElement;
  const box = document.getElementById("intro");
  if (!root.classList.contains("intro-run") || !box) { box && box.remove(); return; }

  // the logo as its 55x5 grid of 20-unit blocks (W = CHECK, B = MANCER)
  const GRID = ["WWWW.WWW..W..W.BBB.BBB..BBB.BBBBB","W....W..W.W..W..B..B..B..B....B..","WWWW.WWW..WWWW..B..BBB...B....B..","...W.W....W..W..B..B.B...B....B..","WWWW.W....W..W.BBB.B..B.BBB...B.."];
  const svg = document.getElementById("intro-logo");
  let rects = "", blue = "";
  GRID.forEach((row, y) => [...row].forEach((c, x) => {
    if (c === ".") return;
    const d = 40 + x * 13 + y * 22 + Math.round(Math.random() * 40);   // left to right, top first
    const r = `<rect class="${c === "W" ? "w" : "b"}" x="${x * 20}" y="${y * 20}" width="20" height="20" style="--d:${d}ms"/>`;
    rects += r;
    if (c === "B") blue += `<rect x="${x * 20}" y="${y * 20}" width="20" height="20"/>`;
  }));
  svg.innerHTML = `<defs><clipPath id="intro-blue">${blue}</clipPath>
    <linearGradient id="intro-glint-g"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".3" stop-color="#fff" stop-opacity=".35"/>
    <stop offset=".4" stop-color="#fff" stop-opacity=".7"/><stop offset=".6" stop-color="#fff" stop-opacity=".7"/><stop offset=".7" stop-color="#fff" stop-opacity=".35"/>
    <stop offset=".7" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>${rects}
    <g clip-path="url(#intro-blue)"><rect class="intro-glint" x="0" y="-20" width="160" height="140" fill="url(#intro-glint-g)"/></g>`;

  const timers = [];
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  let finished = false;

  function reveal() {
    box.classList.remove("covering");
    box.classList.add("leaving");
    root.classList.add("intro-in");
    root.classList.remove("intro-run");
    const hero = document.querySelector(".hero video");
    if (hero) { hero.currentTime = 0; tryPlay(hero); }
    dispatchEvent(new Event("cm:intro-done"));
    setTimeout(() => box.remove(), 450);
    try { sessionStorage.setItem("cm-intro", "1"); } catch (e) {}
  }
  function finish() {            // skip: jump straight to the wipe
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    box.classList.add("covering");
    setTimeout(reveal, 340);
  }

  at(950, () => svg.classList.add("lit"));          // MANCER flashes and the glint passes
  at(1750, finish);                                  // bar is full: wipe in, then out
  box.addEventListener("click", finish);
  addEventListener("keydown", finish, { once: true });
})();

/* ------------------------------------------------------------ country picker */
// Alphabetical list with flags; type to filter, arrows + Enter to pick, Esc to close.
(async function countryPicker() {
  const combo = el("combo"), input = el("f-country"), list = el("country-list"), flag = el("combo-flag");
  const nameOut = el("f-country-name"), codeOut = el("f-country-code");
  if (!combo) return;
  let countries = await (location.protocol === "file:" ? Promise.resolve(window.sphiritOffline.countries) : fetch(ROOT + "assets/countries.json").then((r) => r.json())).catch(() => []);
  // Portuguese page: show the names in Portuguese, but keep sending the English name and the code
  let ptName = null;
  try { ptName = PT ? new Intl.DisplayNames(["pt-BR"], { type: "region" }) : null; } catch (e) {}
  const label = (code, name) => { try { return (ptName && ptName.of(code.toUpperCase())) || name; } catch (e) { return name; } };
  if (ptName) countries = countries.map(([c, n]) => [c, n, label(c, n)]).sort((a, b) => a[2].localeCompare(b[2], "pt-BR"));
  const fold = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const items = countries.map(([code, name, shown = name]) => {
    const li = document.createElement("li");
    li.id = "country-" + code;
    li.setAttribute("role", "option");
    li.dataset.code = code;
    li.dataset.name = name;
    li.dataset.shown = shown;
    li.dataset.key = fold(shown);
    li.setAttribute("aria-selected", "false");
    li.innerHTML = `<img src="${ROOT}assets/flags/${code}.svg" alt="" loading="lazy" width="16" height="12"><span>${shown}</span>`;
    return li;
  });
  list.append(...items);
  const empty = Object.assign(document.createElement("li"), { className: "empty", textContent: tr("No country matches that.", "Nenhum país encontrado.") });
  empty.hidden = true;
  list.append(empty);

  let active = null, chosen = null;
  const visible = () => items.filter((li) => !li.hidden);

  function open() {
    if (!list.hidden) return;
    list.hidden = false;
    combo.classList.add("open");
    input.setAttribute("aria-expanded", "true");
    (chosen || visible()[0])?.scrollIntoView({ block: "nearest" });
  }
  function close() {
    list.hidden = true;
    combo.classList.remove("open");
    input.setAttribute("aria-expanded", "false");
    setActive(null);
  }
  function setActive(li) {
    active?.classList.remove("active");
    active = li;
    if (li) { li.classList.add("active"); input.setAttribute("aria-activedescendant", li.id); li.scrollIntoView({ block: "nearest" }); }
    else input.removeAttribute("aria-activedescendant");
  }
  function choose(li) {
    chosen?.setAttribute("aria-selected", "false");
    chosen = li;
    if (li) {
      li.setAttribute("aria-selected", "true");
      input.value = li.dataset.shown;
      nameOut.value = li.dataset.name;
      codeOut.value = li.dataset.code.toUpperCase();
      flag.innerHTML = `<img src="${ROOT}assets/flags/${li.dataset.code}.svg" alt="">`;
    } else {
      nameOut.value = codeOut.value = "";
      flag.innerHTML = "";
    }
    filter("");
    close();
  }
  function filter(q) {
    const k = fold(q.trim());
    let first = null;
    items.forEach((li) => {
      li.hidden = k !== "" && !li.dataset.key.includes(k);
      if (!li.hidden && !first) first = li;
    });
    // names that start with the query come before ones that only contain it
    if (k) first = items.find((li) => !li.hidden && li.dataset.key.startsWith(k)) || first;
    empty.hidden = !!first;
    setActive(first);
  }

  input.addEventListener("focus", () => { input.select(); open(); });
  input.addEventListener("click", open);
  input.addEventListener("input", () => { open(); filter(input.value); });
  input.addEventListener("keydown", (e) => {
    const vis = visible();
    const i = vis.indexOf(active);
    if (e.key === "ArrowDown") { e.preventDefault(); open(); setActive(vis[Math.min(i + 1, vis.length - 1)] || vis[0]); }
    else if (e.key === "ArrowUp") { e.preventDefault(); open(); setActive(vis[Math.max(i - 1, 0)]); }
    else if (e.key === "Enter" && !list.hidden) { e.preventDefault(); if (active) choose(active); }
    else if (e.key === "Escape") { close(); input.value = chosen ? chosen.dataset.shown : ""; }
  });
  input.addEventListener("blur", () => {
    // typed an exact name: accept it; otherwise snap back to the last choice
    if (!input.value.trim()) { choose(null); return; }   // cleared on purpose
    const exact = items.find((li) => li.dataset.key === fold(input.value.trim()));
    if (exact && exact !== chosen) choose(exact);
    else { input.value = chosen ? chosen.dataset.shown : ""; filter(""); close(); }
  });
  list.addEventListener("mousedown", (e) => e.preventDefault());   // keep focus in the input
  list.addEventListener("click", (e) => { const li = e.target.closest("li[role=option]"); if (li) choose(li); });
  list.addEventListener("mousemove", (e) => { const li = e.target.closest("li[role=option]"); if (li && li !== active) setActive(li); });
})();

/* ------------------------------------------------------------ trailer sound toggle */
const trailer = el("trailer"), soundBtn = el("sound");
if (trailer && soundBtn) soundBtn.addEventListener("click", () => {
  trailer.muted = !trailer.muted;
  if (!trailer.muted) { trailer.currentTime = 0; trailer.play().catch(() => {}); }
  soundBtn.textContent = trailer.muted ? tr("Sound off", "Som desligado") : tr("Sound on", "Som ligado");
  soundBtn.setAttribute("aria-pressed", String(!trailer.muted));
});

/* ------------------------------------------------------------ deep links */
// Arriving on a section link (the Instagram bio's /pt/#access) skips the intro
// (boot.js); land on the section once the page has its final height.
(function deepLink() {
  if (location.hash.length < 2 || document.documentElement.classList.contains("intro-run")) return;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!target) return;
  const go = () => target.scrollIntoView({ behavior: "instant", block: "start" });
  go();
  addEventListener("load", go, { once: true });
})();
