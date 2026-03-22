-- Adicionar novas colunas nas tabelas existentes de forma segura (Idempotente)
ALTER TABLE public.levels ADD COLUMN IF NOT EXISTS objective TEXT;
ALTER TABLE public.levels ADD COLUMN IF NOT EXISTS xp_required INT DEFAULT 0;

ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS lesson_number INT;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS key_concepts JSONB;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS suggested_infographic TEXT;

ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS option_a TEXT;
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS option_b TEXT;
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS option_c TEXT;
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS option_d TEXT;
ALTER TABLE public.quizzes ALTER COLUMN options DROP NOT NULL; -- Flexibilizar constraint anterior

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.badges ADD COLUMN IF NOT EXISTS unlock_criteria TEXT;

-- Criar novas tabelas para missões e desafios
CREATE TABLE IF NOT EXISTS public.daily_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    mission_type TEXT NOT NULL,
    xp_reward INT DEFAULT 50,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.weekly_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    challenge_type TEXT NOT NULL,
    xp_reward INT DEFAULT 200,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ativar RLS nas novas tabelas
ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_challenges ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
DROP POLICY IF EXISTS "daily_missions_read_own" ON public.daily_missions;
CREATE POLICY "daily_missions_read_own" ON public.daily_missions FOR SELECT TO authenticated USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "daily_missions_update_own" ON public.daily_missions;
CREATE POLICY "daily_missions_update_own" ON public.daily_missions FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "weekly_challenges_read_own" ON public.weekly_challenges;
CREATE POLICY "weekly_challenges_read_own" ON public.weekly_challenges FOR SELECT TO authenticated USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "weekly_challenges_update_own" ON public.weekly_challenges;
CREATE POLICY "weekly_challenges_update_own" ON public.weekly_challenges FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Povoar Tabelas com os 8 Níveis, 50 Aulas, 32 Quizzes e 8 Badges
DO $$
DECLARE
  v_course_id uuid;
  v_level_ids uuid[] := array_fill(null::uuid, ARRAY[8]);
  v_lesson_id uuid;
  i int;
  j int;
  v_level_titles text[] := ARRAY[
    'Fundamentos do Mercado Financeiro',
    'Conceitos de Risco e Retorno',
    'Introdução a Opções',
    'Gregas - Delta e Gamma',
    'Gregas - Theta e Vega',
    'Estratégias Básicas',
    'Estratégias Avançadas',
    'Operações Reais e Psicologia do Trader'
  ];
  v_level_xps int[] := ARRAY[500, 600, 700, 800, 800, 900, 1000, 1000];
  v_lesson_counts int[] := ARRAY[6, 6, 6, 6, 7, 7, 6, 6]; -- Total 50 aulas
BEGIN
  -- 1. Obter ou Criar o Curso
  SELECT id INTO v_course_id FROM public.courses WHERE name = 'Opções e Derivativos' LIMIT 1;
  IF v_course_id IS NULL THEN
    v_course_id := gen_random_uuid();
    INSERT INTO public.courses (id, name, description) 
    VALUES (v_course_id, 'Opções e Derivativos', 'Domine o mercado financeiro com a metodologia que funciona.');
  END IF;

  -- 2. Iterar sobre os 8 Níveis
  FOR i IN 1..8 LOOP
    INSERT INTO public.levels (course_id, level_number, title, xp_required, objective)
    VALUES (v_course_id, i, v_level_titles[i], v_level_xps[i], 'Dominar os conceitos de ' || v_level_titles[i])
    ON CONFLICT (course_id, level_number) DO UPDATE 
    SET title = EXCLUDED.title, xp_required = EXCLUDED.xp_required, objective = EXCLUDED.objective
    RETURNING id INTO v_level_ids[i];

    -- Criar Badge (1 por nível)
    INSERT INTO public.badges (name, level_id, description, unlock_criteria)
    VALUES ('Certificado de Domínio: Nível ' || i, v_level_ids[i], 'Concluiu o nível ' || v_level_titles[i], 'Completar todas as aulas do Nível ' || i)
    ON CONFLICT DO NOTHING;

    -- 3. Iterar sobre as Aulas (6 ou 7 por nível)
    FOR j IN 1..v_lesson_counts[i] LOOP
      v_lesson_id := gen_random_uuid();
      INSERT INTO public.lessons (id, level_id, lesson_number, title, content, key_concepts, "order")
      VALUES (
        v_lesson_id, 
        v_level_ids[i], 
        j,
        'Aula ' || i || '.' || j || ': Exploração de ' || v_level_titles[i],
        'Conteúdo aprofundado e exemplos práticos da aula ' || j || ' sobre ' || v_level_titles[i],
        '["Conceito Chave A", "Conceito Chave B", "Conceito Chave C"]'::jsonb,
        j
      );

      -- 4. Criar Quizzes (4 por nível - associados às primeiras 4 aulas)
      IF j <= 4 THEN
        INSERT INTO public.quizzes (lesson_id, question, option_a, option_b, option_c, option_d, correct_answer, xp_reward, options)
        VALUES (
          v_lesson_id,
          'Qual é a principal lição da Aula ' || i || '.' || j || '?',
          'Alternativa A (Correta)', 
          'Alternativa B', 
          'Alternativa C', 
          'Alternativa D',
          'option_a',
          50,
          '[]'::jsonb
        );
      END IF;
    END LOOP;
  END LOOP;

  -- 5. Seed Templates de Missões Diárias (user_id NULL indica template)
  INSERT INTO public.daily_missions (user_id, mission_type, xp_reward) VALUES
    (NULL, 'Completar 1 Aula', 50),
    (NULL, 'Acertar 3 Quizzes Seguidos', 100),
    (NULL, 'Praticar por 15 minutos', 75),
    (NULL, 'Revisar conceitos da Aula Anterior', 50),
    (NULL, 'Ganhar 150 Pontos de Aprendizado', 150)
  ON CONFLICT DO NOTHING;

  -- 6. Seed Templates de Desafios Semanais
  INSERT INTO public.weekly_challenges (user_id, challenge_type, xp_reward) VALUES
    (NULL, 'Completar 1 Nível Inteiro', 500),
    (NULL, 'Manter Streak por 5 dias', 300),
    (NULL, 'Conquistar 1 Certificado de Domínio', 400),
    (NULL, 'Acumular 1000 Pontos de Aprendizado', 500)
  ON CONFLICT DO NOTHING;

END $$;
