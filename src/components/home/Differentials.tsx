import { Zap, Briefcase, UserCheck, Users } from 'lucide-react'

export function Differentials() {
  return (
    <section className="py-24 px-4 lg:px-8 bg-[#1a2a4a]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: Zap,
              title: 'Metodologia Progressiva',
              desc: 'Aprenda no seu ritmo, sem sobrecarga de informação.',
            },
            {
              icon: Briefcase,
              title: 'Conteúdo 100% Prático',
              desc: 'Foco no que realmente importa para a tela de negociação.',
            },
            {
              icon: UserCheck,
              title: 'Autoridade do Johnny',
              desc: 'Anos de experiência condensados em pílulas diárias.',
            },
            {
              icon: Users,
              title: 'Comunidade Ativa',
              desc: 'Aprenda e compita com outros traders no ranking.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#22355c] p-6 rounded-[8px] border border-[#c0c0c0]/10"
            >
              <item.icon className="w-8 h-8 text-[#10b981] mb-4" />
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-[#c0c0c0] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Por que o Johnny Invest é diferente de tudo?
          </h2>
          <p className="text-lg text-[#c0c0c0] mb-8">
            Nós acreditamos que o ensino tradicional de finanças falhou. É
            denso, teórico e chato. Pegamos a mecânica dos aplicativos mais
            viciantes do mundo e aplicamos ao mercado de opções.
          </p>
          <div className="inline-flex items-center gap-3 bg-[#10b981]/10 text-[#10b981] px-5 py-3 rounded-lg border border-[#10b981]/20 font-semibold text-left">
            <UserCheck className="w-5 h-5 shrink-0" />
            <span>
              Centenas de investidores já estão descobrindo que aprender opções
              não precisa ser chato ou cansativo.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
