import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Shield } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button3D } from '@/components/ui/button-3d'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { toast } from 'sonner'

const lessonData = [
  {
    id: 1,
    type: 'select',
    question: "Como se chama uma 'Opção de Compra'?",
    options: [
      {
        id: 'a',
        label: 'Call',
        image: 'https://img.usecurling.com/p/200/200?q=green%20arrow%20up',
      },
      {
        id: 'b',
        label: 'Put',
        image: 'https://img.usecurling.com/p/200/200?q=red%20arrow%20down',
      },
      {
        id: 'c',
        label: 'Ação',
        image: 'https://img.usecurling.com/p/200/200?q=stock%20chart',
      },
      {
        id: 'd',
        label: 'Fundo',
        image: 'https://img.usecurling.com/p/200/200?q=money%20bag',
      },
    ],
    correct: 'a',
  },
  {
    id: 2,
    type: 'translate',
    question: 'Monte a estratégia',
    content: 'Comprar uma Call e vender uma Call de strike maior.',
    words: ['Trava', 'de', 'Alta', 'Baixa', 'Borboleta', 'Condor'],
    correct: ['Trava', 'de', 'Alta'],
  },
  {
    id: 3,
    type: 'select_text',
    question: "O que significa 'Strike'?",
    options: [
      { id: 'a', label: 'Preço de Exercício', textOnly: true },
      { id: 'b', label: 'Data de Vencimento', textOnly: true },
      { id: 'c', label: 'Prêmio da Opção', textOnly: true },
    ],
    correct: 'a',
  },
]

export default function Lesson() {
  const navigate = useNavigate()
  const { state, dispatch } = useAppStore()

  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedWords, setSelectedWords] = useState<string[]>([])

  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')

  const currentLesson = lessonData[currentStep]
  const progress = (currentStep / lessonData.length) * 100

  const handleSelectOption = (id: string) => {
    if (status !== 'idle') return
    setSelectedOption(id)
  }

  const handleWordClick = (word: string) => {
    if (status !== 'idle') return
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word))
    } else {
      setSelectedWords([...selectedWords, word])
    }
  }

  const handleCheck = () => {
    let isCorrect = false

    if (
      currentLesson.type === 'select' ||
      currentLesson.type === 'select_text'
    ) {
      isCorrect = selectedOption === currentLesson.correct
    } else if (currentLesson.type === 'translate') {
      const answer = selectedWords.join(' ')
      const correct = (currentLesson.correct as string[]).join(' ')
      isCorrect = answer === correct
    }

    if (isCorrect) {
      setStatus('correct')
      dispatch({ type: 'ADD_XP', payload: 10 })
    } else {
      setStatus('wrong')
      dispatch({ type: 'LOSE_HEART' })
      if (state.hearts <= 0) {
        toast.error('Você ficou sem vidas!', {
          description: 'Pratique mais para recuperar ou compre na loja.',
        })
        navigate('/learn')
      }
    }
  }

  const handleContinue = () => {
    if (currentStep < lessonData.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedOption(null)
      setSelectedWords([])
      setStatus('idle')
    } else {
      dispatch({
        type: 'COMPLETE_LEVEL',
        payload: { unitId: 1, levelId: state.currentLevel },
      })
      navigate('/learn')
      toast.success('Lição Completada!', {
        description: 'Você ganhou +10 Pontos',
      })
    }
  }

  const isCheckDisabled = () => {
    if (currentLesson.type === 'translate') return selectedWords.length === 0
    return !selectedOption
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white overflow-hidden">
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

      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl md:text-3xl font-bold text-navy text-center w-full">
          {currentLesson.question}
        </h1>

        {currentLesson.type === 'select' && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {(currentLesson.options as any[]).map((opt) => (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={cn(
                  'cursor-pointer border-2 rounded-lg p-4 flex flex-col items-center gap-3 transition-all duration-300 active:scale-95',
                  selectedOption === opt.id
                    ? 'border-navy bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50',
                )}
              >
                <img
                  src={opt.image}
                  alt={opt.label}
                  className="w-24 h-24 object-contain rounded-md"
                />
                <span
                  className={cn(
                    'font-bold',
                    selectedOption === opt.id ? 'text-navy' : 'text-slate-600',
                  )}
                >
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {currentLesson.type === 'select_text' && (
          <div className="flex flex-col gap-3 w-full">
            {(currentLesson.options as any[]).map((opt) => (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={cn(
                  'cursor-pointer border-2 rounded-lg p-5 flex items-center gap-4 transition-all duration-300 active:scale-95',
                  selectedOption === opt.id
                    ? 'border-navy bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50',
                )}
              >
                <div
                  className={cn(
                    'w-6 h-6 border-2 rounded-md flex items-center justify-center text-xs font-bold',
                    selectedOption === opt.id
                      ? 'border-navy text-navy'
                      : 'border-slate-300 text-slate-400',
                  )}
                >
                  {selectedOption === opt.id && '1'}
                </div>
                <span
                  className={cn(
                    'font-bold text-lg',
                    selectedOption === opt.id ? 'text-navy' : 'text-slate-600',
                  )}
                >
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {currentLesson.type === 'translate' && (
          <div className="w-full flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <img
                src="https://img.usecurling.com/i?q=businessman-cartoon&shape=hand-drawn"
                className="w-24 h-24"
                alt="Instructor"
              />
              <div className="bg-slate-100 border-2 border-slate-200 p-4 rounded-xl rounded-tl-none relative">
                <p className="text-lg text-slate-700 font-medium">
                  {(currentLesson as any).content}
                </p>
              </div>
            </div>

            <div className="min-h-[60px] border-b-2 border-slate-200 flex flex-wrap gap-2 py-2">
              {selectedWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWordClick(word)}
                  className="px-4 py-2 bg-white border-2 border-silver border-b-4 rounded-lg text-navy font-bold shadow-sm"
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {(currentLesson as any).words.map((word: string, idx: number) => {
                const isSelected = selectedWords.includes(word)
                return (
                  <button
                    key={idx}
                    onClick={() => handleWordClick(word)}
                    disabled={isSelected}
                    className={cn(
                      'px-4 py-2 border-2 rounded-lg font-bold transition-all duration-300',
                      isSelected
                        ? 'bg-slate-200 border-slate-200 text-transparent'
                        : 'bg-white border-silver border-b-4 text-navy hover:bg-slate-50 active:translate-y-1 active:border-b-0',
                    )}
                  >
                    {word}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <footer
        className={cn(
          'p-6 border-t-2 transition-colors duration-300',
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
              </div>
            </div>
          )}

          {status === 'wrong' && (
            <div className="flex items-center gap-4 text-red-600 animate-shake">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <X className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-xl">Resposta correta:</p>
                <p className="text-md font-medium">
                  {Array.isArray(currentLesson.correct)
                    ? (currentLesson.correct as string[]).join(' ')
                    : (currentLesson.options as any[]).find(
                        (o) => o.id === currentLesson.correct,
                      )?.label}
                </p>
              </div>
            </div>
          )}

          <div className="ml-auto">
            {status === 'idle' ? (
              <Button3D
                size="lg"
                className="w-full md:w-40"
                disabled={isCheckDisabled()}
                onClick={handleCheck}
              >
                VERIFICAR
              </Button3D>
            ) : (
              <Button3D
                variant={status === 'correct' ? 'super' : 'danger'}
                size="lg"
                className="w-full md:w-40"
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
