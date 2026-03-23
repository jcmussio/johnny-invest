-- Migration file to make all users have premium access implicitly
-- Though we don't drop the column to avoid breaking old queries, we set default to true
ALTER TABLE public.users ALTER COLUMN premium SET DEFAULT true;
UPDATE public.users SET premium = true;
ALTER TABLE public.users ALTER COLUMN is_premium SET DEFAULT true;
UPDATE public.users SET is_premium = true;
