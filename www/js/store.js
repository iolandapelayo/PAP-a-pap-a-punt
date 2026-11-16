// Progrés de l'usuari: còpia local (per usuari) + sincronització amb el núvol via hook
const PREFIX = "papapunt.v2.";
const PREF_KEY = "papapunt.prefs"; // preferències del dispositiu (idioma abans d'iniciar sessió)

const DEFAULTS = () => ({
  lang: null, onboarded: false, xp: 0, streak: 0, bestStreak: 0, lastDay: null,
  days: {},        // 'YYYY-MM-DD' -> { xp, min, sessions }
  topics: {},      // topic -> { n, c, recent: [0/1...] }
  review: {},      // itemId -> { box, due }
  badges: [], examDate: null, goal: 20,
  writings: [],    // { date, id, score, words }
  sessions: 0, perfect: 0, sims: [], seen: {},
  pendingActivity: [], // activitat pendent d'enviar al núvol (sense connexió)
  updatedAt: 0,
});

let S = DEFAULTS();
let userId = null;
let saveHook = null;
let hookTimer = null;
export const state = () => S;

// ---- preferències de dispositiu
export function prefs() { try { return JSON.parse(localStorage.getItem(PREF_KEY) || "{}"); } catch { return {}; } }
export function setPref(k, v) { try { localStorage.setItem(PREF_KEY, JSON.stringify({ ...prefs(), [k]: v })); } catch {} }

// ---- cicle de vida per usuari
export function openUser(id) {
  userId = id;
  try { const raw = localStorage.getItem(PREFIX + id); S = raw ? { ...DEFAULTS(), ...JSON.parse(raw) } : DEFAULTS(); }
  catch { S = DEFAULTS(); }
  if (!S.lang) S.lang = prefs().lang || null;
  return S;
}
export function closeUser() { clearTimeout(hookTimer); userId = null; S = DEFAULTS(); }
export function clearLocalUser(id) { try { localStorage.removeItem(PREFIX + id); } catch {} }
// Fusiona amb la còpia del núvol: guanya la més recent
export function mergeRemote(remote) {
  if (remote && (remote.updatedAt || 0) > (S.updatedAt || 0)) {
    const pending = S.pendingActivity || [];
    S = { ...DEFAULTS(), ...remote, pendingActivity: pending };
    persistLocal();
    return "remote";
  }
  return "local";
}
export function setSaveHook(fn) { saveHook = fn; }

function persistLocal() { if (!userId) return; try { localStorage.setItem(PREFIX + userId, JSON.stringify(S)); } catch {} }
export function save() {
  S.updatedAt = Date.now();
  persistLocal();
  if (saveHook) { clearTimeout(hookTimer); hookTimer = setTimeout(() => saveHook(snapshot()), 1500); }
}
export function flush() { if (saveHook) { clearTimeout(hookTimer); return saveHook(snapshot()); } }
export function snapshot() { const { pendingActivity, ...rest } = S; return rest; }
export function reset() { const keep = { lang: S.lang, onboarded: true }; S = { ...DEFAULTS(), ...keep }; save(); }

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return dayKey(d); };

export function today() {
  const k = dayKey();
  if (!S.days[k]) S.days[k] = { xp: 0, min: 0, sessions: 0 };
  return S.days[k];
}

// Ratxa: es compta quan es completa almenys una activitat al dia
export function touchStreak() {
  const k = dayKey();
  if (S.lastDay === k) return;
  const y = addDays(-1);
  S.streak = S.lastDay === y ? S.streak + 1 : 1;
  S.bestStreak = Math.max(S.bestStreak, S.streak);
  S.lastDay = k;
}
export function currentStreak() {
  if (!S.lastDay) return 0;
  return S.lastDay === dayKey() || S.lastDay === addDays(-1) ? S.streak : 0;
}

export function addXP(n) { S.xp += n; today().xp += n; touchStreak(); save(); }
export function addMinutes(m) { today().min += m; save(); }

export const LEVEL_XP = (L) => 50 * L * (L - 1);
export function levelInfo(xp = S.xp) {
  let L = 1; while (xp >= LEVEL_XP(L + 1)) L++;
  const a = LEVEL_XP(L), b = LEVEL_XP(L + 1);
  return { level: L, into: xp - a, need: b - a, pct: (xp - a) / (b - a) };
}

export function record(topic, ok, itemId) {
  const t = (S.topics[topic] ||= { n: 0, c: 0, recent: [] });
  t.n++; if (ok) t.c++;
  t.recent.push(ok ? 1 : 0); if (t.recent.length > 20) t.recent.shift();
  if (itemId) {
    S.seen[itemId] = (S.seen[itemId] || 0) + 1;
    const r = S.review[itemId] || { box: 0 };
    if (ok) { r.box = Math.min(5, r.box + 1); r.due = addDays([1, 2, 4, 7, 15, 30][r.box]); }
    else { r.box = 0; r.due = addDays(0); }
    S.review[itemId] = r;
  }
  save();
}

export function mastery(topic) {
  const t = S.topics[topic]; if (!t || !t.n) return 0;
  const acc = t.recent.reduce((a, b) => a + b, 0) / t.recent.length;
  return acc * Math.min(1, t.n / 12);
}
export function accuracy(topic) {
  const t = S.topics[topic]; if (!t || !t.recent.length) return null;
  return t.recent.reduce((a, b) => a + b, 0) / t.recent.length;
}
export function dueItems() {
  const k = dayKey();
  return Object.entries(S.review).filter(([, r]) => r.box < 5 && r.due <= k).map(([id]) => id);
}
export function award(id) {
  if (S.badges.includes(id)) return false;
  S.badges.push(id); save(); return true;
}
