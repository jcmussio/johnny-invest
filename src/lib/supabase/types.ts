// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agenda: {
        Row: {
          created_at: string | null
          data_hora: string | null
          descricao: string | null
          id: string
          status: string | null
          titulo: string | null
          usuario_id: string | null
        }
        Insert: {
          created_at?: string | null
          data_hora?: string | null
          descricao?: string | null
          id?: string
          status?: string | null
          titulo?: string | null
          usuario_id?: string | null
        }
        Update: {
          created_at?: string | null
          data_hora?: string | null
          descricao?: string | null
          id?: string
          status?: string | null
          titulo?: string | null
          usuario_id?: string | null
        }
        Relationships: []
      }
      aulas: {
        Row: {
          badge_nome: string | null
          conteudo_markdown: string | null
          created_at: string | null
          descricao: string | null
          id: string
          missao_nome: string | null
          nivel: number | null
          numero_aula: number | null
          objetivo: string | null
          ordem: number | null
          quiz_nome: string | null
          titulo: string | null
          topicos: string | null
        }
        Insert: {
          badge_nome?: string | null
          conteudo_markdown?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          missao_nome?: string | null
          nivel?: number | null
          numero_aula?: number | null
          objetivo?: string | null
          ordem?: number | null
          quiz_nome?: string | null
          titulo?: string | null
          topicos?: string | null
        }
        Update: {
          badge_nome?: string | null
          conteudo_markdown?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          missao_nome?: string | null
          nivel?: number | null
          numero_aula?: number | null
          objetivo?: string | null
          ordem?: number | null
          quiz_nome?: string | null
          titulo?: string | null
          topicos?: string | null
        }
        Relationships: []
      }
      badges: {
        Row: {
          badge_id: string | null
          beneficio: string | null
          created_at: string | null
          data_conquista: string | null
          description: string | null
          icon: string | null
          id: string
          level_id: string | null
          name: string
          nome: string | null
          requisito: string | null
          unlock_criteria: string | null
          user_id: string | null
        }
        Insert: {
          badge_id?: string | null
          beneficio?: string | null
          created_at?: string | null
          data_conquista?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          level_id?: string | null
          name: string
          nome?: string | null
          requisito?: string | null
          unlock_criteria?: string | null
          user_id?: string | null
        }
        Update: {
          badge_id?: string | null
          beneficio?: string | null
          created_at?: string | null
          data_conquista?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          level_id?: string | null
          name?: string
          nome?: string | null
          requisito?: string | null
          unlock_criteria?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "badges_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          cpf_cnpj: string | null
          created_at: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          origem: string | null
          telefone: string | null
          tipo: string | null
        }
        Insert: {
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          origem?: string | null
          telefone?: string | null
          tipo?: string | null
        }
        Update: {
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          origem?: string | null
          telefone?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      contratos: {
        Row: {
          cliente_id: string | null
          comissao_venda: number | null
          created_at: string | null
          data_emissao: string | null
          id: string
          moto_id: string | null
          status: string | null
          taxa_desistencia: number | null
          tipo: string | null
          valor_venda_bruta: number | null
        }
        Insert: {
          cliente_id?: string | null
          comissao_venda?: number | null
          created_at?: string | null
          data_emissao?: string | null
          id?: string
          moto_id?: string | null
          status?: string | null
          taxa_desistencia?: number | null
          tipo?: string | null
          valor_venda_bruta?: number | null
        }
        Update: {
          cliente_id?: string | null
          comissao_venda?: number | null
          created_at?: string | null
          data_emissao?: string | null
          id?: string
          moto_id?: string | null
          status?: string | null
          taxa_desistencia?: number | null
          tipo?: string | null
          valor_venda_bruta?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contratos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_moto_id_fkey"
            columns: ["moto_id"]
            isOneToOne: false
            referencedRelation: "estoque_motos"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      daily_missions: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          mission_type: string
          user_id: string | null
          xp_reward: number | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          mission_type: string
          user_id?: string | null
          xp_reward?: number | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          mission_type?: string
          user_id?: string | null
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_missions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      demonstrativos_liquidacao: {
        Row: {
          comissao_venda: number | null
          contrato_id: string | null
          created_at: string | null
          custos_oficina: number | null
          data_emissao: string | null
          id: string
          valor_liquido_repasse: number | null
          valor_venda_bruta: number | null
        }
        Insert: {
          comissao_venda?: number | null
          contrato_id?: string | null
          created_at?: string | null
          custos_oficina?: number | null
          data_emissao?: string | null
          id?: string
          valor_liquido_repasse?: number | null
          valor_venda_bruta?: number | null
        }
        Update: {
          comissao_venda?: number | null
          contrato_id?: string | null
          created_at?: string | null
          custos_oficina?: number | null
          data_emissao?: string | null
          id?: string
          valor_liquido_repasse?: number | null
          valor_venda_bruta?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "demonstrativos_liquidacao_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      estoque_motos: {
        Row: {
          ano: number | null
          avaliacao_tecnica: boolean | null
          chassi: string | null
          cor: string | null
          created_at: string | null
          fotos: string[] | null
          id: string
          km: number | null
          marca: string | null
          modelo: string | null
          placa: string | null
          status: string | null
          valor_pedido: number | null
        }
        Insert: {
          ano?: number | null
          avaliacao_tecnica?: boolean | null
          chassi?: string | null
          cor?: string | null
          created_at?: string | null
          fotos?: string[] | null
          id?: string
          km?: number | null
          marca?: string | null
          modelo?: string | null
          placa?: string | null
          status?: string | null
          valor_pedido?: number | null
        }
        Update: {
          ano?: number | null
          avaliacao_tecnica?: boolean | null
          chassi?: string | null
          cor?: string | null
          created_at?: string | null
          fotos?: string[] | null
          id?: string
          km?: number | null
          marca?: string | null
          modelo?: string | null
          placa?: string | null
          status?: string | null
          valor_pedido?: number | null
        }
        Relationships: []
      }
      financeiro: {
        Row: {
          categoria: string | null
          created_at: string | null
          data_vencimento: string | null
          id: string
          status_pagamento: string | null
          tipo: string | null
          valor: number | null
        }
        Insert: {
          categoria?: string | null
          created_at?: string | null
          data_vencimento?: string | null
          id?: string
          status_pagamento?: string | null
          tipo?: string | null
          valor?: number | null
        }
        Update: {
          categoria?: string | null
          created_at?: string | null
          data_vencimento?: string | null
          id?: string
          status_pagamento?: string | null
          tipo?: string | null
          valor?: number | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          key_concepts: Json | null
          lesson_number: number | null
          level_id: string | null
          number: number | null
          order: number
          suggested_infographic: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          key_concepts?: Json | null
          lesson_number?: number | null
          level_id?: string | null
          number?: number | null
          order: number
          suggested_infographic?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          key_concepts?: Json | null
          lesson_number?: number | null
          level_id?: string | null
          number?: number | null
          order?: number
          suggested_infographic?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          level_number: number
          number: number | null
          objective: string | null
          title: string
          xp_required: number | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          level_number: number
          number?: number | null
          objective?: string | null
          title: string
          xp_required?: number | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          level_number?: number
          number?: number | null
          objective?: string | null
          title?: string
          xp_required?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "levels_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          correct_answer: string | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          level_id: string | null
          options: Json | null
          scenario: string | null
          title: string
          xp_reward: number | null
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          level_id?: string | null
          options?: Json | null
          scenario?: string | null
          title: string
          xp_reward?: number | null
        }
        Update: {
          correct_answer?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          level_id?: string | null
          options?: Json | null
          scenario?: string | null
          title?: string
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "missions_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      missoes: {
        Row: {
          aula_id: string | null
          created_at: string | null
          descricao: string | null
          id: string
          nome: string | null
          resposta_correta: string | null
          xp_reward: number | null
        }
        Insert: {
          aula_id?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string | null
          resposta_correta?: string | null
          xp_reward?: number | null
        }
        Update: {
          aula_id?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string | null
          resposta_correta?: string | null
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "missoes_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
        ]
      }
      oficina_custos: {
        Row: {
          created_at: string | null
          custo_total: number | null
          data_entrada: string | null
          data_saida: string | null
          id: string
          local_oficina: string | null
          moto_id: string | null
          servico_realizado: string | null
        }
        Insert: {
          created_at?: string | null
          custo_total?: number | null
          data_entrada?: string | null
          data_saida?: string | null
          id?: string
          local_oficina?: string | null
          moto_id?: string | null
          servico_realizado?: string | null
        }
        Update: {
          created_at?: string | null
          custo_total?: number | null
          data_entrada?: string | null
          data_saida?: string | null
          id?: string
          local_oficina?: string | null
          moto_id?: string | null
          servico_realizado?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "oficina_custos_moto_id_fkey"
            columns: ["moto_id"]
            isOneToOne: false
            referencedRelation: "estoque_motos"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          id: string
          status: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          aula_id: string | null
          correct_answer: string
          created_at: string | null
          id: string
          lesson_id: string | null
          nome: string | null
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          options: Json | null
          perguntas_json: Json | null
          question: string
          xp_reward: number | null
        }
        Insert: {
          aula_id?: string | null
          correct_answer: string
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          nome?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          options?: Json | null
          perguntas_json?: Json | null
          question: string
          xp_reward?: number | null
        }
        Update: {
          aula_id?: string | null
          correct_answer?: string
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          nome?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          options?: Json | null
          perguntas_json?: Json | null
          question?: string
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      recibos_venda: {
        Row: {
          contrato_id: string | null
          created_at: string | null
          data_emissao: string | null
          id: string
          local: string | null
          valor_total_venda: number | null
        }
        Insert: {
          contrato_id?: string | null
          created_at?: string | null
          data_emissao?: string | null
          id?: string
          local?: string | null
          valor_total_venda?: number | null
        }
        Update: {
          contrato_id?: string | null
          created_at?: string | null
          data_emissao?: string | null
          id?: string
          local?: string | null
          valor_total_venda?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recibos_venda_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string | null
          earned_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          badge_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          badge_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          aula_id: string | null
          badge_conquistada: boolean | null
          completada: boolean | null
          completed: boolean | null
          completed_at: string | null
          id: string
          lesson_id: string | null
          missao_completa: boolean | null
          missao_completada: boolean | null
          mission_id: string | null
          quiz_score: number | null
          score: number | null
          status: string | null
          user_id: string | null
          xp_ganho: number | null
        }
        Insert: {
          aula_id?: string | null
          badge_conquistada?: boolean | null
          completada?: boolean | null
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          lesson_id?: string | null
          missao_completa?: boolean | null
          missao_completada?: boolean | null
          mission_id?: string | null
          quiz_score?: number | null
          score?: number | null
          status?: string | null
          user_id?: string | null
          xp_ganho?: number | null
        }
        Update: {
          aula_id?: string | null
          badge_conquistada?: boolean | null
          completada?: boolean | null
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          lesson_id?: string | null
          missao_completa?: boolean | null
          missao_completada?: boolean | null
          mission_id?: string | null
          quiz_score?: number | null
          score?: number | null
          status?: string | null
          user_id?: string | null
          xp_ganho?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          cpf: string | null
          created_at: string | null
          current_level: number | null
          email: string
          id: string
          is_premium: boolean | null
          last_login_date: string | null
          name: string | null
          nivel: number | null
          premium: boolean | null
          streak: number | null
          telefone: string | null
          updated_at: string | null
          xp: number | null
        }
        Insert: {
          cpf?: string | null
          created_at?: string | null
          current_level?: number | null
          email: string
          id: string
          is_premium?: boolean | null
          last_login_date?: string | null
          name?: string | null
          nivel?: number | null
          premium?: boolean | null
          streak?: number | null
          telefone?: string | null
          updated_at?: string | null
          xp?: number | null
        }
        Update: {
          cpf?: string | null
          created_at?: string | null
          current_level?: number | null
          email?: string
          id?: string
          is_premium?: boolean | null
          last_login_date?: string | null
          name?: string | null
          nivel?: number | null
          premium?: boolean | null
          streak?: number | null
          telefone?: string | null
          updated_at?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      weekly_challenges: {
        Row: {
          challenge_type: string
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          user_id: string | null
          xp_reward: number | null
        }
        Insert: {
          challenge_type: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          xp_reward?: number | null
        }
        Update: {
          challenge_type?: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const


// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: agenda
//   id: uuid (not null, default: gen_random_uuid())
//   titulo: text (nullable)
//   descricao: text (nullable)
//   data_hora: timestamp with time zone (nullable)
//   usuario_id: uuid (nullable)
//   status: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: aulas
//   id: uuid (not null, default: gen_random_uuid())
//   nivel: integer (nullable)
//   numero_aula: integer (nullable)
//   titulo: text (nullable)
//   objetivo: text (nullable)
//   topicos: text (nullable)
//   quiz_nome: text (nullable)
//   missao_nome: text (nullable)
//   badge_nome: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   conteudo_markdown: text (nullable)
//   descricao: text (nullable)
//   ordem: integer (nullable)
// Table: badges
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   icon: text (nullable)
//   level_id: uuid (nullable)
//   description: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   unlock_criteria: text (nullable)
//   nome: text (nullable)
//   requisito: text (nullable)
//   beneficio: text (nullable)
//   user_id: uuid (nullable)
//   badge_id: text (nullable)
//   data_conquista: timestamp with time zone (nullable, default: now())
// Table: clientes
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   cpf_cnpj: text (nullable)
//   email: text (nullable)
//   telefone: text (nullable)
//   endereco: text (nullable)
//   tipo: text (nullable)
//   origem: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: contratos
//   id: uuid (not null, default: gen_random_uuid())
//   cliente_id: uuid (nullable)
//   moto_id: uuid (nullable)
//   tipo: text (nullable)
//   data_emissao: timestamp with time zone (nullable, default: now())
//   valor_venda_bruta: numeric (nullable)
//   comissao_venda: numeric (nullable)
//   taxa_desistencia: numeric (nullable)
//   status: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: courses
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   description: text (nullable)
//   icon: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: daily_missions
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   mission_type: text (not null)
//   xp_reward: integer (nullable, default: 50)
//   completed: boolean (nullable, default: false)
//   completed_at: timestamp with time zone (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: demonstrativos_liquidacao
//   id: uuid (not null, default: gen_random_uuid())
//   contrato_id: uuid (nullable)
//   valor_venda_bruta: numeric (nullable)
//   comissao_venda: numeric (nullable)
//   custos_oficina: numeric (nullable)
//   valor_liquido_repasse: numeric (nullable)
//   data_emissao: timestamp with time zone (nullable, default: now())
//   created_at: timestamp with time zone (nullable, default: now())
// Table: estoque_motos
//   id: uuid (not null, default: gen_random_uuid())
//   marca: text (nullable)
//   modelo: text (nullable)
//   ano: integer (nullable)
//   placa: text (nullable)
//   chassi: text (nullable)
//   cor: text (nullable)
//   km: numeric (nullable)
//   valor_pedido: numeric (nullable)
//   status: text (nullable)
//   avaliacao_tecnica: boolean (nullable, default: true)
//   created_at: timestamp with time zone (nullable, default: now())
//   fotos: _text (nullable, default: '{}'::text[])
// Table: financeiro
//   id: uuid (not null, default: gen_random_uuid())
//   categoria: text (nullable)
//   tipo: text (nullable)
//   valor: numeric (nullable)
//   data_vencimento: timestamp with time zone (nullable)
//   status_pagamento: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: lessons
//   id: uuid (not null, default: gen_random_uuid())
//   level_id: uuid (nullable)
//   title: text (not null)
//   content: text (nullable)
//   video_url: text (nullable)
//   order: integer (not null)
//   created_at: timestamp with time zone (nullable, default: now())
//   lesson_number: integer (nullable)
//   key_concepts: jsonb (nullable)
//   suggested_infographic: text (nullable)
//   number: integer (nullable)
// Table: levels
//   id: uuid (not null, default: gen_random_uuid())
//   course_id: uuid (nullable)
//   level_number: integer (not null)
//   title: text (not null)
//   xp_required: integer (nullable, default: 0)
//   description: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   objective: text (nullable)
//   number: integer (nullable)
// Table: missions
//   id: uuid (not null, default: gen_random_uuid())
//   level_id: uuid (nullable)
//   title: text (not null)
//   description: text (nullable)
//   difficulty: text (nullable)
//   scenario: text (nullable)
//   options: jsonb (nullable)
//   correct_answer: text (nullable)
//   xp_reward: integer (nullable, default: 50)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: missoes
//   id: uuid (not null, default: gen_random_uuid())
//   aula_id: uuid (nullable)
//   nome: text (nullable)
//   descricao: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   resposta_correta: text (nullable)
//   xp_reward: integer (nullable, default: 150)
// Table: oficina_custos
//   id: uuid (not null, default: gen_random_uuid())
//   moto_id: uuid (nullable)
//   servico_realizado: text (nullable)
//   local_oficina: text (nullable)
//   data_entrada: timestamp with time zone (nullable)
//   data_saida: timestamp with time zone (nullable)
//   custo_total: numeric (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: orders
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   stripe_session_id: text (nullable)
//   stripe_payment_intent_id: text (nullable)
//   amount: numeric (nullable, default: 29700)
//   currency: text (nullable, default: 'BRL'::text)
//   status: text (nullable, default: 'pending'::text)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: quizzes
//   id: uuid (not null, default: gen_random_uuid())
//   lesson_id: uuid (nullable)
//   question: text (not null)
//   options: jsonb (nullable)
//   correct_answer: text (not null)
//   xp_reward: integer (nullable, default: 10)
//   created_at: timestamp with time zone (nullable, default: now())
//   option_a: text (nullable)
//   option_b: text (nullable)
//   option_c: text (nullable)
//   option_d: text (nullable)
//   aula_id: uuid (nullable)
//   nome: text (nullable)
//   perguntas_json: jsonb (nullable)
// Table: recibos_venda
//   id: uuid (not null, default: gen_random_uuid())
//   contrato_id: uuid (nullable)
//   valor_total_venda: numeric (nullable)
//   data_emissao: timestamp with time zone (nullable, default: now())
//   local: text (nullable, default: 'São Paulo - SP'::text)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: user_badges
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   badge_id: uuid (nullable)
//   earned_at: timestamp with time zone (nullable, default: now())
// Table: user_progress
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   lesson_id: uuid (nullable)
//   completed: boolean (nullable, default: false)
//   quiz_score: integer (nullable, default: 0)
//   completed_at: timestamp with time zone (nullable)
//   score: integer (nullable, default: 0)
//   mission_id: uuid (nullable)
//   aula_id: uuid (nullable)
//   missao_completada: boolean (nullable, default: false)
//   badge_conquistada: boolean (nullable, default: false)
//   completada: boolean (nullable, default: false)
//   xp_ganho: integer (nullable, default: 0)
//   status: text (nullable, default: 'bloqueada'::text)
//   missao_completa: boolean (nullable, default: false)
// Table: users
//   id: uuid (not null)
//   email: text (not null)
//   name: text (nullable)
//   xp: integer (nullable, default: 0)
//   streak: integer (nullable, default: 0)
//   current_level: integer (nullable, default: 1)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
//   is_premium: boolean (nullable, default: true)
//   cpf: text (nullable)
//   telefone: text (nullable)
//   premium: boolean (nullable, default: true)
//   last_login_date: date (nullable)
//   nivel: integer (nullable, default: 1)
// Table: weekly_challenges
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   challenge_type: text (not null)
//   xp_reward: integer (nullable, default: 200)
//   completed: boolean (nullable, default: false)
//   completed_at: timestamp with time zone (nullable)
//   created_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: agenda
//   PRIMARY KEY agenda_pkey: PRIMARY KEY (id)
// Table: aulas
//   PRIMARY KEY aulas_pkey: PRIMARY KEY (id)
// Table: badges
//   FOREIGN KEY badges_level_id_fkey: FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE
//   PRIMARY KEY badges_pkey: PRIMARY KEY (id)
//   FOREIGN KEY badges_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: clientes
//   PRIMARY KEY clientes_pkey: PRIMARY KEY (id)
//   CHECK clientes_tipo_check: CHECK ((tipo = ANY (ARRAY['vendedor'::text, 'comprador'::text, 'lead'::text])))
// Table: contratos
//   FOREIGN KEY contratos_cliente_id_fkey: FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT
//   FOREIGN KEY contratos_moto_id_fkey: FOREIGN KEY (moto_id) REFERENCES estoque_motos(id) ON DELETE RESTRICT
//   PRIMARY KEY contratos_pkey: PRIMARY KEY (id)
// Table: courses
//   PRIMARY KEY courses_pkey: PRIMARY KEY (id)
// Table: daily_missions
//   PRIMARY KEY daily_missions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY daily_missions_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// Table: demonstrativos_liquidacao
//   FOREIGN KEY demonstrativos_liquidacao_contrato_id_fkey: FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE RESTRICT
//   PRIMARY KEY demonstrativos_liquidacao_pkey: PRIMARY KEY (id)
// Table: estoque_motos
//   PRIMARY KEY estoque_motos_pkey: PRIMARY KEY (id)
//   CHECK estoque_motos_status_check: CHECK ((status = ANY (ARRAY['estoque_proprio'::text, 'intermediacao'::text, 'consignacao'::text, 'marketplace'::text, 'vendido'::text])))
// Table: financeiro
//   CHECK financeiro_categoria_check: CHECK ((categoria = ANY (ARRAY['venda'::text, 'oficina'::text, 'despesa_fixa'::text])))
//   PRIMARY KEY financeiro_pkey: PRIMARY KEY (id)
//   CHECK financeiro_tipo_check: CHECK ((tipo = ANY (ARRAY['entrada'::text, 'saida'::text])))
// Table: lessons
//   FOREIGN KEY lessons_level_id_fkey: FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE
//   PRIMARY KEY lessons_pkey: PRIMARY KEY (id)
// Table: levels
//   FOREIGN KEY levels_course_id_fkey: FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
//   UNIQUE levels_course_id_level_number_key: UNIQUE (course_id, level_number)
//   PRIMARY KEY levels_pkey: PRIMARY KEY (id)
// Table: missions
//   FOREIGN KEY missions_level_id_fkey: FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE
//   PRIMARY KEY missions_pkey: PRIMARY KEY (id)
// Table: missoes
//   FOREIGN KEY missoes_aula_id_fkey: FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
//   PRIMARY KEY missoes_pkey: PRIMARY KEY (id)
// Table: oficina_custos
//   FOREIGN KEY oficina_custos_moto_id_fkey: FOREIGN KEY (moto_id) REFERENCES estoque_motos(id) ON DELETE RESTRICT
//   PRIMARY KEY oficina_custos_pkey: PRIMARY KEY (id)
// Table: orders
//   PRIMARY KEY orders_pkey: PRIMARY KEY (id)
//   FOREIGN KEY orders_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// Table: quizzes
//   FOREIGN KEY quizzes_aula_id_fkey: FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
//   FOREIGN KEY quizzes_lesson_id_fkey: FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
//   PRIMARY KEY quizzes_pkey: PRIMARY KEY (id)
// Table: recibos_venda
//   FOREIGN KEY recibos_venda_contrato_id_fkey: FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE RESTRICT
//   PRIMARY KEY recibos_venda_pkey: PRIMARY KEY (id)
// Table: user_badges
//   FOREIGN KEY user_badges_badge_id_fkey: FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
//   PRIMARY KEY user_badges_pkey: PRIMARY KEY (id)
//   UNIQUE user_badges_user_id_badge_id_key: UNIQUE (user_id, badge_id)
//   FOREIGN KEY user_badges_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// Table: user_progress
//   FOREIGN KEY user_progress_aula_id_fkey: FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
//   FOREIGN KEY user_progress_lesson_id_fkey: FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
//   FOREIGN KEY user_progress_mission_id_fkey: FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
//   PRIMARY KEY user_progress_pkey: PRIMARY KEY (id)
//   FOREIGN KEY user_progress_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//   UNIQUE user_progress_user_id_lesson_id_key: UNIQUE (user_id, lesson_id)
//   UNIQUE user_progress_user_id_mission_id_key: UNIQUE (user_id, mission_id)
// Table: users
//   FOREIGN KEY users_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY users_pkey: PRIMARY KEY (id)
// Table: weekly_challenges
//   PRIMARY KEY weekly_challenges_pkey: PRIMARY KEY (id)
//   FOREIGN KEY weekly_challenges_user_id_fkey: FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: agenda
//   Policy "Autenticados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_agenda" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "leitura_publica" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: aulas
//   Policy "public_read_aulas" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: badges
//   Policy "public_read_badges" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: clientes
//   Policy "Autenticados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_clientes" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: contratos
//   Policy "Autenticados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_contratos" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: courses
//   Policy "public_read_courses" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: daily_missions
//   Policy "daily_missions_read_own" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((auth.uid() = user_id) OR (user_id IS NULL))
//   Policy "daily_missions_update_own" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
// Table: demonstrativos_liquidacao
//   Policy "Privado" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_demonstrativos" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: estoque_motos
//   Policy "Autenticados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_estoque_motos" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: financeiro
//   Policy "Autenticados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_financeiro" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: lessons
//   Policy "public_read_lessons" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: levels
//   Policy "public_read_levels" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: missions
//   Policy "public_read_missions" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: missoes
//   Policy "public_read_missoes" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: oficina_custos
//   Policy "Autenticados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_oficina_custos" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: orders
//   Policy "orders_insert_own" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (auth.uid() = user_id)
//   Policy "orders_read_own" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
// Table: quizzes
//   Policy "public_read_quizzes" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: recibos_venda
//   Policy "Autenticados escrita" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "Publico" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "authenticated_all_recibos_venda" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: user_badges
//   Policy "user_badges_insert_own" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (auth.uid() = user_id)
//   Policy "user_badges_read_own" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
// Table: user_progress
//   Policy "user_progress_delete_own" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//   Policy "user_progress_insert_own" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (auth.uid() = user_id)
//   Policy "user_progress_read_own" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
//   Policy "user_progress_update_own" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)
// Table: users
//   Policy "users_insert_own" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (auth.uid() = id)
//   Policy "users_read_own" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = id)
//   Policy "users_update_own" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = id)
// Table: weekly_challenges
//   Policy "weekly_challenges_read_own" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((auth.uid() = user_id) OR (user_id IS NULL))
//   Policy "weekly_challenges_update_own" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (auth.uid() = user_id)

// --- DATABASE FUNCTIONS ---
// FUNCTION rls_auto_enable()
//   CREATE OR REPLACE FUNCTION public.rls_auto_enable()
//    RETURNS event_trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//    SET search_path TO 'pg_catalog'
//   AS $function$
//   DECLARE
//     cmd record;
//   BEGIN
//     FOR cmd IN
//       SELECT *
//       FROM pg_event_trigger_ddl_commands()
//       WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
//         AND object_type IN ('table','partitioned table')
//     LOOP
//        IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
//         BEGIN
//           EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
//           RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
//         EXCEPTION
//           WHEN OTHERS THEN
//             RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
//         END;
//        ELSE
//           RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
//        END IF;
//     END LOOP;
//   END;
//   $function$
//   

// --- INDEXES ---
// Table: levels
//   CREATE UNIQUE INDEX levels_course_id_level_number_key ON public.levels USING btree (course_id, level_number)
// Table: user_badges
//   CREATE UNIQUE INDEX user_badges_user_id_badge_id_key ON public.user_badges USING btree (user_id, badge_id)
// Table: user_progress
//   CREATE UNIQUE INDEX user_progress_user_id_lesson_id_key ON public.user_progress USING btree (user_id, lesson_id)
//   CREATE UNIQUE INDEX user_progress_user_id_mission_id_key ON public.user_progress USING btree (user_id, mission_id)

