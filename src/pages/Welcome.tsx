import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { CheckCircle2, Rocket, BookOpen } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center p-4 py-10 animate-fade-in">
      <div className="bg-[#22355c] border-2 border-[#c0c0c0]/20 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#1a2a4a]/50 p-8 flex flex-col items-center text-center border-b border-[#c0c0c0]/10">
          <div className="w-20 h-20 bg-[#10b981]/20 rounded-full flex items-center justify-center mb-6">
            <Rocket className="w-10 h-10 text-[#10b981]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Bem-vindo ao Johnny Invest
          </h1>
          <p className="text-[#c0c0c0] text-lg mt-2 max-w-lg">
            A primeira plataforma gamificada do Brasil focada exclusivamente em
            opções e derivativos.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col gap-8">
          <div className="bg-[#1a2a4a] rounded-xl p-6 border border-[#c0c0c0]/20">
            <h3 className="text-sm font-bold text-[#c0c0c0] uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />O que você vai
              dominar (4 Níveis):
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                'Nível 1: Fundamentos e Dinâmica de Preços',
                'Nível 2: Moneyness e Valor Intrínseco/Extrínseco',
                'Nível 3: Gregas Direcionais (Delta e Gamma)',
                'Nível 4: Gregas de Tempo e Volatilidade (Theta e Vega)',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-white font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Button3D
              variant="success"
              className="w-full sm:w-auto min-w-[300px] h-14 text-lg"
              onClick={() => navigate('/signup')}
            >
              COMEÇAR AGORA
            </Button3D>
            <p className="text-slate-400 text-sm font-medium">
              Acesso imediato e 100% gratuito. Sem mensalidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
