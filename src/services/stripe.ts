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
      console.error('createStripeCheckout: Usuário não autenticado.')
      throw new Error('Usuário não autenticado.')
    }

    const payload = {
      price_id: priceId,
      user_id: user.id,
      email: user.email,
      successUrl,
      cancelUrl,
    }

    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`
    console.log('Chamando Edge Function em:', url)
    console.log('Payload sendo enviado:', payload)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // O envio do token é opcional, pois a Edge Function foca nos dados do body e não usa JWT
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    })

    let responseData
    try {
      responseData = await response.json()
    } catch (e) {
      console.error('Falha ao converter resposta da Edge Function para JSON')
      throw new Error(
        `Falha de comunicação com o servidor. Status: ${response.status}`,
      )
    }

    if (!response.ok) {
      console.error('Erro retornado pela Edge Function:', responseData)
      return {
        data: null,
        error: new Error(responseData.error || `Erro HTTP ${response.status}`),
      }
    }

    console.log('Dados recebidos da Edge Function com sucesso:', responseData)
    return { data: responseData, error: null }
  } catch (error: any) {
    console.error('Exceção capturada em createStripeCheckout:', error)
    return { data: null, error }
  }
}
