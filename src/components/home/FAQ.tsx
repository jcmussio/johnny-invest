import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'O que é uma opção?',
    a: 'É um derivativo financeiro que dá o direito de comprar ou vender um ativo por um preço fixo até uma data determinada. Ideal para proteção ou alavancagem.',
  },
  {
    q: 'Como funciona o curso gamificado?',
    a: 'Você avança por 8 níveis estruturados. Cada aula possui conteúdo rápido e um quiz. Acertando, você ganha XP, mantém sua ofensiva diária e desbloqueia o próximo passo.',
  },
  {
    q: 'Preciso ter experiência?',
    a: 'Não. O Nível 1 começa do absoluto zero (Fundamentos do Mercado), guiando você passo a passo até as estratégias avançadas no Nível 8.',
  },
  {
    q: 'Quanto tempo leva?',
    a: 'O sistema foi criado para que você estude de 10 a 15 minutos por dia. Em algumas semanas você já terá o conhecimento completo.',
  },
  {
    q: 'Posso cancelar?',
    a: 'Sim! Você tem 7 dias de Garantia Incondicional. Se não gostar da metodologia, devolvemos 100% do seu dinheiro sem perguntas.',
  },
  {
    q: 'Certificado é válido?',
    a: 'Ao concluir o curso, você recebe um certificado digital de conclusão, comprovando as horas e o conteúdo absorvido.',
  },
  {
    q: 'Diferença entre opções e ações?',
    a: 'Ações são pedaços de uma empresa. Opções são contratos sobre essas ações. Elas permitem operações com menos capital e estratégias de lucro mesmo se o mercado cair.',
  },
  {
    q: 'Como é o suporte?',
    a: 'Temos um suporte direto via plataforma e comunidade. As dúvidas técnicas são respondidas pela nossa equipe de especialistas.',
  },
  {
    q: 'Qual a metodologia?',
    a: 'Baseada em micro-learning e repetição espaçada. Aprenda a teoria em poucos minutos e fixe imediatamente com testes práticos.',
  },
  {
    q: 'Posso acessar no celular?',
    a: 'Completamente! A plataforma é 100% responsiva (mobile-first), funcionando perfeitamente como um aplicativo no seu navegador.',
  },
]

export function FAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <section id="faq" className="py-24 px-4 lg:px-8 bg-[#22355c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Perguntas Frequentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-[#1a2a4a] border border-[#c0c0c0]/20 rounded-[8px] px-6"
            >
              <AccordionTrigger className="text-left text-white hover:text-[#10b981] font-semibold py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#c0c0c0] pb-4 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
