import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { Shield, Loader2 } from 'lucide-react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingLocal, setLoadingLocal] = useState(false)
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Preencha todos os campos')
      return
    }

    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoadingLocal(true)
    try {
      const { data, error } = await signUp(email, password)

      if (error) {
        if (error.message === 'user_already_exists') {
          throw new Error(
            'Este email já está cadastrado. Por favor, vá para a página de login.',
          )
        }
        throw error
      }

      // Se a confirmação de email estiver ativa no Supabase, a sessão será nula
      if (data?.user && !data.session) {
        toast.success('Conta criada!', {
          description:
            'Por favor, verifique sua caixa de entrada para confirmar o email.',
        })
        navigate('/login')
        return
      }

      toast.success('Conta criada com sucesso!', {
        description: 'Complete seu perfil para acessar a plataforma.',
      })

      // Redirecionamento para a página de perfil completo
      navigate('/cadastro-completo')
    } catch (error: any) {
      toast.error('Erro no cadastro', {
        description: error.message || 'Verifique seus dados e tente novamente.',
      })
    } finally {
      setLoadingLocal(false)
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
              autoComplete="email"
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
              autoComplete="new-password"
            />
          </div>

          <Button3D
            variant="success"
            className="w-full mt-4"
            disabled={loadingLocal}
            type="submit"
          >
            {loadingLocal ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              'Criar Conta'
            )}
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
