import { STR } from "./i18n.js";
import * as St from "./store.js";
import * as Cloud from "./cloud.js";
import { CA_MCQ, CA_ERRORS, CA_THEORY } from "./content/lang-ca.js";
import { ES_MCQ, ES_ERRORS, ES_THEORY } from "./content/lang-es.js";
import { READINGS } from "./content/reading.js";
import { PROMPTS, RUBRIC, CONNECTORS, AUTO_ERRORS } from "./content/writing.js";
import { generate, generateForTopic, MATH_GENERATORS, topicOf, LOGIC, MATH_THEORY } from "./content/math.js";
import { GENERAL_THEORY, OFFICIAL_URL } from "./content/general.js";

// ---------------------------------------------------------------- utilitats
const $app = document.getElementById("app");
const S = () => St.state();
const L = () => S().lang || St.prefs().lang || "ca";
const t = (k, v = {}) => {
  let s = STR[L()][k] ?? STR.ca[k] ?? k;
  if (typeof s === "string") for (const [a, b] of Object.entries(v)) s = s.replaceAll(`{${a}}`, b);
  return s;
};
const tx = (o) => (o && typeof o === "object" && !Array.isArray(o) ? o[L()] ?? o.ca : o);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const pct = (x) => Math.round(x * 100);
const fmtNum = (n) => String(Math.round(n * 100) / 100).replace(".", ",");

// ---------------------------------------------------------------- catàleg
const TOPICS = [
  { id: "lect", area: "ccirc", icon: "📖", name: { ca: "Comprensió lectora", es: "Comprensión lectora" } },
  { id: "escr", area: "ccirc", icon: "✍️", name: { ca: "Expressió escrita", es: "Expresión escrita" } },
  { id: "errors", area: "ccirc", icon: "🔍", name: { ca: "Detecció d'errors", es: "Detección de errores" } },
  { id: "ca_orto", area: "ccirc", icon: "🅰️", name: { ca: "Català · Ortografia", es: "Catalán · Ortografía" } },
  { id: "ca_morf", area: "ccirc", icon: "🧩", name: { ca: "Català · Morfosintaxi", es: "Catalán · Morfosintaxis" } },
  { id: "ca_lex", area: "ccirc", icon: "🚫", name: { ca: "Català · Lèxic", es: "Catalán · Léxico" } },
  { id: "es_orto", area: "ccirc", icon: "🅴", name: { ca: "Castellà · Ortografia", es: "Castellano · Ortografía" } },
  { id: "es_gram", area: "ccirc", icon: "⚖️", name: { ca: "Castellà · Gramàtica", es: "Castellano · Gramática" } },
  { id: "es_lex", area: "ccirc", icon: "🔁", name: { ca: "Castellà · Lèxic", es: "Castellano · Léxico" } },
  { id: "cohesio", area: "ccirc", icon: "🔗", name: { ca: "Connectors i cohesió", es: "Conectores y cohesión" } },
  { id: "num", area: "clom", icon: "🔢", name: { ca: "Nombres i fraccions", es: "Números y fracciones" } },
  { id: "prop", area: "clom", icon: "⚖️", name: { ca: "Proporcionalitat i %", es: "Proporcionalidad y %" } },
  { id: "mesura", area: "clom", icon: "📏", name: { ca: "Mesura i unitats", es: "Medida y unidades" } },
  { id: "geo", area: "clom", icon: "📐", name: { ca: "Geometria", es: "Geometría" } },
  { id: "alg", area: "clom", icon: "🔣", name: { ca: "Àlgebra i equacions", es: "Álgebra y ecuaciones" } },
  { id: "estad", area: "clom", icon: "📊", name: { ca: "Estadística", es: "Estadística" } },
  { id: "prob", area: "clom", icon: "🎲", name: { ca: "Probabilitat", es: "Probabilidad" } },
  { id: "logica", area: "clom", icon: "🧠", name: { ca: "Raonament lògic", es: "Razonamiento lógico" } },
];
const topicById = Object.fromEntries(TOPICS.map((x) => [x.id, x]));
const LANG_TOPICS = ["ca_orto", "ca_morf", "ca_lex", "es_orto", "es_gram", "es_lex", "cohesio"];
const MATH_TOPICS = ["num", "prop", "mesura", "geo", "alg", "estad", "prob", "logica"];

const MCQ = [...CA_MCQ.map((x) => ({ ...x, lang: "ca" })), ...ES_MCQ.map((x) => ({ ...x, lang: "es" })), ...LOGIC.map((x) => ({ ...x, lang: "both" }))];
const MCQ_BY_ID = Object.fromEntries(MCQ.map((x) => [x.id, x]));
const ERRTEXTS = [...CA_ERRORS, ...ES_ERRORS];
const THEORY = [...GENERAL_THEORY, ...CA_THEORY, ...ES_THEORY, ...MATH_THEORY];

const BADGES = [
  { id: "first", icon: "🌱", name: { ca: "Primer pas", es: "Primer paso" }, d: { ca: "Completa la primera sessió", es: "Completa la primera sesión" } },
  { id: "streak3", icon: "🔥", name: { ca: "Encesa", es: "Encendida" }, d: { ca: "3 dies seguits", es: "3 días seguidos" } },
  { id: "streak7", icon: "🏅", name: { ca: "Setmana perfecta", es: "Semana perfecta" }, d: { ca: "7 dies seguits", es: "7 días seguidos" } },
  { id: "streak30", icon: "👑", name: { ca: "Constància reial", es: "Constancia real" }, d: { ca: "30 dies seguits", es: "30 días seguidos" } },
  { id: "perfect", icon: "💯", name: { ca: "Ple de 10", es: "Pleno de 10" }, d: { ca: "Una sessió sense cap error", es: "Una sesión sin ningún error" } },
  { id: "combo10", icon: "⚡", name: { ca: "Llamp", es: "Rayo" }, d: { ca: "10 encerts seguits", es: "10 aciertos seguidos" } },
  { id: "writer", icon: "✍️", name: { ca: "Ploma àgil", es: "Pluma ágil" }, d: { ca: "Primera redacció", es: "Primera redacción" } },
  { id: "hunter", icon: "🔍", name: { ca: "Detectiu", es: "Detective" }, d: { ca: "Troba tots els errors d'un text", es: "Encuentra todos los errores de un texto" } },
  { id: "reader", icon: "📖", name: { ca: "Lectora fina", es: "Lectora fina" }, d: { ca: "15/15 en una lectura", es: "15/15 en una lectura" } },
  { id: "math50", icon: "🧮", name: { ca: "Calculadora humana", es: "Calculadora humana" }, d: { ca: "50 problemes encertats", es: "50 problemas acertados" } },
  { id: "bilingual", icon: "🗣️", name: { ca: "Bilingüe", es: "Bilingüe" }, d: { ca: "20 encerts en català i 20 en castellà", es: "20 aciertos en catalán y 20 en castellano" } },
  { id: "sim", icon: "🎯", name: { ca: "Assaig general", es: "Ensayo general" }, d: { ca: "Fes un simulacre", es: "Haz un simulacro" } },
  { id: "lvl5", icon: "🚀", name: { ca: "Nivell 5", es: "Nivel 5" }, d: { ca: "Arriba al nivell 5", es: "Llega al nivel 5" } },
  { id: "xp2000", icon: "🌟", name: { ca: "Estrella", es: "Estrella" }, d: { ca: "Aconsegueix 2.000 XP", es: "Consigue 2.000 XP" } },
];

// ---------------------------------------------------------------- generació de tasques
function mcqTask(item) {
  const order = shuffle(item.o.map((_, i) => i));
  return { type: "mcq", topic: item.topic, id: item.id, lang: item.lang,
    q: tx(item.q), options: order.map((i) => tx(item.o[i])), correct: order.indexOf(item.a), exp: tx(item.e) };
}
function mathTask(gen) {
  const g = typeof gen === "string" ? generate(gen) : gen;
  const base = { topic: g.topic, lang: "math", q: tx(g.q), steps: tx(g.steps), gen: g.gen };
  if (g.type === "mcq") {
    const order = shuffle(g.o.map((_, i) => i));
    return { ...base, type: "mcq", options: order.map((i) => g.o[i]), correct: order.indexOf(g.a) };
  }
  return { ...base, type: "num", answer: g.answer, tol: g.tol, unit: g.unit ? tx(g.unit) : "" };
}
const errorsTask = (txt) => ({ type: "errors", topic: "errors", lang: txt.lang, data: txt });
const readingTask = (r, withOpen = true) => ({ type: "reading", topic: "lect", lang: r.lang, data: r, withOpen });
const writingTask = (p, mini) => ({ type: "writing", topic: "escr", data: p, mini });

function weightTopic(topic) { return 1.25 - St.mastery(topic); }
function weightedPick(arr, wfn) {
  const w = arr.map(wfn); const tot = w.reduce((a, b) => a + b, 0); let r = Math.random() * tot;
  for (let i = 0; i < arr.length; i++) { r -= w[i]; if (r <= 0) return arr[i]; }
  return arr[arr.length - 1];
}
function pickLangItems(n, topics = LANG_TOPICS, exclude = new Set()) {
  const pool = MCQ.filter((x) => topics.includes(x.topic) && !exclude.has(x.id));
  const seen = S().seen; const out = [];
  // prioritza: no vistes > menys vistes, i temes amb menys domini; alterna català/castellà
  const wanted = topics === LANG_TOPICS ? shuffle(["ca", "es", "ca", "es", "ca", "es", "ca", "es"]) : null;
  for (let k = 0; k < n && pool.length; k++) {
    let cand = pool.filter((x) => !out.includes(x));
    if (!cand.length) break;
    if (wanted) { const c2 = cand.filter((x) => x.lang === wanted[k % wanted.length] || x.topic === "cohesio"); if (c2.length) cand = c2; }
    const it = weightedPick(cand, (x) => weightTopic(x.topic) * (seen[x.id] ? 1 / (1 + seen[x.id]) : 2.5));
    out.push(it);
  }
  return out.map(mcqTask);
}
function pickMath(n) {
  const gens = MATH_GENERATORS.filter((g) => g !== "log_seq");
  const out = [];
  for (let i = 0; i < n; i++) {
    const g = weightedPick(gens.filter((x) => !out.includes(x)), (x) => weightTopic(topicOf(x)));
    out.push(g);
  }
  return out.map(mathTask);
}
function pickReview(n) {
  const ids = shuffle(St.dueItems()).filter((id) => MCQ_BY_ID[id]).slice(0, n);
  return ids.map((id) => mcqTask(MCQ_BY_ID[id]));
}
function leastDone(list, key) {
  const done = S().seen;
  return shuffle(list).sort((a, b) => (done[key + a.id] || 0) - (done[key + b.id] || 0))[0];
}
function rotationBlock() {
  return ["logic", "reading", "errors", "writing", "reading", "errors", "math"][new Date().getDay()];
}
function buildDaily() {
  const tasks = [];
  const review = pickReview(2);
  tasks.push(...pickLangItems(4, LANG_TOPICS, new Set(review.map((x) => x.id))));
  tasks.push(...pickMath(3));
  const b = rotationBlock();
  if (b === "reading") tasks.push(readingTask(leastDone(READINGS, "R_"), false));
  if (b === "errors") tasks.push(errorsTask(leastDone(ERRTEXTS, "E_")));
  if (b === "writing") tasks.push(writingTask(leastDone(PROMPTS, "W_"), true));
  if (b === "logic") { tasks.push(...shuffle(LOGIC).slice(0, 2).map(mcqTask), mathTask("log_seq")); }
  if (b === "math") tasks.push(...pickMath(2), mathTask("log_seq"));
  tasks.push(...(review.length ? review : pickLangItems(1)));
  return { tasks, block: b };
}
function planPreview() {
  const b = rotationBlock();
  return [
    { icon: "🗣️", label: t("p_lang", { n: 5 }) },
    { icon: "🧮", label: t("p_math", { n: b === "math" ? 6 : 3 }) },
    b === "reading" ? { icon: "📖", label: t("b_reading") } : b === "errors" ? { icon: "🔍", label: t("b_errors") } : b === "writing" ? { icon: "✍️", label: t("b_writing") } : b === "logic" ? { icon: "🧠", label: t("b_logic") } : null,
    St.dueItems().length ? { icon: "🔁", label: t("b_review") } : null,
  ].filter(Boolean);
}

// ---------------------------------------------------------------- navegació
let route = { name: "home" };
let run = null;
let timerHandle = null;
function go(name, params = {}) { route = { name, ...params }; render(); window.scrollTo(0, 0); }

// ---------------------------------------------------------------- render principal
function render() {
  clearInterval(timerHandle);
  document.documentElement.lang = L();
  document.title = t("app_name");
  if (!auth.ready) { $app.innerHTML = `<main class="screen center"><div class="logo-big">🍎</div><p class="muted">${t("loading")}</p></main>`; return; }
  if (auth.setup) return renderSetup();
  if (!auth.user) return renderAuth();
  if (route.name === "newpass") return renderNewPass();
  if (route.name === "onboarding") return renderOnboarding();
  if (run) return renderRun();
  const screens = { home: renderHome, practice: renderPractice, theory: renderTheory, theoryItem: renderTheoryItem, progress: renderProgress, settings: renderSettings, list: renderList };
  $app.innerHTML = `<main class="screen">${(screens[route.name] || renderHome)()}</main>${tabbar()}`;
  if (route.name === "progress") loadHistoryInto();
}

// ---------------------------------------------------------------- comptes i núvol
const auth = { ready: false, user: null, setup: false, busy: false, msg: null, email: "" };
let syncState = "ok";

async function boot() {
  if (!Cloud.configured()) { auth.setup = true; auth.ready = true; return render(); }
  const recovery = /type=recovery/.test(location.hash);
  render();
  try {
    const u = await Cloud.getUser();
    if (u) await enterUser(u);
    if (u && recovery) route = { name: "newpass" };
    await Cloud.onAuthChange((ev) => { if (ev === "PASSWORD_RECOVERY" && auth.user) { route = { name: "newpass" }; render(); } });
  } catch (e) { auth.msg = { type: "error", text: authError(e) }; }
  if (recovery) history.replaceState(null, "", location.pathname);
  auth.ready = true; render();
}
async function enterUser(u) {
  auth.user = u; auth.msg = null;
  St.openUser(u.id);
  St.setSaveHook(async (snap) => {
    try { await Cloud.saveProgress(u.id, snap); setSync("ok"); } catch { setSync("off"); }
  });
  try {
    const remote = await Cloud.loadProgress(u.id);
    const which = St.mergeRemote(remote);
    if (which === "local" && S().updatedAt) St.flush();
    setSync("ok");
  } catch { setSync("off"); }
  if (!S().lang) S().lang = St.prefs().lang || (u.user_metadata && u.user_metadata.lang) || "ca";
  flushActivity();
  route = { name: S().onboarded ? "home" : "onboarding" };
}
function setSync(v) { syncState = v; const el = document.getElementById("syncState"); if (el) el.textContent = v === "ok" ? "☁️ " + t("sync_ok") : "📴 " + t("sync_off"); }
async function flushActivity() {
  const q = S().pendingActivity || [];
  if (!auth.user || !q.length) return;
  const batch = q.slice();
  try { await Cloud.logActivity(batch); S().pendingActivity = q.slice(batch.length); St.save(); } catch { /* es reintentarà */ }
}
window.addEventListener("online", () => { flushActivity(); St.flush(); });
function authError(e) {
  const m = String((e && (e.message || e.error_description)) || e);
  if (/Invalid login credentials/i.test(m)) return t("err_credentials");
  if (/already registered|already exists/i.test(m)) return t("err_exists");
  if (/not confirmed/i.test(m)) return t("err_unconfirmed");
  if (/rate limit|security purposes|too many/i.test(m)) return t("err_rate");
  if (/Password should|weak/i.test(m)) return t("err_weak");
  if (/fetch|network|Failed to|Load failed/i.test(m)) return t("err_network");
  return `${t("err_generic")}: ${m}`;
}
const langToggle = () => `<div class="seg small">${["ca", "es"].map((l) => `<button class="${L() === l ? "on" : ""}" data-act="setlang" data-l="${l}">${l === "ca" ? "Català" : "Castellano"}</button>`).join("")}</div>`;
function renderAuth() {
  const mode = route.mode || "login";
  const msg = auth.msg ? `<div class="fb ${auth.msg.type === "error" ? "ko" : "ok"} small">${esc(auth.msg.text)}</div>` : "";
  const title = { login: "auth_login_t", signup: "auth_signup_t", forgot: "forgot" }[mode];
  $app.innerHTML = `<main class="screen onb">
    <div class="row"><span class="grow"></span>${langToggle()}</div>
    <div class="logo-big">🍎</div><h1 class="center">${t("app_name")}</h1><p class="muted center">${t("tagline")}</p>
    <form class="card stack-form" data-submit="auth" novalidate>
      <h2>${t(title)}</h2>${msg}
      <label class="field"><span>${t("email")}</span><input name="email" type="email" autocomplete="email" inputmode="email" required value="${esc(auth.email)}"></label>
      ${mode !== "forgot" ? `<label class="field"><span>${t("password")}</span><input name="password" type="password" autocomplete="${mode === "signup" ? "new-password" : "current-password"}" required minlength="8"></label>` : ""}
      ${mode === "signup" ? `<label class="field"><span>${t("password2")}</span><input name="password2" type="password" autocomplete="new-password" required></label><p class="muted tiny">${t("privacy_note")}</p>` : ""}
      <button class="btn big" type="submit" ${auth.busy ? "disabled" : ""}>${auth.busy ? t("loading") : t(mode === "login" ? "login" : mode === "signup" ? "signup" : "send_reset")}</button>
      ${mode === "login" ? `<button type="button" class="link-btn" data-act="authmode" data-m="forgot">${t("forgot")}</button>` : ""}
    </form>
    <button class="btn alt" data-act="authmode" data-m="${mode === "login" ? "signup" : "login"}">${t(mode === "login" ? "no_account" : "have_account")}</button>
  </main>`;
}
function renderNewPass() {
  const msg = auth.msg ? `<div class="fb ${auth.msg.type === "error" ? "ko" : "ok"} small">${esc(auth.msg.text)}</div>` : "";
  $app.innerHTML = `<main class="screen onb"><div class="logo-big">🔑</div>
    <form class="card stack-form" data-submit="newpass" novalidate><h2>${t("new_pass_t")}</h2>${msg}
      <label class="field"><span>${t("password")}</span><input name="password" type="password" autocomplete="new-password" required></label>
      <label class="field"><span>${t("password2")}</span><input name="password2" type="password" autocomplete="new-password" required></label>
      <button class="btn big" type="submit">${t("save_pass")}</button></form></main>`;
}
function renderSetup() {
  $app.innerHTML = `<main class="screen onb"><div class="logo-big">🛠️</div><h1>${t("setup_t")}</h1>
    <div class="card prose"><p>${t("setup_text")}</p><ol><li>supabase.com → New project</li><li>SQL Editor → <code>supabase/schema.sql</code> → Run</li><li>Project Settings → API → URL + anon key</li><li><code>www/js/config.js</code></li></ol></div></main>`;
}
async function loadHistoryInto() {
  const box = document.getElementById("history"); if (!box) return;
  try {
    const rows = await Cloud.loadHistory(30);
    const el = document.getElementById("history"); if (!el) return;
    if (!rows.length) { el.innerHTML = `<p class="muted">${t("history_empty")}</p>`; return; }
    const loc = L() === "ca" ? "ca-ES" : "es-ES";
    el.innerHTML = `<div class="hist-chart">${rows.slice().reverse().map((r) => { const p = r.total ? r.correct / r.total : 0; return `<i style="height:${Math.max(6, pct(p))}%" class="${p >= .7 ? "good" : p >= .5 ? "mid" : "low"}" title="${pct(p)}%"></i>`; }).join("")}</div>
      <div class="list">${rows.map((r) => {
        const d = new Date(r.created_at);
        const kindTxt = r.mode === "sim" ? (r.kind || "").toUpperCase() : topicById[r.kind] ? tx(topicById[r.kind].name) : "";
        return `<div class="hrow"><span><b>${t("mode_" + r.mode)}</b>${kindTxt ? ` · ${esc(kindTxt)}` : ""}<br><span class="muted tiny">${d.toLocaleDateString(loc, { day: "numeric", month: "short" })} · ${d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })} · ${Math.round(r.minutes || 0)}′</span></span>
          <span class="right-col"><b>${r.correct ?? 0}/${r.total ?? 0}</b>${r.grade != null ? `<span class="chip ok">${fmtNum(r.grade)}</span>` : ""}<span class="muted tiny">+${r.xp || 0} XP</span></span></div>`;
      }).join("")}</div>`;
  } catch { const el = document.getElementById("history"); if (el) el.innerHTML = `<p class="muted">${t("history_err")}</p>`; }
}

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  practice: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/>',
  theory: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  progress: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
function tabbar() {
  const tabs = [["home", "tab_home"], ["practice", "tab_practice"], ["theory", "tab_theory"], ["progress", "tab_progress"], ["settings", "tab_settings"]];
  const active = route.name === "theoryItem" ? "theory" : route.name === "list" ? "practice" : route.name;
  return `<nav class="tabbar">${tabs.map(([id, k]) => `<button class="tab ${active === id ? "on" : ""}" data-act="go" data-to="${id}">${svg(id)}<span>${t(k)}</span></button>`).join("")}</nav>`;
}

// ---------------------------------------------------------------- idioma i onboarding
function renderOnboarding() {
  $app.innerHTML = `<main class="screen onb">
    <div class="row"><span class="grow"></span>${langToggle()}</div>
    <div class="logo-big">🍎</div><h1>${t("onb_title")}</h1><p class="muted">${t("onb_sub")}</p>
    <label class="field"><span>${t("exam_date_q")}</span><input type="date" id="onbDate" value="${S().examDate || ""}"></label>
    <div class="field"><span>${t("goal_q")}</span>
      <div class="seg">${[10, 20, 30].map((m) => `<button class="${S().goal === m ? "on" : ""}" data-act="goal" data-m="${m}">${t("minutes", { n: m })}</button>`).join("")}</div></div>
    <button class="btn big" data-act="onbdone">${t("start")}</button></main>`;
}

// ---------------------------------------------------------------- inici
function ring(p, size = 92, stroke = 10, label = "") {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.min(1, p));
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" class="ring-bg"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 ${size / 2} ${size / 2})"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${label}</text></svg>`;
}
function areaMastery(area) {
  const ids = TOPICS.filter((x) => x.area === area).map((x) => x.id);
  return ids.reduce((a, id) => a + St.mastery(id), 0) / ids.length;
}
function renderHome() {
  const s = S(), lv = St.levelInfo(), d = St.today(), streak = St.currentStreak();
  const doneToday = d.sessions > 0;
  let exam = "";
  if (s.examDate) {
    const days = Math.ceil((new Date(s.examDate + "T00:00") - new Date(St.dayKey() + "T00:00")) / 86400000);
    exam = days > 0 ? t("days_left", { n: days }) : days === 0 ? t("exam_today") : t("exam_past");
  } else exam = `<a href="#" data-act="go" data-to="settings">${t("set_exam")}</a>`;
  const due = St.dueItems().filter((id) => MCQ_BY_ID[id]).length;
  const week = [...Array(7)].map((_, i) => { const dt = new Date(); dt.setDate(dt.getDate() - (6 - i)); const k = St.dayKey(dt); const v = s.days[k]; return { on: v && v.xp > 0, today: i === 6, l: dt.toLocaleDateString(L() === "ca" ? "ca-ES" : "es-ES", { weekday: "narrow" }) }; });
  return `
  <header class="top"><div><div class="muted small">${t("greet")}</div><h1 class="brand">${t("app_name")}</h1></div>
    <div class="chips"><span class="chip fire" title="${t("streak")}">🔥 ${streak}</span><span class="chip xp">⭐ ${s.xp}</span></div></header>
  <section class="card hero">
    <div class="hero-row">${ring(Math.min(1, d.min / s.goal), 96, 11, `${Math.round(d.min)}′`)}
      <div class="grow"><div class="muted small">${t("daily_goal")}</div><div class="h2">${t("min_today", { a: Math.round(d.min), b: s.goal })}</div>
        <div class="lvl"><span class="lvl-badge">${t("level")} ${lv.level}</span><div class="bar"><i style="width:${pct(lv.pct)}%"></i></div></div>
        <div class="muted small">${t("xp_to_next", { n: lv.need - lv.into, l: lv.level + 1 })}</div></div></div>
    <div class="week">${week.map((w) => `<div class="wd ${w.on ? "on" : ""} ${w.today ? "today" : ""}"><i></i><span>${w.l}</span></div>`).join("")}</div>
  </section>
  <section class="card cta-card">
    <div class="muted small upper">${t("today_plan")} · ${t("approx", { n: s.goal })}</div>
    <ul class="plan">${planPreview().map((p) => `<li><span>${p.icon}</span>${p.label}</li>`).join("")}</ul>
    ${doneToday ? `<div class="done-msg">${t("today_done")}</div>` : ""}
    <button class="btn big ${doneToday ? "alt" : "pulse"}" data-act="daily">${doneToday ? t("another") : t("start_today")} →</button>
  </section>
  <section class="card exam">📅 <span>${exam}</span></section>
  ${due ? `<button class="card review-card" data-act="review"><span>🔁 ${t("review_due", { n: due })}</span><span class="link">${t("review_btn")} →</span></button>` : ""}
  <section class="grid2">
    ${["ccirc", "clom"].map((a) => `<button class="card area ${a}" data-act="go" data-to="progress"><div class="area-tag">${a.toUpperCase()}</div><div class="small">${t(a)}</div><div class="big-num">${pct(areaMastery(a))}%</div><div class="bar"><i style="width:${pct(areaMastery(a))}%"></i></div><div class="muted tiny">${t("mastery")}</div></button>`).join("")}
  </section>`;
}

// ---------------------------------------------------------------- practica
function topicCard(tp) {
  const m = St.mastery(tp.id), tt = S().topics[tp.id];
  return `<button class="topic" data-act="topic" data-id="${tp.id}"><span class="ticon">${tp.icon}</span><span class="grow"><b>${tx(tp.name)}</b>
    <span class="bar thin"><i style="width:${pct(m)}%"></i></span><span class="muted tiny">${tt ? `${pct(m)}% ${t("mastery")} · ${t("answered_n", { n: tt.n })}` : t("not_started")}</span></span><span class="chev">›</span></button>`;
}
function renderPractice() {
  const due = St.dueItems().filter((id) => MCQ_BY_ID[id]).length;
  return `<header class="top"><h1>${t("practice_title")}</h1></header>
  <h3 class="sec">🎯 ${t("sims")}</h3>
  <div class="grid2">
    <button class="card sim" data-act="sim" data-k="ccirc"><b>${t("sim_ccirc")}</b><span class="muted small">${t("sim_ccirc_d")}</span></button>
    <button class="card sim clom" data-act="sim" data-k="clom"><b>${t("sim_clom")}</b><span class="muted small">${t("sim_clom_d")}</span></button>
  </div>
  <button class="card review-card" data-act="review"><span>🔁 <b>${t("review_title")}</b><br><span class="muted small">${t("review_d")}</span></span><span class="chip">${due}</span></button>
  <h3 class="sec">🗣️ CCIRC · ${t("ccirc")}</h3>
  <div class="list">${TOPICS.filter((x) => x.area === "ccirc").map(topicCard).join("")}</div>
  <h3 class="sec">🧮 CLOM · ${t("clom")}</h3>
  <div class="list">${TOPICS.filter((x) => x.area === "clom").map(topicCard).join("")}</div>`;
}
function renderList() {
  const k = route.kind; let items = [], title = "";
  if (k === "reading") { title = t("choose_reading"); items = READINGS.map((r) => ({ id: r.id, icon: r.lang === "ca" ? "🟡" : "🔴", title: r.title, sub: r.lang === "ca" ? t("tag_ca") : t("tag_es"), done: S().seen["R_" + r.id] })); }
  if (k === "errors") { title = t("choose_text"); items = ERRTEXTS.map((r) => ({ id: r.id, icon: r.lang === "ca" ? "🟡" : "🔴", title: r.title, sub: r.lang === "ca" ? t("tag_ca") : t("tag_es"), done: S().seen["E_" + r.id] })); }
  if (k === "writing") { title = t("choose_prompt"); items = PROMPTS.map((p) => ({ id: p.id, icon: "✍️", title: tx(p.kind), sub: tx(p).slice(0, 90) + "…", done: S().seen["W_" + p.id] })); }
  return `<header class="top"><button class="icon-btn" data-act="go" data-to="practice">‹</button><h1>${title}</h1><span></span></header>
  <div class="list">${items.map((i) => `<button class="topic" data-act="startitem" data-kind="${k}" data-id="${i.id}"><span class="ticon">${i.icon}</span><span class="grow"><b>${esc(i.title)}</b><span class="muted tiny">${esc(i.sub)}</span></span>${i.done ? `<span class="chip ok">✓ ${t("done")}</span>` : `<span class="chev">›</span>`}</button>`).join("")}</div>`;
}

// ---------------------------------------------------------------- teoria
function renderTheory() {
  const groups = [
    ["th_general", GENERAL_THEORY], ["th_ca", CA_THEORY], ["th_es", ES_THEORY], ["th_math", MATH_THEORY],
  ];
  return `<header class="top"><h1>${t("theory_title")}</h1></header>
  ${groups.map(([k, arr]) => `<h3 class="sec">${t(k)}</h3><div class="list">${arr.map((x) => `<button class="topic" data-act="theory" data-id="${x.id}"><span class="ticon">${x.icon}</span><span class="grow"><b>${tx(x.title)}</b></span><span class="chev">›</span></button>`).join("")}</div>`).join("")}
  <p class="center small"><a href="${OFFICIAL_URL}" target="_blank" rel="noopener">${t("official")}</a></p>`;
}
function renderTheoryItem() {
  const x = THEORY.find((y) => y.id === route.id);
  const html = typeof x.html === "string" ? x.html : tx(x.html);
  const canPractice = x.topic && x.topic !== "info";
  return `<header class="top"><button class="icon-btn" data-act="go" data-to="theory">‹</button><h1 class="small-h">${x.icon} ${tx(x.title)}</h1><span></span></header>
  <article class="card prose">${html}</article>
  ${x.id === "t_pap" ? `<p class="center"><a class="btn alt" href="${OFFICIAL_URL}" target="_blank" rel="noopener">${t("official")}</a></p>` : ""}
  ${canPractice ? `<button class="btn big" data-act="topic" data-id="${x.topic}">${t("practice_topic")} →</button>` : ""}`;
}

// ---------------------------------------------------------------- progrés
function estGrades() {
  const s = S();
  const lang = LANG_TOPICS.reduce((a, id) => a + St.mastery(id), 0) / LANG_TOPICS.length;
  const w = s.writings.slice(-5); const wAvg = w.length ? w.reduce((a, b) => a + b.score, 0) / w.length / 50 : St.mastery("escr");
  const ccirc = (St.mastery("lect") * 30 + wAvg * 50 + ((St.mastery("errors") + lang) / 2) * 20) / 10;
  const clom = MATH_TOPICS.reduce((a, id) => a + St.mastery(id), 0) / MATH_TOPICS.length * 10;
  return { ccirc, clom };
}
function renderProgress() {
  const s = S(), lv = St.levelInfo(), g = estGrades();
  const cells = [];
  const start = new Date(); start.setDate(start.getDate() - 83 - ((start.getDay() + 6) % 7 === 6 ? 0 : 0));
  for (let i = 0; i < 84; i++) { const d = new Date(); d.setDate(d.getDate() - (83 - i)); const v = s.days[St.dayKey(d)]; const xp = v ? v.xp : 0; cells.push(xp === 0 ? 0 : xp < 60 ? 1 : xp < 150 ? 2 : xp < 300 ? 3 : 4); }
  const gauge = (v, label, cls) => `<div class="gauge ${cls}">${ring(v / 10, 104, 12, fmtNum(Math.round(v * 10) / 10))}<div class="small"><b>${label}</b></div></div>`;
  return `<header class="top"><h1>${t("progress_title")}</h1></header>
  <section class="stats">
    <div class="stat"><b>${lv.level}</b><span>${t("level")}</span></div>
    <div class="stat"><b>${s.xp}</b><span>${t("total_xp")}</span></div>
    <div class="stat"><b>🔥${St.currentStreak()}</b><span>${t("best_streak")}: ${s.bestStreak}</span></div>
    <div class="stat"><b>${s.sessions}</b><span>${t("sessions")}</span></div>
  </section>
  <section class="card"><h3>${t("est_grade")}</h3><div class="gauges">${gauge(g.ccirc, "CCIRC", "ccirc")}${gauge(g.clom, "CLOM", "clom")}</div><p class="muted tiny center">${t("est_note")}</p></section>
  <section class="card"><h3>${t("activity")}</h3><div class="heat">${cells.map((c) => `<i class="hm${c}"></i>`).join("")}</div>
    <div class="legend muted tiny">${t("less")} <i class="hm0"></i><i class="hm1"></i><i class="hm2"></i><i class="hm3"></i><i class="hm4"></i> ${t("more")}</div></section>
  <section class="card"><h3>${t("by_topic")}</h3>
    ${["ccirc", "clom"].map((a) => `<div class="area-tag inline ${a}">${a.toUpperCase()}</div>${TOPICS.filter((x) => x.area === a).map((tp) => { const m = St.mastery(tp.id); const acc = St.accuracy(tp.id); return `<div class="mrow"><span>${tp.icon} ${tx(tp.name)}</span><span class="bar thin"><i style="width:${pct(m)}%"></i></span><span class="muted tiny">${acc === null ? "–" : pct(m) + "%"}</span></div>`; }).join("")}`).join("")}
  </section>
  <section class="card"><h3>${t("badges")} · ${s.badges.length}/${BADGES.length}</h3>
    <div class="badges">${BADGES.map((b) => `<div class="badge ${s.badges.includes(b.id) ? "got" : ""}" title="${esc(tx(b.d))}"><span>${b.icon}</span><b>${tx(b.name)}</b><small>${tx(b.d)}</small></div>`).join("")}</div></section>
  <section class="card"><h3>🗓️ ${t("history")}</h3><div id="history"><p class="muted">${t("loading")}</p></div></section>
  <section class="card"><h3>${t("writings")}</h3>
    ${s.writings.length ? `<div class="list">${s.writings.slice(-6).reverse().map((w) => { const p = PROMPTS.find((x) => x.id === w.id); return `<div class="mrow"><span>✍️ ${p ? tx(p.kind) : ""} <span class="muted tiny">${w.date}</span></span><span class="muted tiny">${t("words", { n: w.words })}</span><b>${fmtNum(w.score)}/50</b></div>`; }).join("")}</div>` : `<p class="muted">${t("no_writings")}</p>`}
  </section>`;
}

// ---------------------------------------------------------------- ajustos
function renderSettings() {
  const s = S();
  return `<header class="top"><h1>${t("settings_title")}</h1></header>
  <section class="card"><h3>${t("language")}</h3><div class="seg"><button class="${L() === "ca" ? "on" : ""}" data-act="setlang" data-l="ca">Català</button><button class="${L() === "es" ? "on" : ""}" data-act="setlang" data-l="es">Castellano</button></div></section>
  <section class="card"><h3>${t("exam_date")}</h3><input type="date" id="examDate" value="${s.examDate || ""}" data-change="examdate"></section>
  <section class="card"><h3>${t("daily_goal_set")}</h3><div class="seg">${[10, 20, 30].map((m) => `<button class="${s.goal === m ? "on" : ""}" data-act="goal" data-m="${m}">${t("minutes", { n: m })}</button>`).join("")}</div></section>
  <section class="card"><h3>👤 ${t("account")}</h3><p class="small"><b>${esc(auth.user ? auth.user.email : "")}</b></p>
    <p class="muted small" id="syncState">${syncState === "ok" ? "☁️ " + t("sync_ok") : "📴 " + t("sync_off")}</p>
    <div class="stack-form"><button class="btn alt" data-act="logout">${t("logout")}</button>
    <button class="btn danger" data-act="reset">${t("reset")}</button>
    <button class="btn danger" data-act="delaccount">${t("delete_account")}</button></div></section>
  <section class="card"><h3>${t("about")}</h3><p class="small">${t("about_text")}</p><p><a href="${OFFICIAL_URL}" target="_blank" rel="noopener">${t("official")}</a></p><p class="muted tiny">v1.0</p></section>`;
}

// ---------------------------------------------------------------- execució de sessions
function startRun(tasks, mode = "daily", extra = {}) {
  run = { tasks, i: 0, mode, results: [], xp: 0, combo: 0, maxCombo: 0, start: Date.now(), cur: {}, newBadges: [], levelBefore: St.levelInfo().level, kind: mode === "practice" && tasks[0] ? tasks[0].topic : null, ...extra };
  render(); window.scrollTo(0, 0);
}
function runHeader() {
  const p = run.i / run.tasks.length;
  return `<header class="run-top"><button class="icon-btn" data-act="quit" aria-label="close">✕</button>
    <div class="bar grow"><i style="width:${pct(p)}%"></i></div>
    ${run.combo >= 3 ? `<span class="chip fire pop">🔥 ${t("combo", { n: run.combo })}</span>` : `<span class="chip xp">⭐ ${run.xp}</span>`}
    ${run.mode === "sim" ? `<span class="chip" id="simTimer">⏱ 0:00</span>` : ""}</header>`;
}
function tagFor(task) {
  if (task.type === "writing") return `<span class="tag lg">${tx(task.data.kind)}</span>`;
  if (task.lang === "ca") return `<span class="tag ca">${t("tag_ca")}</span>`;
  if (task.lang === "es") return `<span class="tag es">${t("tag_es")}</span>`;
  if (task.topic === "logica") return `<span class="tag lg">${t("tag_logic")}</span>`;
  return `<span class="tag mt">${t("tag_math")}</span>`;
}
function renderRun() {
  if (run.i >= run.tasks.length) return renderRunEnd();
  const task = run.tasks[run.i];
  const tp = topicById[task.topic];
  const body = { mcq: renderMcq, num: renderNum, errors: renderErrors, reading: renderReading, writing: renderWriting }[task.type](task);
  $app.innerHTML = `<main class="screen run">${runHeader()}<div class="meta">${tagFor(task)}<span class="muted small">${tp ? tp.icon + " " + tx(tp.name) : ""}</span><span class="muted small right">${t("question_n", { a: run.i + 1, b: run.tasks.length })}</span></div>${body}</main>`;
  if (run.mode === "sim") {
    const el = () => document.getElementById("simTimer");
    const tick = () => { const s = Math.floor((Date.now() - run.start) / 1000); if (el()) el().textContent = `⏱ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
    tick(); timerHandle = setInterval(tick, 1000);
  }
  if (task.type === "writing") setupWriting(task);
  const f = document.querySelector("[autofocus]"); if (f) f.focus({ preventScroll: true });
}

function feedback(ok, extraHtml, correctTxt) {
  const cheer = ok ? pick(t("cheer")) : t("wrong_fb");
  return `<div class="fb ${ok ? "ok" : "ko"} slide-up"><div class="fb-h">${ok ? "✅" : "❌"} <b>${cheer}</b>${ok && run.cur.gain ? `<span class="gain">+${run.cur.gain} XP</span>` : ""}</div>
    ${!ok && correctTxt ? `<div class="small">${t("answer_was", { a: correctTxt })}</div>` : ""}${extraHtml || ""}
    <button class="btn big" data-act="next" autofocus>${t("continue")} →</button></div>`;
}
function stepsHtml(steps) { return steps && steps.length ? `<details open class="steps"><summary>${t("solution")}</summary><ol>${steps.map((s) => `<li>${s}</li>`).join("")}</ol></details>` : ""; }

function renderMcq(task) {
  const c = run.cur;
  return `<h2 class="q">${task.q}</h2><div class="opts">${task.options.map((o, i) => {
    let cls = ""; if (c.answered) { if (i === task.correct) cls = "right"; else if (i === c.sel) cls = "wrong"; else cls = "dim"; }
    return `<button class="opt ${cls}" data-act="pick" data-i="${i}" ${c.answered ? "disabled" : ""}><span class="letter">${"ABCD"[i]}</span><span>${o}</span></button>`;
  }).join("")}</div>
  ${c.answered ? feedback(c.ok, task.exp ? `<p class="exp">💡 ${task.exp}</p>` : stepsHtml(task.steps), null) : ""}`;
}
function renderNum(task) {
  const c = run.cur;
  return `<h2 class="q">${task.q}</h2>
  <form class="numrow" data-submit="checknum"><input id="numIn" inputmode="decimal" autocomplete="off" placeholder="${t("type_answer")}" value="${esc(c.val || "")}" ${c.answered ? "disabled" : "autofocus"} class="${c.answered ? (c.ok ? "right" : "wrong") : ""}"><span class="unit">${task.unit || ""}</span></form>
  ${c.answered ? feedback(c.ok, stepsHtml(task.steps), `${fmtNum(task.answer)} ${task.unit || ""}`) : `<div class="row"><button class="btn ghost" data-act="idk">${t("dont_know")}</button><button class="btn big grow" data-act="checknum">${t("check")}</button></div>`}`;
}
function parseNum(s) {
  s = String(s).trim().replace(/\s/g, "").replace(/[€%a-zA-Zªº²³]+$/g, "");
  if (s.includes("/")) { const [a, b] = s.split("/").map(Number); return a / b; }
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  return s === "" ? NaN : Number(s);
}

function gainFor(ok) {
  if (!ok) { run.combo = 0; return 0; }
  run.combo++; run.maxCombo = Math.max(run.maxCombo, run.combo);
  return 10 + Math.min(10, (run.combo - 1) * 2);
}
function answer(task, ok, itemId) {
  run.cur.answered = true; run.cur.ok = ok;
  const g = gainFor(ok) || 2; run.cur.gain = ok ? g : 0;
  run.xp += g; St.addXP(g);
  run.results.push({ topic: task.topic, ok });
  St.record(task.topic, ok, itemId);
  if (run.maxCombo >= 10) badge("combo10");
  if (navigator.vibrate) try { navigator.vibrate(ok ? 15 : [30, 40, 30]); } catch {}
}

// ---- caça d'errors
function parseErrText(text) {
  const segs = []; const re = /\{([^|}]+)\|([^|}]*)\|([^}]*)\}/g; let last = 0, m, ei = 0, wi = 0;
  const pushPlain = (s) => { for (const part of s.split(/([\p{L}\d·'’-]+)/u)) { if (!part) continue; if (/^[\p{L}\d·'’-]+$/u.test(part)) segs.push({ k: "w" + wi++, txt: part }); else segs.push({ txt: part }); } };
  while ((m = re.exec(text))) { pushPlain(text.slice(last, m.index)); segs.push({ k: "e" + ei++, txt: m[1], fix: m[2], why: m[3], err: true }); last = re.lastIndex; }
  pushPlain(text.slice(last));
  return { segs, n: ei };
}
function renderErrors(task) {
  const c = run.cur; if (!c.parsed) { c.parsed = parseErrText(task.data.text); c.sel = new Set(); }
  const { segs, n } = c.parsed;
  const textHtml = segs.map((s) => {
    if (!s.k) return esc(s.txt);
    const on = c.sel.has(s.k);
    if (!c.answered) return `<span class="tok ${on ? "sel" : ""}" data-act="tok" data-k="${s.k}">${esc(s.txt)}</span>`;
    if (s.err) return on ? `<span class="tok found">${esc(s.txt)}<sup>${esc(s.fix)}</sup></span>` : `<span class="tok missed">${esc(s.txt)}<sup>${esc(s.fix)}</sup></span>`;
    return on ? `<span class="tok fp">${esc(s.txt)}</span>` : esc(s.txt);
  }).join("");
  let res = "";
  if (c.answered) {
    const errs = segs.filter((s) => s.err);
    res = `<div class="fb ${c.found === n ? "ok" : c.found >= n / 2 ? "mid" : "ko"} slide-up"><div class="fb-h">🔍 <b>${t("found", { a: c.found, b: n })}</b><span class="gain">+${c.gain} XP</span></div>
      ${c.fp ? `<div class="small">⚠️ ${t("false_pos", { n: c.fp })}</div>` : ""}
      <h4>${t("err_list")}</h4><ol class="errlist">${errs.map((s) => `<li class="${c.sel.has(s.k) ? "okk" : "koo"}"><s>${esc(s.txt)}</s> → <b>${esc(s.fix)}</b> ${c.sel.has(s.k) ? "✅" : `<span class="muted tiny">(${t("missed")})</span>`}<div class="small muted">${esc(s.why)}</div></li>`).join("")}</ol>
      <button class="btn big" data-act="next">${t("continue")} →</button></div>`;
  }
  return `<h2 class="q small-q">${esc(task.data.title)}</h2><p class="small">${t("errors_instr", { n })}</p>
    <div class="card errtext ${c.answered ? "done" : ""}">${textHtml}</div>
    ${c.answered ? res : `<div class="row"><span class="muted small">${t("selected_n", { n: c.sel.size })}</span><button class="btn big grow" data-act="correcterr">${t("correct_btn")}</button></div>`}`;
}

// ---- lectura
function renderReading(task) {
  const r = task.data, c = run.cur; c.ans ||= {};
  const showText = c.showText !== false;
  const qs = r.mcq.map((q, qi) => {
    const order = (c.orders ||= {})[qi] ||= shuffle(q.o.map((_, i) => i));
    return `<div class="rq"><p><b>${qi + 1}.</b> ${q.q}</p><div class="opts compact">${order.map((oi) => {
      let cls = c.ans[qi] === oi ? "picked" : "";
      if (c.graded) { cls = oi === q.a ? "right" : c.ans[qi] === oi ? "wrong" : "dim"; }
      return `<button class="opt ${cls}" data-act="rpick" data-q="${qi}" data-o="${oi}" ${c.graded ? "disabled" : ""}>${q.o[oi]}</button>`;
    }).join("")}</div>${c.graded ? `<p class="exp small">${c.ans[qi] === undefined ? "⚪ " + t("blank") + " · " : ""}💡 ${q.e}</p>` : ""}</div>`;
  }).join("");
  let after = "";
  if (!c.graded) after = `<p class="muted small center">${t("answer_all")}</p><button class="btn big" data-act="gradereading">${t("correct_btn")}</button>`;
  else {
    after = `<div class="fb ${c.score >= 12 ? "ok" : c.score >= 7.5 ? "mid" : "ko"}"><div class="fb-h">📖 ${t("score_pap", { a: fmtNum(c.score) })}<span class="gain">+${c.gain} XP</span></div></div>`;
    const oq = r.open && r.open[0];
    if (task.withOpen && oq && !c.openDone) {
      after += `<div class="card"><h4>✍️ ${t("open_q")}</h4><p>${oq.q}</p><textarea id="openAns" rows="4" placeholder="${t("write_answer")}">${esc(c.openTxt || "")}</textarea>
        ${c.showModel ? `<div class="model"><b>${t("model")}:</b> ${oq.model}</div><p class="small">${t("self_eval")}</p><div class="row wrap"><button class="btn ok" data-act="selfeval" data-v="2">${t("self_good")}</button><button class="btn mid" data-act="selfeval" data-v="1">${t("self_partial")}</button><button class="btn ko" data-act="selfeval" data-v="0">${t("self_bad")}</button></div>`
          : `<div class="row"><button class="btn ghost" data-act="skipopen">${t("skip")}</button><button class="btn grow" data-act="showmodel">${t("see_model")}</button></div>`}</div>`;
    } else after += `<button class="btn big" data-act="next">${t("continue")} →</button>`;
  }
  return `<h2 class="q small-q">${esc(r.title)}</h2><p class="small">${t("reading_instr")}</p>
    <button class="btn ghost small" data-act="toggletext">${showText ? t("hide_text") : t("show_text")}</button>
    ${showText ? `<article class="card reading-text">${r.text.split("\n\n").map((p) => `<p>${esc(p)}</p>`).join("")}</article>` : ""}
    ${qs}${after}`;
}

// ---- redacció
function renderWriting(task) {
  const p = task.data, c = run.cur;
  c.wlang ||= L(); c.text ||= "";
  const [a, b] = task.mini ? [120, 200] : [250, 400];
  if (!c.analysis) {
    return `<div class="card prompt"><div class="tag mt">${tx(p.kind)}</div><p>${tx(p)}</p></div>
      <div class="row wrap"><span class="small">${t("writing_lang")}</span><div class="seg small">${["ca", "es"].map((l) => `<button class="${c.wlang === l ? "on" : ""}" data-act="wlang" data-l="${l}">${l === "ca" ? "Català" : "Castellano"}</button>`).join("")}</div>
      <span class="chip right" id="wTimer">⏱</span></div>
      <textarea id="wText" class="writing" placeholder="${t("write_here")}" spellcheck="false">${esc(c.text)}</textarea>
      <div class="row"><span class="small" id="wCount">${t("words", { n: wc(c.text) })}</span><span class="muted tiny">${t("target_words", { a, b })}</span></div>
      <button class="btn big" data-act="analyze" id="wAnalyze">${t("analyze")}</button>`;
  }
  const an = c.analysis;
  const rub = c.rub ||= {};
  const total = rubTotal(rub);
  return `<div class="card"><h3>🤖 ${t("auto_report")}</h3>
    <div class="stats mini"><div class="stat"><b>${an.words}</b><span>${t("words", { n: "" }).trim()}</span></div><div class="stat"><b>${an.paras}</b><span>${t("paragraphs")}</span></div><div class="stat"><b>${an.sents}</b><span>${t("sentences")}</span></div><div class="stat"><b>${an.avg}</b><span>${t("avg_sentence")}</span></div></div>
    <h4>🔗 ${t("connectors")} (${an.conns.length})</h4>${an.conns.length ? `<div class="chips wrap">${an.conns.map((x) => `<span class="chip ok">${esc(x)}</span>`).join("")}</div>` : `<p class="small">${t("no_connectors")}</p>`}
    <h4>⚠️ ${t("detected_errors")} (${an.errs.length})</h4>${an.errs.length ? `<ul class="errlist">${an.errs.map((e) => `<li><s>${esc(e.m)}</s> → <b>${esc(e.fix)}</b> <span class="small muted">${esc(e.why)}</span></li>`).join("")}</ul>` : `<p class="small">✅ ${t("no_errors")}</p>`}
    ${an.reps.length ? `<h4>🔁 ${t("repeated")}</h4><div class="chips wrap">${an.reps.map(([w, n]) => `<span class="chip warn">${esc(w)} ×${n}</span>`).join("")}</div>` : ""}
    ${an.tips.length ? `<ul class="tips">${an.tips.map((x) => `<li>💡 ${x}</li>`).join("")}</ul>` : ""}
  </div>
  <div class="card"><h3>📋 ${t("rubric")}</h3><p class="muted small">${t("rubric_help")}</p>
    <div class="rub-item"><span>${t("global")} <span class="muted tiny">(0–5)</span></span>${rubBtns("g", rub)}</div>
    ${RUBRIC.map((sec) => `<h4>${tx(sec.name)} <span class="muted tiny">/15</span></h4>${sec.items.map((it, i) => `<div class="rub-item"><span class="small">${tx(it)}</span>${rubBtns(sec.id + i, rub)}</div>`).join("")}`).join("")}
    <div class="grade"><span>${t("grade_est")}</span><b>${fmtNum(Math.max(0, total - an.errs.length))} / 50</b>${an.errs.length ? `<span class="muted tiny">${t("penalty", { n: an.errs.length })}</span>` : ""}</div>
    <button class="btn big" data-act="savewriting">${t("save_writing")} →</button></div>`;
}
const wc = (s) => (s.trim().match(/[\p{L}\d'’·-]+/gu) || []).length;
function rubBtns(key, rub) {
  return `<div class="seg tiny-seg">${[0, 2.5, 5].map((v, i) => `<button class="${rub[key] === v ? "on" : ""}" data-act="rub" data-k="${key}" data-v="${v}">${t("rub" + i)}</button>`).join("")}</div>`;
}
function rubTotal(rub) { return Object.values(rub).reduce((a, b) => a + b, 0); }
function setupWriting(task) {
  const c = run.cur; if (c.analysis) return;
  const ta = document.getElementById("wText"), cnt = document.getElementById("wCount"), tm = document.getElementById("wTimer");
  const limit = (task.mini ? 12 : 40) * 60;
  c.wStart ||= Date.now();
  ta.addEventListener("input", () => { c.text = ta.value; cnt.textContent = t("words", { n: wc(ta.value) }); });
  const tick = () => {
    const left = limit - Math.floor((Date.now() - c.wStart) / 1000);
    tm.textContent = left > 0 ? `⏱ ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}` : "⏱ 0:00";
    tm.classList.toggle("warn", left < 120);
  };
  tick(); timerHandle = setInterval(tick, 1000);
}
function boundaryRe(re) {
  const src = re.source.replace(/^\\b/, "(?<![\\p{L}\\d])").replace(/\\b$/, "(?![\\p{L}\\d])").replace(/\\w/g, "\\p{L}");
  return new RegExp(src, (re.flags.includes("i") ? "i" : "") + "gu");
}
function reEsc(s) { return s.replace(/[.*+?^$()|[\]\\{}]/g, "\\$&"); }
function analyzeText(text, lang) {
  const words = wc(text);
  const paras = text.split(/\n\s*\n|\n/).filter((p) => p.trim().length > 0).length;
  const sentArr = text.split(/[.!?…]+/).map((s) => s.trim()).filter((s) => wc(s) > 0);
  const sents = sentArr.length || 1;
  const low = " " + text.toLowerCase().replace(/\s+/g, " ") + " ";
  const found = CONNECTORS[lang].filter((cn) => new RegExp("(?<![\\p{L}])" + reEsc(cn) + "(?![\\p{L}])", "u").test(low));
  const conns = found.filter((cn) => !found.some((o) => o !== cn && o.includes(cn) && low.split(cn).length - 1 <= low.split(o).length - 1));
  const errs = [];
  for (const e of AUTO_ERRORS[lang]) { const re = boundaryRe(e.re); let m; while ((m = re.exec(text))) errs.push({ m: m[0], fix: e.fix, why: e.why }); }
  const stop = new Set((lang === "ca" ? "el la els les un una uns unes de del dels a al als i o que en per amb no es és són hi ho li em et ens us se sa seu seva seus seves més però com perquè quan ja molt també aquest aquesta aquests aquestes això meu meva tot tots totes ha han he hem fer pot" : "el la los las un una unos unas de del a al y o que en por con no se es son lo le les me te nos os su sus más pero como porque cuando ya muy también este esta estos estas eso mi mis todo todos todas ha han he hemos hacer puede para").split(" "));
  const freq = {}; for (const w of text.toLowerCase().match(/[\p{L}'’·-]+/gu) || []) if (w.length > 3 && !stop.has(w)) freq[w] = (freq[w] || 0) + 1;
  const reps = Object.entries(freq).filter(([, n]) => n >= Math.max(4, Math.ceil(words / 60))).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const long = sentArr.filter((s) => wc(s) > 40).length;
  const tips = [];
  if (paras < 3) tips.push(t("tip_paragraphs"));
  if (words < 100) tips.push(t("tip_short"));
  if (conns.length < 4) tips.push(t("tip_conn"));
  if (long) tips.push(t("long_sentences", { n: long }));
  return { words, paras, sents, avg: Math.round(words / sents), conns, errs, reps, tips };
}

// ---- final de sessió
function renderRunEnd() {
  if (!run.finished) finishRun();
  const r = run, ok = r.results.filter((x) => x.ok).length, tot = r.results.length;
  const mins = Math.max(1, Math.round((Date.now() - r.start) / 60000));
  const lvNow = St.levelInfo().level;
  $app.innerHTML = `<main class="screen center end">
    <div class="confetti">${[...Array(28)].map((_, i) => `<i style="--x:${Math.random() * 100}%;--d:${(Math.random() * 1.5 + 0.8).toFixed(2)}s;--r:${Math.floor(Math.random() * 360)}deg;--c:${i % 5}"></i>`).join("")}</div>
    <div class="trophy">${tot && ok === tot ? "🏆" : ok / Math.max(1, tot) > 0.6 ? "🎉" : "💪"}</div>
    <h1>${r.mode === "sim" ? t("sim_done") : t("session_done")}</h1>
    ${lvNow > r.levelBefore ? `<div class="chip xp big-chip">${t("level_up", { n: lvNow })}</div>` : ""}
    ${r.mode === "sim" && r.simGrade !== undefined ? `<p class="h2">${t("sim_grade", { n: fmtNum(r.simGrade) })}</p>` : ""}
    <section class="stats">
      <div class="stat"><b>${ok}/${tot}</b><span>${t("correct_count")}</span></div>
      <div class="stat"><b>+${r.xp}</b><span>${t("xp_gained")}</span></div>
      <div class="stat"><b>${mins}′</b><span>${t("time")}</span></div>
      <div class="stat"><b>🔥${St.currentStreak()}</b><span>${t("streak")}</span></div>
    </section>
    ${r.newBadges.length ? `<h3>${t("new_badges")}</h3><div class="badges">${r.newBadges.map((id) => { const b = BADGES.find((x) => x.id === id); return `<div class="badge got pop"><span>${b.icon}</span><b>${tx(b.name)}</b><small>${tx(b.d)}</small></div>`; }).join("")}</div>` : ""}
    <button class="btn big" data-act="endrun">${t("back_home")}</button></main>`;
}
function finishRun() {
  run.finished = true;
  const s = S(), mins = Math.min(60, (Date.now() - run.start) / 60000);
  St.addMinutes(Math.max(1, mins));
  const ok = run.results.filter((x) => x.ok).length, tot = run.results.length;
  if (run.mode === "daily" || run.mode === "sim") { s.sessions++; St.today().sessions++; }
  if (run.mode === "sim") {
    run.simGrade = tot ? Math.round((ok / tot) * 100) / 10 : 0;
    s.sims.push({ date: St.dayKey(), kind: run.simKind, grade: run.simGrade }); badge("sim");
  }
  if (run.mode === "daily" || run.mode === "sim") badge("first");
  if (tot >= 6 && ok === tot) { s.perfect++; badge("perfect"); }
  St.touchStreak();
  checkGlobalBadges();
  // Històric al núvol
  const byTopic = {};
  for (const r of run.results) { const b = (byTopic[r.topic] ||= [0, 0]); b[1]++; if (r.ok) b[0]++; }
  const w = run.tasks.find((x) => x.type === "writing");
  const lastW = w ? s.writings[s.writings.length - 1] : null;
  s.pendingActivity = s.pendingActivity || [];
  s.pendingActivity.push({
    created_at: new Date().toISOString(), mode: run.mode, kind: run.simKind || run.kind || "mixed",
    correct: ok, total: tot, xp: run.xp, minutes: Math.round(mins * 10) / 10,
    grade: run.mode === "sim" ? run.simGrade : lastW ? lastW.score : null,
    details: { topics: byTopic, maxCombo: run.maxCombo, level: St.levelInfo().level },
  });
  St.save();
  flushActivity();
}
function badge(id) { if (St.award(id)) { run && run.newBadges.push(id); toast(t("badge_got", { n: tx(BADGES.find((b) => b.id === id).name) })); } }
function checkGlobalBadges() {
  const s = S(), st = St.currentStreak();
  if (st >= 3) badge("streak3"); if (st >= 7) badge("streak7"); if (st >= 30) badge("streak30");
  if (St.levelInfo().level >= 5) badge("lvl5"); if (s.xp >= 2000) badge("xp2000");
  const sumC = (ids) => ids.reduce((a, id) => a + (s.topics[id]?.c || 0), 0);
  if (sumC(MATH_TOPICS) >= 50) badge("math50");
  if (sumC(["ca_orto", "ca_morf", "ca_lex"]) >= 20 && sumC(["es_orto", "es_gram", "es_lex"]) >= 20) badge("bilingual");
}
function toast(msg) {
  const el = document.createElement("div"); el.className = "toast"; el.textContent = msg; document.body.appendChild(el);
  setTimeout(() => el.classList.add("show"), 10); setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 400); }, 2600);
}

// ---------------------------------------------------------------- accions
function startTopic(id) {
  if (id === "lect") return go("list", { kind: "reading" });
  if (id === "escr") return go("list", { kind: "writing" });
  if (id === "errors") return go("list", { kind: "errors" });
  if (LANG_TOPICS.includes(id)) return startRun(pickLangItems(8, [id]), "practice");
  if (id === "logica") return startRun([...shuffle(LOGIC).slice(0, 4).map(mcqTask), mathTask("log_seq"), mathTask("log_seq")], "practice");
  return startRun([...Array(6)].map(() => mathTask(generateForTopic(id))), "practice");
}
function startSim(kind) {
  if (kind === "ccirc") {
    startRun([readingTask(pick(READINGS), false), errorsTask(pick(ERRTEXTS)), ...pickLangItems(6)], "sim", { simKind: "ccirc" });
  } else {
    const gens = shuffle(MATH_GENERATORS.filter((g) => g !== "log_seq")).slice(0, 8);
    startRun([...gens.map(mathTask), ...shuffle(LOGIC).slice(0, 2).map(mcqTask)], "sim", { simKind: "clom" });
  }
}
function nextTask() { run.i++; run.cur = {}; render(); window.scrollTo(0, 0); }

const ACTIONS = {
  setlang: (el) => { St.setPref("lang", el.dataset.l); if (auth.user) { S().lang = el.dataset.l; St.save(); } render(); },
  goal: (el) => { S().goal = Number(el.dataset.m); St.save(); render(); },
  onbdone: () => { const d = document.getElementById("onbDate").value; S().examDate = d || null; S().onboarded = true; S().lang = L(); St.save(); go("home"); },
  authmode: (el) => { const f = document.querySelector('[name="email"]'); if (f) auth.email = f.value.trim(); auth.msg = null; route = { name: "auth", mode: el.dataset.m }; render(); },
  auth: async (f) => {
    if (auth.busy) return;
    const mode = route.mode || "login";
    const email = f.email.value.trim(); auth.email = email;
    const pw = f.password ? f.password.value : "";
    const fail = (k) => { auth.msg = { type: "error", text: t(k) }; render(); };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("err_email");
    if (mode !== "forgot" && pw.length < 8) return fail("err_short");
    if (mode === "signup" && pw !== f.password2.value) return fail("err_match");
    auth.busy = true; auth.msg = null; render();
    try {
      if (mode === "forgot") {
        const { error } = await Cloud.sendReset(email); if (error) throw error;
        auth.msg = { type: "info", text: t("reset_sent") }; route = { name: "auth", mode: "login" };
      } else if (mode === "signup") {
        const { data, error } = await Cloud.signUp(email, pw, L()); if (error) throw error;
        if (data.user && data.user.identities && data.user.identities.length === 0) throw new Error("already registered");
        if (data.session) await enterUser(data.user);
        else { auth.msg = { type: "info", text: t("check_email") }; route = { name: "auth", mode: "login" }; }
      } else {
        const { data, error } = await Cloud.signIn(email, pw); if (error) throw error;
        await enterUser(data.user);
      }
    } catch (e) { auth.msg = { type: "error", text: authError(e) }; }
    auth.busy = false; render();
  },
  newpass: async (f) => {
    const pw = f.password.value;
    if (pw.length < 8) { auth.msg = { type: "error", text: t("err_short") }; return render(); }
    if (pw !== f.password2.value) { auth.msg = { type: "error", text: t("err_match") }; return render(); }
    try { const { error } = await Cloud.updatePassword(pw); if (error) throw error; auth.msg = null; toast(t("pass_updated")); go(S().onboarded ? "home" : "onboarding"); }
    catch (e) { auth.msg = { type: "error", text: authError(e) }; render(); }
  },
  logout: async () => {
    try { await St.flush(); await flushActivity(); } catch {}
    try { await Cloud.signOut(); } catch {}
    St.closeUser(); auth.user = null; auth.msg = null; run = null; route = { name: "auth", mode: "login" }; render();
  },
  delaccount: async () => {
    if (!confirm(t("delete_confirm"))) return;
    const id = auth.user.id;
    try { await Cloud.deleteAccount(); St.clearLocalUser(id); St.closeUser(); auth.user = null; route = { name: "auth", mode: "signup" }; auth.msg = { type: "info", text: t("deleted") }; render(); }
    catch (e) { toast(authError(e)); }
  },
  go: (el, ev) => { ev.preventDefault(); go(el.dataset.to); },
  daily: () => { const { tasks } = buildDaily(); startRun(tasks, "daily"); },
  review: () => { const tasks = pickReview(10); if (!tasks.length) return toast(t("review_empty")); startRun(tasks, "practice"); },
  topic: (el) => startTopic(el.dataset.id),
  sim: (el) => startSim(el.dataset.k),
  theory: (el) => go("theoryItem", { id: el.dataset.id }),
  startitem: (el) => {
    const { kind, id } = el.dataset;
    if (kind === "reading") startRun([readingTask(READINGS.find((x) => x.id === id))], "practice");
    if (kind === "errors") startRun([errorsTask(ERRTEXTS.find((x) => x.id === id))], "practice");
    if (kind === "writing") startRun([writingTask(PROMPTS.find((x) => x.id === id), false)], "practice");
  },
  quit: () => { if (run.results.length === 0 || confirm(t("exit_confirm"))) { if (run.results.length) { St.addMinutes(Math.min(60, (Date.now() - run.start) / 60000)); } run = null; go("home"); } },
  next: () => nextTask(),
  endrun: () => { run = null; go("home"); },
  pick: (el) => {
    const task = run.tasks[run.i]; if (run.cur.answered) return;
    const i = Number(el.dataset.i); run.cur.sel = i; answer(task, i === task.correct, task.id); render();
  },
  checknum: (el, ev) => {
    ev && ev.preventDefault();
    const task = run.tasks[run.i]; if (run.cur.answered) return;
    const raw = document.getElementById("numIn").value; const v = parseNum(raw);
    if (Number.isNaN(v)) { document.getElementById("numIn").classList.add("shake"); setTimeout(() => document.getElementById("numIn")?.classList.remove("shake"), 400); return; }
    run.cur.val = raw; answer(task, Math.abs(v - task.answer) <= Math.max(task.tol || 0, 1e-9) + 1e-9, null); render();
  },
  idk: () => { const task = run.tasks[run.i]; run.cur.val = "—"; answer(task, false, null); render(); },
  tok: (el) => { const c = run.cur; const k = el.dataset.k; c.sel.has(k) ? c.sel.delete(k) : c.sel.add(k); el.classList.toggle("sel"); const lbl = document.querySelector(".row .muted.small"); if (lbl) lbl.textContent = t("selected_n", { n: c.sel.size }); },
  correcterr: () => {
    const c = run.cur, task = run.tasks[run.i];
    const errs = c.parsed.segs.filter((s) => s.err);
    c.found = errs.filter((s) => c.sel.has(s.k)).length; c.fp = [...c.sel].filter((k) => k.startsWith("w")).length;
    for (const s of errs) { St.record("errors", c.sel.has(s.k)); run.results.push({ topic: "errors", ok: c.sel.has(s.k) }); }
    c.gain = Math.max(2, c.found * 5 - c.fp * 2); run.xp += c.gain; St.addXP(c.gain);
    if (c.found === errs.length && c.fp === 0) badge("hunter");
    S().seen["E_" + task.data.id] = (S().seen["E_" + task.data.id] || 0) + 1;
    c.answered = true; render();
  },
  toggletext: () => { run.cur.showText = run.cur.showText === false; render(); },
  rpick: (el) => { const c = run.cur; const q = Number(el.dataset.q), o = Number(el.dataset.o); c.ans[q] = c.ans[q] === o ? undefined : o; render(); },
  gradereading: () => {
    const c = run.cur, task = run.tasks[run.i], r = task.data; let sc = 0, okN = 0;
    r.mcq.forEach((q, qi) => { if (c.ans[qi] === undefined) return; const ok = c.ans[qi] === q.a; sc += ok ? 3 : -1.5; okN += ok; St.record("lect", ok); run.results.push({ topic: "lect", ok }); });
    c.score = Math.max(0, sc); c.graded = true; c.showText = false;
    c.gain = okN * 8 + (c.score === 15 ? 10 : 0); run.xp += c.gain; St.addXP(c.gain);
    if (c.score === 15) badge("reader");
    S().seen["R_" + r.id] = (S().seen["R_" + r.id] || 0) + 1; St.save(); render();
  },
  showmodel: () => { const ta = document.getElementById("openAns"); run.cur.openTxt = ta ? ta.value : ""; run.cur.showModel = true; render(); },
  skipopen: () => { run.cur.openDone = true; render(); },
  selfeval: (el) => { const v = Number(el.dataset.v); St.record("lect", v === 2); run.results.push({ topic: "lect", ok: v === 2 }); const g = v * 6; run.xp += g; St.addXP(g); run.cur.openDone = true; render(); },
  wlang: (el) => { run.cur.wlang = el.dataset.l; run.cur.text = document.getElementById("wText").value; render(); },
  analyze: () => {
    const c = run.cur; c.text = document.getElementById("wText").value;
    if (wc(c.text) < 40) return toast(t("min_words", { n: 40 }));
    c.analysis = analyzeText(c.text, c.wlang); render(); window.scrollTo(0, 0);
  },
  rub: (el) => { run.cur.rub[el.dataset.k] = Number(el.dataset.v); const y = window.scrollY; render(); window.scrollTo(0, y); },
  savewriting: () => {
    const c = run.cur, task = run.tasks[run.i], an = c.analysis;
    const score = Math.max(0, rubTotal(c.rub) - an.errs.length);
    S().writings.push({ date: St.dayKey(), id: task.data.id, score, words: an.words });
    S().seen["W_" + task.data.id] = (S().seen["W_" + task.data.id] || 0) + 1;
    const ok = score >= 25; St.record("escr", ok); run.results.push({ topic: "escr", ok });
    const g = 20 + Math.round(score / 2); run.xp += g; St.addXP(g); badge("writer");
    nextTask();
  },
  reset: () => { if (confirm(t("reset_confirm"))) { St.reset(); go("home"); } },
};

document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-act]"); if (!el) return;
  const fn = ACTIONS[el.dataset.act]; if (fn) fn(el, ev);
});
document.addEventListener("submit", (ev) => { const f = ev.target.closest("[data-submit]"); if (f) { ev.preventDefault(); ACTIONS[f.dataset.submit](f, ev); } });
document.addEventListener("change", (ev) => {
  if (ev.target.dataset.change === "examdate") { S().examDate = ev.target.value || null; St.save(); }
});
document.addEventListener("keydown", (ev) => {
  if (!run || run.i >= run.tasks.length) return;
  const task = run.tasks[run.i];
  if (ev.key === "Enter" && run.cur.answered && !["TEXTAREA", "BUTTON"].includes(document.activeElement?.tagName) && ["mcq", "num"].includes(task.type)) { ev.preventDefault(); nextTask(); }
  if (task.type === "mcq" && !run.cur.answered && /^[1-4a-d]$/i.test(ev.key) && document.activeElement?.tagName !== "INPUT") {
    const i = /\d/.test(ev.key) ? Number(ev.key) - 1 : "abcd".indexOf(ev.key.toLowerCase());
    if (i < task.options.length) ACTIONS.pick({ dataset: { i } });
  }
});

// Service worker (PWA, ús sense connexió) — no a l'app nativa
if ("serviceWorker" in navigator && location.protocol.startsWith("http") && !window.Capacitor) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

boot();
