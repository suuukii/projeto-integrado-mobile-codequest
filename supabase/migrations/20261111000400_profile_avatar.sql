-- Foto de perfil escolhida entre opções predefinidas.

alter table public.profiles
  add column avatar text not null default 'snake'
  check (avatar in ('snake', 'fox', 'cat', 'owl', 'panda', 'robot', 'alien', 'rocket'));

create policy "Usuário atualiza o próprio perfil" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Somente a foto pode ser alterada pelo aplicativo; o nome de usuário não.
grant update (avatar) on public.profiles to authenticated;
