import { Shield } from 'lucide-react'
import { Button3D } from '@/components/ui/button-3d'

export default function Signup() {
  const handleStart = () => {
    window.location.href = '/dashboard/premium'
  }

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center px-4">
      <div className="bg-[#22355c] p-8 rounded-2xl w-full max-w-md border border-[#c0c0c0]/20 shadow-2xl flex flex-col items-center">
        <Shield className="w-16 h-16 text-[#10b981] mb-6" />
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Acesso Liberado!
        </h1>
        <p className="text-[#c0c0c0] text-sm text-center mb-8">
          A plataforma agora é 100% aberta. Você não precisa mais criar uma
          conta para começar a aprender.
        </p>

        <Button3D
          variant="success"
          className="w-full h-14 text-lg"
          onClick={handleStart}
        >
          Começar Agora Gratuitamente
        </Button3D>
      </div>
    </div>
  )
}
