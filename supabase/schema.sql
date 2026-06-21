-- Run inside the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "uuid-ossp";

create table if not exists public.courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  progress integer not null check (progress between 0 and 100),
  icon_name text not null,
  created_at timestamp with time zone default now()
);

-- Dashboard data is read by anyone holding the anon key (no per-user auth
-- in this prototype), so we open SELECT and leave writes to the dashboard
-- or service role.
alter table public.courses enable row level security;

create policy "Courses are publicly readable"
  on public.courses
  for select
  using (true);

insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 72, 'component'),
  ('Systems Design Fundamentals', 41, 'network'),
  ('TypeScript for Large Codebases', 89, 'braces'),
  ('Applied Statistics', 15, 'bar-chart-3');
