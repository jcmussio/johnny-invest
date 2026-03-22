import { cn } from '@/lib/utils'
import { Button3D } from '@/components/ui/button-3d'
import { Star, Lock, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import useAppStore from '@/stores/useAppStore'

const units = [
  {
    id: 1,
    title: 'Unidade 1',
    description: 'O básico do básico',
    color: 'bg-duo-green',
    levels: [
      { id: 1, x: 0 },
      { id: 2, x: -40 },
      { id: 3, x: -20 },
      { id: 4, x: 30 },
      { id: 5, x: 0 },
    ],
  },
  {
    id: 2,
    title: 'Unidade 2',
    description: 'Cumprimentos e dia a dia',
    color: 'bg-duo-blue',
    levels: [
      { id: 1, x: 0 },
      { id: 2, x: 40 },
      { id: 3, x: 20 },
      { id: 4, x: -30 },
      { id: 5, x: 0 },
    ],
  },
]

export default function Index() {
  const { state } = useAppStore()
  const navigate = useNavigate()

  const handleStartLesson = () => {
    navigate('/lesson')
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {units.map((unit) => (
        <div key={unit.id} className="flex flex-col items-center">
          {/* Unit Header */}
          <div
            className={cn(
              'w-full rounded-2xl p-4 mb-8 flex justify-between items-center text-white shadow-sm',
              unit.color,
            )}
          >
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                {unit.title}
              </h2>
              <p className="text-white/90 font-medium">{unit.description}</p>
            </div>
            <Button3D variant="secondary" size="sm" className="h-10 border-b-2">
              GUIA
            </Button3D>
          </div>

          {/* Path */}
          <div className="flex flex-col gap-6 relative w-full items-center">
            {unit.levels.map((level, index) => {
              const levelIdFull = `${unit.id}-${level.id}`
              const isCompleted = state.completedLevels.includes(levelIdFull)
              const isCurrent =
                !isCompleted && state.unlockedLevels.includes(levelIdFull)
              const isLocked = !isCompleted && !isCurrent

              return (
                <div
                  key={level.id}
                  className="relative z-10"
                  style={{ transform: `translateX(${level.x}px)` }}
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          'w-20 h-20 rounded-full flex items-center justify-center border-b-8 transition-transform active:translate-y-1 active:border-b-0 outline-none',
                          isCompleted
                            ? 'bg-duo-yellow border-yellow-600'
                            : isCurrent
                              ? 'bg-duo-green border-duo-green-shade animate-float'
                              : 'bg-gray-200 border-gray-300 pointer-events-none',
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-8 h-8 text-white stroke-[4px]" />
                        ) : isLocked ? (
                          <Lock className="w-8 h-8 text-gray-400" />
                        ) : (
                          <Star className="w-8 h-8 text-white fill-current" />
                        )}

                        {/* Crown for completed levels */}
                        {isCompleted && (
                          <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 border-2 border-yellow-500">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          </div>
                        )}
                      </button>
                    </PopoverTrigger>

                    {!isLocked && (
                      <PopoverContent
                        className="w-64 p-0 border-none bg-transparent shadow-none"
                        side="top"
                        sideOffset={10}
                      >
                        <div className="bg-white rounded-2xl p-4 border-2 border-duo-gray shadow-xl text-center flex flex-col items-center gap-4 animate-fade-in-up">
                          <div>
                            <h3 className="font-bold text-lg text-duo-text">
                              Nível {level.id} de {unit.levels.length}
                            </h3>
                            <p className="text-slate-500 text-sm">
                              Lição {level.id}
                            </p>
                          </div>
                          <Button3D fullWidth onClick={handleStartLesson}>
                            COMEÇAR +10 XP
                          </Button3D>
                        </div>
                        {/* Little triangle arrow */}
                        <div className="w-4 h-4 bg-white border-b-2 border-r-2 border-duo-gray transform rotate-45 absolute bottom-[-8px] left-1/2 -translate-x-1/2 bg-white"></div>
                      </PopoverContent>
                    )}
                  </Popover>

                  {/* Mascot for Current Level */}
                  {isCurrent && (
                    <img
                      src="https://img.usecurling.com/i?q=owl-cartoon&color=green&shape=hand-drawn"
                      alt="Mascot"
                      className="absolute -right-24 top-0 w-20 h-20 animate-bounce"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
