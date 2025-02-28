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
      annotations: {
        Row: {
          content: Json
          created_at: string | null
          document_id: string | null
          id: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string | null
          document_id?: string | null
          id?: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string | null
          document_id?: string | null
          id?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "annotations_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content_type: string
          created_at: string | null
          file_path: string
          folder_id: string | null
          id: string
          name: string
          ocr_text: string | null
          size: number
          tags: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content_type: string
          created_at?: string | null
          file_path: string
          folder_id?: string | null
          id?: string
          name: string
          ocr_text?: string | null
          size: number
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content_type?: string
          created_at?: string | null
          file_path?: string
          folder_id?: string | null
          id?: string
          name?: string
          ocr_text?: string | null
          size?: number
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
        ]
      }
      dynamic_fields: {
        Row: {
          created_at: string | null
          default_value: string | null
          id: string
          name: string
          required: boolean | null
          template_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_value?: string | null
          id?: string
          name: string
          required?: boolean | null
          template_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_value?: string | null
          id?: string
          name?: string
          required?: boolean | null
          template_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dynamic_fields_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      folders: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      generated_documents: {
        Row: {
          created_at: string | null
          data: Json
          file_path: string
          id: string
          last_accessed_at: string | null
          status: string | null
          template_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          file_path: string
          id?: string
          last_accessed_at?: string | null
          status?: string | null
          template_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          file_path?: string
          id?: string
          last_accessed_at?: string | null
          status?: string | null
          template_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_documents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          content: string
          created_at: string | null
          description: string | null
          id: string
          is_current: boolean | null
          name: string
          updated_at: string | null
          user_id: string
          version: number | null
        }
        Insert: {
          content: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_current?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
          version?: number | null
        }
        Update: {
          content?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_current?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
          version?: number | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
