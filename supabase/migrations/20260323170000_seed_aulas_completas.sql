DO $$
BEGIN
  -- Limpar dados anteriores para não haver duplicação ou conflitos
  DELETE FROM public.quizzes;
  DELETE FROM public.missoes;
  DELETE FROM public.user_progress;
  DELETE FROM public.aulas;
  DELETE FROM public.badges;
  
  -- Inserir Badges (IDs 1 a 8)
  INSERT INTO public.badges (id, name, nome, requisito, beneficio, icon) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Iniciante em Opções', 'Iniciante em Opções', 'Completar AULA 1 com 70%+', '+100 XP', '🔰'),
  ('00000000-0000-0000-0000-000000000002', 'Mestre dos Termos', 'Mestre dos Termos', 'Completar AULA 2 com 70%+', '+100 XP', '📖'),
  ('00000000-0000-0000-0000-000000000003', 'Especialista em Tipos', 'Especialista em Tipos', 'Completar AULA 3 com 70%+', '+100 XP', '🧩'),
  ('00000000-0000-0000-0000-000000000004', 'Calculista de Opções', 'Calculista de Opções', 'Completar AULA 4 com 70%+', '+100 XP', '🧮'),
  ('00000000-0000-0000-0000-000000000005', 'Estrategista Iniciante', 'Estrategista Iniciante', 'Completar AULA 5 com 70%+', '+100 XP', '♟️'),
  ('00000000-0000-0000-0000-000000000006', 'Gestor de Risco', 'Gestor de Risco', 'Completar AULA 6 com 70%+', '+100 XP', '🛡️'),
  ('00000000-0000-0000-0000-000000000007', 'Analista de Opções', 'Analista de Opções', 'Completar AULA 7 com 70%+', '+100 XP', '📈'),
  ('00000000-0000-0000-0000-000000000008', 'Guru das Opções', 'Guru das Opções', 'Completar AULA 8 com 70%+', '+100 XP', '🧙‍♂️');

  -- Inserir Aulas (IDs 1 a 8)
  INSERT INTO public.aulas (id, nivel, numero_aula, titulo, objetivo, topicos, quiz_nome, missao_nome, badge_nome) VALUES
  ('00000000-0000-0000-0000-000000000001', 1, 1, 'Introdução ao Mercado de Opções', 'Compreender o que são opções, sua história e o papel no mercado financeiro', '1. O que são derivativos?
2. Definição de opções: Call e Put
3. História e evolução do mercado de opções
4. Participantes do mercado
5. Vantagens e desvantagens de operar opções', 'Desvendando os Primeiros Passos', 'Identificando Opções no Home Broker', 'Iniciante em Opções'),
  ('00000000-0000-0000-0000-000000000002', 1, 2, 'Terminologia e Elementos Essenciais', 'Dominar a terminologia e os elementos essenciais das opções', '1. Ativo-objeto, preço de exercício (strike), vencimento
2. Prêmio da opção
3. Opções ITM, ATM, OTM
4. Direitos e obrigações do comprador e vendedor
5. Liquidação física vs. financeira', 'Vocabulário do Opereiro', 'Analisando uma Grade de Opções', 'Mestre dos Termos'),
  ('00000000-0000-0000-0000-000000000003', 1, 3, 'Tipos de Opções', 'Diferenciar os tipos de opções e suas características', '1. Opções de compra (Calls) e opções de venda (Puts)
2. Opções americanas vs. europeias
3. Opções sobre ações, índices, moedas e commodities
4. Séries de opções', 'Classificando Opções', 'Escolhendo a Opção Certa', 'Especialista em Tipos'),
  ('00000000-0000-0000-0000-000000000004', 2, 4, 'Precificação de Opções', 'Entender os fatores que influenciam o preço das opções e os modelos de precificação', '1. Valor intrínseco e valor extrínseco (tempo)
2. Fatores de precificação: preço do ativo-objeto, strike, tempo, volatilidade, taxa de juros, dividendos
3. As "Gregas": Delta, Gamma, Theta, Vega, Rho (introdução)
4. Modelo de Black & Scholes (conceito)', 'Precificação Estratégica', 'Calculando Valor Intrínseco e Extrínseco', 'Calculista de Opções'),
  ('00000000-0000-0000-0000-000000000005', 2, 5, 'Estratégias Comuns', 'Aprender as estratégias mais comuns para operar com opções', '1. Compra a seco de Call e Put
2. Venda a seco de Call e Put (lançamento coberto)
3. Trava de alta e trava de baixa (com Call e Put)
4. Straddle e Strangle (conceito)
5. Montagem e desmontagem de operações', 'Mestre das Estratégias', 'Simulando uma Trava de Alta', 'Estrategista Iniciante'),
  ('00000000-0000-0000-0000-000000000006', 3, 6, 'Gerenciamento de Risco', 'Desenvolver habilidades para gerenciar riscos em operações com opções', '1. Identificação e mensuração de riscos
2. Stop Loss e Stop Gain em opções
3. Diversificação de carteira com opções
4. Uso das Gregas para gestão de risco (Delta Hedge)
5. Plano de trading e diário de operações', 'Guardião do Capital', 'Criando um Plano de Gerenciamento de Risco', 'Gestor de Risco'),
  ('00000000-0000-0000-0000-000000000007', 3, 7, 'Análise e Tomada de Decisão', 'Integrar análise técnica e fundamental com o mercado de opções', '1. Análise técnica aplicada a opções (suportes, resistências, tendências)
2. Análise fundamentalista e seu impacto nas opções
3. Leitura do book de ofertas e fluxo de ordens
4. Notícias e eventos macroeconômicos
5. Psicologia do trading e controle emocional', 'Decisor Estratégico', 'Analisando um Cenário de Mercado', 'Analista de Opções'),
  ('00000000-0000-0000-0000-000000000008', 4, 8, 'Tópicos Avançados', 'Explorar estratégias complexas e conceitos avançados do mercado de opções', '1. Borboleta, Condor, Iron Condor
2. Financiamento (lançamento coberto avançado)
3. Opções exóticas (introdução)
4. Arbitragem com opções
5. Tributação em operações com opções', 'Mestre Avançado', 'Montando uma Borboleta', 'Guru das Opções');

  -- Inserir Quizzes (IDs 1 a 8)
  INSERT INTO public.quizzes (id, aula_id, nome, question, correct_answer, xp_reward, perguntas_json) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Desvendando os Primeiros Passos', 'Quiz aula 1', 'B', 50, '[{"pergunta": "Qual é a principal característica de um derivativo?", "opcoes": ["Não tem valor próprio", "Seu valor deriva de outro ativo", "É um ativo físico", "Só pode ser negociado em balcão"], "correta": 1}, {"pergunta": "O que representa uma opção de Call?", "opcoes": ["Direito de vender", "Direito de comprar", "Obrigação de comprar", "Obrigação de vender"], "correta": 1}, {"pergunta": "Quem é o participante que busca proteção no mercado de opções?", "opcoes": ["Especulador", "Hedger", "Arbitrador", "Formador de mercado"], "correta": 1}]'::jsonb),
  
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Vocabulário do Opereiro', 'Quiz aula 2', 'B', 50, '[{"pergunta": "O que é o strike de uma opção?", "opcoes": ["O prêmio pago", "O preço de exercício", "A data de vencimento", "O ativo-objeto"], "correta": 1}, {"pergunta": "Como chamamos o valor pago para adquirir uma opção?", "opcoes": ["Garantia", "Prêmio", "Taxa", "Emolumento"], "correta": 1}, {"pergunta": "O que significa uma opção estar ITM?", "opcoes": ["Fora do dinheiro", "Dentro do dinheiro", "No dinheiro", "Sem valor"], "correta": 1}, {"pergunta": "Qual a principal diferença entre liquidação física e financeira?", "opcoes": ["O tipo de corretora", "A entrega do ativo vs recebimento da diferença financeira", "O horário de exercício", "As garantias exigidas"], "correta": 1}]'::jsonb),
  
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Classificando Opções', 'Quiz aula 3', 'B', 50, '[{"pergunta": "Qual a diferença entre opção americana e europeia?", "opcoes": ["O local de negociação", "A moeda utilizada", "O momento em que pode ser exercida", "A volatilidade do ativo"], "correta": 2}, {"pergunta": "O que é uma opção de Put?", "opcoes": ["Direito de comprar", "Direito de vender", "Obrigação de comprar", "Obrigação de vender"], "correta": 1}, {"pergunta": "O que define uma série de opções?", "opcoes": ["Mesmo strike", "Mesmo ativo-objeto e vencimento", "Mesmo prêmio", "Mesma volatilidade"], "correta": 1}, {"pergunta": "Quais ativos podem ser objeto de opções?", "opcoes": ["Apenas ações", "Ações, moedas, índices e commodities", "Apenas commodities", "Apenas índices"], "correta": 1}]'::jsonb),
  
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'Precificação Estratégica', 'Quiz aula 4', 'B', 50, '[{"pergunta": "O que é o valor intrínseco de uma opção?", "opcoes": ["A diferença entre o preço do ativo e o strike (se favorável)", "O valor do tempo", "A volatilidade implícita", "A taxa de juros livre de risco"], "correta": 0}, {"pergunta": "Qual Grega mede a sensibilidade da opção em relação ao tempo?", "opcoes": ["Delta", "Gamma", "Theta", "Vega"], "correta": 2}, {"pergunta": "O que o Delta representa?", "opcoes": ["Aceleração do preço", "Sensibilidade ao preço do ativo-objeto", "Sensibilidade à volatilidade", "Decaimento no tempo"], "correta": 1}, {"pergunta": "Como a volatilidade afeta o prêmio de uma opção?", "opcoes": ["Diminui o valor", "Aumenta o valor", "Não afeta", "Zera o valor"], "correta": 1}]'::jsonb),
  
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'Mestre das Estratégias', 'Quiz aula 5', 'B', 50, '[{"pergunta": "No lançamento coberto, o investidor:", "opcoes": ["Compra uma ação e compra uma Put", "Vende uma Call sem ter a ação", "Possui a ação e vende uma Call", "Compra uma Call e vende uma Put"], "correta": 2}, {"pergunta": "O que caracteriza uma trava de alta com Calls?", "opcoes": ["Comprar uma Call ITM e comprar uma Put OTM", "Vender duas Calls de strikes diferentes", "Comprar uma Call de strike menor e vender uma Call de strike maior", "Comprar uma Call e vender uma Put no mesmo strike"], "correta": 2}, {"pergunta": "Qual a finalidade de uma trava de baixa?", "opcoes": ["Lucrar com mercado em alta", "Lucrar com mercado em queda", "Lucrar com mercado lateral", "Lucrar com alta volatilidade"], "correta": 1}, {"pergunta": "O que é um Straddle?", "opcoes": ["Compra de Call e venda de Put em strikes diferentes", "Compra de duas Calls OTM", "Compra de uma Call e uma Put no mesmo strike", "Venda de ativo e compra de Call"], "correta": 2}, {"pergunta": "Ao montar uma trava de alta, o custo inicial é:", "opcoes": ["Zero", "A diferença entre os prêmios pagos e recebidos", "Infinito", "O valor total do strike"], "correta": 1}]'::jsonb),
  
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', 'Guardião do Capital', 'Quiz aula 6', 'B', 50, '[{"pergunta": "O que significa Delta Hedge?", "opcoes": ["Zerar a carteira", "Neutralizar o risco direcional da carteira", "Aumentar a exposição", "Vender todas as opções"], "correta": 1}, {"pergunta": "Por que o uso de Stop Loss em opções é desafiador?", "opcoes": ["Não é permitido pela bolsa", "Devido à baixa liquidez e spreads altos em algumas séries", "Porque as corretoras não aceitam", "Porque o preço nunca varia"], "correta": 1}, {"pergunta": "Qual o objetivo de um diário de operações?", "opcoes": ["Anotar fofocas", "Registrar erros, acertos e evolução", "Enviar para a corretora", "Calcular imposto apenas"], "correta": 1}, {"pergunta": "A diversificação com opções serve para:", "opcoes": ["Gastar dinheiro", "Reduzir o risco global do portfólio", "Garantir lucros fixos", "Eliminar a necessidade de análise"], "correta": 1}]'::jsonb),
  
  ('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000007', 'Decisor Estratégico', 'Quiz aula 7', 'B', 50, '[{"pergunta": "Como a análise técnica auxilia na operação de opções?", "opcoes": ["Apenas para swing trade", "Identificando suportes e resistências para definir strikes", "Calculando o Delta", "Descobrindo o balanço da empresa"], "correta": 1}, {"pergunta": "O que o fluxo de ordens (tape reading) permite visualizar?", "opcoes": ["O gráfico do Ibovespa", "As notícias do dia", "A intenção dos grandes players em tempo real", "O valor do dividendo"], "correta": 2}, {"pergunta": "Como notícias impactam o mercado de opções?", "opcoes": ["Não impactam", "Aumentam bruscamente a volatilidade (Vega)", "Alteram a data de vencimento", "Tornam opções ilegais"], "correta": 1}, {"pergunta": "Por que a psicologia é importante no trading?", "opcoes": ["Para prever o futuro", "Para evitar decisões impulsivas baseadas em medo ou ganância", "Para convencer os outros a comprar", "Para ganhar likes nas redes"], "correta": 1}]'::jsonb),
  
  ('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000008', 'Mestre Avançado', 'Quiz aula 8', 'B', 50, '[{"pergunta": "Qual a principal característica de uma estratégia Borboleta?", "opcoes": ["Lucro infinito", "Lucro máximo e risco bem definidos", "Risco infinito", "Depende de alta volatilidade"], "correta": 1}, {"pergunta": "Em qual cenário a Borboleta é mais eficiente?", "opcoes": ["Mercado muito volátil", "Mercado lateralizado perto do vencimento", "Queda brusca", "Alta exponencial"], "correta": 1}, {"pergunta": "O que é uma opção exótica?", "opcoes": ["Opção de outro país", "Opção com regras de exercício ou precificação não-padronizadas", "Opção apenas para ações gringas", "Opção que não vence"], "correta": 1}, {"pergunta": "O que busca a arbitragem com opções?", "opcoes": ["Adivinhar a direção", "Proteger a carteira", "Lucro sem risco aproveitando distorções de preços", "Aumentar as perdas"], "correta": 2}, {"pergunta": "Como funciona a tributação em operações de opções no Brasil (via de regra)?", "opcoes": ["Isento sempre", "Alíquota sobre o ganho líquido da operação", "Paga no momento da compra", "Paga apenas se exercido"], "correta": 1}]'::jsonb);

  -- Inserir Missoes (IDs 1 a 8)
  INSERT INTO public.missoes (id, aula_id, nome, descricao, resposta_correta, xp_reward) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Identificando Opções no Home Broker', 'Acesse seu home broker ou site de finanças, busque pelo código PETR4 e identifique o código de 3 opções de compra (Calls). Digite qualquer número para avançar.', '1', 150),
  
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Analisando uma Grade de Opções', 'Ação vale R$ 30,00. A Call strike 28,00 é ITM, ATM ou OTM? (Dica: Direito de comprar por 28 algo que vale 30 é vantajoso = ITM). Digite 1 para ITM, 2 para ATM ou 3 para OTM.', '1', 150),
  
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Escolhendo a Opção Certa', 'Você acredita que a ação da Vale vai cair após o balanço. Qual opção você compra para lucrar com a queda? Digite 1 para Call ou 2 para Put.', '2', 150),
  
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'Calculando Valor Intrínseco e Extrínseco', 'Ação custa R$ 50. Você tem uma Call strike R$ 45, que está custando R$ 6 no mercado. Qual o valor extrínseco (tempo) dessa opção? (Dica: Prêmio = VI + VE. VI é 50 - 45 = 5. Logo, 6 = 5 + VE).', '1', 150),
  
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'Simulando uma Trava de Alta', 'Você monta uma Trava de Alta pagando R$ 1,50 na Call comprada e recebendo R$ 0,50 na Call vendida. Qual o seu custo máximo (risco) nessa operação? (Dica: pago - recebido).', '1', 150),
  
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', 'Criando um Plano de Gerenciamento de Risco', 'Se seu capital total é R$ 10.000,00 e sua regra de risco diz para expor no máximo 2% por operação em opções, qual o valor máximo em reais que você pode colocar em uma única trava? (Dica: 2% de 10000).', '200', 150),
  
  ('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000007', 'Analisando um Cenário de Mercado', 'Gráfico mostra forte tendência de alta e rompeu resistência com volume. A volatilidade (IV) está baixa. É um bom cenário para compra a seco de Call? Digite 1 para Sim ou 2 para Não.', '1', 150),
  
  ('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000008', 'Montando uma Borboleta', 'Você quer montar uma borboleta porque acha que a ação vai ficar parada em R$ 40 até o vencimento. Você deve VENDER ou COMPRAR as opções do meio (strike 40)? Digite 1 para Vender ou 2 para Comprar.', '1', 150);

END $$;
