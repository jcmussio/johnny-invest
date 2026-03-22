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

// Baseado na estrutura de banco de dados do JohnnyTrader
const courseData = [
  {
    id: 1,
    title: 'Nível 1',
    description: 'Fundamentos do Mercado Financeiro',
    xpRequired: 500,
    lessonCount: 6,
  },
  {
    id: 2,
    title: 'Nível 2',
    description: 'Conceitos de Risco e Retorno',
    xpRequired: 600,
    lessonCount: 6,
  },
  {
    id: 3,
    title: 'Nível 3',
    description: 'Introdução a Opções',
    xpRequired: 700,
    lessonCount: 6,
  },
  {
    id: 4,
    title: 'Nível 4',
    description: 'Gregas - Delta e Gamma',
    xpRequired: 800,
    lessonCount: 6,
  },
  {
    id: 5,
    title: 'Nível 5',
    description: 'Gregas - Theta e Vega',
    xpRequired: 800,
    lessonCount: 7,
  },
  {
    id: 6,
    title: 'Nível 6',
    description: 'Estratégias Básicas',
    xpRequired: 900,
    lessonCount: 7,
  },
  {
    id: 7,
    title: 'Nível 7',
    description: 'Estratégias Avançadas',
    xpRequired: 1000,
    lessonCount: 6,
  },
  {
    id: 8,
    title: 'Nível 8',
    description: 'Operações Reais e Psicologia',
    xpRequired: 1000,
    lessonCount: 6,
  },
]

const units = courseData.map((unit, unitIndex) => ({
  id: unit.id,
  title: unit.title,
  description: unit.description,
  xpRequired: unit.xpRequired,
  color: 'bg-navy',
  levels: Array.from({ length: unit.lessonCount }, (_, i) => ({
    id: i + 1,
    // Cria um caminho sinuoso
    x: i % 2 === 0 ? (i % 4 === 0 ? 0 : -30) : 30,
  })),
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
              'w-full rounded-lg p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white shadow-sm border-2 border-navy-shade',
              unit.color,
            )}
          >
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                {unit.title}
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-md">
                  {unit.xpRequired} XP
                </span>
              </h2>
              <p className="text-silver font-medium mt-1">{unit.description}</p>
            </div>
            <Button3D
              variant="secondary"
              size="sm"
              className="h-10 border-b-2 bg-silver text-navy border-silver-shade w-full sm:w-auto"
            >
              GUIA DO NÍVEL
            </Button3D>
          </div>

          {/* Path */}
          <div className="flex flex-col gap-6 relative w-full items-center">
            {unit.levels.map((level) => {
              const levelIdFull = `${unit.id}-${level.id}`
              const isCompleted = state.completedLevels.includes(levelIdFull)
              // Logica simplificada para demonstracao: Nível 1 está liberado
              const isCurrent =
                unit.id === 1 &&
                !isCompleted &&
                state.unlockedLevels.includes(levelIdFull)
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
                              Aula {unit.id}.{level.id}
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">
                              Conceitos e Quiz (+50 XP)
                            </p>
                          </div>
                          <Button3D
                            fullWidth
                            onClick={handleStartLesson}
                            variant="super"
                          >
                            COMEÇAR
                          </Button3D>
                        </div>
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
