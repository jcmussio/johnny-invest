import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const users = [
  {
    id: 1,
    name: 'Maria Silva',
    xp: 2450,
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=1',
  },
  {
    id: 2,
    name: 'João Pedro',
    xp: 2100,
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=2',
  },
  {
    id: 3,
    name: 'Ana Souza',
    xp: 1850,
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=3',
  },
  {
    id: 4,
    name: 'Carlos Investidor',
    xp: 1250,
    avatar: 'https://img.usecurling.com/ppl/medium?gender=male&seed=4',
    isMe: true,
  },
  {
    id: 5,
    name: 'Beatriz L.',
    xp: 900,
    avatar: 'https://img.usecurling.com/ppl/medium?gender=female&seed=5',
  },
]

export default function Leaderboard() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-10 text-center">
        <Shield className="w-24 h-24 text-silver-shade fill-silver-shade animate-bounce drop-shadow-md" />
        <h1 className="text-3xl font-extrabold text-navy mt-6">
          Liga Investidor
        </h1>
        <p className="text-slate-500 font-medium mt-2 max-w-md">
          Os 10 melhores alunos avançam para a Liga Elite
        </p>
      </div>

      <div className="w-full flex flex-col border-2 border-silver-light rounded-lg overflow-hidden bg-white shadow-sm">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              'flex items-center p-5 hover:bg-slate-50 transition-colors',
              user.isMe
                ? 'bg-blue-50/50 border-l-4 border-l-navy'
                : 'border-b border-silver-light last:border-0',
            )}
          >
            <div className="w-10 font-bold text-slate-400 text-lg">
              {index + 1}
            </div>
            <Avatar className="w-12 h-12 border-2 border-silver-light mr-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p
                className={cn(
                  'font-bold text-lg',
                  user.isMe ? 'text-navy' : 'text-slate-700',
                )}
              >
                {user.name}
              </p>
            </div>
            <div className="font-bold text-slate-600 text-lg">
              {user.xp} PTS
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center p-5 border-t-2 border-emerald border-dashed bg-emerald/5">
          <span className="text-xs font-bold text-emerald uppercase tracking-widest">
            Zona de Promoção
          </span>
        </div>

        <div className="p-5 flex items-center justify-center text-slate-400 text-sm font-medium">
          ... e mais 25 investidores
        </div>
      </div>
    </div>
  )
}
