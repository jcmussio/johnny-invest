import { useNavigate } from 'react-router-dom'
import { CheckCircle, Lock, BrainCircuit, Target, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

export function AulaCard({ aula }: { aula: any }) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { isCompleted, isUnlocked, hasQuiz, hasMissao, prog } = aula

  const handleQuiz = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isUnlocked) return
    navigate(`/quiz/${aula.id}`)
  }

  const handleMissao = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isUnlocked) return
    navigate(`/missao/${aula.id}`)
  }

  const handleBadge = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: aula.badge_nome || 'Badge da Aula',
      description: isCompleted
        ? 'Você já conquistou esta badge!'
        : 'Complete o Quiz com 100% e a Missão para desbloquear.',
    })
  }

  return (
    <div
      onClick={() => (isUnlocked ? navigate(`/aula/${aula.id}`) : null)}
      className={cn(
        'bg-white border-2 rounded-xl p-5 flex flex-col gap-4 transition-all shadow-sm group',
        isUnlocked
          ? 'cursor-pointer hover:border-purple-400 hover:shadow-md'
          : 'opacity-60 grayscale cursor-not-allowed border-slate-200',
        isCompleted
          ? 'border-emerald bg-emerald-50/20'
          : isUnlocked
            ? 'border-silver'
            : '',
      )}
    >
      <div>
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Aula {aula.numero_aula}
          </span>
          {isCompleted && <CheckCircle className="w-5 h-5 text-emerald" />}
          {!isUnlocked && <Lock className="w-4 h-4 text-slate-400" />}
        </div>
        <h3 className="font-bold text-navy text-lg leading-tight line-clamp-2">
          {aula.titulo}
        </h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-1">
          {aula.objetivo || aula.descricao}
        </p>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleQuiz}
          disabled={!isUnlocked}
          className={cn(
            'flex flex-col items-center justify-center py-2 rounded-lg border flex-1 text-center gap-1 transition-colors',
            isUnlocked && 'hover:bg-emerald-100 hover:border-emerald-300',
            hasQuiz
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-slate-50 border-slate-200',
          )}
        >
          <BrainCircuit
            className={cn(
              'w-4 h-4',
              hasQuiz ? 'text-emerald-600' : 'text-slate-400',
            )}
          />
          <span
            className={cn(
              'text-[9px] font-bold uppercase',
              hasQuiz ? 'text-emerald-700' : 'text-slate-500',
            )}
          >
            Quiz {prog?.quiz_score !== undefined ? `${prog.quiz_score}%` : ''}
          </span>
        </button>

        <button
          onClick={handleMissao}
          disabled={!isUnlocked}
          className={cn(
            'flex flex-col items-center justify-center py-2 rounded-lg border flex-1 text-center gap-1 transition-colors',
            isUnlocked && 'hover:bg-orange-100 hover:border-orange-300',
            hasMissao
              ? 'bg-orange-50 border-orange-200'
              : 'bg-slate-50 border-slate-200',
          )}
        >
          <Target
            className={cn(
              'w-4 h-4',
              hasMissao ? 'text-orange-600' : 'text-slate-400',
            )}
          />
          <span
            className={cn(
              'text-[9px] font-bold uppercase',
              hasMissao ? 'text-orange-700' : 'text-slate-500',
            )}
          >
            Missão
          </span>
        </button>

        <button
          onClick={handleBadge}
          className={cn(
            'flex flex-col items-center justify-center py-2 rounded-lg border flex-1 text-center gap-1 transition-colors hover:bg-yellow-100 hover:border-yellow-300 cursor-pointer',
            isCompleted
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-slate-50 border-slate-200',
          )}
        >
          <Trophy
            className={cn(
              'w-4 h-4',
              isCompleted ? 'text-yellow-600' : 'text-slate-400',
            )}
          />
          <span
            className={cn(
              'text-[9px] font-bold uppercase',
              isCompleted ? 'text-yellow-700' : 'text-slate-500',
            )}
          >
            Badge
          </span>
        </button>
      </div>
    </div>
  )
}
