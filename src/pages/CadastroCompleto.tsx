import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function CadastroCompleto() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center p-4 py-10 animate-fade-in">
      <div className="bg-[#22355c] border-2 border-[#c0c0c0]/20 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col p-8 items-center text-center">
        <div className="w-20 h-20 bg-[#10b981]/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-[#10b981]" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-4">
          Cadastro Completo!
        </h1>
        <p className="text-[#c0c0c0] font-medium text-lg mb-8">
          Sua conta foi criada com sucesso. Bem-vindo ao Johnny Invest!
        </p>
        <Button3D
          variant="success"
          size="lg"
          className="w-full"
          onClick={() => navigate('/dashboard')}
        >
          IR PARA O DASHBOARD <ArrowRight className="w-5 h-5 ml-2" />
        </Button3D>
      </div>
    </div>
  )
}
