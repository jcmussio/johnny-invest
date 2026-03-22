import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import useAppStore from '@/stores/useAppStore'
import { Flame, Trophy, Medal, Award } from 'lucide-react'

export default function Profile() {
  const { state } = useAppStore()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-b-2 border-silver-light pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold text-navy">
            Carlos Investidor
          </h1>
          <p className="text-slate-500 font-medium">Entrou em Dezembro 2024</p>
        </div>
        <Avatar className="w-24 h-24 border-2 border-dashed border-silver shadow-sm">
          <AvatarImage src="https://img.usecurling.com/ppl/medium?gender=male&seed=4" />
          <AvatarFallback>CI</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-silver-light shadow-none rounded-lg hover:border-silver transition-colors">
          <CardContent className="p-5 flex gap-4 items-center">
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
            <div>
              <h3 className="font-bold text-xl text-navy">{state.streak}</h3>
              <p className="text-slate-500 text-sm font-medium">
                Dias de Prática
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-silver-light shadow-none rounded-lg hover:border-silver transition-colors">
          <CardContent className="p-5 flex gap-4 items-center">
            <Trophy className="w-8 h-8 text-silver-shade fill-silver-shade" />
            <div>
              <h3 className="font-bold text-xl text-navy">{state.xp}</h3>
              <p className="text-slate-500 text-sm font-medium">
                Pontos de Aprendizado
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-silver-light shadow-none rounded-lg hover:border-silver transition-colors">
          <CardContent className="p-5 flex gap-4 items-center">
            <Medal className="w-8 h-8 text-emerald" />
            <div>
              <h3 className="font-bold text-xl text-navy">Investidor</h3>
              <p className="text-slate-500 text-sm font-medium">Liga Atual</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-silver-light shadow-none rounded-lg hover:border-silver transition-colors">
          <CardContent className="p-5 flex gap-4 items-center">
            <Award className="w-8 h-8 text-navy" />
            <div>
              <h3 className="font-bold text-xl text-navy">3</h3>
              <p className="text-slate-500 text-sm font-medium">
                Top 3 Acabamentos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-navy">
          Certificados de Domínio
        </h2>
        <div className="border-2 border-silver-light rounded-lg p-0 overflow-hidden bg-white shadow-sm">
          {[
            {
              title: 'Mente Focada',
              desc: 'Alcance uma prática de 3 dias seguidos',
              level: 3,
              max: 3,
              color: 'bg-orange-500',
            },
            {
              title: 'Mestre dos Derivativos',
              desc: 'Ganhe 1000 Pontos de Aprendizado',
              level: 1,
              max: 3,
              color: 'bg-navy',
            },
            {
              title: 'Networking',
              desc: 'Conecte-se com 3 investidores',
              level: 0,
              max: 3,
              color: 'bg-slate-300',
            },
          ].map((achievement, i) => (
            <div
              key={i}
              className="flex gap-5 p-6 border-b-2 border-silver-light last:border-0 hover:bg-slate-50 transition-colors"
            >
              <div
                className={`w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center shrink-0 shadow-sm`}
              >
                <Award className="text-white w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-navy">
                  {achievement.title}
                </h3>
                <p className="text-slate-500 mb-3 font-medium">
                  {achievement.desc}
                </p>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${achievement.color}`}
                    style={{
                      width: `${(achievement.level / achievement.max) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2 font-bold tracking-wide uppercase">
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
