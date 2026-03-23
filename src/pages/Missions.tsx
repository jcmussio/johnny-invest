import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  CheckCircle,
  XCircle,
  Target,
  Loader2,
  Trophy,
  ArrowRight,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Mission {
  id: string
  title: string
  description: string
  difficulty: string
  scenario: string
  options: any
  correct_answer: string
  xp_reward: number
}

export default function Missions() {
  const { user } = useAuth()

  const [missions, setMissions] = useState<Mission[]>([])
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(
    new Set(),
  )
  const [loading, setLoading] = useState(true)
  const [levelTitle, setLevelTitle] = useState('')

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'answered'>('idle')
  const [isCorrect, setIsCorrect] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!user) return

    const fetchMissions = async () => {
      setLoading(true)
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('current_level')
          .eq('id', user.id)
          .single()
        const levelNum = userData?.current_level || 1

        const { data: levelData } = await supabase
          .from('levels')
          .select('id, title')
          .eq('level_number', levelNum)
          .limit(1)
          .single()

        if (levelData) {
          setLevelTitle(levelData.title)
          const { data: missionsData } = await supabase
            .from('missions')
            .select('*')
            .eq('level_id', levelData.id)
            .order('created_at', { ascending: true })

          setMissions(missionsData || [])

          const { data: progressData } = await supabase
            .from('user_progress' as any)
            .select('mission_id')
            .eq('user_id', user.id)
            .eq('completed', true)
            .not('mission_id', 'is', null)

          if (progressData) {
            setCompletedMissions(
              new Set(progressData.map((p: any) => p.mission_id)),
            )
          }
        } else {
          toast.error('Nível atual não encontrado.')
        }
      } catch (error: any) {
        toast.error('Erro ao carregar missões', { description: error.message })
      } finally {
        setLoading(false)
      }
    }

    fetchMissions()
  }, [user])

  const handleOpenMission = (mission: Mission) => {
    setSelectedMission(mission)
    setSelectedOption(null)
    setAnswerStatus('idle')
    setIsCorrect(false)
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case 'fácil':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'médio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'difícil':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const handleSubmit = async () => {
    if (!selectedOption || !selectedMission || !user) return

    setSubmitting(true)
    const availableOptions = Object.entries(selectedMission.options).map(
      ([k, v]) => ({ key: k, value: String(v) }),
    )
    const selectedValue =
      availableOptions.find((o) => o.key === selectedOption)?.value || ''

    const correct =
      selectedMission.correct_answer.toLowerCase() ===
        selectedOption.toLowerCase() ||
      selectedMission.correct_answer.toLowerCase() ===
        selectedValue.toLowerCase()

    setIsCorrect(correct)
    setAnswerStatus('answered')

    if (correct) {
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('xp')
          .eq('id', user.id)
          .single()

        if (userData) {
          await supabase
            .from('users')
            .update({ xp: (userData.xp || 0) + selectedMission.xp_reward })
            .eq('id', user.id)
        }

        const { data: existing } = await supabase
          .from('user_progress' as any)
          .select('id')
          .eq('user_id', user.id)
          .eq('mission_id', selectedMission.id)
          .single()

        if (!existing) {
          await supabase.from('user_progress' as any).insert({
            user_id: user.id,
            mission_id: selectedMission.id,
            completed: true,
            score: selectedMission.xp_reward,
            completed_at: new Date().toISOString(),
          })
        }

        setCompletedMissions((prev) => new Set(prev).add(selectedMission.id))
      } catch (error) {
        console.error('Erro ao salvar progresso:', error)
      }
    }
    setSubmitting(false)
  }

  const handleClose = () => {
    setSelectedMission(null)
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald" />
      </div>
    )
  }

  const progressPercent =
    missions.length > 0 ? (completedMissions.size / missions.length) * 100 : 0

  return (
    <div className="flex flex-col gap-8 pb-10 animate-fade-in max-w-3xl mx-auto">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-navy flex items-center justify-center md:justify-start gap-3">
          <Target className="w-8 h-8 text-orange-500" />
          Missões Práticas
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          Aplique seus conhecimentos em cenários reais do mercado. Nível atual:{' '}
          <strong className="text-navy">{levelTitle || 'Carregando...'}</strong>
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border-2 border-silver shadow-sm">
        <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">
          <span>Progresso do Nível</span>
          <span className="text-emerald">
            {completedMissions.size} / {missions.length} Missões
          </span>
        </div>
        <Progress
          value={progressPercent}
          className="h-4 bg-slate-100 [&>div]:bg-emerald"
        />
      </div>

      <div className="flex flex-col gap-5">
        {missions.map((mission) => {
          const isCompleted = completedMissions.has(mission.id)

          return (
            <div
              key={mission.id}
              className={cn(
                'bg-white border-2 rounded-xl p-6 transition-all duration-300 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center',
                isCompleted
                  ? 'border-emerald bg-emerald-50/30'
                  : 'border-silver hover:border-navy',
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3
                    className={cn(
                      'text-xl font-bold',
                      isCompleted ? 'text-emerald-800' : 'text-navy',
                    )}
                  >
                    {mission.title}
                  </h3>
                  <span
                    className={cn(
                      'text-xs font-bold px-2.5 py-1 rounded-md border',
                      getDifficultyColor(mission.difficulty),
                    )}
                  >
                    {mission.difficulty}
                  </span>
                </div>
                <p className="text-slate-600 font-medium">
                  {mission.description}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm font-bold text-orange-500">
                  <Trophy className="w-4 h-4" />
                  {mission.xp_reward} XP
                </div>
              </div>
              <div className="w-full md:w-auto shrink-0">
                {isCompleted ? (
                  <Button3D
                    variant="outline"
                    className="w-full text-emerald border-emerald hover:bg-emerald-50"
                    disabled
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    CONCLUÍDA
                  </Button3D>
                ) : (
                  <Button3D
                    variant="super"
                    className="w-full"
                    onClick={() => handleOpenMission(mission)}
                  >
                    INICIAR MISSÃO
                  </Button3D>
                )}
              </div>
            </div>
          )
        })}
        {missions.length === 0 && (
          <div className="text-center p-10 border-2 border-dashed border-silver rounded-xl text-slate-500 font-medium">
            Nenhuma missão disponível para este nível no momento.
          </div>
        )}
      </div>

      {selectedMission && (
        <Dialog
          open={!!selectedMission}
          onOpenChange={(open) => !open && handleClose()}
        >
          <DialogContent className="max-w-2xl p-0 overflow-hidden border-2 border-silver gap-0 bg-slate-50">
            <div className="p-6 md:p-8 bg-white border-b-2 border-slate-100">
              <DialogHeader>
                <DialogTitle className="text-2xl font-extrabold text-navy flex items-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-orange-500" />
                  {selectedMission.title}
                </DialogTitle>
                <DialogDescription className="text-base text-slate-600 font-medium">
                  Leia o cenário com atenção e tome sua decisão.
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-navy font-semibold text-lg leading-relaxed shadow-inner">
                {selectedMission.scenario}
              </div>

              <div className="flex flex-col gap-3">
                {Object.entries(selectedMission.options).map(([key, value]) => {
                  const isSelected = selectedOption === key
                  let btnClass =
                    'border-silver text-slate-700 hover:bg-slate-100'

                  if (answerStatus === 'idle' && isSelected) {
                    btnClass = 'border-navy bg-blue-50 text-navy shadow-sm'
                  } else if (answerStatus === 'answered') {
                    const isCorrectOpt =
                      selectedMission.correct_answer.toLowerCase() ===
                        key.toLowerCase() ||
                      selectedMission.correct_answer.toLowerCase() ===
                        String(value).toLowerCase()

                    if (isCorrectOpt) {
                      btnClass = 'border-emerald bg-emerald-50 text-emerald-800'
                    } else if (isSelected && !isCorrectOpt) {
                      btnClass = 'border-red-500 bg-red-50 text-red-800'
                    } else {
                      btnClass = 'border-silver text-slate-400 opacity-50'
                    }
                  }

                  return (
                    <button
                      key={key}
                      disabled={answerStatus !== 'idle' || submitting}
                      onClick={() => setSelectedOption(key)}
                      className={cn(
                        'w-full p-4 border-2 rounded-xl text-left font-bold text-base md:text-lg transition-all flex items-center gap-4',
                        btnClass,
                      )}
                    >
                      <span
                        className={cn(
                          'inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 text-sm shrink-0',
                          answerStatus === 'idle' && isSelected
                            ? 'border-navy text-navy bg-white'
                            : 'border-slate-200 text-slate-400',
                        )}
                      >
                        {key.toUpperCase()}
                      </span>
                      <span>{String(value)}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              className={cn(
                'p-6 md:p-8 border-t-2 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors',
                answerStatus === 'idle'
                  ? 'bg-white border-slate-100'
                  : isCorrect
                    ? 'bg-emerald-100 border-emerald-200'
                    : 'bg-red-100 border-red-200',
              )}
            >
              {answerStatus === 'idle' ? (
                <>
                  <div className="text-slate-500 font-bold hidden sm:block">
                    Recompensa: +{selectedMission.xp_reward} XP
                  </div>
                  <Button3D
                    variant={selectedOption ? 'super' : 'locked'}
                    onClick={handleSubmit}
                    disabled={!selectedOption || submitting}
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      'ENVIAR RESPOSTA'
                    )}
                  </Button3D>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center shrink-0',
                        isCorrect ? 'bg-emerald-500' : 'bg-red-500',
                      )}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-7 h-7 text-white" />
                      ) : (
                        <XCircle className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <div>
                      <div
                        className={cn(
                          'font-black text-xl',
                          isCorrect ? 'text-emerald-800' : 'text-red-800',
                        )}
                      >
                        {isCorrect ? 'Excelente decisão!' : 'Opção incorreta'}
                      </div>
                      {isCorrect && (
                        <div className="text-emerald-700 text-sm font-bold mt-0.5">
                          +{selectedMission.xp_reward} XP
                        </div>
                      )}
                    </div>
                  </div>
                  <Button3D
                    variant={isCorrect ? 'success' : 'danger'}
                    onClick={handleClose}
                    className="w-full sm:w-auto"
                  >
                    CONTINUAR <ArrowRight className="w-5 h-5 ml-2" />
                  </Button3D>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
