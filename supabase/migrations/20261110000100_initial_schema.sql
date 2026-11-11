-- Estrutura inicial do Codequest.
-- Hierarquia do conteúdo: languages > tracks > stages > questions > question_options.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null check (username ~ '^[A-Za-z0-9_]{3,20}$'),
  created_at timestamptz not null default now()
);

create unique index profiles_username_unique on public.profiles (lower(username));

create table public.languages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.tracks (
  id uuid primary key default gen_random_uuid(),
  language_id uuid not null references public.languages (id) on delete cascade,
  slug text not null unique,
  title text not null,
  description text not null default '',
  position integer not null,
  created_at timestamptz not null default now(),
  unique (language_id, position)
);

create table public.stages (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references public.tracks (id) on delete cascade,
  position integer not null,
  title text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  unique (track_id, position)
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid not null references public.stages (id) on delete cascade,
  position integer not null,
  type text not null default 'multiple_choice' check (type in ('multiple_choice')),
  prompt text not null,
  code_snippet text,
  explanation text not null default '',
  created_at timestamptz not null default now(),
  unique (stage_id, position)
);

create table public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions (id) on delete cascade,
  position integer not null,
  text text not null,
  is_correct boolean not null default false,
  unique (question_id, position)
);

-- Uma linha por etapa concluída pelo usuário.
create table public.user_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  stage_id uuid not null references public.stages (id) on delete cascade,
  first_try_correct integer not null check (first_try_correct >= 0),
  total_questions integer not null check (total_questions > 0),
  completed_at timestamptz not null default now(),
  primary key (user_id, stage_id)
);

create index user_progress_stage_id_idx on public.user_progress (stage_id);

-- Row Level Security: o conteúdo é somente leitura e os dados pessoais pertencem ao dono.
alter table public.profiles enable row level security;
alter table public.languages enable row level security;
alter table public.tracks enable row level security;
alter table public.stages enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.user_progress enable row level security;

create policy "Usuário lê o próprio perfil" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

create policy "Autenticados leem linguagens" on public.languages
  for select to authenticated using (true);
create policy "Autenticados leem trilhas" on public.tracks
  for select to authenticated using (true);
create policy "Autenticados leem etapas" on public.stages
  for select to authenticated using (true);
create policy "Autenticados leem questões" on public.questions
  for select to authenticated using (true);
create policy "Autenticados leem opções" on public.question_options
  for select to authenticated using (true);

create policy "Usuário lê o próprio progresso" on public.user_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Usuário registra o próprio progresso" on public.user_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Usuário atualiza o próprio progresso" on public.user_progress
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select on public.profiles, public.languages, public.tracks, public.stages,
  public.questions, public.question_options to authenticated;
grant select, insert, update on public.user_progress to authenticated;

-- Cria o perfil automaticamente a partir do nome informado no cadastro.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Permite verificar o nome de usuário antes do cadastro sem expor a tabela de perfis.
create function public.is_username_available(candidate text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select not exists (
    select 1 from public.profiles where lower(username) = lower(candidate)
  );
$$;

revoke execute on function public.is_username_available(text) from public;
grant execute on function public.is_username_available(text) to anon, authenticated;
