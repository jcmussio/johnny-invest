-- Garante a criação da tabela base de usuários se não existir
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1. Criação da tabela levels
CREATE TABLE IF NOT EXISTS public.levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "number" INT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Criação da tabela lessons com relacionamento para levels
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id UUID REFERENCES public.levels(id) ON DELETE CASCADE,
    "number" INT,
    title TEXT NOT NULL,
    content TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Criação da tabela quizzes com relacionamento para lessons
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB,
    correct_answer TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Criação da tabela user_progress com relacionamentos para users e lessons
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    score INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- Fallbacks: Adiciona colunas que podem estar ausentes em caso de tabelas já existentes 
-- (para manter a idempotência com os schemas anteriores e o formato exato solicitado)
ALTER TABLE public.levels ADD COLUMN IF NOT EXISTS "number" INT;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS "number" INT;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS options JSONB;
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS correct_answer TEXT;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS score INT DEFAULT 0;

-- Ativa o Row Level Security (RLS)
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para Leitura (Usuários Autenticados podem ler o conteúdo do curso)
DROP POLICY IF EXISTS "public_read_levels" ON public.levels;
CREATE POLICY "public_read_levels" ON public.levels FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "public_read_lessons" ON public.lessons;
CREATE POLICY "public_read_lessons" ON public.lessons FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "public_read_quizzes" ON public.quizzes;
CREATE POLICY "public_read_quizzes" ON public.quizzes FOR SELECT TO authenticated USING (true);

-- Políticas de RLS para Progresso do Usuário (Privacidade total: cada usuário vê apenas o seu)
DROP POLICY IF EXISTS "user_progress_read_own" ON public.user_progress;
CREATE POLICY "user_progress_read_own" ON public.user_progress 
    FOR SELECT TO authenticated 
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_progress_insert_own" ON public.user_progress;
CREATE POLICY "user_progress_insert_own" ON public.user_progress 
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_progress_update_own" ON public.user_progress;
CREATE POLICY "user_progress_update_own" ON public.user_progress 
    FOR UPDATE TO authenticated 
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_progress_delete_own" ON public.user_progress;
CREATE POLICY "user_progress_delete_own" ON public.user_progress 
    FOR DELETE TO authenticated 
    USING (auth.uid() = user_id);
