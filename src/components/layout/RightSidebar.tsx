import useAppStore from '@/stores/useAppStore'
import { Flame, Gem, Shield } from 'lucide-react'

export function RightSidebar() {
  const { state } = useAppStore()

  return (
    <aside className="hidden lg:flex flex-col w-[360px] fixed right-0 top-0 h-screen p-6 z-10">
      <div className="flex items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-2 group cursor-pointer hover:bg-slate-100 p-2 rounded-xl transition-colors">
          <Shield className="w-6 h-6 text-navy fill-navy/20" />
        </div>

        <div
          className="flex items-center gap-2 group cursor-pointer"
          title="Dias de Prática"
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <span className="text-orange-500 animate-pulse">
              <Flame className="fill-orange-500 text-orange-500" />
            </span>
          </div>
          <span className="text-orange-500 font-bold text-lg">
            {state.streak}
          </span>
        </div>

        <div
          className="flex items-center gap-2 group cursor-pointer"
          title="Gemas"
        >
          <Gem className="text-emerald fill-emerald/20 w-6 h-6" />
          <span className="text-emerald font-bold text-lg">{state.gems}</span>
        </div>
      </div>

      <div className="border-2 border-silver-light rounded-xl p-5 mb-6 shadow-sm bg-white">
        <h3 className="font-bold text-lg mb-2 text-navy">
          Desbloqueie a Liga Investidor!
        </h3>
        <p className="text-slate-500 mb-4 text-sm">
          Complete mais 3 lições para competir com outros alunos.
        </p>
        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
          <div className="bg-silver h-full w-[70%]"></div>
        </div>
      </div>

      <div className="border-2 border-silver-light rounded-xl p-5 shadow-sm bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-navy">Metas Diárias</h3>
          <span className="text-navy font-bold text-xs uppercase cursor-pointer hover:underline">
            Ver tudo
          </span>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 shrink-0">
            <Flame className="w-6 h-6 fill-orange-500" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-navy">Ganhe 50 Pontos</p>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2">
              <div className="bg-orange-500 h-full w-[60%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
