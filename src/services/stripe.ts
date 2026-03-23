import { supabase } from '@/lib/supabase/client'

export const createStripeCheckout = async (
  priceId: string,
  successUrl?: string,
  cancelUrl?: string,
) => {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData.session?.access_token
    const user = sessionData.session?.user

    if (!user) {
      throw new Error('Usuário não autenticado.')
    }

    const payload = {
      price_id: priceId,
      user_id: user.id,
      email: user.email,
      successUrl,
      cancelUrl,
    }

    // Utilizamos fetch nativo para enviar os dados explícitos e extrair erros
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // O envio do token é opcional, pois a Edge Function foca nos dados do body
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      },
    )

    let responseData
    try {
      responseData = await response.json()
    } catch (e) {
      throw new Error(
        `Falha de comunicação com o servidor. Status: ${response.status}`,
      )
    }

    if (!response.ok) {
      // Retorna a mensagem de erro exata gerada pela Edge Function
      return {
        data: null,
        error: new Error(responseData.error || `Erro HTTP ${response.status}`),
      }
    }

    return { data: responseData, error: null }
  } catch (error: any) {
    return { data: null, error }
  }
}
