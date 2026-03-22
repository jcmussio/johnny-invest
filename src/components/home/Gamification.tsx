import { Star, Award, Flame, Target } from 'lucide-react'

const features = [
  {
    icon: Star,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    title: 'Pontos de Aprendizado (XP)',
    desc: 'Ganhe XP a cada lição concluída e quiz acertado. Acompanhe seu crescimento.',
  },
  {
    icon: Award,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    title: 'Certificados de Domínio',
    desc: 'Desbloqueie badges exclusivos ao finalizar cada um dos 8 níveis do curso.',
  },
  {
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    title: 'Dias Consecutivos (Streaks)',
    desc: 'Mantenha sua chama acesa estudando um pouco todos os dias. Crie o hábito.',
  },
  {
    icon: Target,
    color: 'text-[#10b981]',
    bg: 'bg-[#10b981]/10',
    border: 'border-[#10b981]/20',
    title: 'Missões e Desafios',
    desc: 'Complete objetivos diários e semanais para ganhar bônus explosivos de XP.',
  },
]

export function Gamification() {
  return (
    <section className="py-24 px-4 lg:px-8 bg-[#22355c]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            O Sistema Que Vicia Você em Aprender
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-[#1a2a4a] rounded-[8px] p-8 border border-[#c0c0c0]/10 text-center hover:border-[#c0c0c0]/40 transition-colors duration-300"
            >
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${feat.bg} ${feat.border} border`}
              >
                <feat.icon className={`w-8 h-8 ${feat.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {feat.title}
              </h3>
              <p className="text-[#c0c0c0] text-sm leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
