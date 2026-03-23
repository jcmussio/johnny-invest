import { supabase } from '@/lib/supabase/client'

export const createStripeCheckout = async (
  priceId: string,
  successUrl?: string,
  cancelUrl?: string,
) => {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData.session?.access_token

    // Utilizamos fetch nativo em vez de supabase.functions.invoke
    // para podermos capturar e extrair a mensagem de erro exata (JSON)
    // em caso de falha (status 400), o que o invoke mascara com um erro genérico.
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ priceId, successUrl, cancelUrl }),
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
