import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'npm:@supabase/supabase-js';

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the user making the request
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { user_id, aula_id, quiz_score, missao_completa } = await req.json();

    console.log(`[update-user-progress] User: ${user_id}, Aula: ${aula_id}, Score: ${quiz_score}, Missao: ${missao_completa}`);

    // Validate minimum requirements
    if (quiz_score < 70 || !missao_completa) {
      return new Response(JSON.stringify({ status: 'erro', message: 'Requisitos não atingidos para completar a aula.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    // 1. Fetch Aula details to know the badge name and order
    const { data: aula, error: aulaError } = await supabaseClient
      .from('aulas')
      .select('*')
      .eq('id', aula_id)
      .single();

    if (aulaError || !aula) {
      throw new Error('Aula não encontrada');
    }

    // 2. Fetch current user progress for this lesson
    const { data: prog, error: progFetchError } = await supabaseClient
      .from('user_progress')
      .select('id, xp_ganho, completada')
      .eq('user_id', user_id)
      .eq('aula_id', aula_id)
      .single();

    if (progFetchError || !prog) {
       throw new Error('Progresso não encontrado');
    }

    // Idempotency: If already complete, return success immediately
    if (prog.completada) {
       return new Response(JSON.stringify({ status: 'sucesso', message: 'Aula já estava completada', badge_nome: null }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    const newXpGanho = (prog.xp_ganho || 0) + 100;

    // Update user_progress marking it as complete and granting XP
    await supabaseClient
      .from('user_progress')
      .update({
        completada: true,
        badge_conquistada: !!aula.badge_nome,
        xp_ganho: newXpGanho
      })
      .eq('id', prog.id);

    // 3. Grant Badge if applicable
    let badgeConquistada = false;
    if (aula.badge_nome) {
      const { data: badge } = await supabaseClient
        .from('badges')
        .select('id')
        .eq('nome', aula.badge_nome)
        .single();

      if (badge) {
         // Insert into user_badges. The unique constraint handles duplicates gracefully
         const { error: badgeError } = await supabaseClient
           .from('user_badges')
           .insert({ user_id, badge_id: badge.id });
         
         if (!badgeError) {
            badgeConquistada = true;
         }
      }
    }

    // 4. Add XP to global User profile
    const { data: user } = await supabaseClient
      .from('users')
      .select('xp')
      .eq('id', user_id)
      .single();

    if (user) {
      await supabaseClient
        .from('users')
        .update({ xp: (user.xp || 0) + 100 })
        .eq('id', user_id);
    }

    // 5. Unlock the next lesson (by creating a progress entry for it)
    const { data: allAulas } = await supabaseClient
      .from('aulas')
      .select('id, nivel, numero_aula')
      .order('nivel', { ascending: true })
      .order('numero_aula', { ascending: true });

    let nextAulaId = null;
    if (allAulas) {
      const currentIndex = allAulas.findIndex((a: any) => a.id === aula_id);
      if (currentIndex !== -1 && currentIndex < allAulas.length - 1) {
        nextAulaId = allAulas[currentIndex + 1].id;
        
        // Ensure progress tracking starts for the next lesson
        const { data: existingNextProg } = await supabaseClient
          .from('user_progress')
          .select('id')
          .eq('user_id', user_id)
          .eq('aula_id', nextAulaId)
          .maybeSingle();

        if (!existingNextProg) {
          await supabaseClient
            .from('user_progress')
            .insert({ user_id, aula_id: nextAulaId });
        }
      }
    }

    return new Response(JSON.stringify({ 
      status: 'sucesso', 
      badge_nome: badgeConquistada ? aula.badge_nome : null,
      next_aula_id: nextAulaId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error: any) {
    console.error('[update-user-progress] Error:', error);
    return new Response(JSON.stringify({ status: 'erro', message: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
