-- Migration file for Fase 1 Johnny Invest
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS premium BOOLEAN DEFAULT false;

CREATE TABLE IF NOT EXISTS public.aulas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nivel INT,
    numero_aula INT,
    titulo TEXT,
    objetivo TEXT,
    topicos TEXT,
    quiz_nome TEXT,
    missao_nome TEXT,
    badge_nome TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_aulas" ON public.aulas;
CREATE POLICY "public_read_aulas" ON public.aulas FOR SELECT TO authenticated USING (true);

-- Adding columns to quizzes
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS aula_id UUID REFERENCES public.aulas(id) ON DELETE CASCADE;
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS nome TEXT;
ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS perguntas_json JSONB;

-- Creating missoes
CREATE TABLE IF NOT EXISTS public.missoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aula_id UUID REFERENCES public.aulas(id) ON DELETE CASCADE,
    nome TEXT,
    descricao TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.missoes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_missoes" ON public.missoes;
CREATE POLICY "public_read_missoes" ON public.missoes FOR SELECT TO authenticated USING (true);

-- Adding columns to badges
ALTER TABLE public.badges ADD COLUMN IF NOT EXISTS nome TEXT;
ALTER TABLE public.badges ADD COLUMN IF NOT EXISTS requisito TEXT;
ALTER TABLE public.badges ADD COLUMN IF NOT EXISTS beneficio TEXT;

-- Adding columns to user_progress
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS aula_id UUID REFERENCES public.aulas(id) ON DELETE CASCADE;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS missao_completada BOOLEAN DEFAULT false;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS badge_conquistada BOOLEAN DEFAULT false;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS completada BOOLEAN DEFAULT false;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.aulas) THEN
    INSERT INTO public.aulas (id, nivel, numero_aula, titulo, objetivo, topicos, quiz_nome, missao_nome, badge_nome)
    VALUES 
    (gen_random_uuid(), 1, 1, 'Introdução às Opções', 'Entender o conceito básico de opções', '1. O que é uma opção, 2. Direitos e Obrigações, 3. Call vs Put', 'Quiz: O Básico das Opções', 'Missão: Sua Primeira Operação Mental', 'Badge: Visionário Iniciante'),
    (gen_random_uuid(), 1, 2, 'Dinâmica de Preços', 'Compreender o que afeta o preço da opção', '1. Ativo Objeto, 2. Tempo (Vencimento), 3. Volatilidade', 'Quiz: Movimento de Preços', 'Missão: Observador do Mercado', 'Badge: Analista Júnior'),
    (gen_random_uuid(), 2, 3, 'Moneyness (ITM, ATM, OTM)', 'Identificar o status da opção', '1. In The Money, 2. At The Money, 3. Out of The Money', 'Quiz: Qual o Status?', 'Missão: Caçador de ITM', 'Badge: Mestre do Strike'),
    (gen_random_uuid(), 2, 4, 'Valor Intrínseco e Extrínseco', 'Calcular o prêmio real e a taxa de risco', '1. Cálculo VI, 2. Cálculo VE, 3. Decaimento de tempo', 'Quiz: Desvendando o Prêmio', 'Missão: Separando os Valores', 'Badge: Precificador'),
    (gen_random_uuid(), 3, 5, 'Grega: Delta', 'Entender a sensibilidade direcional', '1. Direcionalidade, 2. Probabilidade de exercício, 3. Hedge ratio', 'Quiz: O Poder do Delta', 'Missão: Equilibrando a Carteira', 'Badge: Domador de Delta'),
    (gen_random_uuid(), 3, 6, 'Grega: Gamma', 'Compreender a aceleração do Delta', '1. O que é Gamma, 2. Risco Gamma perto do vencimento, 3. Posição Long/Short Gamma', 'Quiz: Aceleração do Preço', 'Missão: Surfando o Gamma', 'Badge: Velocista do Mercado'),
    (gen_random_uuid(), 4, 7, 'Grega: Theta', 'Gerenciar o tempo a seu favor ou contra', '1. Decaimento Temporal, 2. Curva do Theta, 3. Estratégias Theta Positivo', 'Quiz: O Fator Tempo', 'Missão: Senhor do Tempo', 'Badge: Guardião do Tempo'),
    (gen_random_uuid(), 4, 8, 'Grega: Vega', 'Entender o impacto do pânico e euforia', '1. Volatilidade Implícita, 2. Risco Vega, 3. IV Rank vs IV Percentile', 'Quiz: A Montanha Russa', 'Missão: Medidor de Pânico', 'Badge: Mestre da Volatilidade');
  END IF;
END $$;
