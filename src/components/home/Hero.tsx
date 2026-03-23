import { Link } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { CheckCircle } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-4 lg:px-8 bg-[#1a2a4a] min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#22355c] border border-[#c0c0c0]/20 px-4 py-2 rounded-full mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[#c0c0c0] text-sm font-bold tracking-widest uppercase">
              Acesso 100% Gratuito
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.2] drop-shadow-lg">
            Aprenda Opções Como Você Aprende um Idioma — Progressivo, Intuitivo
            e Viciante
          </h1>

          <p className="text-lg md:text-xl text-[#c0c0c0] mb-8 max-w-2xl mx-auto lg:mx-0 leading-[1.6]">
            Aulas curtas, prática diária, progresso real. Domine o mercado
            financeiro com a metodologia gamificada definitiva.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <div className="flex items-center gap-2 text-[#c0c0c0] font-semibold bg-[#22355c] px-4 py-2 rounded-lg border border-[#c0c0c0]/10">
              <CheckCircle className="w-5 h-5 text-[#10b981]" /> 8 Níveis
            </div>
            <div className="flex items-center gap-2 text-[#c0c0c0] font-semibold bg-[#22355c] px-4 py-2 rounded-lg border border-[#c0c0c0]/10">
              <CheckCircle className="w-5 h-5 text-[#10b981]" /> 40+ Aulas
            </div>
            <div className="flex items-center gap-2 text-[#c0c0c0] font-semibold bg-[#22355c] px-4 py-2 rounded-lg border border-[#c0c0c0]/10">
              <CheckCircle className="w-5 h-5 text-[#10b981]" /> 100% Prático
            </div>
          </div>

          <div className="block w-full sm:w-auto">
            <Button3D
              asChild
              variant="success"
              size="lg"
              className="w-full sm:w-auto text-lg h-16 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              <Link to="/welcome">Comece Agora Gratuitamente</Link>
            </Button3D>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none perspective-1000">
          <div className="relative rounded-xl border border-[#c0c0c0]/30 bg-gradient-to-br from-[#22355c] to-[#1a2a4a] p-2 shadow-2xl shadow-black/60 transform lg:-rotate-y-12 lg:rotate-x-12 transition-transform duration-700 hover:rotate-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-xl pointer-events-none"></div>
            <img
              src="https://img.usecurling.com/p/800/600?q=dashboard%20app&color=blue&dpr=2"
              alt="Dashboard Mockup"
              className="rounded-lg w-full h-auto object-cover opacity-90 mix-blend-lighten"
            />

            {/* Overlay UI elements to make it look gamified */}
            <div className="absolute top-4 right-4 bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg p-3 shadow-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">
                🔥
              </div>
              <div>
                <div className="text-white text-sm font-bold">12 Dias</div>
                <div className="text-[#c0c0c0] text-xs">Streak</div>
              </div>
            </div>

            <div className="absolute bottom-10 left-[-20px] bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg p-4 shadow-xl">
              <div className="text-[#10b981] font-extrabold text-xl mb-1">
                +50 XP
              </div>
              <div className="text-white text-sm">Nível 2 Concluído!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
