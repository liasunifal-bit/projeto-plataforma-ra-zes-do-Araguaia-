-- ============================================================================
-- RAIZES DO ARAGUAIA
-- Ajuste RLS: fluxo correto de produtos.
-- 1. Vendedor cadastra produto sempre como draft.
-- 2. Administrador aprova ou desaprova.
-- 3. Apenas produto approved/published fica publicamente visivel.
-- ============================================================================

drop policy if exists "products_select_own" on public.products;
drop policy if exists "products_insert_own" on public.products;
drop policy if exists "products_update_own" on public.products;
drop policy if exists "products_delete_own" on public.products;
drop policy if exists "products_select_published" on public.products;
drop policy if exists "products_select_admin" on public.products;
drop policy if exists "products_update_admin" on public.products;
drop policy if exists "products_insert_own_draft" on public.products;
drop policy if exists "products_update_own_draft" on public.products;
drop policy if exists "products_update_admin_status" on public.products;
drop policy if exists "products_delete_own_draft" on public.products;

create policy "products_select_published" on public.products
  for select to anon, authenticated
  using (status = 'published');

create policy "products_select_own" on public.products
  for select to authenticated
  using (auth.uid() = user_id);

create policy "products_select_admin" on public.products
  for select to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.user_id = auth.uid()
        and profiles.role = 'admin'
    )
  );

create policy "products_insert_own_draft" on public.products
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and status = 'draft'
    and exists (
      select 1
      from public.seller_profiles
      where seller_profiles.id = seller_id
        and seller_profiles.user_id = auth.uid()
    )
  );

create policy "products_update_own_draft" on public.products
  for update to authenticated
  using (auth.uid() = user_id and status = 'draft')
  with check (auth.uid() = user_id and status = 'draft');

create policy "products_update_admin_status" on public.products
  for update to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.user_id = auth.uid()
        and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.user_id = auth.uid()
        and profiles.role = 'admin'
    )
  );

create policy "products_delete_own_draft" on public.products
  for delete to authenticated
  using (auth.uid() = user_id and status = 'draft');
