import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Shield } from 'lucide-react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingLocal, setLoadingLocal] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingLocal(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/cadastro-completo`,
        },
      })

      if (error) throw error

      toast.success('Conta criada com sucesso!', {
        description: 'Redirecionando para o próximo passo...',
      })

      // Delay de 1 segundo estrito conforme solicitado, sem interferência de re-renders de contexto.
      setTimeout(() => {
        navigate('/cadastro-completo')
      }, 1000)
    } catch (error: any) {
      setLoadingLocal(false)
      toast.error('Erro de autenticação', {
        description:
          error.message || 'Verifique suas credenciais e tente novamente.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center px-4">
      <div className="bg-[#22355c] p-8 rounded-2xl w-full max-w-md border border-[#c0c0c0]/20 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-16 h-16 text-[#10b981] mb-4" />
          <h1 className="text-2xl font-bold text-white text-center">
            Crie sua conta
          </h1>
          <p className="text-[#c0c0c0] text-sm mt-2 text-center">
            Cadastre-se para garantir sua vaga no Johnny Invest.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-[#c0c0c0] mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg px-4 h-12 text-white focus:outline-none focus:border-[#10b981] transition-colors"
              required
              disabled={loadingLocal}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#c0c0c0] mb-1 block">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg px-4 h-12 text-white focus:outline-none focus:border-[#10b981] transition-colors"
              required
              minLength={6}
              disabled={loadingLocal}
            />
          </div>

          <Button3D
            variant="success"
            className="w-full mt-4"
            disabled={loadingLocal}
          >
            {loadingLocal ? 'Processando...' : 'Criar Conta'}
          </Button3D>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-[#10b981] text-sm font-semibold hover:underline"
          >
            Já tem uma conta? Entre aqui
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-[#c0c0c0] text-xs hover:text-white">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
