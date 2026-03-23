-- Sprint 2: Gamification Schema Updates

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_login_date DATE;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS xp_ganho INT DEFAULT 0;

ALTER TABLE public.missoes ADD COLUMN IF NOT EXISTS resposta_correta TEXT;
ALTER TABLE public.missoes ADD COLUMN IF NOT EXISTS xp_reward INT DEFAULT 150;

-- Sample Data for Quizzes and Missoes
DO $$ 
DECLARE
  v_aula RECORD;
  v_badge_id UUID;
BEGIN
  FOR v_aula IN SELECT * FROM public.aulas LOOP
    -- Insert Quiz if not exists
    IF NOT EXISTS (SELECT 1 FROM public.quizzes WHERE aula_id = v_aula.id) THEN
      INSERT INTO public.quizzes (aula_id, nome, perguntas_json, question, correct_answer)
      VALUES (
        v_aula.id, 
        'Quiz: ' || v_aula.titulo, 
        '[
          {"pergunta": "Qual é o principal conceito ensinado na aula?", "opcoes": ["Opção Correta", "Opção Errada 1", "Opção Errada 2", "Opção Errada 3"], "correta": 0},
          {"pergunta": "Como você pode aplicar essa estratégia no mercado?", "opcoes": ["Sendo imprudente", "Gerenciando risco", "Não operando", "Ignorando a teoria"], "correta": 1}
        ]'::jsonb,
        'Questão placeholder',
        'A'
      );
    END IF;

    -- Insert Missão if not exists
    IF NOT EXISTS (SELECT 1 FROM public.missoes WHERE aula_id = v_aula.id) THEN
      INSERT INTO public.missoes (aula_id, nome, descricao, resposta_correta, xp_reward)
      VALUES (
        v_aula.id,
        'Missão: ' || v_aula.titulo,
        'Nesta missão, calcule o lucro de uma trava de alta baseada no conceito da aula. Compramos a R$ 2,00 e vendemos a R$ 1,00, com spread de R$ 2,00. Qual o lucro máximo? (Dica: spread - custo liquido). Responda apenas com o número.',
        '1',
        150
      );
    END IF;

    -- Ensure Badge exists in badges table
    IF v_aula.badge_nome IS NOT NULL THEN
      IF NOT EXISTS (SELECT 1 FROM public.badges WHERE nome = v_aula.badge_nome) THEN
        INSERT INTO public.badges (id, name, nome, requisito, beneficio, icon)
        VALUES (gen_random_uuid(), v_aula.badge_nome, v_aula.badge_nome, 'Completar aula: ' || v_aula.titulo, '+100 XP', '🏆')
        RETURNING id INTO v_badge_id;
      END IF;
    END IF;

  END LOOP;
END $$;
