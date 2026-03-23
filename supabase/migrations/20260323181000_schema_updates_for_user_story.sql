-- (1) Tabela "aulas"
ALTER TABLE public.aulas ADD COLUMN IF NOT EXISTS descricao TEXT;
ALTER TABLE public.aulas ADD COLUMN IF NOT EXISTS ordem INTEGER;

-- (2) Tabela "users"
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS nivel INTEGER DEFAULT 1;

-- (3) Tabela "user_progress"
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'bloqueada';
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS missao_completa BOOLEAN DEFAULT false;

-- (4) Tabela "badges"
ALTER TABLE public.badges ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.badges ADD COLUMN IF NOT EXISTS badge_id TEXT;
ALTER TABLE public.badges ADD COLUMN IF NOT EXISTS data_conquista TIMESTAMPTZ DEFAULT NOW();

-- Populando/Atualizando a tabela "aulas" com as 8 aulas do Johnny Invest
DO $update_aulas$
BEGIN
    UPDATE public.aulas SET descricao = objetivo, ordem = numero_aula WHERE id = '00000000-0000-0000-0000-000000000001'::uuid;
    UPDATE public.aulas SET descricao = objetivo, ordem = numero_aula WHERE id = '00000000-0000-0000-0000-000000000002'::uuid;
    UPDATE public.aulas SET descricao = objetivo, ordem = numero_aula WHERE id = '00000000-0000-0000-0000-000000000003'::uuid;
    UPDATE public.aulas SET descricao = objetivo, ordem = numero_aula WHERE id = '00000000-0000-0000-0000-000000000004'::uuid;
    UPDATE public.aulas SET descricao = objetivo, ordem = numero_aula WHERE id = '00000000-0000-0000-0000-000000000005'::uuid;
    UPDATE public.aulas SET descricao = objetivo, ordem = numero_aula WHERE id = '00000000-0000-0000-0000-000000000006'::uuid;
    UPDATE public.aulas SET descricao = objetivo, ordem = numero_aula WHERE id = '00000000-0000-0000-0000-000000000007'::uuid;
    UPDATE public.aulas SET descricao = objetivo, ordem = numero_aula WHERE id = '00000000-0000-0000-0000-000000000008'::uuid;
END $update_aulas$;
