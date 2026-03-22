import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useAppStore from '@/stores/useAppStore'
import { Zap, Trophy, Medal, Crown } from 'lucide-react'

export default function Profile() {
  const { state } = useAppStore()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-b-2 border-duo-gray pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold text-duo-text">Carlos Tech</h1>
          <p className="text-slate-500">Entrou em Dezembro 2024</p>
        </div>
        <Avatar className="w-24 h-24 border-2 border-dashed border-duo-gray">
          <AvatarImage src="https://img.usecurling.com/ppl/medium?gender=male&seed=4" />
          <AvatarFallback>CT</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-duo-gray shadow-none rounded-2xl">
          <CardContent className="p-4 flex gap-4 items-center">
            <Zap className="w-8 h-8 text-orange-500 fill-orange-500" />
            <div>
              <h3 className="font-bold text-lg">{state.streak}</h3>
              <p className="text-slate-500 text-sm">Ofensiva dias</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-duo-gray shadow-none rounded-2xl">
          <CardContent className="p-4 flex gap-4 items-center">
            <Trophy className="w-8 h-8 text-duo-yellow fill-duo-yellow" />
            <div>
              <h3 className="font-bold text-lg">{state.xp}</h3>
              <p className="text-slate-500 text-sm">XP Total</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-duo-gray shadow-none rounded-2xl">
          <CardContent className="p-4 flex gap-4 items-center">
            <Medal className="w-8 h-8 text-duo-green" />
            <div>
              <h3 className="font-bold text-lg">Bronze</h3>
              <p className="text-slate-500 text-sm">Liga Atual</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-duo-gray shadow-none rounded-2xl">
          <CardContent className="p-4 flex gap-4 items-center">
            <Crown className="w-8 h-8 text-duo-purple" />
            <div>
              <h3 className="font-bold text-lg">3</h3>
              <p className="text-slate-500 text-sm">Top 3 acabamentos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-duo-text">Conquistas</h2>
        <div className="border-2 border-duo-gray rounded-2xl p-0 overflow-hidden">
          {[
            {
              title: 'Em Chamas',
              desc: 'Alcance uma ofensiva de 3 dias',
              level: 3,
              max: 3,
              color: 'bg-orange-500',
            },
            {
              title: 'Sábio',
              desc: 'Ganhe 1000 XP',
              level: 1,
              max: 3,
              color: 'bg-duo-blue',
            },
            {
              title: 'Amigável',
              desc: 'Siga 3 amigos',
              level: 0,
              max: 3,
              color: 'bg-slate-300',
            },
          ].map((achievement, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 border-b-2 border-duo-gray last:border-0 hover:bg-slate-50"
            >
              <div
                className={`w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center shrink-0`}
              >
                <Trophy className="text-white w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{achievement.title}</h3>
                <p className="text-slate-500 mb-2">{achievement.desc}</p>
                <div className="w-full bg-duo-gray h-4 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${achievement.color}`}
                    style={{
                      width: `${(achievement.level / achievement.max) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1 font-bold">
                  Nível {achievement.level}/{achievement.max}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
