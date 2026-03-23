import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { useAuth } from '@/hooks/use-auth'

export function SystemPresentation() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  return (
    <section
      id="sobre"
      className="py-24 px-4 lg:px-8 bg-[#22355c] border-y border-[#c0c0c0]/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Conheça o JohnnyTrader
          </h2>
          <p className="text-lg text-[#c0c0c0] max-w-3xl mx-auto">
            A primeira metodologia do Brasil que une a eficiência do
            micro-learning gamificado ao mercado de opções. Esqueça aulas
            monótonas de 2 horas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative rounded-[8px] overflow-hidden border border-[#c0c0c0]/20 shadow-2xl shadow-black/40 group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a2a4a]/90 z-10"></div>
            <img
              src="https://img.usecurling.com/p/800/800?q=trading%20charts&color=blue&dpr=2"
              alt="Metodologia"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <div className="bg-[#10b981] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                100% Prático
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Aprenda Executando
              </h3>
              <p className="text-[#c0c0c0]">
                Cada lição termina com um teste prático de fixação.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-8">
            <div className="bg-[#1a2a4a] p-6 rounded-[8px] border border-[#c0c0c0]/10">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <span className="bg-[#22355c] w-10 h-10 rounded-lg flex items-center justify-center text-[#10b981] border border-[#c0c0c0]/20">
                  1
                </span>
                Pílulas de Conhecimento
              </h4>
              <p className="text-[#c0c0c0]">
                Aulas de 5 a 10 minutos. Direto ao ponto, ensinando exatamente o
                que você precisa saber para operar.
              </p>
            </div>

            <div className="bg-[#1a2a4a] p-6 rounded-[8px] border border-[#c0c0c0]/10">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <span className="bg-[#22355c] w-10 h-10 rounded-lg flex items-center justify-center text-blue-400 border border-[#c0c0c0]/20">
                  2
                </span>
                Revisão Espaçada
              </h4>
              <p className="text-[#c0c0c0]">
                Nossos quizzes garantem que você nunca esqueça conceitos
                cruciais como Delta, Theta e Volatilidade.
              </p>
            </div>

            <div className="bg-[#1a2a4a] p-6 rounded-[8px] border border-[#c0c0c0]/10">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <span className="bg-[#22355c] w-10 h-10 rounded-lg flex items-center justify-center text-orange-400 border border-[#c0c0c0]/20">
                  3
                </span>
                Recompensa Imediata
              </h4>
              <p className="text-[#c0c0c0]">
                Ganhe XP, mantenha sua ofensiva (streak) e desbloqueie
                certificados de domínio a cada vitória.
              </p>
            </div>

            <div className="inline-block mt-4">
              <Button3D
                onClick={() => {
                  if (user && profile?.is_premium) navigate('/learn')
                  else if (user)
                    document
                      .getElementById('pricing')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  else navigate('/signup')
                }}
                variant="outline"
                size="lg"
                className="border-[#c0c0c0] text-[#c0c0c0]"
              >
                Ver Como Funciona
              </Button3D>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
