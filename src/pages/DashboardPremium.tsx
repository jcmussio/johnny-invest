import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import {
  CheckCircle,
  Medal,
  Target,
  BrainCircuit,
  PlayCircle,
  Loader2,
  Crown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function DashboardPremium() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [aulas, setAulas] = useState<any[]>([])
  const [progress, setProgress] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (loading) return

    const checkPremiumAndLoad = async () => {
      if (!user) {
        navigate('/login')
        return
      }

      setIsLoading(true)

      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('premium')
          .eq('id', user.id)
          .single()

        if (userError || !userData?.premium) {
          toast.error('Acesso Restrito', {
            description: 'Área exclusiva para alunos Premium.',
          })
          navigate('/pricing')
          return
        }

        const { data: aulasData, error: aulasError } = await supabase
          .from('aulas')
          .select('*')
          .order('nivel')
          .order('numero_aula')

        if (aulasError) throw aulasError
        setAulas(aulasData || [])

        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .not('aula_id', 'is', null)

        if (progressError && progressError.code !== 'PGRST116') {
          console.error(progressError)
        } else {
          const progMap: any = {}
          progressData?.forEach((p: any) => {
            progMap[p.aula_id] = p
          })
          setProgress(progMap)
        }
      } catch (err: any) {
        console.error('Erro ao carregar Dashboard Premium:', err)
        toast.error('Erro ao carregar dados.')
      } finally {
        setIsLoading(false)
      }
    }

    checkPremiumAndLoad()
  }, [user, loading, navigate])

  if (loading || isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    )
  }

  const aulasPorNivel = aulas.reduce((acc: any, aula: any) => {
    const nivel = aula.nivel || 1
    if (!acc[nivel]) acc[nivel] = []
    acc[nivel].push(aula)
    return acc
  }, {})

  const niveis = Object.keys(aulasPorNivel).sort(
    (a, b) => Number(a) - Number(b),
  )

  return (
    <div className="flex flex-col gap-10 pb-10 max-w-4xl mx-auto animate-fade-in">
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border-2 border-purple-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-400/20 rounded-lg">
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Área Premium
            </h1>
            <p className="text-purple-200 font-medium mt-1">
              Sua jornada avançada em Opções e Derivativos.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        {niveis.map((nivel) => (
          <div key={nivel} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2 border-b-2 border-silver pb-2">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm">
                Nível {nivel}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aulasPorNivel[nivel].map((aula: any) => {
                const prog = progress[aula.id] || {}
                const isCompleted = prog.completada || false
                const hasQuiz = (prog.quiz_score || 0) > 0
                const hasMissao = prog.missao_completada || false
                const hasBadge = prog.badge_conquistada || false

                return (
                  <div
                    key={aula.id}
                    className="bg-white border-2 border-silver rounded-xl p-5 flex flex-col gap-4 hover:border-purple-300 transition-colors shadow-sm group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Aula {aula.numero_aula}
                        </span>
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-emerald" />
                        )}
                      </div>
                      <h3 className="font-bold text-navy text-lg leading-tight line-clamp-2">
                        {aula.titulo}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                        {aula.objetivo}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <div
                        className={cn(
                          'flex flex-col items-center justify-center p-2 rounded-lg border flex-1 text-center gap-1',
                          hasQuiz
                            ? 'bg-emerald-50 border-emerald-200'
                            : 'bg-slate-50 border-slate-200',
                        )}
                      >
                        <BrainCircuit
                          className={cn(
                            'w-5 h-5',
                            hasQuiz ? 'text-emerald-600' : 'text-slate-400',
                          )}
                        />
                        <span
                          className={cn(
                            'text-[10px] font-bold uppercase',
                            hasQuiz ? 'text-emerald-700' : 'text-slate-500',
                          )}
                        >
                          Quiz
                        </span>
                      </div>
                      <div
                        className={cn(
                          'flex flex-col items-center justify-center p-2 rounded-lg border flex-1 text-center gap-1',
                          hasMissao
                            ? 'bg-orange-50 border-orange-200'
                            : 'bg-slate-50 border-slate-200',
                        )}
                      >
                        <Target
                          className={cn(
                            'w-5 h-5',
                            hasMissao ? 'text-orange-600' : 'text-slate-400',
                          )}
                        />
                        <span
                          className={cn(
                            'text-[10px] font-bold uppercase',
                            hasMissao ? 'text-orange-700' : 'text-slate-500',
                          )}
                        >
                          Missão
                        </span>
                      </div>
                      <div
                        className={cn(
                          'flex flex-col items-center justify-center p-2 rounded-lg border flex-1 text-center gap-1',
                          hasBadge
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-slate-50 border-slate-200',
                        )}
                      >
                        <Medal
                          className={cn(
                            'w-5 h-5',
                            hasBadge ? 'text-yellow-600' : 'text-slate-400',
                          )}
                        />
                        <span
                          className={cn(
                            'text-[10px] font-bold uppercase',
                            hasBadge ? 'text-yellow-700' : 'text-slate-500',
                          )}
                        >
                          Badge
                        </span>
                      </div>
                    </div>

                    <Button3D
                      variant={isCompleted ? 'secondary' : 'super'}
                      className={cn(
                        'w-full mt-2',
                        !isCompleted &&
                          'bg-purple-600 border-purple-800 hover:bg-purple-700',
                      )}
                      onClick={() => {
                        toast.success(`Iniciando ${aula.titulo}...`, {
                          description: 'Simulação de abertura da aula.',
                        })
                      }}
                    >
                      {isCompleted ? (
                        'REVISAR AULA'
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          INICIAR AULA
                        </>
                      )}
                    </Button3D>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {niveis.length === 0 && (
          <div className="text-center p-10 border-2 border-dashed border-silver rounded-xl text-slate-500 font-medium">
            Nenhuma aula premium cadastrada ainda.
          </div>
        )}
      </section>
    </div>
  )
}
