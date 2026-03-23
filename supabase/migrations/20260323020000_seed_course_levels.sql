DO $DO$
DECLARE
    l1_id UUID := gen_random_uuid();
    l2_id UUID := gen_random_uuid();
    l3_id UUID := gen_random_uuid();
    l4_id UUID := gen_random_uuid();
    l5_id UUID := gen_random_uuid();
    l6_id UUID := gen_random_uuid();
    l7_id UUID := gen_random_uuid();
    l8_id UUID := gen_random_uuid();
    les1_id UUID := gen_random_uuid();
    les2_id UUID := gen_random_uuid();
BEGIN
    -- Garantir que a tabela esteja limpa de seeds antigos caso existam conflitos de numeração (opcional, mas seguro)
    -- Mas como pedimos idempotência com ON CONFLICT DO NOTHING, vamos apenas inserir.
    
    INSERT INTO public.levels (id, "number", title, description) VALUES
    (l1_id, 1, 'Fundamentos do Mercado', 'Aprenda o básico de opções e derivativos.'),
    (l2_id, 2, 'Risco e Retorno', 'Como calcular e gerenciar seus riscos nas operações.'),
    (l3_id, 3, 'Gregas Básicas', 'Entenda Delta e Gamma na prática.'),
    (l4_id, 4, 'Gregas Avançadas', 'Domine Theta, Vega e Rho para otimizar ganhos.'),
    (l5_id, 5, 'Estratégias de Proteção', 'Hedge financeiro e como proteger sua carteira.'),
    (l6_id, 6, 'Geração de Renda', 'Venda coberta e estratégias de taxa fixa.'),
    (l7_id, 7, 'Operações Estruturadas', 'Travas de alta/baixa, Borboletas e Condors.'),
    (l8_id, 8, 'Psicologia do Investidor', 'Controle emocional, gestão de banca e consistência.')
    ON CONFLICT DO NOTHING;

    -- Inserir algumas aulas no Nível 1 para demonstração
    INSERT INTO public.lessons (id, level_id, "number", title, content) VALUES
    (les1_id, l1_id, 1, 'O que são Opções?', 'Uma opção é um contrato que dá o direito de compra ou venda...'),
    (les2_id, l1_id, 2, 'Diferença entre Call e Put', 'Calls são opções de compra, Puts são opções de venda...')
    ON CONFLICT DO NOTHING;

    -- Inserir quizzes vinculados às aulas
    INSERT INTO public.quizzes (lesson_id, question, correct_answer, options) VALUES
    (les1_id, 'Qual o objetivo principal das opções para grandes investidores?', 'Proteção (Hedge)', '{"A": "Proteção (Hedge)", "B": "Garantir dividendos", "C": "Ter posse da empresa", "D": "Nenhuma das anteriores"}'::jsonb),
    (les2_id, 'Se você acredita que a ação vai subir, qual opção costuma comprar?', 'Call', '{"A": "Call", "B": "Put", "C": "Ação fracionada", "D": "Fundo Imobiliário"}'::jsonb)
    ON CONFLICT DO NOTHING;
END;
$DO$;
