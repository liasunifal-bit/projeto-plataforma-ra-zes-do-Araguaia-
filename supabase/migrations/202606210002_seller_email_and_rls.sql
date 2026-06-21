-- ============================================================================
-- RAIZES DO ARAGUAIA
-- Migração: Email do vendedor em seller_profiles, profiles e RLS administrativo/público.
-- ============================================================================

-- 1. Adicionar coluna email em public.seller_profiles e public.profiles se não existir
alter table public.seller_profiles add column if not exists email text;
alter table public.profiles add column if not exists email text;

-- 2. Função trigger para sincronizar email de auth.users automaticamente para seller_profiles
create or replace function public.sync_seller_profile_email()
returns trigger as $$
begin
  select email into new.email from auth.users where id = new.user_id;
  return new;
end;
$$ language plpgsql security definer;

-- Criar trigger de sincronização para seller_profiles
drop trigger if exists tr_sync_seller_profile_email on public.seller_profiles;
create trigger tr_sync_seller_profile_email
  before insert or update on public.seller_profiles
  for each row execute procedure public.sync_seller_profile_email();

-- 3. Função trigger para criar/sincronizar public.profiles e incluir email de auth.users automaticamente
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email
  )
  on conflict (user_id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, profiles.full_name);
  return new;
end;
$$ language plpgsql security definer;

-- Criar trigger de sincronização em auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Sincronizar registros existentes (backfill)
update public.seller_profiles sp
set email = u.email
from auth.users u
where sp.user_id = u.id;

update public.profiles p
set email = u.email
from auth.users u
where p.user_id = u.id;

-- 5. Função auxiliar segura para verificar se o usuário é administrador (evita recursão de RLS)
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- 6. Políticas RLS para public.profiles
drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin" on public.profiles
  for select to authenticated
  using (public.is_admin());

-- 7. Políticas RLS para public.seller_profiles
drop policy if exists "seller_profiles_select_admin" on public.seller_profiles;
create policy "seller_profiles_select_admin" on public.seller_profiles
  for select to authenticated
  using (public.is_admin());

drop policy if exists "seller_profiles_select_published" on public.seller_profiles;
create policy "seller_profiles_select_published" on public.seller_profiles
  for select to anon, authenticated
  using (is_published = true);
