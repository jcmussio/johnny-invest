import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import Stripe from 'npm:stripe'
import { createClient } from 'npm:@supabase/supabase-js'

Deno.serve(async (req: Request) => {
  // Apenas aceita requisições POST para o webhook
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
  const stripeWebhookSecret =
    Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? stripeSecretKey

  if (!stripeSecretKey || !stripeWebhookSecret) {
    return new Response('Stripe keys are not set', { status: 400 })
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  })

  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('No stripe-signature header', { status: 400 })
  }

  try {
    const body = await req.text()

    // Valida a assinatura do webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret,
    )

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceRoleKey =
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    // Usa a Service Role Key para ignorar o RLS e atualizar as tabelas do sistema
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const paymentIntentId = paymentIntent.id

      // Busca a sessão de checkout relacionada a este payment intent para recuperar o user_id (client_reference_id)
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
      })

      if (sessions.data.length > 0) {
        const session = sessions.data[0]
        const userId = session.client_reference_id
        const sessionId = session.id

        if (userId) {
          // Atualiza o status do pedido para 'completed'
          await supabase
            .from('orders')
            .update({
              status: 'completed',
              stripe_payment_intent_id: paymentIntentId,
            })
            .eq('stripe_session_id', sessionId)

          // Marca is_premium como true para o usuário correspondente
          await supabase
            .from('users')
            .update({ is_premium: true })
            .eq('id', userId)
        }
      }
    } else if (event.type === 'checkout.session.completed') {
      // Trata também a conclusão da sessão caso chegue antes ou seja o evento principal configurado
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.client_reference_id
      const sessionId = session.id
      const paymentIntentId = session.payment_intent as string | null

      if (userId) {
        const updateData: any = { status: 'completed' }
        if (paymentIntentId) {
          updateData.stripe_payment_intent_id = paymentIntentId
        }

        await supabase
          .from('orders')
          .update(updateData)
          .eq('stripe_session_id', sessionId)

        await supabase
          .from('users')
          .update({ is_premium: true })
          .eq('id', userId)
      }
    }

    // Retorna status 200 confirmando recebimento do evento
    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
