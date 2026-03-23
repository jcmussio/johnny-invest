-- Adiciona política de INSERT à tabela public.users para permitir o cadastro sem falhas
DROP POLICY IF EXISTS "users_insert_own" ON public.users;
CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
