import { supabase } from '@/lib/supabase/client'

export const createStripeCheckout = async (userId: string) => {
  const { data, error } = await supabase.functions.invoke('stripe-checkout', {
    body: { user_id: userId },
  })

  return { data, error }
}
