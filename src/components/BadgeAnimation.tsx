import { Trophy } from 'lucide-react'

export function BadgeAnimation({
  badgeName,
  onClose,
}: {
  badgeName: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-yellow-300 to-yellow-600 p-10 rounded-3xl flex flex-col items-center animate-bounce shadow-2xl transform transition-all border-4 border-yellow-200">
        <Trophy className="w-24 h-24 text-white drop-shadow-md mb-4" />
        <h2 className="text-3xl font-black text-navy text-center tracking-tight">
          Badge Conquistada!
        </h2>
        <p className="text-xl font-bold text-navy/80 mt-2 text-center bg-white/20 px-4 py-1 rounded-full">
          {badgeName}
        </p>
        <button
          onClick={onClose}
          className="mt-8 bg-navy hover:bg-navy-shade text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-colors shadow-lg"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
