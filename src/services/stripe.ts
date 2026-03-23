import { supabase } from '@/lib/supabase/client'

export const createStripeCheckout = async (
  priceId: string,
  successUrl?: string,
  cancelUrl?: string,
) => {
  const { data, error } = await supabase.functions.invoke('stripe-checkout', {
    body: { priceId, successUrl, cancelUrl },
  })

  return { data, error }
}
