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

const units = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Nível ${i + 1}`,
  description: i === 0 ? 'Fundamentos de Opções' : `Módulo Avançado ${i}`,
  color: 'bg-navy',
  levels: [
    { id: 1, x: 0 },
    { id: 2, x: i % 2 === 0 ? -40 : 40 },
    { id: 3, x: i % 2 === 0 ? -20 : 20 },
    { id: 4, x: i % 2 === 0 ? 30 : -30 },
    { id: 5, x: 0 },
  ],
}))

export default function Learn() {
  const { state } = useAppStore()
  const navigate = useNavigate()

  const handleStartLesson = () => {
    navigate('/lesson')
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-extrabold text-navy">
          Opções e Derivativos
        </h1>
        <p className="text-slate-500 font-medium mt-2">Trilha de Aprendizado</p>
      </div>

      {units.map((unit) => (
        <div key={unit.id} className="flex flex-col items-center">
          {/* Unit Header */}
          <div
            className={cn(
              'w-full rounded-lg p-6 mb-8 flex justify-between items-center text-white shadow-sm border-2 border-navy-shade',
              unit.color,
            )}
          >
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                {unit.title}
              </h2>
              <p className="text-silver font-medium mt-1">{unit.description}</p>
            </div>
            <Button3D
              variant="secondary"
              size="sm"
              className="h-10 border-b-2 bg-silver text-navy border-silver-shade"
            >
              GUIA
            </Button3D>
          </div>

          {/* Path */}
          <div className="flex flex-col gap-6 relative w-full items-center">
            {unit.levels.map((level, index) => {
              const levelIdFull = `${unit.id}-${level.id}`
              const isCompleted = state.completedLevels.includes(levelIdFull)
              // Make level 1-1, 1-2, 1-3 unlocked for demo based on store state
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
                          'w-20 h-20 rounded-full flex items-center justify-center border-b-8 transition-all duration-300 active:translate-y-1 active:border-b-0 outline-none shadow-md',
                          isCompleted
                            ? 'bg-silver border-silver-shade'
                            : isCurrent
                              ? 'bg-emerald border-emerald-shade animate-float'
                              : 'bg-slate-200 border-slate-300 pointer-events-none',
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-8 h-8 text-navy stroke-[4px]" />
                        ) : isLocked ? (
                          <Lock className="w-8 h-8 text-slate-400" />
                        ) : (
                          <Star className="w-8 h-8 text-white fill-current" />
                        )}

                        {/* Certificate for completed levels */}
                        {isCompleted && (
                          <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 border-2 border-silver-shade shadow-sm">
                            <div className="w-3 h-3 bg-silver rounded-full" />
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
                        <div className="bg-white rounded-lg p-5 border-2 border-silver shadow-xl text-center flex flex-col items-center gap-4 animate-fade-in-up">
                          <div>
                            <h3 className="font-bold text-lg text-navy">
                              Nível {unit.id} • Lição {level.id}
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">
                              Conceitos Essenciais
                            </p>
                          </div>
                          <Button3D
                            fullWidth
                            onClick={handleStartLesson}
                            variant="super"
                          >
                            COMEÇAR +10 PTS
                          </Button3D>
                        </div>
                        {/* Little triangle arrow */}
                        <div className="w-4 h-4 bg-white border-b-2 border-r-2 border-silver transform rotate-45 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                      </PopoverContent>
                    )}
                  </Popover>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
