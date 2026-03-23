import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, Loader2, X, Trophy } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function Quiz() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [quizzes, setQuizzes] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'answered' | 'finished'>('idle')
  const [isCorrect, setIsCorrect] = useState(false)
  const [totalXPEarned, setTotalXPEarned] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !lessonId) return

    const fetchQuizzes = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('quizzes')
          .select('*')
          .eq('lesson_id', lessonId)

        if (error) throw error
        setQuizzes(data || [])

        if (data && data.length === 0) {
          setStatus('finished')
        }
      } catch (error: any) {
        toast.error('Erro ao carregar quizzes', { description: error.message })
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [lessonId, user, navigate])

  const currentQuiz = quizzes[currentIndex]

  // Parse available options
  let availableOptions: { key: string; value: string }[] = []
  if (currentQuiz) {
    if (
      currentQuiz.options &&
      typeof currentQuiz.options === 'object' &&
      !Array.isArray(currentQuiz.options)
    ) {
      availableOptions = Object.entries(currentQuiz.options).map(([k, v]) => ({
        key: k,
        value: String(v),
      }))
    } else {
      if (currentQuiz.option_a)
        availableOptions.push({ key: 'a', value: currentQuiz.option_a })
      if (currentQuiz.option_b)
        availableOptions.push({ key: 'b', value: currentQuiz.option_b })
      if (currentQuiz.option_c)
        availableOptions.push({ key: 'c', value: currentQuiz.option_c })
      if (currentQuiz.option_d)
        availableOptions.push({ key: 'd', value: currentQuiz.option_d })
    }
  }

  const isOptionCorrect = (key: string, value: string) => {
    if (!currentQuiz?.correct_answer) return false
    const correct = currentQuiz.correct_answer.toLowerCase()
    return correct === key.toLowerCase() || correct === value.toLowerCase()
  }

  const handleAnswer = async () => {
    if (!selectedOption || !user || !lessonId) return

    const selectedValue =
      availableOptions.find((o) => o.key === selectedOption)?.value || ''
    const correct = isOptionCorrect(selectedOption, selectedValue)

    setIsCorrect(correct)
    setStatus('answered')

    if (correct) {
      const reward = currentQuiz.xp_reward || 10
      setTotalXPEarned((prev) => prev + reward)

      try {
        // Update user XP
        const { data: userData } = await supabase
          .from('users')
          .select('xp')
          .eq('id', user.id)
          .single()
        if (userData) {
          await supabase
            .from('users')
            .update({ xp: (userData.xp || 0) + reward })
            .eq('id', user.id)
        }

        // Update user_progress quiz_score
        const { data: progress } = await supabase
          .from('user_progress')
          .select('id, quiz_score')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
          .single()

        if (progress) {
          await supabase
            .from('user_progress')
            .update({ quiz_score: (progress.quiz_score || 0) + reward })
            .eq('id', progress.id)
        }
      } catch (error) {
        console.error('Erro ao atualizar progresso:', error)
      }
    }
  }

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setStatus('idle')
      setIsCorrect(false)
    } else {
      setStatus('finished')
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-emerald" />
      </div>
    )
  }

  if (status === 'finished') {
    return (
      <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white overflow-hidden shadow-2xl border-x border-slate-100">
        <div className="flex flex-col items-center justify-center flex-1 p-6 animate-fade-in-up">
          <Trophy className="w-32 h-32 text-yellow-400 mb-6 drop-shadow-lg animate-bounce" />
          <h2 className="text-4xl font-extrabold text-navy mb-3 text-center">
            Quiz Concluído!
          </h2>
          <p className="text-slate-500 font-bold text-xl mb-10 text-center">
            Você ganhou <span className="text-emerald">{totalXPEarned} XP</span>{' '}
            no total.
          </p>
          <Button3D
            variant="super"
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="w-full max-w-sm"
          >
            VOLTAR AO DASHBOARD
          </Button3D>
        </div>
      </div>
    )
  }

  const progressPercent = (currentIndex / quizzes.length) * 100

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white overflow-hidden shadow-2xl border-x border-slate-100">
      <header className="flex items-center gap-4 p-6 border-b border-slate-100 bg-white z-10 shrink-0">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-slate-400 hover:text-navy transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>Quiz da Aula</span>
            <span>
              {currentIndex + 1} / {quizzes.length}
            </span>
          </div>
          <Progress
            value={progressPercent}
            className="h-3 rounded-xl bg-slate-100 [&>div]:bg-emerald"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50 flex flex-col">
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-8 animate-fade-in-up flex-1 justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-4">
            {currentQuiz?.question}
          </h1>

          <div className="flex flex-col gap-4">
            {availableOptions.map((option) => {
              const isSelected = selectedOption === option.key
              const isCorrectOpt = isOptionCorrect(option.key, option.value)

              let btnClass = 'border-silver text-slate-700 hover:bg-slate-50'
              let prefixClass = 'text-slate-400 border-slate-200'

              if (status === 'idle' && isSelected) {
                btnClass = 'border-navy bg-blue-50 text-navy shadow-sm'
                prefixClass = 'text-navy border-navy bg-white'
              } else if (status === 'answered') {
                if (isCorrectOpt) {
                  btnClass =
                    'border-emerald bg-emerald-50 text-emerald-800 shadow-sm'
                  prefixClass =
                    'text-emerald-800 border-emerald-500 bg-emerald-100'
                } else if (isSelected && !isCorrectOpt) {
                  btnClass = 'border-red-500 bg-red-50 text-red-800 shadow-sm'
                  prefixClass = 'text-red-800 border-red-500 bg-red-100'
                } else {
                  btnClass = 'border-silver text-slate-400 opacity-50'
                  prefixClass = 'text-slate-300 border-slate-200'
                }
              }

              return (
                <button
                  key={option.key}
                  disabled={status !== 'idle'}
                  onClick={() =>
                    setStatus('idle') && setSelectedOption(option.key)
                  }
                  className={cn(
                    'w-full p-4 md:p-5 border-2 rounded-xl text-left font-bold text-lg transition-all flex items-center gap-4 group',
                    btnClass,
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 text-sm shrink-0 transition-colors',
                      prefixClass,
                    )}
                  >
                    {option.key.toUpperCase()}
                  </span>
                  <span className="flex-1">{option.value}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <footer
        className={cn(
          'p-6 border-t-2 shrink-0 transition-colors duration-300',
          status === 'idle'
            ? 'bg-white border-slate-200'
            : isCorrect
              ? 'bg-emerald-100 border-emerald-200'
              : 'bg-red-100 border-red-200',
        )}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 w-full">
          {status !== 'idle' ? (
            <div className="flex items-center gap-4 flex-1 animate-fade-in">
              <div
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-md',
                  isCorrect ? 'bg-emerald-500' : 'bg-red-500',
                )}
              >
                {isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <XCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <div
                  className={cn(
                    'font-black text-2xl tracking-tight',
                    isCorrect ? 'text-emerald-800' : 'text-red-800',
                  )}
                >
                  {isCorrect ? 'Excelente!' : 'Incorreto'}
                </div>
                {!isCorrect && (
                  <div className="text-red-700/80 font-semibold text-sm mt-1">
                    Tente prestar mais atenção na próxima.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 hidden sm:block"></div>
          )}

          <Button3D
            variant={
              status === 'idle'
                ? selectedOption
                  ? 'super'
                  : 'locked'
                : isCorrect
                  ? 'success'
                  : 'danger'
            }
            size="lg"
            className={cn(
              'w-full sm:w-auto min-w-[200px] text-lg',
              status !== 'idle' && 'sm:ml-auto',
            )}
            onClick={status === 'idle' ? handleAnswer : handleNext}
            disabled={status === 'idle' && !selectedOption}
          >
            {status === 'idle' ? 'RESPONDER' : 'CONTINUAR'}
          </Button3D>
        </div>
      </footer>
    </div>
  )
}
