import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Heart } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button3D } from '@/components/ui/button-3d'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/useAppStore'
import { toast } from 'sonner'

const lessonData = [
  {
    id: 1,
    type: 'select',
    question: "Como se diz 'Maçã'?",
    options: [
      {
        id: 'a',
        label: 'Apple',
        image: 'https://img.usecurling.com/p/200/200?q=apple',
      },
      {
        id: 'b',
        label: 'Bread',
        image: 'https://img.usecurling.com/p/200/200?q=bread',
      },
      {
        id: 'c',
        label: 'Coffee',
        image: 'https://img.usecurling.com/p/200/200?q=coffee',
      },
      {
        id: 'd',
        label: 'Milk',
        image: 'https://img.usecurling.com/p/200/200?q=milk',
      },
    ],
    correct: 'a',
  },
  {
    id: 2,
    type: 'translate',
    question: 'Traduza esta frase',
    content: 'The woman eats bread',
    words: ['A', 'mulher', 'come', 'pão', 'menino', 'bebe', 'água'],
    correct: ['A', 'mulher', 'come', 'pão'],
  },
  {
    id: 3,
    type: 'select_text',
    question: "Selecione a tradução correta para 'Água'",
    options: [
      { id: 'a', label: 'Water', textOnly: true },
      { id: 'b', label: 'Waiter', textOnly: true },
      { id: 'c', label: 'Winter', textOnly: true },
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
      const audio = new Audio(
        'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3',
      ) // Placeholder sound
      audio.play().catch(() => {})
      dispatch({ type: 'ADD_XP', payload: 10 })
    } else {
      setStatus('wrong')
      dispatch({ type: 'LOSE_HEART' })
      if (state.hearts <= 0) {
        toast.error('Você ficou sem vidas!', {
          description: 'Pratique para ganhar vidas ou compre na loja.',
        })
        navigate('/')
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
      // Lesson Complete
      dispatch({
        type: 'COMPLETE_LEVEL',
        payload: { unitId: 1, levelId: state.currentLevel },
      })
      navigate('/')
      toast.success('Lição Completada!', { description: 'Você ganhou +10 XP' })
    }
  }

  const isCheckDisabled = () => {
    if (currentLesson.type === 'translate') return selectedWords.length === 0
    return !selectedOption
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-4 p-4">
        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="w-6 h-6" />
        </button>
        <Progress value={progress} className="h-4 rounded-xl" />
        <div className="flex items-center gap-1 text-duo-red font-bold">
          <Heart className="fill-duo-red w-5 h-5" />
          {state.hearts}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl md:text-3xl font-bold text-duo-text text-center w-full">
          {currentLesson.question}
        </h1>

        {/* Question Types */}
        {currentLesson.type === 'select' && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {(currentLesson.options as any[]).map((opt) => (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={cn(
                  'cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-slate-50 transition-all active:scale-95',
                  selectedOption === opt.id
                    ? 'border-duo-blue bg-blue-50'
                    : 'border-duo-gray',
                )}
              >
                <img
                  src={opt.image}
                  alt={opt.label}
                  className="w-24 h-24 object-contain"
                />
                <span
                  className={cn(
                    'font-bold',
                    selectedOption === opt.id
                      ? 'text-duo-blue'
                      : 'text-slate-600',
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
                  'cursor-pointer border-2 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-50 transition-all active:scale-95',
                  selectedOption === opt.id
                    ? 'border-duo-blue bg-blue-50'
                    : 'border-duo-gray',
                )}
              >
                <div
                  className={cn(
                    'w-6 h-6 border-2 rounded-lg flex items-center justify-center text-xs font-bold',
                    selectedOption === opt.id
                      ? 'border-duo-blue text-duo-blue'
                      : 'border-slate-300 text-slate-300',
                  )}
                >
                  {selectedOption === opt.id && '1'}
                </div>
                <span
                  className={cn(
                    'font-bold',
                    selectedOption === opt.id
                      ? 'text-duo-blue'
                      : 'text-slate-600',
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
                src="https://img.usecurling.com/i?q=person-speaking&shape=hand-drawn"
                className="w-24 h-24"
                alt="Character"
              />
              <div className="bg-slate-100 border-2 border-slate-200 p-4 rounded-2xl rounded-tl-none relative">
                <p className="text-lg text-slate-700">
                  {(currentLesson as any).content}
                </p>
              </div>
            </div>

            <div className="min-h-[60px] border-b-2 border-slate-200 flex flex-wrap gap-2 py-2">
              {selectedWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWordClick(word)}
                  className="px-4 py-2 bg-white border-2 border-duo-gray border-b-4 rounded-xl text-slate-700 font-bold shadow-sm"
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
                      'px-4 py-2 border-2 rounded-xl font-bold transition-all',
                      isSelected
                        ? 'bg-slate-200 border-slate-200 text-transparent'
                        : 'bg-white border-duo-gray border-b-4 text-slate-700 hover:bg-slate-50 active:translate-y-1 active:border-b-0',
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

      {/* Footer */}
      <footer
        className={cn(
          'p-4 border-t-2 transition-colors duration-300',
          status === 'correct'
            ? 'bg-[#d7ffb8] border-transparent'
            : status === 'wrong'
              ? 'bg-[#ffdfe0] border-transparent'
              : 'bg-white border-duo-gray',
        )}
      >
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          {status === 'correct' && (
            <div className="flex items-center gap-4 text-duo-green-shade animate-fade-in-up">
              <div className="bg-white p-2 rounded-full">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-xl">Bom trabalho!</p>
              </div>
            </div>
          )}

          {status === 'wrong' && (
            <div className="flex items-center gap-4 text-duo-red-shade animate-shake">
              <div className="bg-white p-2 rounded-full">
                <X className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-xl">Resposta correta:</p>
                <p className="text-md">
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
                variant={status === 'correct' ? 'default' : 'danger'}
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
