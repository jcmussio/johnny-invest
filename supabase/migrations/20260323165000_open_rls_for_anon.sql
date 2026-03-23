-- Permitir acesso de leitura público (anon e authenticated) para tabelas de conteúdo
DROP POLICY IF EXISTS "public_read_aulas" ON public.aulas;
CREATE POLICY "public_read_aulas" ON public.aulas FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_quizzes" ON public.quizzes;
CREATE POLICY "public_read_quizzes" ON public.quizzes FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_missoes" ON public.missoes;
CREATE POLICY "public_read_missoes" ON public.missoes FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_badges" ON public.badges;
CREATE POLICY "public_read_badges" ON public.badges FOR SELECT USING (true);

-- Garantir que as tabelas do curso base também fiquem acessíveis
DROP POLICY IF EXISTS "public_read_levels" ON public.levels;
CREATE POLICY "public_read_levels" ON public.levels FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_lessons" ON public.lessons;
CREATE POLICY "public_read_lessons" ON public.lessons FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_missions" ON public.missions;
CREATE POLICY "public_read_missions" ON public.missions FOR SELECT USING (true);
