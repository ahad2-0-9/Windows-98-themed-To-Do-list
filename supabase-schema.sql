create table if not exists public.tasks (
  id text primary key,
  name text not null,
  size text not null default '1 KB',
  type text not null default 'Text Document',
  modified text not null,
  icon text not null default 'file-text',
  checked boolean not null default false,
  note text,
  faded boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.reminders (
  id text primary key,
  title text not null,
  text text not null,
  type text not null default 'sticky',
  top text not null default '20%',
  left text not null default '20%',
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;
alter table public.reminders enable row level security;

create policy "Allow public task reads"
on public.tasks for select
to anon
using (true);

create policy "Allow public task writes"
on public.tasks for insert
to anon
with check (true);

create policy "Allow public task updates"
on public.tasks for update
to anon
using (true)
with check (true);

create policy "Allow public task deletes"
on public.tasks for delete
to anon
using (true);

create policy "Allow public reminder reads"
on public.reminders for select
to anon
using (true);

create policy "Allow public reminder writes"
on public.reminders for insert
to anon
with check (true);

create policy "Allow public reminder deletes"
on public.reminders for delete
to anon
using (true);
