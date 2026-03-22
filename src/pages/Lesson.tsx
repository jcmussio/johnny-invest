import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Shield, BookOpen } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button3D } from '@/components/ui/button-3d'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { toast } from 'sonner'

// Estrutura atualizada baseada no schema do Supabase (A, B, C, D)
const lessonData = [
  {
    id: 1,
    type: 'content',
    title: 'O que são Opções?',
    content:
      'Uma opção é um contrato que dá ao seu titular o direito, mas não a obrigação, de comprar ou vender um ativo subjacente a um preço predeterminado, em uma data específica.',
    keyConcepts: [
      'Contrato',
      'Direito vs Obrigação',
      'Ativo Subjacente',
      'Preço de Exercício (Strike)',
    ],
  },
  {
    id: 2,
    type: 'quiz_options',
    question: 'Qual o principal objetivo das Opções no mercado financeiro?',
    options: [
      { id: 'option_a', label: 'Proteção (Hedge) e Alavancagem' },
      { id: 'option_b', label: 'Garantir renda fixa garantida mensal' },
      { id: 'option_c', label: 'Comprar ações sempre mais caro' },
      { id: 'option_d', label: 'Evitar participar do mercado financeiro' },
    ],
    correct: 'option_a',
    xpReward: 50,
  },
  {
    id: 3,
    type: 'quiz_options',
    question: "O que significa 'Strike' em um contrato de opção?",
    options: [
      { id: 'option_a', label: 'A data de vencimento do contrato' },
      { id: 'option_b', label: 'O preço de exercício predeterminado' },
      { id: 'option_c', label: 'O valor pago pelo prêmio da opção' },
      { id: 'option_d', label: 'A taxa de corretagem da bolsa' },
    ],
    correct: 'option_b',
    xpReward: 50,
  },
]

export default function Lesson() {
  const navigate = useNavigate()
  const { state, dispatch } = useAppStore()

  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')

  const currentLesson = lessonData[currentStep]
  const progress = (currentStep / lessonData.length) * 100

  const handleSelectOption = (id: string) => {
    if (status !== 'idle') return
    setSelectedOption(id)
  }

  const handleCheck = () => {
    if (currentLesson.type === 'content') {
      handleContinue()
      return
    }

    const isCorrect = selectedOption === currentLesson.correct

    if (isCorrect) {
      setStatus('correct')
      dispatch({ type: 'ADD_XP', payload: currentLesson.xpReward || 50 })
    } else {
      setStatus('wrong')
      dispatch({ type: 'LOSE_HEART' })
      if (state.hearts <= 0) {
        toast.error('Você ficou sem vidas!', {
          description: 'Pratique mais para recuperar.',
        })
        navigate('/learn')
      }
    }
  }

  const handleContinue = () => {
    if (currentStep < lessonData.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedOption(null)
      setStatus('idle')
    } else {
      dispatch({
        type: 'COMPLETE_LEVEL',
        payload: { unitId: 1, levelId: state.currentLevel },
      })
      navigate('/learn')
      toast.success('Aula Concluída!', {
        description: 'Parabéns! Você avançou na sua jornada.',
      })
    }
  }

  const isCheckDisabled = () => {
    if (currentLesson.type === 'content') return false
    return !selectedOption
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white overflow-hidden shadow-2xl border-x border-slate-100">
      <header className="flex items-center gap-4 p-6">
        <button
          onClick={() => navigate('/learn')}
          className="text-slate-400 hover:text-navy transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <Progress
          value={progress}
          className="h-4 rounded-xl bg-slate-100 [&>div]:bg-emerald"
        />
        <div className="flex items-center gap-1 text-emerald font-bold">
          <Shield className="fill-emerald/20 w-5 h-5" />
          {state.hearts}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center justify-center gap-10">
        {currentLesson.type === 'content' && (
          <div className="w-full flex flex-col gap-6 animate-fade-in">
            <div className="flex items-center gap-3 text-navy">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-3xl font-bold">{currentLesson.title}</h1>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border-2 border-navy/10 text-lg text-slate-700 leading-relaxed">
              {currentLesson.content}
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                Conceitos Chave
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentLesson.keyConcepts?.map((concept, idx) => (
                  <span
                    key={idx}
                    className="bg-white border-2 border-silver px-4 py-2 rounded-xl text-navy font-semibold shadow-sm"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentLesson.type === 'quiz_options' && (
          <div className="w-full max-w-2xl flex flex-col gap-8 animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-bold text-navy text-center">
              {currentLesson.question}
            </h1>

            <div className="flex flex-col gap-3">
              {(currentLesson.options as any[]).map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={cn(
                    'cursor-pointer border-2 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 active:scale-[0.98]',
                    selectedOption === opt.id
                      ? 'border-navy bg-blue-50/50 shadow-md transform -translate-y-1'
                      : 'border-slate-200 hover:border-silver hover:bg-slate-50',
                    status !== 'idle' && 'pointer-events-none',
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border-2',
                      selectedOption === opt.id
                        ? 'border-navy bg-navy text-white'
                        : 'border-slate-300 text-slate-500 bg-slate-100',
                    )}
                  >
                    {opt.id.replace('option_', '').toUpperCase()}
                  </div>
                  <span
                    className={cn(
                      'font-semibold text-lg flex-1',
                      selectedOption === opt.id
                        ? 'text-navy'
                        : 'text-slate-600',
                    )}
                  >
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer
        className={cn(
          'p-6 border-t-2 transition-colors duration-300 shrink-0',
          status === 'correct'
            ? 'bg-[#d7ffb8] border-transparent'
            : status === 'wrong'
              ? 'bg-[#ffdfe0] border-transparent'
              : 'bg-white border-slate-200',
        )}
      >
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          {status === 'correct' && (
            <div className="flex items-center gap-4 text-emerald-shade animate-fade-in-up">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-xl">Excelente!</p>
                <p className="text-emerald font-medium">
                  +{currentLesson.xpReward} XP
                </p>
              </div>
            </div>
          )}

          {status === 'wrong' && (
            <div className="flex items-center gap-4 text-red-600 animate-shake">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <X className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-xl">Resposta incorreta.</p>
              </div>
            </div>
          )}

          <div
            className={cn(
              'ml-auto',
              status === 'idle' && currentLesson.type === 'content'
                ? 'w-full md:w-auto'
                : '',
            )}
          >
            {status === 'idle' ? (
              <Button3D
                size="lg"
                className={cn(
                  'w-full md:w-48',
                  currentLesson.type === 'content' &&
                    'bg-emerald border-emerald-shade hover:bg-emerald/90',
                )}
                disabled={isCheckDisabled()}
                onClick={handleCheck}
              >
                {currentLesson.type === 'content' ? 'ENTENDI' : 'VERIFICAR'}
              </Button3D>
            ) : (
              <Button3D
                variant={status === 'correct' ? 'super' : 'danger'}
                size="lg"
                className="w-full md:w-48"
                onClick={handleContinue}
              >
                CONTINUAR
              </Button3D>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
