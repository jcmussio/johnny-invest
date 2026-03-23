import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'npm:@supabase/supabase-js'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      },
    )

    const { user_id, aula_id, quiz_score, missao_completa, status } =
      await req.json()

    console.log(
      `[update-user-progress] User: ${user_id}, Aula: ${aula_id}, Score: ${quiz_score}, Missao: ${missao_completa}`,
    )

    const { data: aula, error: aulaError } = await supabaseClient
      .from('aulas')
      .select('*')
      .eq('id', aula_id)
      .single()

    if (aulaError || !aula) {
      throw new Error('Aula não encontrada')
    }

    const { data: prog, error: progFetchError } = await supabaseClient
      .from('user_progress')
      .select('*')
      .eq('user_id', user_id)
      .eq('aula_id', aula_id)
      .maybeSingle()

    let current_quiz_score =
      quiz_score !== undefined ? quiz_score : prog?.quiz_score || 0
    let current_missao_completa =
      missao_completa !== undefined
        ? missao_completa
        : prog?.missao_completada || false
    let current_status =
      status !== undefined ? status : prog?.status || 'bloqueada'
    let is_already_completed = prog?.completada || false

    // Check if both are complete to unlock
    const bothComplete = current_quiz_score >= 100 && current_missao_completa

    const updatePayload: any = {
      quiz_score: current_quiz_score,
      missao_completada: current_missao_completa,
      status: bothComplete ? 'completa' : current_status,
    }

    let badgeConquistada = false
    let nextAulaId = null

    if (bothComplete && !is_already_completed) {
      updatePayload.completada = true
      updatePayload.xp_ganho = (prog?.xp_ganho || 0) + 100
      updatePayload.badge_conquistada = !!aula.badge_nome

      if (aula.badge_nome) {
        const { data: badge } = await supabaseClient
          .from('badges')
          .select('id')
          .eq('nome', aula.badge_nome)
          .maybeSingle()

        if (badge) {
          await supabaseClient
            .from('user_badges')
            .insert({ user_id, badge_id: badge.id })
          badgeConquistada = true
        }
      }

      const { data: user } = await supabaseClient
        .from('users')
        .select('xp')
        .eq('id', user_id)
        .single()
      if (user) {
        await supabaseClient
          .from('users')
          .update({ xp: (user.xp || 0) + 100 })
          .eq('id', user_id)
      }

      const { data: allAulas } = await supabaseClient
        .from('aulas')
        .select('id, nivel, numero_aula')
        .order('nivel', { ascending: true })
        .order('numero_aula', { ascending: true })

      if (allAulas) {
        const currentIndex = allAulas.findIndex((a: any) => a.id === aula_id)
        if (currentIndex !== -1 && currentIndex < allAulas.length - 1) {
          nextAulaId = allAulas[currentIndex + 1].id

          const { data: existingNextProg } = await supabaseClient
            .from('user_progress')
            .select('id')
            .eq('user_id', user_id)
            .eq('aula_id', nextAulaId)
            .maybeSingle()

          if (!existingNextProg) {
            await supabaseClient
              .from('user_progress')
              .insert({ user_id, aula_id: nextAulaId, status: 'desbloqueada' })
          } else {
            await supabaseClient
              .from('user_progress')
              .update({ status: 'desbloqueada' })
              .eq('id', existingNextProg.id)
          }
        }
      }
    }

    if (prog) {
      await supabaseClient
        .from('user_progress')
        .update(updatePayload)
        .eq('id', prog.id)
    } else {
      await supabaseClient
        .from('user_progress')
        .insert({ user_id, aula_id, ...updatePayload })
    }

    return new Response(
      JSON.stringify({
        status: 'sucesso',
        message: bothComplete ? 'Aula completa!' : 'Progresso atualizado',
        badge_nome: badgeConquistada ? aula.badge_nome : null,
        next_aula_id: nextAulaId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error: any) {
    console.error('[update-user-progress] Error:', error)
    return new Response(
      JSON.stringify({ status: 'erro', message: 'Erro na atualização' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
