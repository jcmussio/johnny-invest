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
    name: 'Carlos Tech',
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
      <div className="flex flex-col items-center mb-8">
        <Shield className="w-24 h-24 text-duo-yellow fill-duo-yellow animate-bounce" />
        <h1 className="text-2xl font-extrabold text-duo-text mt-4">
          Liga Bronze
        </h1>
        <p className="text-slate-400">
          Os 10 melhores avançam para a Liga Prata
        </p>
      </div>

      <div className="w-full flex flex-col border-2 border-duo-gray rounded-2xl overflow-hidden">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              'flex items-center p-4 hover:bg-slate-50 transition-colors',
              user.isMe
                ? 'bg-blue-50/50 border-l-4 border-l-duo-blue'
                : 'border-b border-duo-gray last:border-0',
            )}
          >
            <div className="w-8 font-bold text-slate-400">{index + 1}</div>
            <Avatar className="w-10 h-10 border-2 border-duo-gray mr-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p
                className={cn(
                  'font-bold',
                  user.isMe ? 'text-duo-blue' : 'text-duo-text',
                )}
              >
                {user.name}
              </p>
            </div>
            <div className="font-bold text-slate-600">{user.xp} XP</div>
          </div>
        ))}

        <div className="flex items-center justify-center p-4 border-t-2 border-duo-green border-dashed bg-green-50/30">
          <span className="text-xs font-bold text-duo-green uppercase tracking-widest">
            Zona de Promoção
          </span>
        </div>

        <div className="p-4 flex items-center justify-center text-slate-400 text-sm">
          ... e mais 25 participantes
        </div>
      </div>
    </div>
  )
}
