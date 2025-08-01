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
      blogs: {
        Row: {
          content: string
          excerpt: string
          id: number
          image_url: string
          last_modified: string | null
          slug: string
          title: string
        }
        Insert: {
          content: string
          excerpt: string
          id?: number
          image_url: string
          last_modified?: string | null
          slug: string
          title: string
        }
        Update: {
          content?: string
          excerpt?: string
          id?: number
          image_url?: string
          last_modified?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          amount: number
          check_in_date: string
          check_out_date: string
          created_at: string | null
          deal_id: number | null
          deal_title: string
          email: string
          guests: number
          id: number
          name: string
          phone: string
          status: string
        }
        Insert: {
          amount: number
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          deal_id?: number | null
          deal_title: string
          email: string
          guests: number
          id?: number
          name: string
          phone: string
          status: string
        }
        Update: {
          amount?: number
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          deal_id?: number | null
          deal_title?: string
          email?: string
          guests?: number
          id?: number
          name?: string
          phone?: string
          status?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          created_at: string
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
          created_at?: string
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
          created_at?: string
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
      deals_backup: {
        Row: {
          description: string | null
          discount: number | null
          id: number | null
          image_url: string | null
          location: string | null
          member_price: number | null
          rating: number | null
          regular_price: number | null
          title: string | null
        }
        Insert: {
          description?: string | null
          discount?: number | null
          id?: number | null
          image_url?: string | null
          location?: string | null
          member_price?: number | null
          rating?: number | null
          regular_price?: number | null
          title?: string | null
        }
        Update: {
          description?: string | null
          discount?: number | null
          id?: number | null
          image_url?: string | null
          location?: string | null
          member_price?: number | null
          rating?: number | null
          regular_price?: number | null
          title?: string | null
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
      members_backup: {
        Row: {
          date: string | null
          email: string | null
          id: number | null
          name: string | null
          points: number | null
          type: string | null
        }
        Insert: {
          date?: string | null
          email?: string | null
          id?: number | null
          name?: string | null
          points?: number | null
          type?: string | null
        }
        Update: {
          date?: string | null
          email?: string | null
          id?: number | null
          name?: string | null
          points?: number | null
          type?: string | null
        }
        Relationships: []
      }
      membership_features: {
        Row: {
          feature: string
          id: number
          included: boolean
          membership_type: string
        }
        Insert: {
          feature: string
          id?: number
          included?: boolean
          membership_type: string
        }
        Update: {
          feature?: string
          id?: number
          included?: boolean
          membership_type?: string
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
      pages_backup: {
        Row: {
          content: string | null
          id: number | null
          last_modified: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          content?: string | null
          id?: number | null
          last_modified?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          content?: string | null
          id?: number | null
          last_modified?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          currency: string
          gold_price: number | null
          id: number
          payment_methods: string
          platinum_price: number | null
          silver_price: number | null
          site_tagline: string
          site_title: string
        }
        Insert: {
          currency: string
          gold_price?: number | null
          id?: number
          payment_methods: string
          platinum_price?: number | null
          silver_price?: number | null
          site_tagline: string
          site_title: string
        }
        Update: {
          currency?: string
          gold_price?: number | null
          id?: number
          payment_methods?: string
          platinum_price?: number | null
          silver_price?: number | null
          site_tagline?: string
          site_title?: string
        }
        Relationships: []
      }
      settings_backup: {
        Row: {
          currency: string | null
          gold_price: number | null
          id: number | null
          payment_methods: string | null
          platinum_price: number | null
          silver_price: number | null
          site_tagline: string | null
          site_title: string | null
        }
        Insert: {
          currency?: string | null
          gold_price?: number | null
          id?: number | null
          payment_methods?: string | null
          platinum_price?: number | null
          silver_price?: number | null
          site_tagline?: string | null
          site_title?: string | null
        }
        Update: {
          currency?: string | null
          gold_price?: number | null
          id?: number | null
          payment_methods?: string | null
          platinum_price?: number | null
          silver_price?: number | null
          site_tagline?: string | null
          site_title?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar: string
          content: string
          id: number
          name: string
          rating: number
          role: string
        }
        Insert: {
          avatar: string
          content: string
          id?: number
          name: string
          rating: number
          role: string
        }
        Update: {
          avatar?: string
          content?: string
          id?: number
          name?: string
          rating?: number
          role?: string
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          created_at: string
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
          created_at?: string
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
          created_at?: string
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
      tour_packages_backup: {
        Row: {
          description: string | null
          discount: number | null
          id: number | null
          image_url: string | null
          location: string | null
          member_price: number | null
          rating: number | null
          regular_price: number | null
          title: string | null
        }
        Insert: {
          description?: string | null
          discount?: number | null
          id?: number | null
          image_url?: string | null
          location?: string | null
          member_price?: number | null
          rating?: number | null
          regular_price?: number | null
          title?: string | null
        }
        Update: {
          description?: string | null
          discount?: number | null
          id?: number | null
          image_url?: string | null
          location?: string | null
          member_price?: number | null
          rating?: number | null
          regular_price?: number | null
          title?: string | null
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
