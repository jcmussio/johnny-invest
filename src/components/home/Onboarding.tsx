export function Onboarding() {
  const steps = [
    {
      num: '1',
      title: 'Crie sua Conta',
      desc: 'Leva menos de 1 minuto. Sem burocracia.',
    },
    {
      num: '2',
      title: 'Comece o Nível 1',
      desc: 'Sua primeira aula de 5 min te espera.',
    },
    {
      num: '3',
      title: 'Desbloqueie Conquistas',
      desc: 'Ganhe XP e prove que você dominou o conteúdo.',
    },
  ]

  return (
    <section className="py-24 px-4 lg:px-8 bg-[#1a2a4a]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16">
          Como Funciona a Jornada?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#10b981]/0 via-[#10b981]/50 to-[#10b981]/0 z-0"></div>

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center group"
            >
              <div className="w-24 h-24 rounded-full bg-[#22355c] border-4 border-[#1a2a4a] flex items-center justify-center mb-6 shadow-xl relative overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/20 to-transparent"></div>
                <span className="text-3xl font-black text-white relative z-10">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-[#c0c0c0] max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
