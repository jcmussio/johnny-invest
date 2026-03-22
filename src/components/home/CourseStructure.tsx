import { BookOpen, Award } from 'lucide-react'

const levels = [
  {
    id: 1,
    title: 'Fundamentos',
    desc: 'Introdução ao mercado financeiro e derivativos.',
    lessons: 6,
    xp: 500,
  },
  {
    id: 2,
    title: 'Risco e Retorno',
    desc: 'Entendendo a assimetria e gestão de capital.',
    lessons: 6,
    xp: 600,
  },
  {
    id: 3,
    title: 'Intro a Opções',
    desc: 'Calls, Puts, Titular e Lançador explicados.',
    lessons: 7,
    xp: 700,
  },
  {
    id: 4,
    title: 'Gregas - Delta/Gamma',
    desc: 'A matemática do movimento direcional.',
    lessons: 6,
    xp: 800,
  },
  {
    id: 5,
    title: 'Gregas - Theta/Vega',
    desc: 'O poder do tempo e da volatilidade.',
    lessons: 6,
    xp: 800,
  },
  {
    id: 6,
    title: 'Estratégias Básicas',
    desc: 'Lançamento coberto, trava de alta e baixa.',
    lessons: 7,
    xp: 900,
  },
  {
    id: 7,
    title: 'Estratégias Avançadas',
    desc: 'Iron Condor, Borboleta, Straddle.',
    lessons: 7,
    xp: 1000,
  },
  {
    id: 8,
    title: 'Operações Reais',
    desc: 'Psicologia do trader e execução na prática.',
    lessons: 5,
    xp: 1000,
  },
]

export function CourseStructure() {
  return (
    <section className="py-24 px-4 lg:px-8 bg-[#1a2a4a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Sua Jornada de 8 Níveis para o Sucesso em Opções
          </h2>
          <p className="text-lg text-[#c0c0c0] max-w-2xl mx-auto">
            Um caminho estruturado e lógico. Desbloqueie o próximo nível
            provando seu conhecimento.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-gradient-to-b from-[#22355c] to-[#1a2a4a] border border-[#c0c0c0]/20 rounded-[8px] p-6 hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl hover:border-[#c0c0c0]/50 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-[#1a2a4a] border border-[#c0c0c0]/30 flex items-center justify-center text-white font-bold text-xl group-hover:text-[#10b981] transition-colors">
                  {level.id}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-[#c0c0c0] uppercase tracking-wider mb-1">
                    Recompensa
                  </span>
                  <span className="text-sm font-bold text-yellow-500">
                    {level.xp} XP
                  </span>
                </div>
              </div>

              <h3
                className="text-xl font-bold text-white mb-2 line-clamp-1"
                title={level.title}
              >
                {level.title}
              </h3>
              <p className="text-sm text-[#c0c0c0] mb-6 h-10 line-clamp-2">
                {level.desc}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-[#c0c0c0]/10">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c0c0c0]">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  {level.lessons} Aulas
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c0c0c0]">
                  <Award className="w-4 h-4 text-purple-400" />1 Badge
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
