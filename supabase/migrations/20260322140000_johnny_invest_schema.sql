-- Up Migration for Johnny Invest

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  level_number INT NOT NULL,
  title TEXT NOT NULL,
  xp_required INT DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, level_number)
);

CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level_id UUID REFERENCES public.levels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  "order" INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  xp_reward INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  xp INT DEFAULT 0,
  streak INT DEFAULT 0,
  current_level INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  quiz_score INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  level_id UUID REFERENCES public.levels(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to ensure idempotency
DROP POLICY IF EXISTS "public_read_courses" ON public.courses;
DROP POLICY IF EXISTS "public_read_levels" ON public.levels;
DROP POLICY IF EXISTS "public_read_lessons" ON public.lessons;
DROP POLICY IF EXISTS "public_read_quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "public_read_badges" ON public.badges;

DROP POLICY IF EXISTS "users_read_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;

DROP POLICY IF EXISTS "user_progress_read_own" ON public.user_progress;
DROP POLICY IF EXISTS "user_progress_insert_own" ON public.user_progress;
DROP POLICY IF EXISTS "user_progress_update_own" ON public.user_progress;

DROP POLICY IF EXISTS "user_badges_read_own" ON public.user_badges;
DROP POLICY IF EXISTS "user_badges_insert_own" ON public.user_badges;

-- Recreate Policies (Read access for all authenticated users to content)
CREATE POLICY "public_read_courses" ON public.courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "public_read_levels" ON public.levels FOR SELECT TO authenticated USING (true);
CREATE POLICY "public_read_lessons" ON public.lessons FOR SELECT TO authenticated USING (true);
CREATE POLICY "public_read_quizzes" ON public.quizzes FOR SELECT TO authenticated USING (true);
CREATE POLICY "public_read_badges" ON public.badges FOR SELECT TO authenticated USING (true);

-- User policies
CREATE POLICY "users_read_own" ON public.users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Progress policies
CREATE POLICY "user_progress_read_own" ON public.user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "user_progress_insert_own" ON public.user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_progress_update_own" ON public.user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Badges policies
CREATE POLICY "user_badges_read_own" ON public.user_badges FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "user_badges_insert_own" ON public.user_badges FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Seed Initial Content Data
DO $$
DECLARE
  new_course_id uuid := gen_random_uuid();
BEGIN
  INSERT INTO public.courses (id, name, description)
  VALUES (new_course_id, 'Opções e Derivativos', 'Domine o mercado financeiro com a metodologia que funciona.')
  ON CONFLICT DO NOTHING;

  FOR i IN 1..8 LOOP
    INSERT INTO public.levels (course_id, level_number, title, description)
    VALUES (new_course_id, i, 'Nível ' || i, 'Módulo ' || i)
    ON CONFLICT (course_id, level_number) DO NOTHING;
  END LOOP;
END $$;

-- Seed Initial Auth User
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'jcmussiosp@gmail.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id, '00000000-0000-0000-0000-000000000000', 'jcmussiosp@gmail.com', crypt('securepassword123', gen_salt('bf')), NOW(),
      NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Johnny"}',
      false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', ''
    );

    INSERT INTO public.users (id, email, name, xp, streak, current_level)
    VALUES (new_user_id, 'jcmussiosp@gmail.com', 'Johnny', 1250, 12, 3)
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
