DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema='public' 
      AND table_name='aulas' 
      AND column_name='conteudo_markdown'
  ) THEN
    ALTER TABLE public.aulas ADD COLUMN conteudo_markdown TEXT;
  END IF;
END $$;

UPDATE public.aulas
SET conteudo_markdown = '## O que são Derivativos?
Um derivativo é um instrumento financeiro cujo valor depende de outro ativo subjacente (ação, índice, moeda, commodity, etc.). O termo ''derivativo'' vem do fato de que o seu valor é ''derivado'' do valor do ativo subjacente.

## Definição de Opções: Call e Put
Uma opção é um contrato que confere ao seu titular o DIREITO (mas não a obrigação) de comprar ou vender um ativo-objeto a um preço predeterminado (strike) até uma data específica (vencimento).

- **Call (Opção de Compra):** Direito de COMPRAR o ativo-objeto
- **Put (Opção de Venda):** Direito de VENDER o ativo-objeto

## História e Evolução do Mercado de Opções
O mercado de opções moderno começou em 1973 com a criação da Chicago Board Options Exchange (CBOE). Antes disso, opções eram negociadas de forma descentralizada e sem padronização. A CBOE revolucionou o mercado ao criar contratos padronizados e um sistema de compensação centralizado.

## Participantes do Mercado
Os principais participantes do mercado de opções incluem:
- **Especuladores:** Buscam lucro com movimentações de preço
- **Hedgers:** Buscam proteção contra riscos
- **Arbitrageurs:** Exploram diferenças de preço
- **Market Makers:** Fornecem liquidez ao mercado

## Vantagens e Desvantagens de Operar Opções
**Vantagens:**
- Alavancagem: Controlar grandes quantidades de ativo com pouco capital
- Proteção (Hedge): Proteger carteiras contra quedas de preço
- Flexibilidade: Múltiplas estratégias para diferentes cenários

**Desvantagens:**
- Complexidade: Requer conhecimento técnico
- Risco de perda total: O prêmio pago pode ser perdido completamente
- Volatilidade: Preços podem variar rapidamente'
WHERE numero_aula = 1;

UPDATE public.aulas
SET conteudo_markdown = '## Ativo-Objeto, Preço de Exercício (Strike) e Vencimento
- **Ativo-Objeto:** O ativo subjacente sobre o qual a opção é baseada (ação, índice, moeda, commodity)
- **Strike (Preço de Exercício):** O preço predeterminado pelo qual o ativo-objeto pode ser comprado ou vendido
- **Vencimento:** A data limite para exercer o direito da opção

## Prêmio da Opção
O prêmio é o valor pago pelo comprador ao vendedor pelo direito de exercer a opção. É o "preço" da opção no mercado e varia conforme fatores como volatilidade, tempo até vencimento e distância do strike.

## Opções ITM, ATM e OTM
- **ITM (In-The-Money):** Opção com valor intrínseco positivo. Para uma Call, quando preço do ativo > strike. Para uma Put, quando preço do ativo < strike.
- **ATM (At-The-Money):** Quando o preço do ativo é aproximadamente igual ao strike
- **OTM (Out-The-Money):** Opção sem valor intrínseco. Para uma Call, quando preço do ativo < strike. Para uma Put, quando preço do ativo > strike.

## Direitos e Obrigações do Comprador e Vendedor
- **Comprador:** Tem o DIREITO de exercer a opção (comprar ou vender o ativo)
- **Vendedor:** Tem a OBRIGAÇÃO de cumprir se o comprador exercer o direito

## Liquidação Física vs. Financeira
- **Liquidação Física:** O ativo-objeto é efetivamente entregue/recebido
- **Liquidação Financeira:** Apenas a diferença de preço é paga em dinheiro (mais comum em opções de índices e moedas)'
WHERE numero_aula = 2;

UPDATE public.aulas
SET conteudo_markdown = '## Opções de Compra (Calls) e Opções de Venda (Puts)
- **Call:** Confere o direito de COMPRAR o ativo-objeto. Lucra quando o preço sobe.
- **Put:** Confere o direito de VENDER o ativo-objeto. Lucra quando o preço cai.

## Opções Americanas vs. Europeias
- **Americana:** Pode ser exercida a qualquer momento até a data de vencimento
- **Europeia:** Pode ser exercida apenas na data de vencimento

## Opções sobre Ações, Índices, Moedas e Commodities
As opções podem ter como ativo-objeto:
- **Ações:** Opções sobre ações específicas de empresas
- **Índices:** Opções sobre índices de mercado (ex: Ibovespa)
- **Moedas:** Opções sobre pares de moedas (ex: USD/BRL)
- **Commodities:** Opções sobre commodities (ouro, petróleo, etc.)

## Séries de Opções
Séries de opções são conjuntos de opções com o mesmo vencimento e ativo-objeto, mas com diferentes strikes. Cada série oferece diferentes níveis de risco e retorno.'
WHERE numero_aula = 3;

UPDATE public.aulas
SET conteudo_markdown = '## Valor Intrínseco e Valor Extrínseco (Tempo)
O prêmio de uma opção é composto por dois componentes:
- **Valor Intrínseco:** O valor que a opção teria se exercida hoje. Para uma Call: max(Preço do Ativo - Strike, 0). Para uma Put: max(Strike - Preço do Ativo, 0)
- **Valor Extrínseco (Valor do Tempo):** O valor adicional devido ao tempo restante até o vencimento. Diminui conforme se aproxima do vencimento.

## Fatores de Precificação
Os principais fatores que influenciam o preço de uma opção são:
- **Preço do Ativo-Objeto:** Maior preço = Call mais cara, Put mais barata
- **Strike:** Quanto mais longe do preço atual, menor o valor intrínseco
- **Tempo até Vencimento:** Mais tempo = maior valor extrínseco
- **Volatilidade:** Maior volatilidade = opções mais caras
- **Taxa de Juros:** Afeta o custo de carregamento
- **Dividendos:** Reduz o valor das Calls e aumenta o valor das Puts

## As "Gregas": Delta, Gamma, Theta, Vega, Rho (Introdução)
As Gregas medem a sensibilidade do preço da opção a diferentes fatores:
- **Delta:** Sensibilidade a mudanças no preço do ativo
- **Gamma:** Sensibilidade do Delta a mudanças no preço do ativo
- **Theta:** Sensibilidade à passagem do tempo (decay)
- **Vega:** Sensibilidade a mudanças na volatilidade
- **Rho:** Sensibilidade a mudanças na taxa de juros

## Modelo de Black & Scholes (Conceito)
O modelo de Black & Scholes é uma fórmula matemática que calcula o valor teórico de uma opção europeia. Ele considera o preço do ativo, strike, tempo, volatilidade e taxa de juros.'
WHERE numero_aula = 4;

UPDATE public.aulas
SET conteudo_markdown = '## Compra a Seco de Call e Put
- **Compra de Call:** Você acredita que o preço vai subir. Lucra com a alta, com risco limitado ao prêmio pago.
- **Compra de Put:** Você acredita que o preço vai cair. Lucra com a queda, com risco limitado ao prêmio pago.

## Venda a Seco de Call e Put (Lançamento Coberto)
- **Venda de Call:** Você acredita que o preço vai cair ou ficar estável. Recebe o prêmio, mas tem risco ilimitado.
- **Venda de Put:** Você acredita que o preço vai subir ou ficar estável. Recebe o prêmio, mas pode ser obrigado a comprar o ativo.

## Trava de Alta e Trava de Baixa (com Call e Put)
- **Trava de Alta com Call:** Compra Call de strike baixo, vende Call de strike alto. Lucro limitado, risco limitado.
- **Trava de Baixa com Put:** Compra Put de strike alto, vende Put de strike baixo. Lucro limitado, risco limitado.

## Straddle e Strangle (Conceito)
- **Straddle:** Compra Call e Put com o mesmo strike. Lucra com alta volatilidade, independente da direção.
- **Strangle:** Compra Call de strike alto e Put de strike baixo. Similar ao Straddle, mas com custos menores.

## Montagem e Desmontagem de Operações
Montagem é a abertura de posições. Desmontagem é o fechamento das posições. Ambas são importantes para gerenciar risco e lucros.'
WHERE numero_aula = 5;

UPDATE public.aulas
SET conteudo_markdown = '## Identificação e Mensuração de Riscos
Antes de operar, é essencial identificar os riscos:
- **Risco de Mercado:** Risco de perda por movimento desfavorável do preço
- **Risco de Liquidez:** Risco de não conseguir sair da posição
- **Risco de Crédito:** Risco de contraparte não cumprir obrigações

## Stop Loss e Stop Gain em Opções
- **Stop Loss:** Nível de preço em que você encerra a posição para limitar perdas
- **Stop Gain:** Nível de preço em que você encerra a posição para garantir lucros

## Diversificação de Carteira com Opções
Usar opções para diversificar reduz o risco geral da carteira. Combine diferentes estratégias e ativos.

## Uso das Gregas para Gestão de Risco (Delta Hedge)
Delta Hedge é uma técnica para neutralizar o risco direcional usando as Gregas. Ajuste suas posições para manter um Delta próximo a zero.

## Plano de Trading e Diário de Operações
Um plano de trading define suas regras. Um diário registra todas as operações para análise posterior e melhoria contínua.'
WHERE numero_aula = 6;

UPDATE public.aulas
SET conteudo_markdown = '## Análise Técnica Aplicada a Opções
A análise técnica usa gráficos e indicadores para identificar tendências e pontos de entrada/saída. Aplicada a opções, ajuda a identificar boas oportunidades de strike e vencimento.

## Análise Fundamentalista e Seu Impacto nas Opções
A análise fundamentalista avalia o valor intrínseco de uma empresa. Notícias sobre ganhos, produtos novos e mudanças de gestão afetam o preço do ativo e, consequentemente, das opções.

## Leitura do Book de Ofertas e Fluxo de Ordens
O book de ofertas mostra as melhores ofertas de compra e venda. O fluxo de ordens revela a pressão compradora/vendedora. Essas informações ajudam a identificar movimentos iminentes.

## Notícias e Eventos Macroeconômicos
Eventos como decisões de bancos centrais, dados de emprego e mudanças políticas afetam significativamente os preços das opções.

## Psicologia do Trading e Controle Emocional
O controle emocional é crucial. Medo e ganância levam a decisões ruins. Mantenha disciplina e siga seu plano de trading.'
WHERE numero_aula = 7;

UPDATE public.aulas
SET conteudo_markdown = '## Borboleta, Condor, Iron Condor
- **Borboleta:** Estratégia neutra que lucra com estabilidade. Compra Call baixa, vende 2 Calls médias, compra Call alta.
- **Condor:** Similar à Borboleta, mas com strikes mais espaçados, oferecendo maior zona de lucro.
- **Iron Condor:** Combinação de Trava de Alta com Call e Trava de Baixa com Put. Lucra com estabilidade.

## Financiamento (Lançamento Coberto Avançado)
Financiamento é vender Calls contra ações em carteira para gerar renda extra. Avançado: combinar com outras estratégias para otimizar retornos.

## Opções Exóticas (Introdução)
Opções exóticas têm características especiais:
- **Opções Asiáticas:** Preço baseado na média do ativo durante o período
- **Opções Barreira:** Ativadas/desativadas se o preço atinge um nível específico
- **Opções Lookback:** Preço baseado no preço mais alto/baixo durante o período

## Arbitragem com Opções
Arbitragem explora diferenças de preço entre opções relacionadas ou entre opção e ativo. Oferece lucro com risco mínimo, mas requer execução rápida.

## Tributação em Operações com Opções
No Brasil, opções seguem as regras de renda variável:
- Ganhos são tributados em 15% (IR)
- Perdas podem ser compensadas com ganhos futuros
- Operações com prejuízo acumulado podem ter benefícios fiscais'
WHERE numero_aula = 8;
