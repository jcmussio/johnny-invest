-- Seed specific badges for the Badges page

DO $$
DECLARE
  badge_data JSONB[] := ARRAY[
    '{"name": "Iniciante em Opções", "desc": "Deu o primeiro passo no mundo dos derivativos.", "crit": "Completar Nível 1", "icon": "🎯"}'::jsonb,
    '{"name": "Mestre dos Termos", "desc": "Aprendeu o vocabulário básico de Wall Street.", "crit": "Completar Nível 2", "icon": "📖"}'::jsonb,
    '{"name": "Especialista em Tipos", "desc": "Domina a diferença entre Calls e Puts.", "crit": "Completar Nível 3", "icon": "⚖️"}'::jsonb,
    '{"name": "Estrategista Iniciante", "desc": "Fez sua primeira operação estruturada.", "crit": "Completar Nível 4", "icon": "♟️"}'::jsonb,
    '{"name": "Gestor de Risco", "desc": "Aprendeu a proteger seu capital (Hedging).", "crit": "Completar Nível 5", "icon": "🛡️"}'::jsonb,
    '{"name": "Analista de Opções", "desc": "Sabe calcular as Gregas com maestria.", "crit": "Completar Nível 6", "icon": "📊"}'::jsonb,
    '{"name": "Estrategista Avançado", "desc": "Domina travas, borboletas e condors.", "crit": "Completar Nível 7", "icon": "🦅"}'::jsonb,
    '{"name": "Guru das Opções", "desc": "Atingiu o nível máximo de conhecimento.", "crit": "Completar Nível 8", "icon": "👑"}'::jsonb
  ];
  b JSONB;
BEGIN
  FOREACH b IN ARRAY badge_data
  LOOP
    IF NOT EXISTS (SELECT 1 FROM public.badges WHERE name = b->>'name') THEN
      INSERT INTO public.badges (name, description, unlock_criteria, icon)
      VALUES (b->>'name', b->>'desc', b->>'crit', b->>'icon');
    END IF;
  END LOOP;
END $$;
