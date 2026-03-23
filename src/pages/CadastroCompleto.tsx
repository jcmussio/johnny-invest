import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button3D } from '@/components/ui/button-3d'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { UserCircle } from 'lucide-react'

export default function CadastroCompleto() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [loadingLocal, setLoadingLocal] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  const maskCPF = (val: string) => {
    return val
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const maskPhone = (val: string) => {
    return val
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || cpf.length !== 14 || phone.length < 14) {
      toast.error('Atenção', {
        description: 'Por favor, preencha todos os campos corretamente.',
      })
      return
    }

    if (!user) return

    setLoadingLocal(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({ name, cpf, telefone: phone })
        .eq('id', user.id)

      if (error) throw error

      toast.success('Dados salvos com sucesso!')
      navigate('/resumo-compra')
    } catch (error: any) {
      toast.error('Erro ao salvar dados', {
        description:
          error.message || 'Verifique sua conexão e tente novamente.',
      })
    } finally {
      setLoadingLocal(false)
    }
  }

  if (authLoading || !user) return null

  return (
    <div className="min-h-screen bg-[#1a2a4a] flex items-center justify-center px-4 py-10 animate-fade-in">
      <div className="bg-[#22355c] p-8 rounded-2xl w-full max-w-md border border-[#c0c0c0]/20 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#10b981]/20 rounded-full flex items-center justify-center mb-4">
            <UserCircle className="w-8 h-8 text-[#10b981]" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center">
            Complete seu Perfil
          </h1>
          <p className="text-[#c0c0c0] text-sm mt-2 text-center">
            Precisamos de mais alguns dados para finalizar seu cadastro.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-[#c0c0c0] mb-1 block">
              Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg px-4 h-12 text-white focus:outline-none focus:border-[#10b981] transition-colors"
              required
              placeholder="Ex: João da Silva"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#c0c0c0] mb-1 block">
              E-mail
            </label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              className="w-full bg-[#1a2a4a]/50 border border-[#c0c0c0]/10 rounded-lg px-4 h-12 text-[#c0c0c0] opacity-70 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#c0c0c0] mb-1 block">
              CPF
            </label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(maskCPF(e.target.value))}
              className="w-full bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg px-4 h-12 text-white focus:outline-none focus:border-[#10b981] transition-colors"
              required
              placeholder="000.000.000-00"
              maxLength={14}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#c0c0c0] mb-1 block">
              Telefone (WhatsApp)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              className="w-full bg-[#1a2a4a] border border-[#c0c0c0]/30 rounded-lg px-4 h-12 text-white focus:outline-none focus:border-[#10b981] transition-colors"
              required
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </div>

          <Button3D
            variant="success"
            className="w-full mt-6 h-14 text-[15px]"
            disabled={loadingLocal}
          >
            {loadingLocal ? 'PROCESSANDO...' : 'CONTINUAR PARA PAGAMENTO'}
          </Button3D>
        </form>
      </div>
    </div>
  )
}
