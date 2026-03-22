-- Adiciona o campo is_premium na tabela users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;

-- Cria a tabela orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  amount NUMERIC DEFAULT 29700,
  currency TEXT DEFAULT 'BRL',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ativa RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para users (garantindo idempotência)
DROP POLICY IF EXISTS "users_read_own" ON public.users;
CREATE POLICY "users_read_own" ON public.users 
  FOR SELECT TO authenticated 
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own" ON public.users;
CREATE POLICY "users_update_own" ON public.users 
  FOR UPDATE TO authenticated 
  USING (auth.uid() = id);

-- Políticas de RLS para orders
DROP POLICY IF EXISTS "orders_read_own" ON public.orders;
CREATE POLICY "orders_read_own" ON public.orders 
  FOR SELECT TO authenticated 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "orders_insert_own" ON public.orders;
CREATE POLICY "orders_insert_own" ON public.orders 
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = user_id);
