-- ============================================================================
-- RAIZES DO ARAGUAIA
-- Escopo: schema, relacionamentos e Row Level Security (RLS).
-- ============================================================================

-- ETAPA 1: CRIACAO DO SCHEMA

create type public.app_role as enum ('seller', 'helper', 'admin');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.stock_status as enum ('available', 'limited', 'unavailable');
create type public.media_type as enum ('image', 'audio');
create type public.collaborator_permission as enum ('editor', 'manager');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  full_name text not null,
  phone text,
  avatar_path text,
  role public.app_role not null default 'seller',
  created_at timestamp with time zone not null default now()
);

create table public.seller_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  display_name text not null,
  description text,
  whatsapp_number text not null,
  pix_key text,
  pix_key_type text check (
    pix_key_type is null
    or pix_key_type in ('cpf', 'cnpj', 'email', 'phone', 'random')
  ),
  location_name text not null,
  latitude numeric(9, 6) check (latitude is null or latitude between -90 and 90),
  longitude numeric(9, 6) check (longitude is null or longitude between -180 and 180),
  is_published boolean not null default false,
  created_at timestamp with time zone not null default now()
);

create table public.seller_collaborators (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  seller_id uuid not null,
  collaborator_user_id uuid not null,
  permission public.collaborator_permission not null default 'editor',
  created_at timestamp with time zone not null default now(),
  unique (seller_id, collaborator_user_id),
  check (user_id <> collaborator_user_id)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  slug text not null,
  name text not null,
  description text,
  color text,
  icon_name text,
  display_order integer not null default 0 check (display_order >= 0),
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  unique (user_id, slug)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  seller_id uuid not null,
  category_id uuid not null,
  name text not null check (char_length(name) between 2 and 120),
  description text,
  price numeric(12, 2) not null check (price >= 0),
  unit text,
  stock_status public.stock_status not null default 'available',
  image_alt text,
  location_name text,
  latitude numeric(9, 6) check (latitude is null or latitude between -90 and 90),
  longitude numeric(9, 6) check (longitude is null or longitude between -180 and 180),
  status public.content_status not null default 'draft',
  created_at timestamp with time zone not null default now()
);

create table public.product_media (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  product_id uuid not null,
  media_type public.media_type not null,
  storage_path text not null unique,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  display_order integer not null default 0 check (display_order >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  description text,
  starts_at timestamp with time zone not null,
  ends_at timestamp with time zone,
  location_name text not null,
  latitude numeric(9, 6) check (latitude is null or latitude between -90 and 90),
  longitude numeric(9, 6) check (longitude is null or longitude between -180 and 180),
  status public.content_status not null default 'draft',
  created_at timestamp with time zone not null default now(),
  check (ends_at is null or ends_at >= starts_at)
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  module_name text not null,
  title text not null,
  description text,
  content text not null,
  display_order integer not null default 0 check (display_order >= 0),
  estimated_minutes integer check (estimated_minutes is null or estimated_minutes > 0),
  status public.content_status not null default 'draft',
  created_at timestamp with time zone not null default now()
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id uuid not null,
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  completed boolean not null default false,
  started_at timestamp with time zone not null default now(),
  completed_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  unique (user_id, lesson_id),
  check (
    (completed = false and completed_at is null)
    or (completed = true and completed_at is not null)
  )
);

-- ETAPA 2: RELACIONAMENTOS E INTEGRIDADE REFERENCIAL

alter table public.profiles add constraint profiles_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.seller_profiles add constraint seller_profiles_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.seller_collaborators add constraint seller_collaborators_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.seller_collaborators add constraint seller_collaborators_seller_id_fkey
  foreign key (seller_id) references public.seller_profiles(id) on delete cascade;
alter table public.seller_collaborators add constraint seller_collaborators_collaborator_user_id_fkey
  foreign key (collaborator_user_id) references auth.users(id) on delete cascade;
alter table public.categories add constraint categories_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.products add constraint products_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.products add constraint products_seller_id_fkey
  foreign key (seller_id) references public.seller_profiles(id) on delete cascade;
alter table public.products add constraint products_category_id_fkey
  foreign key (category_id) references public.categories(id) on delete restrict;
alter table public.product_media add constraint product_media_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.product_media add constraint product_media_product_id_fkey
  foreign key (product_id) references public.products(id) on delete cascade;
alter table public.events add constraint events_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.lessons add constraint lessons_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.lesson_progress add constraint lesson_progress_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;
alter table public.lesson_progress add constraint lesson_progress_lesson_id_fkey
  foreign key (lesson_id) references public.lessons(id) on delete cascade;

-- ETAPA 3: ROW LEVEL SECURITY (RLS)

alter table public.profiles enable row level security;
alter table public.seller_profiles enable row level security;
alter table public.seller_collaborators enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_media enable row level security;
alter table public.events enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;

-- PROFILES
create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = user_id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "profiles_delete_own" on public.profiles
  for delete to authenticated using (auth.uid() = user_id);

-- SELLER_PROFILES
create policy "seller_profiles_select_own" on public.seller_profiles
  for select to authenticated using (auth.uid() = user_id);
create policy "seller_profiles_insert_own" on public.seller_profiles
  for insert to authenticated with check (auth.uid() = user_id);
create policy "seller_profiles_update_own" on public.seller_profiles
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "seller_profiles_delete_own" on public.seller_profiles
  for delete to authenticated using (auth.uid() = user_id);

-- SELLER_COLLABORATORS
create policy "seller_collaborators_select_own" on public.seller_collaborators
  for select to authenticated using (auth.uid() = user_id);
create policy "seller_collaborators_insert_own" on public.seller_collaborators
  for insert to authenticated with check (auth.uid() = user_id);
create policy "seller_collaborators_update_own" on public.seller_collaborators
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "seller_collaborators_delete_own" on public.seller_collaborators
  for delete to authenticated using (auth.uid() = user_id);

-- CATEGORIES
create policy "categories_select_own" on public.categories
  for select to authenticated using (auth.uid() = user_id);
create policy "categories_insert_own" on public.categories
  for insert to authenticated with check (auth.uid() = user_id);
create policy "categories_update_own" on public.categories
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "categories_delete_own" on public.categories
  for delete to authenticated using (auth.uid() = user_id);

-- PRODUCTS
create policy "products_select_own" on public.products
  for select to authenticated using (auth.uid() = user_id);
create policy "products_insert_own" on public.products
  for insert to authenticated with check (auth.uid() = user_id);
create policy "products_update_own" on public.products
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "products_delete_own" on public.products
  for delete to authenticated using (auth.uid() = user_id);

-- PRODUCT_MEDIA
create policy "product_media_select_own" on public.product_media
  for select to authenticated using (auth.uid() = user_id);
create policy "product_media_insert_own" on public.product_media
  for insert to authenticated with check (auth.uid() = user_id);
create policy "product_media_update_own" on public.product_media
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "product_media_delete_own" on public.product_media
  for delete to authenticated using (auth.uid() = user_id);

-- EVENTS
create policy "events_select_own" on public.events
  for select to authenticated using (auth.uid() = user_id);
create policy "events_insert_own" on public.events
  for insert to authenticated with check (auth.uid() = user_id);
create policy "events_update_own" on public.events
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "events_delete_own" on public.events
  for delete to authenticated using (auth.uid() = user_id);

-- LESSONS
create policy "lessons_select_own" on public.lessons
  for select to authenticated using (auth.uid() = user_id);
create policy "lessons_insert_own" on public.lessons
  for insert to authenticated with check (auth.uid() = user_id);
create policy "lessons_update_own" on public.lessons
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "lessons_delete_own" on public.lessons
  for delete to authenticated using (auth.uid() = user_id);

-- LESSON_PROGRESS
create policy "lesson_progress_select_own" on public.lesson_progress
  for select to authenticated using (auth.uid() = user_id);
create policy "lesson_progress_insert_own" on public.lesson_progress
  for insert to authenticated with check (auth.uid() = user_id);
create policy "lesson_progress_update_own" on public.lesson_progress
  for update to authenticated using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "lesson_progress_delete_own" on public.lesson_progress
  for delete to authenticated using (auth.uid() = user_id);
