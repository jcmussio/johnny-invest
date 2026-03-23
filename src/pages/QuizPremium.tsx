import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, XCircle, Loader2, X, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function QuizPremium() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [perguntas, setPerguntas] = useState<any[]>([])

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOp, setSelectedOp] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [corrects, setCorrects] = useState(0)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [xpGanho, setXpGanho] = useState(0)

  useEffect(() => {
    if (!id) return
    const loadQuiz = async () => {
      try {
        const { data } = await supabase
          .from('quizzes')
          .select('*')
          .eq('aula_id', id)
          .single()
        if (data?.perguntas_json) {
          setPerguntas(
            typeof data.perguntas_json === 'string'
              ? JSON.parse(data.perguntas_json)
              : data.perguntas_json,
          )
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadQuiz()
  }, [id])

  const finishQuiz = async (finalCorrects: number) => {
    const finalScore = Math.round((finalCorrects / perguntas.length) * 100)
    setScore(finalScore)

    if (finalScore >= 70 && user) {
      try {
        const { data: existing } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('aula_id', id)
          .single()

        if (!existing || (existing.quiz_score || 0) < 70) {
          setXpGanho(50)
          const { data: u } = await supabase
            .from('users')
            .select('xp')
            .eq('id', user.id)
            .single()
          if (u)
            await supabase
              .from('users')
              .update({ xp: (u.xp || 0) + 50 })
              .eq('id', user.id)
        }

        if (existing) {
          await supabase
            .from('user_progress')
            .update({
              quiz_score: Math.max(existing.quiz_score || 0, finalScore),
              xp_ganho:
                (existing.xp_ganho || 0) +
                (!existing || (existing.quiz_score || 0) < 70 ? 50 : 0),
            })
            .eq('id', existing.id)
        } else {
          await supabase.from('user_progress').insert({
            user_id: user.id,
            aula_id: id,
            quiz_score: finalScore,
            xp_ganho: 50,
          })
        }
      } catch (e) {
        console.error(e)
      }
    }
    setFinished(true)
  }

  const handleNext = () => {
    if (currentIdx < perguntas.length - 1) {
      setCurrentIdx((c) => c + 1)
      setSelectedOp(null)
      setShowFeedback(false)
    } else {
      finishQuiz(
        selectedOp === perguntas[currentIdx].correta ? corrects + 1 : corrects,
      )
    }
  }

  const handleSelect = (idx: number) => {
    if (showFeedback) return
    setSelectedOp(idx)
    setShowFeedback(true)
    if (idx === perguntas[currentIdx].correta) setCorrects((c) => c + 1)
  }

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    )

  if (finished) {
    const passed = score >= 70
    return (
      <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white items-center justify-center p-6 text-center animate-fade-in-up shadow-2xl border-x">
        <Trophy
          className={cn(
            'w-32 h-32 mb-6 drop-shadow-lg',
            passed ? 'text-yellow-400 animate-bounce' : 'text-slate-300',
          )}
        />
        <h2 className="text-4xl font-extrabold text-navy mb-2">
          {passed ? 'Quiz Concluído!' : 'Tente Novamente'}
        </h2>
        <p className="text-slate-500 font-bold text-xl mb-8">
          Sua pontuação:{' '}
          <span className={passed ? 'text-emerald' : 'text-red-500'}>
            {score}%
          </span>
        </p>
        {passed && xpGanho > 0 && user && (
          <p className="text-emerald-600 font-bold text-lg mb-8 bg-emerald-100 px-6 py-2 rounded-full border border-emerald-200">
            +{xpGanho} XP Ganhos!
          </p>
        )}
        <Button3D
          variant="super"
          size="lg"
          onClick={() => navigate(`/aula/${id}`)}
          className="w-full max-w-sm"
        >
          VOLTAR PARA AULA
        </Button3D>
      </div>
    )
  }

  const curQ = perguntas[currentIdx]
  const isCorrectOpt = selectedOp === curQ?.correta

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white overflow-hidden shadow-2xl border-x">
      <header className="flex items-center gap-4 p-6 border-b border-slate-100 shrink-0">
        <button
          onClick={() => navigate(`/aula/${id}`)}
          className="text-slate-400 hover:text-navy transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>Quiz</span>
            <span>
              {currentIdx + 1} / {perguntas.length}
            </span>
          </div>
          <Progress
            value={(currentIdx / perguntas.length) * 100}
            className="h-3 bg-slate-100 [&>div]:bg-purple-600"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-10">
          {curQ?.pergunta}
        </h1>
        <div className="flex flex-col gap-4">
          {curQ?.opcoes.map((opt: string, i: number) => {
            const isSelected = selectedOp === i
            const correctOpt = i === curQ.correta
            let btnClass = 'border-silver text-slate-700 hover:bg-slate-50'
            let prefixClass = 'text-slate-400 border-slate-200'

            if (showFeedback) {
              if (correctOpt) {
                btnClass = 'border-emerald bg-emerald-50 text-emerald-800'
                prefixClass =
                  'text-emerald-800 border-emerald-500 bg-emerald-100'
              } else if (isSelected) {
                btnClass = 'border-red-500 bg-red-50 text-red-800'
                prefixClass = 'text-red-800 border-red-500 bg-red-100'
              } else {
                btnClass = 'border-silver text-slate-400 opacity-50'
              }
            } else if (isSelected) {
              btnClass = 'border-purple-600 bg-purple-50 text-purple-900'
              prefixClass = 'text-purple-700 border-purple-600 bg-white'
            }

            return (
              <button
                key={i}
                disabled={showFeedback}
                onClick={() => handleSelect(i)}
                className={cn(
                  'w-full p-4 md:p-5 border-2 rounded-xl text-left font-bold text-lg transition-all flex items-center gap-4',
                  btnClass,
                )}
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 text-sm shrink-0',
                    prefixClass,
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      <footer
        className={cn(
          'p-6 border-t-2 shrink-0 transition-colors',
          showFeedback
            ? isCorrectOpt
              ? 'bg-emerald-100 border-emerald-200'
              : 'bg-red-100 border-red-200'
            : 'bg-white border-slate-200',
        )}
      >
        <div className="max-w-3xl mx-auto flex justify-between items-center gap-6 w-full">
          {showFeedback ? (
            <div className="flex items-center gap-4 flex-1">
              <div
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center shrink-0',
                  isCorrectOpt ? 'bg-emerald-500' : 'bg-red-500',
                )}
              >
                {isCorrectOpt ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <XCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <div
                className={cn(
                  'font-black text-2xl tracking-tight',
                  isCorrectOpt ? 'text-emerald-800' : 'text-red-800',
                )}
              >
                {isCorrectOpt ? 'Excelente!' : 'Incorreto'}
              </div>
            </div>
          ) : (
            <div className="flex-1 hidden sm:block"></div>
          )}
          <Button3D
            variant={
              showFeedback ? (isCorrectOpt ? 'success' : 'danger') : 'locked'
            }
            size="lg"
            className="w-full sm:w-auto min-w-[200px] text-lg"
            onClick={handleNext}
            disabled={!showFeedback}
          >
            CONTINUAR
          </Button3D>
        </div>
      </footer>
    </div>
  )
}
