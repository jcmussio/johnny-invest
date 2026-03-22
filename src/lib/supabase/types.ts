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
    PostgrestVersion: '14.4'
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
            foreignKeyName: 'contratos_cliente_id_fkey'
            columns: ['cliente_id']
            isOneToOne: false
            referencedRelation: 'clientes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'contratos_moto_id_fkey'
            columns: ['moto_id']
            isOneToOne: false
            referencedRelation: 'estoque_motos'
            referencedColumns: ['id']
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
            foreignKeyName: 'demonstrativos_liquidacao_contrato_id_fkey'
            columns: ['contrato_id']
            isOneToOne: false
            referencedRelation: 'contratos'
            referencedColumns: ['id']
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
            foreignKeyName: 'oficina_custos_moto_id_fkey'
            columns: ['moto_id']
            isOneToOne: false
            referencedRelation: 'estoque_motos'
            referencedColumns: ['id']
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
            foreignKeyName: 'recibos_venda_contrato_id_fkey'
            columns: ['contrato_id']
            isOneToOne: false
            referencedRelation: 'contratos'
            referencedColumns: ['id']
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
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
// Table: oficina_custos
//   id: uuid (not null, default: gen_random_uuid())
//   moto_id: uuid (nullable)
//   servico_realizado: text (nullable)
//   local_oficina: text (nullable)
//   data_entrada: timestamp with time zone (nullable)
//   data_saida: timestamp with time zone (nullable)
//   custo_total: numeric (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: recibos_venda
//   id: uuid (not null, default: gen_random_uuid())
//   contrato_id: uuid (nullable)
//   valor_total_venda: numeric (nullable)
//   data_emissao: timestamp with time zone (nullable, default: now())
//   local: text (nullable, default: 'São Paulo - SP'::text)
//   created_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: agenda
//   PRIMARY KEY agenda_pkey: PRIMARY KEY (id)
// Table: clientes
//   PRIMARY KEY clientes_pkey: PRIMARY KEY (id)
//   CHECK clientes_tipo_check: CHECK ((tipo = ANY (ARRAY['vendedor'::text, 'comprador'::text, 'lead'::text])))
// Table: contratos
//   FOREIGN KEY contratos_cliente_id_fkey: FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT
//   FOREIGN KEY contratos_moto_id_fkey: FOREIGN KEY (moto_id) REFERENCES estoque_motos(id) ON DELETE RESTRICT
//   PRIMARY KEY contratos_pkey: PRIMARY KEY (id)
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
// Table: oficina_custos
//   FOREIGN KEY oficina_custos_moto_id_fkey: FOREIGN KEY (moto_id) REFERENCES estoque_motos(id) ON DELETE RESTRICT
//   PRIMARY KEY oficina_custos_pkey: PRIMARY KEY (id)
// Table: recibos_venda
//   FOREIGN KEY recibos_venda_contrato_id_fkey: FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE RESTRICT
//   PRIMARY KEY recibos_venda_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: agenda
//   Policy "Autenticados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_agenda" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "leitura_publica" (SELECT, PERMISSIVE) roles={public}
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
// Table: oficina_custos
//   Policy "Autenticados" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "authenticated_all_oficina_custos" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: recibos_venda
//   Policy "Autenticados escrita" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.role() = 'authenticated'::text)
//   Policy "Publico" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "authenticated_all_recibos_venda" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

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
