-- PAP a punt · Esquema de base de dades per a Supabase
-- Executa aquest fitxer a Supabase → SQL Editor → New query → Run.

-- 1) Estat actual del progrés de cada usuari (una fila per persona)
create table if not exists public.progress (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2) Històric: una fila per cada sessió, pràctica o simulacre acabat
create table if not exists public.activity (
  id         bigint generated always as identity primary key,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  mode       text not null,          -- daily | practice | sim
  kind       text,                   -- ccirc | clom | mixed | reading | errors | writing | <tema>
  correct    int,
  total      int,
  xp         int,
  minutes    numeric,
  grade      numeric,                -- nota orientativa (simulacres) o puntuació de redacció
  details    jsonb                   -- resultats per tema, etc.
);
create index if not exists activity_user_created_idx on public.activity (user_id, created_at desc);

-- 3) Seguretat: cada persona només veu i modifica les seves dades
alter table public.progress enable row level security;
alter table public.activity enable row level security;

drop policy if exists "progress_select_own" on public.progress;
drop policy if exists "progress_insert_own" on public.progress;
drop policy if exists "progress_update_own" on public.progress;
create policy "progress_select_own" on public.progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "progress_insert_own" on public.progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "progress_update_own" on public.progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "activity_select_own" on public.activity;
drop policy if exists "activity_insert_own" on public.activity;
create policy "activity_select_own" on public.activity for select to authenticated using ((select auth.uid()) = user_id);
create policy "activity_insert_own" on public.activity for insert to authenticated with check ((select auth.uid()) = user_id);
-- (sense polítiques d'update/delete: l'històric no es pot alterar des de l'app)

-- 4) Esborrar el propi compte des de l'app (requisit d'App Store i Google Play)
create or replace function public.delete_user()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;
revoke all on function public.delete_user() from public, anon;
grant execute on function public.delete_user() to authenticated;
