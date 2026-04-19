create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  display_name text not null,
  primary_role text not null,

  genres text[] not null default '{}',
  looking_for text[] not null default '{}',

  availability text not null,
  collaboration_mode text not null,

  city text not null,
  bio text null,

  influences text[] not null default '{}',
  portfolio_links text[] not null default '{}',

  publish_status text not null default 'draft',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can create their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Published profiles are publicly readable"
on public.profiles
for select
to public
using (publish_status = 'published');