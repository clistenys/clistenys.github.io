const el = id => document.getElementById(id);
const calm = matchMedia("(prefers-reduced-motion: reduce)");
const tabs = el("army-tabs");
let current;
let item;
let playing;

function showAction(animate) {
  playing = animate;
  el("action").src = playing ? item.arquivo : item.poster;
  el("action").alt = item.alt;
  el("motion").textContent = playing ? "Pausar animação" : "Ver animação";
}
function chooseItem(index) {
  item = current.midias[index];
  el("item-name").textContent = item.titulo;
  el("effect").textContent = item.efeito;
  [...el("items").children].forEach((b,i) => b.setAttribute("aria-pressed",i === index));
  showAction(!calm.matches);
}
function chooseProject(index) {
  current = jogos[index];
  const tab = tabs.children[index];
  [...tabs.children].forEach(b => {
    b.setAttribute("aria-selected",b === tab);
    b.tabIndex = b === tab ? 0 : -1;
  });
  select(tab);
  el("army-panel").setAttribute("aria-labelledby",tab.id);
  el("project").textContent = current.nome;
  el("category").textContent = current.genero;
  el("landscape").src = current.capa;
  el("landscape").alt = current.jornada[0];
  el("landscape-name").textContent = current.jornada[0];
  el("items").replaceChildren();
  el("mechanics").replaceChildren();
  current.midias.forEach((m,i) => {
    const b = document.createElement("button");
    b.className = "btn btn-ghost";
    const img = new Image();
    img.src = m.icone; img.alt = "";
    b.append(img,m.titulo);
    b.onclick = () => chooseItem(i);
    el("items").append(b);
    const link = document.createElement("a");
    link.className = "tile"; link.href = "#armies";
    link.textContent = current.modos[i] + " ↗";
    link.onclick = () => {chooseItem(i); b.focus({preventScroll:true});};
    addFx(link,true);
    el("mechanics").append(link);
  });
  chooseItem(0);
}
jogos.forEach((g,i) => {
  const b = document.createElement("button");
  b.id = "tab-" + g.id; b.className = "card";
  b.setAttribute("role","tab"); b.setAttribute("aria-controls","army-panel");
  const img = new Image(); img.src = g.capa; img.alt = "";
  const name = document.createElement("span"); name.textContent = g.nome;
  b.append(img,name); addFx(b,true);
  b.onclick = () => chooseProject(i);
  b.onkeydown = e => {
    const offset = {ArrowLeft:-1,ArrowRight:1}[e.key];
    if (!offset) return;
    e.preventDefault();
    const next = (i+offset+jogos.length)%jogos.length;
    chooseProject(next); tabs.children[next].focus();
  };
  tabs.append(b);
});
chooseProject(0);
el("motion").onclick = () => showAction(!playing);
const trailer = document.querySelector("video");
if (!calm.matches) trailer.play().catch(() => {});
calm.addEventListener("change", () => {if(calm.matches){showAction(false);trailer.pause();}});
document.querySelectorAll(".hero-menu .tile").forEach(tile => {addFx(tile,true);tile.onclick = () => select(tile);});
document.querySelectorAll("[data-group],.cards").forEach(lightUp);
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
  if (animate && !calm.matches) el.classList.add("anim");
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


