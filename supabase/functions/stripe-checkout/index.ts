import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import Stripe from 'npm:stripe'
import { createClient } from 'npm:@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  // Tratamento de requisições preflight (CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { price_id, priceId, user_id, email, successUrl, cancelUrl } = body
    
    // Suporte flexível para a nomenclatura da variável de preço
    const targetPriceId = price_id || priceId

    if (!targetPriceId) {
      throw new Error('O price_id é obrigatório para iniciar o checkout.')
    }

    if (!user_id || !email) {
      throw new Error('user_id e email são obrigatórios no corpo da requisição.')
    }

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      throw new Error('Variável STRIPE_SECRET_KEY não está configurada no ambiente.')
    }

    // Inicializa a instância do Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })
    
    const origin = req.headers.get('origin') ?? 'http://localhost:5173'

    // Cria a sessão de Checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: targetPriceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // Alterado de subscription para payment assumindo acesso vitalício/curso
      success_url: successUrl || `${origin}/sucesso-pagamento?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${origin}/pricing?canceled=true`,
      client_reference_id: user_id,
      customer_email: email,
    })

    // Tenta registrar o pedido no banco (não bloqueia o fluxo se falhar)
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      
      if (supabaseUrl && supabaseServiceRoleKey) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
        
        await supabaseAdmin
          .from('orders')
          .insert({
            user_id: user_id,
            stripe_session_id: session.id,
            status: 'pending'
          })
      }
    } catch (dbError) {
      console.warn('Falha não-crítica ao inserir o pedido no banco:', dbError)
    }

    // Retorna os dados da sessão com sucesso e cabeçalhos de CORS
    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Erro na execução do stripe-checkout:', error)
    
    // Retorna erro amigável ao cliente
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido no processamento.' 
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
