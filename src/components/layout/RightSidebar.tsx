import useAppStore from '@/stores/useAppStore'
import { Heart, Zap, Gem } from 'lucide-react'

export function RightSidebar() {
  const { state } = useAppStore()

  return (
    <aside className="hidden lg:flex flex-col w-[360px] fixed right-0 top-0 h-screen p-6 z-10">
      <div className="flex items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-2 group cursor-pointer hover:bg-slate-100 p-2 rounded-xl transition-colors">
          <img
            src="https://img.usecurling.com/i?q=flag-brazil&shape=fill"
            alt="Course"
            className="w-8 h-8 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-7 h-7 flex items-center justify-center">
            <span className="text-orange-500 animate-pulse">
              <Zap className="fill-orange-500 text-orange-500" />
            </span>
          </div>
          <span className="text-orange-500 font-bold text-lg">
            {state.streak}
          </span>
        </div>

        <div className="flex items-center gap-2 group cursor-pointer">
          <Gem className="text-duo-blue fill-duo-blue w-6 h-6" />
          <span className="text-duo-blue font-bold text-lg">{state.gems}</span>
        </div>

        <div className="flex items-center gap-2 group cursor-pointer">
          <Heart className="text-duo-red fill-duo-red w-6 h-6" />
          <span className="text-duo-red font-bold text-lg">{state.hearts}</span>
        </div>
      </div>

      <div className="border-2 border-duo-gray rounded-2xl p-4 mb-6">
        <h3 className="font-bold text-lg mb-2 text-duo-text">
          Desbloqueie a Leaderboard!
        </h3>
        <p className="text-slate-500 mb-4">
          Complete mais 3 lições para competir com outros.
        </p>
        <div className="w-full bg-duo-gray h-4 rounded-full overflow-hidden">
          <div className="bg-duo-yellow h-full w-[70%]"></div>
        </div>
      </div>

      {/* Example Promo Card */}
      <div className="border-2 border-duo-gray rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-duo-text">Missões Diárias</h3>
          <span className="text-duo-blue font-bold text-xs uppercase cursor-pointer hover:underline">
            Ver tudo
          </span>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
            <Zap className="w-6 h-6 fill-orange-500" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">Ganhe 50 XP</p>
            <div className="w-full bg-slate-200 h-2.5 rounded-full mt-1">
              <div className="bg-orange-500 h-full w-[60%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
