import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const stripePublishableKey = Deno.env.get('STRIPE_PUBLISHABLE_KEY')

    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceRoleKey =
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const reqBody = await req.json()
    const { user_id } = reqBody

    if (!user_id) {
      throw new Error('user_id is required')
    }

    const origin = req.headers.get('origin') ?? 'http://localhost:5173'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto', 'pix'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Acesso Premium - Johnny Invest',
              description:
                'Acesso completo a todos os 8 níveis e recursos gamificados exclusivos.',
            },
            unit_amount: 29700, // R$ 297,00 (em centavos)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/learn?payment=success`,
      cancel_url: `${origin}/learn?payment=cancelled`,
      client_reference_id: user_id,
    })

    if (!session.id) {
      throw new Error('Failed to create Stripe session')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

    // Registra a sessão com status "pending"
    const { error: insertError } = await supabase.from('orders').insert({
      user_id: user_id,
      stripe_session_id: session.id,
      amount: 29700,
      currency: 'BRL',
      status: 'pending',
    })

    if (insertError) {
      console.error('Error inserting order:', insertError)
      throw new Error('Failed to register order in database')
    }

    return new Response(
      JSON.stringify({
        session_id: session.id,
        url: session.url,
        publishable_key: stripePublishableKey,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Stripe Checkout Error:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
