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
      deals: {
        Row: {
          description: string
          discount: number
          id: number
          image_url: string
          location: string
          member_price: number
          rating: number
          regular_price: number
          title: string
        }
        Insert: {
          description: string
          discount: number
          id?: number
          image_url: string
          location: string
          member_price: number
          rating: number
          regular_price: number
          title: string
        }
        Update: {
          description?: string
          discount?: number
          id?: number
          image_url?: string
          location?: string
          member_price?: number
          rating?: number
          regular_price?: number
          title?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          date: string | null
          email: string
          id: number
          name: string
          points: number
          type: string
        }
        Insert: {
          date?: string | null
          email: string
          id?: number
          name: string
          points: number
          type: string
        }
        Update: {
          date?: string | null
          email?: string
          id?: number
          name?: string
          points?: number
          type?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: string
          id: number
          last_modified: string | null
          title: string
          url: string
        }
        Insert: {
          content: string
          id?: number
          last_modified?: string | null
          title: string
          url: string
        }
        Update: {
          content?: string
          id?: number
          last_modified?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          currency: string
          id: number
          payment_methods: string
          site_tagline: string
          site_title: string
        }
        Insert: {
          currency: string
          id?: number
          payment_methods: string
          site_tagline: string
          site_title: string
        }
        Update: {
          currency?: string
          id?: number
          payment_methods?: string
          site_tagline?: string
          site_title?: string
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          description: string
          discount: number
          id: number
          image_url: string
          location: string
          member_price: number
          rating: number
          regular_price: number
          title: string
        }
        Insert: {
          description: string
          discount: number
          id?: number
          image_url: string
          location: string
          member_price: number
          rating: number
          regular_price: number
          title: string
        }
        Update: {
          description?: string
          discount?: number
          id?: number
          image_url?: string
          location?: string
          member_price?: number
          rating?: number
          regular_price?: number
          title?: string
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
