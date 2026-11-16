// Comptes d'usuari i dades al núvol (Supabase: Auth + Postgres amb RLS)
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const SDK = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm";
let sb = null;

export const configured = () => !!SUPABASE_URL && !SUPABASE_URL.includes("YOUR_") && !!SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes("YOUR_");

export async function client() {
  if (sb) return sb;
  const { createClient } = await import(SDK);
  sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: "papapunt.auth" },
  });
  return sb;
}

export async function getUser() {
  const c = await client();
  const { data } = await c.auth.getSession();
  return data.session ? data.session.user : null;
}
export async function onAuthChange(fn) { const c = await client(); c.auth.onAuthStateChange((ev, session) => fn(ev, session)); }

// URL a què tornen els correus de confirmació i de recuperació (la versió web)
const redirectTo = () => (location.protocol.startsWith("http") ? location.origin + location.pathname : undefined);

export async function signUp(email, password, lang) {
  const c = await client();
  return c.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo(), data: { lang } } });
}
export async function signIn(email, password) { const c = await client(); return c.auth.signInWithPassword({ email, password }); }
export async function signOut() { const c = await client(); return c.auth.signOut(); }
export async function sendReset(email) { const c = await client(); return c.auth.resetPasswordForEmail(email, { redirectTo: redirectTo() }); }
export async function updatePassword(password) { const c = await client(); return c.auth.updateUser({ password }); }

// ---- progrés (una fila per usuari)
export async function loadProgress(userId) {
  const c = await client();
  const { data, error } = await c.from("progress").select("data").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ? data.data : null;
}
export async function saveProgress(userId, data) {
  const c = await client();
  const { error } = await c.from("progress").upsert({ user_id: userId, data, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// ---- històric (una fila per sessió/activitat; no es pot modificar)
export async function logActivity(rows) {
  if (!rows.length) return;
  const c = await client();
  const { error } = await c.from("activity").insert(rows);
  if (error) throw error;
}
export async function loadHistory(limit = 30) {
  const c = await client();
  const { data, error } = await c.from("activity").select("created_at, mode, kind, correct, total, xp, minutes, grade, details").order("created_at", { ascending: false }).limit(limit);
  if (error) throw error;
  return data;
}

// ---- esborrar el compte (obligatori per a App Store / Google Play)
export async function deleteAccount() {
  const c = await client();
  const { error } = await c.rpc("delete_user");
  if (error) throw error;
  await c.auth.signOut();
}
