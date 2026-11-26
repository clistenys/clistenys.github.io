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
(location.protocol === "file:" ? Promise.resolve(window.checkmancerOffline.icons) : fetch(ROOT + "assets/icons.json").then((r) => r.json())).then((icons) => {
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

/* ------------------------------------------------------------ armies */
const ARMIES = [
  {
    id: "slime", name: "Amoebi", card: "cartao_amoebi.png?v=2", anchor: tr("Vanguard · anchor piece: pawn", "Vanguarda · peça-âncora: peão"),
    desc: tr("A kingdom of slimes that spreads without asking. It moves fast and strikes from any side.",
      "Um reino de slimes que se espalha sem pedir licença. Avança rápido e ataca de qualquer lado."),
    video: "army_slime", caption: tr("Recorded in-game: the pawn turns into a slime, leaps over the knight and takes the rook sideways.",
      "Gravado no jogo: o peão vira slime, salta por cima do cavalo e captura a torre de lado."),
    moves: [
      [tr("Slime", "Slime"), 3, "EXE_SLIME_M1_ICONE_BRANCO.png", tr("At the end of your turn the anchor pawn becomes a slime for 2 rounds: it moves and captures orthogonally.", "No fim do turno o peão-âncora vira slime por 2 rodadas: anda e captura na horizontal e na vertical.")],
      [tr("Slime Shot", "Ataque viscoso"), 3, "EXE_SLIME_M2_ICONE_BRANCO.png", tr("2 damage to an enemy right next to one of your pieces.", "2 de dano num inimigo colado a uma peça sua.")],
      [tr("Slime Leap", "Salto slime"), 2, "EXE_SLIME_M3_ICONE_BRANCO.png", tr("The slime leaps over the piece next to it and lands on the other side. An enemy it leaps over takes 1 damage.", "O slime salta por cima da peça colada e cai do outro lado. Inimigo saltado leva 1 de dano.")],
      [tr("Slime King", "Rei-slime"), 6, "EXE_SLIME_M4_ICONE_BRANCO.png", tr("The anchor pawn becomes a Slime King for good: it moves and captures like a king.", "O peão-âncora vira rei-slime para sempre: anda e captura como um rei.")],
    ],
  },
  {
    id: "unicornio", name: "Astrocéus", card: "cartao_astroceus.png?v=2", anchor: tr("Sentinel · anchor piece: knight", "Sentinela · peça-âncora: cavalo"),
    desc: tr("Mystic creatures that rule the ground. They hold the enemy down and keep the team standing.",
      "Criaturas místicas que dominam o terreno. Prendem o inimigo e mantêm o time de pé."),
    video: "army_unicornio", caption: tr("Recorded in-game: Astral Impact knocks out three pawns, the knight takes the rook and casts Star Call.",
      "Gravado no jogo: o Impacto Astral derruba três peões, o cavalo toma a torre e lança o Chamado Estelar."),
    moves: [
      [tr("Star Call", "Chamado Estelar"), 3, "EXE_UNICORNIO_M_ICONES_BRANCO_M1_1.png", tr("5 traps in a cross, up to 2 squares from the anchor knight, for 3 rounds. An enemy that lands on one takes 2 damage.", "5 armadilhas em cruz, a até 2 casas do cavalo-âncora, por 3 rodadas. Inimigo que pousar numa leva 2 de dano.")],
      [tr("Astral Impact", "Impacto Astral"), 2, "EXE_UNICORNIO_M_ICONES_BRANCO_M2_2.png", tr("1 damage to every enemy next to the chosen allied piece.", "1 de dano em cada inimigo colado à peça aliada escolhida.")],
      [tr("Shining Touch", "Toque Luminoso"), 3, "EXE_UNICORNIO_M_ICONES_BRANCO_M3_3.png", tr("Heals an allied piece for 2.", "Cura 2 de vida de uma peça aliada.")],
      [tr("Veil of Stars", "Véu das Estrelas"), 6, "EXE_UNICORNIO_M_ICONES_BRANCO_M4_4.png", tr("For 4 rounds, enemy rooks, bishops and queens can't see past the chosen square.", "Por 4 rodadas, torres, bispos e damas inimigos não enxergam além da casa escolhida.")],
    ],
  },
  {
    id: "ashaninka", name: "Ashaninka", card: "cartao_ashaninka_v2.png", anchor: tr("Playmaker · anchor piece: rook", "Articulador · peça-âncora: torre"),
    desc: tr("Forest guardians who build up power in their rooks. Patience now, devastating blows later.",
      "Guardiões da floresta que acumulam força nas torres. Paciência agora, golpes devastadores depois."),
    video: "army_ashaninka", caption: tr("Recorded in-game: one more leaf joins the orbit, then a Gust sweeps the a-file.",
      "Gravado no jogo: mais uma folha entra na órbita e a Aragem varre a coluna a."),
    moves: [
      [tr("Ancestral Leaf", "Folha Ancestral"), 1, "EXE_ASHANINKA_M_ICONES_BRANCO_M1_1.png", tr("Adds a leaf to an anchor rook's orbit, up to 5.", "Adiciona uma folha à órbita de uma torre-âncora, até 5.")],
      [tr("Gust", "Aragem"), 3, "EXE_ASHANINKA_M_ICONES_BRANCO_M2_2.png", tr("Hurls every leaf in one direction, piercing enemies: 1 damage each, 3 if spirit.", "Arremessa todas as folhas numa direção, perfurando inimigos: 1 de dano cada, 3 se espiritual.")],
      [tr("Paralysis", "Paralisia"), 3, "EXE_ASHANINKA_M_ICONES_BRANCO_M3_3.png", tr("Spends a leaf to freeze an enemy piece for 2 turns.", "Gasta uma folha para travar uma peça inimiga por 2 turnos.")],
      [tr("Spirit Leaves", "Folhas espirituais"), 6, "EXE_ASHANINKA_M_ICONES_BRANCO_M4_4.png", tr("A rook's leaves turn into spirit leaves that deal 3 damage.", "As folhas de uma torre viram espirituais e passam a causar 3 de dano.")],
    ],
  },
  {
    id: "eclipse", name: tr("Cathedral", "Catedral"), card: "cartao_catedral.png", anchor: tr("Balancer · anchor piece: bishop", "Ponderador · peça-âncora: bispo"),
    desc: tr("A cult that rules the hours between day and night. Behind on pieces it's night and your maneuvers hurt; otherwise it's day and they heal.",
      "Um culto que domina o tempo entre o dia e a noite. Com menos peças é noite e suas manobras ferem; senão, é dia e elas curam."),
    video: "army_eclipse", caption: tr("Recorded in-game: the bishop calls the eclipse, then the Eruption sweeps all four diagonals.",
      "Gravado no jogo: o bispo chama o eclipse e a Erupção varre as quatro diagonais."),
    moves: [
      [tr("Eclipse", "Eclipse"), 3, "EXE_ECLIPSE_M_ICONES_BRANCO_M1_1.png", tr("The anchor bishop calls a solar eclipse: night and day at once, for 2 turns.", "O bispo-âncora chama um eclipse solar: noite e dia ao mesmo tempo, por 2 turnos.")],
      [tr("Candle", "Vela"), 2, "EXE_ECLIPSE_M_ICONES_BRANCO_M2_2.png", tr("A candle that burns adjacent enemies at night, or heals adjacent allies by day.", "Uma vela que queima inimigos vizinhos à noite ou cura aliados vizinhos de dia.")],
      [tr("Incinerate", "Incineração"), 3, "EXE_ECLIPSE_M_ICONES_BRANCO_M3_3.png", tr("For 2 turns, pieces around a candle take double damage at night, or double healing by day.", "Por 2 turnos, peças em volta de uma vela levam dano dobrado à noite ou cura dobrada de dia.")],
      [tr("Eruption", "Erupção"), 7, "EXE_ECLIPSE_M_ICONES_BRANCO_M4_4.png", tr("2 damage, or 2 healing, along all of the bishop's diagonals, to the edge of the board.", "2 de dano, ou 2 de cura, em todas as diagonais do bispo, até a borda do tabuleiro.")],
    ],
  },
  {
    id: "alma", name: "Muertos", card: "cartao_muertos.png", anchor: tr("Vanguard · anchor piece: queen", "Vanguarda · peça-âncora: dama"),
    desc: tr("A haunted queen who never leaves her post. Every death only swells her ranks.",
      "Uma rainha assombrada que nunca abandona seu posto. Cada morte só aumenta suas fileiras."),
    video: "army_alma", caption: tr("Recorded in-game: the Queen marks her square, takes the knight, a spirit rises and she flies back to her soul.",
      "Gravado no jogo: a Dama marca a casa, captura o cavalo, nasce um espírito e ela volta para a alma."),
    moves: [
      [tr("Spectral Mark", "Marca espectral"), 1, "EXE_ESPECTRO_M_ICONES_BRANCO_M1_1.png", tr("Leaves a soul on the Queen's square for 3 turns. While it lasts, the Queen can fly back to it for free.", "Deixa uma alma na casa da Dama por 3 turnos. Enquanto ela existir, a Dama pode voltar para lá sem gastar mana.")],
      [tr("Cursed Crown", "Coroa amaldiçoada"), 3, "EXE_ESPECTRO_M_ICONES_BRANCO_M2_2.png", tr("Crowns an enemy for 3 turns. Spirits, born from every capture, hop toward it and deal 2 damage.", "Coroa uma peça inimiga por 3 turnos. Os espíritos, que nascem a cada captura, pulam até ela e causam 2 de dano.")],
      [tr("Frighten", "Amedrontar"), 3, "EXE_ESPECTRO_M_ICONES_BRANCO_M3_3.png", tr("An enemy next to one of your pieces can move but not capture, for 2 turns.", "Uma peça inimiga colada a uma sua anda, mas não captura, por 2 turnos.")],
      [tr("Whispering Tombstone", "Lápide sussurrante"), 6, "EXE_ESPECTRO_M_ICONES_BRANCO_M4_4.png", tr("A tombstone with 5 HP that sends out a spirit every 2 turns and on every capture around it.", "Uma lápide com 5 de vida que solta um espírito a cada 2 turnos e a cada captura em volta dela.")],
    ],
  },
  {
    id: "espada", name: "Caxias", card: "cartao_caxias.png?v=2", anchor: tr("Playmaker · anchor piece: bishop", "Articulador · peça-âncora: bispo"),
    desc: tr("An order of knights who live by the blade. They hit hard and protect their own.",
      "Uma ordem de cavaleiros que vive pela lâmina. Ataca com força e protege os seus."),
    video: "army_espada", caption: tr("Recorded in-game: the sword falls from the sky, the bishop picks it up and a Triple Slash takes out three pawns.",
      "Gravado no jogo: a espada cai do céu, o bispo a pega e o Corte triplo derruba três peões."),
    moves: [
      [tr("Sword of Caxias", "Espada de Caxias"), 1, "EXE_ESPADA_M_ICONES_BRANCO_M1_1.png", tr("Drives the sword into a square up to 2 diagonal steps from a bishop. The bishop picks it up by landing on it.", "Finca a espada a até 2 casas na diagonal de um bispo. O bispo a pega pousando nela.")],
      [tr("Triple Slash", "Corte triplo"), 3, "EXE_ESPADA_M_ICONES_BRANCO_M2_2.png", tr("The bishop holding the sword slashes 3 squares in an arc: 2 damage to each enemy.", "O bispo com a espada corta 3 casas em arco: 2 de dano em cada inimigo.")],
      [tr("Absolute Shield", "Escudo absoluto"), 2, "EXE_ESPADA_M_ICONES_BRANCO_M3_3.png", tr("One of your pieces ignores enemy maneuver damage and effects until your next turn.", "Uma peça sua fica imune a dano e efeitos de manobras inimigas até o seu próximo turno.")],
      [tr("Falling Sword", "Espada cadente"), 6, "EXE_ESPADA_M_ICONES_BRANCO_M4_4.png", tr("Marks a 3x3 area. On your next turn the sword falls: 3 damage in the center, 1 around it.", "Marca uma área 3x3. No seu próximo turno a espada cai: 3 de dano no centro e 1 em volta.")],
    ],
  },
];

const tabs = document.getElementById("army-tabs");
const el = (id) => document.getElementById(id);
const armyVideo = el("army-video");

ARMIES.forEach((a, i) => {
  const b = document.createElement("button");
  b.className = "card";
  b.setAttribute("role", "tab");
  b.id = "tab-" + a.id;
  b.setAttribute("aria-controls", "army-panel");
  b.innerHTML = `<img src="${SPR + a.card}" alt=""><span>${a.name}</span>`;
  b.addEventListener("click", () => pick(a.id));
  b.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = ARMIES[(i + (e.key === "ArrowRight" ? 1 : ARMIES.length - 1)) % ARMIES.length];
    pick(n.id);
    el("tab-" + n.id).focus();
  });
  tabs.appendChild(b);
});

function pick(id) {
  const a = ARMIES.find((x) => x.id === id);
  tabs.querySelectorAll(".card").forEach((t) => {
    const on = t.id === "tab-" + id;
    t.setAttribute("aria-selected", on);
    t.classList.toggle("is-sel", on);
    if (!on) t.classList.remove("anim");
    t.tabIndex = on ? 0 : -1;
  });
  el("army-panel").setAttribute("aria-labelledby", "tab-" + id);
  el("army-anchor").textContent = a.anchor;
  el("army-name").textContent = a.name;
  el("army-desc").textContent = PT ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : a.desc;
  el("army-caption").textContent = PT ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : a.caption;
  armyVideo.poster = VID + a.video + ".jpg?v=3";
  armyVideo.src = VID + a.video + ".mp4?v=3";   // v=3: re-recorded with the six armies (yuv420p for phones)
  tryPlay(armyVideo);
  el("army-slots").innerHTML = a.classic
    ? `<li class="classic">${["REI_6", "RAINHA_5", "TORRE_4", "BISPO_2", "CAVALO_3", "PEAO_1"]
        .map((p) => `<img src="${SPR}EXE_PADRAO_PECAS_BRANCO_${p}.png" alt="">`).join("")}</li>`
    : a.moves.map(([n, c, icon, d]) => `
      <li class="slot">
        <span class="slot-icon"><img src="${SPR + icon}" alt=""><span class="slot-cost">${c}</span></span>
        <span><span class="slot-name">${n}</span><br><span class="slot-desc">${PT ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : d}</span></span>
      </li>`).join("");
}
pick("slime");

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

// army cards: replay the selection animation whenever an army is picked
tabs.addEventListener("click", (e) => {
  const c = e.target.closest(".card");
  if (c) select(c);
});
tabs.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") setTimeout(() => select(tabs.querySelector('[aria-selected="true"]')), 0);
});

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
  let countries = await (location.protocol === "file:" ? Promise.resolve(window.checkmancerOffline.countries) : fetch(ROOT + "assets/countries.json").then((r) => r.json())).catch(() => []);
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
