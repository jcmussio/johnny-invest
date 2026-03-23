-- Create missions table
CREATE TABLE IF NOT EXISTS public.missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level_id UUID REFERENCES public.levels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT,
  scenario TEXT,
  options JSONB,
  correct_answer TEXT,
  xp_reward INT DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_missions" ON public.missions;
CREATE POLICY "public_read_missions" ON public.missions FOR SELECT TO authenticated USING (true);

-- Add mission_id to user_progress safely
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS mission_id UUID REFERENCES public.missions(id) ON DELETE CASCADE;

-- Drop constraint if exists to avoid errors on multiple runs, then recreate
ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS user_progress_user_id_mission_id_key;
ALTER TABLE public.user_progress ADD CONSTRAINT user_progress_user_id_mission_id_key UNIQUE (user_id, mission_id);

-- Seed some missions for Level 1
DO $seed_missions$
DECLARE
  level_1_id uuid;
  mission_count int;
BEGIN
  SELECT id INTO level_1_id FROM public.levels WHERE level_number = 1 LIMIT 1;
  
  IF level_1_id IS NOT NULL THEN
    SELECT count(*) INTO mission_count FROM public.missions WHERE level_id = level_1_id;
    
    IF mission_count = 0 THEN
      INSERT INTO public.missions (level_id, title, description, difficulty, scenario, options, correct_answer, xp_reward)
      VALUES 
      (level_1_id, 'Primeiro Investimento', 'Simulação de compra de sua primeira opção de compra (Call).', 'Fácil', 'O mercado está em alta. A ação da empresa XYZ está custando R$ 20,00 e você acredita que ela vai subir para R$ 25,00. Qual opção de compra você adquire?', '{"a": "Call de R$ 20,00", "b": "Put de R$ 20,00", "c": "Call de R$ 30,00", "d": "Put de R$ 15,00"}', 'a', 100),
      (level_1_id, 'Proteção de Carteira', 'Proteja sua carteira contra quedas do mercado.', 'Médio', 'Você tem 1000 ações da empresa ABC a R$ 50,00. O mercado está volátil. Como você se protege?', '{"a": "Compro Call de R$ 50,00", "b": "Compro Put de R$ 50,00", "c": "Vendo Call de R$ 50,00", "d": "Vendo Put de R$ 50,00"}', 'b', 150);
    END IF;
  END IF;
END $seed_missions$;
