import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { Button3D } from '@/components/ui/button-3d'
import { Target, ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MissaoPremium() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [missao, setMissao] = useState<any>(null)

  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (!id) return
    const loadMissao = async () => {
      try {
        const { data } = await supabase
          .from('missoes')
          .select('*')
          .eq('aula_id', id)
          .single()
        setMissao(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadMissao()
  }, [id])

  const submitAnswer = async () => {
    if (!answer.trim() || !user || !missao) return
    setSubmitting(true)

    const isCorrect =
      answer.trim().toLowerCase() === missao.resposta_correta.toLowerCase()

    if (isCorrect) {
      try {
        const { data: existing } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('aula_id', id)
          .single()

        if (!existing || !existing.missao_completada) {
          const reward = missao.xp_reward || 150
          const { data: u } = await supabase
            .from('users')
            .select('xp')
            .eq('id', user.id)
            .single()
          if (u)
            await supabase
              .from('users')
              .update({ xp: (u.xp || 0) + reward })
              .eq('id', user.id)

          if (existing) {
            await supabase
              .from('user_progress')
              .update({
                missao_completada: true,
                xp_ganho: (existing.xp_ganho || 0) + reward,
              })
              .eq('id', existing.id)
          } else {
            await supabase
              .from('user_progress')
              .insert({
                user_id: user.id,
                aula_id: id,
                missao_completada: true,
                xp_ganho: reward,
              })
          }
        }
        setFeedback('correct')
      } catch (e) {
        console.error(e)
      }
    } else {
      setFeedback('incorrect')
    }

    setSubmitting(false)
    setIsFinished(true)
  }

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
      </div>
    )

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white overflow-hidden shadow-2xl border-x">
      <header className="bg-white border-b-2 border-slate-200 p-4 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/aula/${id}`)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-navy text-lg">Missão Prática</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 border border-orange-200">
          <Target className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-navy text-center mb-6">
          {missao?.nome}
        </h2>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 text-slate-700 font-medium text-lg leading-relaxed shadow-inner w-full text-center mb-10">
          {missao?.descricao}
        </div>

        <div className="w-full max-w-md flex flex-col gap-4">
          <label className="font-bold text-navy text-center text-lg">
            Sua Resposta:
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value)
              setFeedback(null)
              setIsFinished(false)
            }}
            placeholder="Digite o valor numérico"
            disabled={submitting || feedback === 'correct'}
            className={cn(
              'w-full h-16 rounded-xl border-2 px-6 text-xl font-bold text-center transition-colors focus:outline-none',
              feedback === 'correct'
                ? 'border-emerald bg-emerald-50 text-emerald-800'
                : feedback === 'incorrect'
                  ? 'border-red-500 bg-red-50 text-red-800'
                  : 'border-silver focus:border-orange-500',
            )}
          />

          {feedback === 'correct' && (
            <div className="text-emerald-600 font-bold text-center mt-2 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> Excelente! Você acertou.
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="text-red-500 font-bold text-center mt-2 flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5" /> Resposta incorreta. Tente
              novamente.
            </div>
          )}
        </div>
      </div>

      <footer className="p-6 border-t-2 border-slate-200 shrink-0 bg-white">
        <div className="max-w-md mx-auto w-full">
          {feedback === 'correct' ? (
            <Button3D
              variant="success"
              size="lg"
              fullWidth
              onClick={() => navigate(`/aula/${id}`)}
            >
              VOLTAR PARA AULA
            </Button3D>
          ) : (
            <Button3D
              variant="super"
              className="bg-orange-500 border-orange-700 hover:bg-orange-600"
              size="lg"
              fullWidth
              onClick={submitAnswer}
              disabled={!answer.trim() || submitting}
            >
              {submitting ? (
                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                'ENVIAR RESPOSTA'
              )}
            </Button3D>
          )}
        </div>
      </footer>
    </div>
  )
}
