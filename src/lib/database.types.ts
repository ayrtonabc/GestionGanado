export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      animal_moves: {
        Row: {
          animal_id: number | null
          created_at: string
          from_barn_id: number | null
          id: number
          to_barn_id: number | null
        }
        Insert: {
          animal_id?: number | null
          created_at?: string
          from_barn_id?: number | null
          id?: number
          to_barn_id?: number | null
        }
        Update: {
          animal_id?: number | null
          created_at?: string
          from_barn_id?: number | null
          id?: number
          to_barn_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "animal_movements_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "animal_movements_from_barn_id_fkey"
            columns: ["from_barn_id"]
            isOneToOne: false
            referencedRelation: "barns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "animal_movements_to_barn_id_fkey"
            columns: ["to_barn_id"]
            isOneToOne: false
            referencedRelation: "barns"
            referencedColumns: ["id"]
          },
        ]
      }
      animal_types: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      animals: {
        Row: {
          animal_type_id: number | null
          barn_id: number | null
          birth_weight: number | null
          birthday: string | null
          created_at: string
          earring_id: string | null
          farmer_id: number | null
          id: number
          name: string | null
          secondary_id: string | null
        }
        Insert: {
          animal_type_id?: number | null
          barn_id?: number | null
          birth_weight?: number | null
          birthday?: string | null
          created_at?: string
          earring_id?: string | null
          farmer_id?: number | null
          id?: number
          name?: string | null
          secondary_id?: string | null
        }
        Update: {
          animal_type_id?: number | null
          barn_id?: number | null
          birth_weight?: number | null
          birthday?: string | null
          created_at?: string
          earring_id?: string | null
          farmer_id?: number | null
          id?: number
          name?: string | null
          secondary_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "animals_animal_type_id_fkey"
            columns: ["animal_type_id"]
            isOneToOne: false
            referencedRelation: "animal_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "animals_barn_id_fkey"
            columns: ["barn_id"]
            isOneToOne: false
            referencedRelation: "barns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "animals_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      barns: {
        Row: {
          barn_number: string | null
          created_at: string
          farmer_id: number | null
          id: number
          location_id: number | null
          name: string | null
        }
        Insert: {
          barn_number?: string | null
          created_at?: string
          farmer_id?: number | null
          id?: number
          location_id?: number | null
          name?: string | null
        }
        Update: {
          barn_number?: string | null
          created_at?: string
          farmer_id?: number | null
          id?: number
          location_id?: number | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "barns_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      farmers: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          farmer_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          farmer_id?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          farmer_id?: number | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      milk_productions: {
        Row: {
          animal_id: number
          created_at: string
          id: number
          liters: number
        }
        Insert: {
          animal_id: number
          created_at?: string
          id?: number
          liters: number
        }
        Update: {
          animal_id?: number
          created_at?: string
          id?: number
          liters?: number
        }
        Relationships: [
          {
            foreignKeyName: "milk_production_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
