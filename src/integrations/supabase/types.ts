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
      access_tokens: {
        Row: {
          bundle_slug: string
          created_at: string
          email: string
          expires_at: string | null
          id: string
          issued_at: string
          revoked: boolean
          token: string
          used_at: string | null
          visitor_id: string
        }
        Insert: {
          bundle_slug: string
          created_at?: string
          email: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          revoked?: boolean
          token?: string
          used_at?: string | null
          visitor_id: string
        }
        Update: {
          bundle_slug?: string
          created_at?: string
          email?: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          revoked?: boolean
          token?: string
          used_at?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      customer_access_links: {
        Row: {
          created_at: string
          entitlement_id: string | null
          id: string
          label: string
          link_type: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entitlement_id?: string | null
          id?: string
          label: string
          link_type?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          entitlement_id?: string | null
          id?: string
          label?: string
          link_type?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_access_links_entitlement_id_fkey"
            columns: ["entitlement_id"]
            isOneToOne: false
            referencedRelation: "user_entitlements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_access_links_entitlement_id_fkey"
            columns: ["entitlement_id"]
            isOneToOne: false
            referencedRelation: "v_customer_active_access"
            referencedColumns: ["entitlement_id"]
          },
        ]
      }
      customer_recommendations: {
        Row: {
          bundle_slug: string | null
          created_at: string
          description: string | null
          destination_url: string
          dismissed: boolean
          id: string
          priority: number
          product_title: string
          recommendation_type: string
          user_id: string
        }
        Insert: {
          bundle_slug?: string | null
          created_at?: string
          description?: string | null
          destination_url: string
          dismissed?: boolean
          id?: string
          priority?: number
          product_title: string
          recommendation_type?: string
          user_id: string
        }
        Update: {
          bundle_slug?: string | null
          created_at?: string
          description?: string | null
          destination_url?: string
          dismissed?: boolean
          id?: string
          priority?: number
          product_title?: string
          recommendation_type?: string
          user_id?: string
        }
        Relationships: []
      }
      dunning_events: {
        Row: {
          created_at: string
          customer_portal_sent: boolean
          event_type: string
          grace_day: number | null
          id: string
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          customer_portal_sent?: boolean
          event_type: string
          grace_day?: number | null
          id?: string
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          customer_portal_sent?: boolean
          event_type?: string
          grace_day?: number | null
          id?: string
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dunning_events_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dunning_events_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "v_customer_subscriptions"
            referencedColumns: ["subscription_id"]
          },
        ]
      }
      journey_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          page_path: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          page_path?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          page_path?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      lead_captures: {
        Row: {
          created_at: string
          email: string
          funnel_slug: string
          id: string
          lead_magnet_type: string
          matched_bundle_slug: string | null
          name: string | null
          quiz_slug: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string
          email: string
          funnel_slug: string
          id?: string
          lead_magnet_type?: string
          matched_bundle_slug?: string | null
          name?: string | null
          quiz_slug?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string
          email?: string
          funnel_slug?: string
          id?: string
          lead_magnet_type?: string
          matched_bundle_slug?: string | null
          name?: string | null
          quiz_slug?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      nurture_queue: {
        Row: {
          action_type: Database["public"]["Enums"]["nurture_action"]
          created_at: string
          executed_at: string | null
          id: string
          payload: Json | null
          scheduled_for: string
          visitor_id: string
        }
        Insert: {
          action_type: Database["public"]["Enums"]["nurture_action"]
          created_at?: string
          executed_at?: string | null
          id?: string
          payload?: Json | null
          scheduled_for?: string
          visitor_id: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["nurture_action"]
          created_at?: string
          executed_at?: string | null
          id?: string
          payload?: Json | null
          scheduled_for?: string
          visitor_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          amount: number
          bundle_slug: string
          created_at: string
          currency: string
          id: string
          order_id: string
          product_title: string
        }
        Insert: {
          amount?: number
          bundle_slug: string
          created_at?: string
          currency?: string
          id?: string
          order_id: string
          product_title: string
        }
        Update: {
          amount?: number
          bundle_slug?: string
          created_at?: string
          currency?: string
          id?: string
          order_id?: string
          product_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "v_customer_purchases"
            referencedColumns: ["order_id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          currency: string
          delivery_status: Database["public"]["Enums"]["delivery_status"]
          fulfillment_status: string | null
          id: string
          post_purchase_destination: string | null
          product_family: Database["public"]["Enums"]["product_family"]
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          delivery_status?: Database["public"]["Enums"]["delivery_status"]
          fulfillment_status?: string | null
          id?: string
          post_purchase_destination?: string | null
          product_family?: Database["public"]["Enums"]["product_family"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          total_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          delivery_status?: Database["public"]["Enums"]["delivery_status"]
          fulfillment_status?: string | null
          id?: string
          post_purchase_destination?: string | null
          product_family?: Database["public"]["Enums"]["product_family"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pricing_families: {
        Row: {
          base_amount: number
          created_at: string
          currency: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          pricing_model: string
          slug: string
          updated_at: string
        }
        Insert: {
          base_amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          pricing_model?: string
          slug: string
          updated_at?: string
        }
        Update: {
          base_amount?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          pricing_model?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      products_catalog: {
        Row: {
          base_price: number
          created_at: string
          currency: string
          description: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          pricing_family_id: string | null
          product_family: Database["public"]["Enums"]["product_family"]
          slug: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          base_price?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          pricing_family_id?: string | null
          product_family?: Database["public"]["Enums"]["product_family"]
          slug: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          pricing_family_id?: string | null
          product_family?: Database["public"]["Enums"]["product_family"]
          slug?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_catalog_pricing_family_id_fkey"
            columns: ["pricing_family_id"]
            isOneToOne: false
            referencedRelation: "pricing_families"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          access_state: Database["public"]["Enums"]["access_state"]
          amount: number
          cancel_at_period_end: boolean
          created_at: string
          currency: string
          current_period_end: string | null
          current_period_start: string | null
          failed_payment_count: number
          grace_until: string | null
          id: string
          last_failed_invoice_at: string | null
          plan_name: string
          status: string
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_state?: Database["public"]["Enums"]["access_state"]
          amount?: number
          cancel_at_period_end?: boolean
          created_at?: string
          currency?: string
          current_period_end?: string | null
          current_period_start?: string | null
          failed_payment_count?: number
          grace_until?: string | null
          id?: string
          last_failed_invoice_at?: string | null
          plan_name: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_state?: Database["public"]["Enums"]["access_state"]
          amount?: number
          cancel_at_period_end?: boolean
          created_at?: string
          currency?: string
          current_period_end?: string | null
          current_period_start?: string | null
          failed_payment_count?: number
          grace_until?: string | null
          id?: string
          last_failed_invoice_at?: string | null
          plan_name?: string
          status?: string
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tax_receipts: {
        Row: {
          amount: number
          created_at: string
          currency: string
          hosted_invoice_url: string | null
          id: string
          invoice_date: string
          status: string
          stripe_invoice_id: string | null
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          hosted_invoice_url?: string | null
          id?: string
          invoice_date?: string
          status?: string
          stripe_invoice_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          hosted_invoice_url?: string | null
          id?: string
          invoice_date?: string
          status?: string
          stripe_invoice_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_entitlements: {
        Row: {
          access_state: Database["public"]["Enums"]["access_state"]
          access_url: string | null
          bundle_slug: string | null
          created_at: string
          entitlement_type: string
          expires_at: string | null
          granted_at: string
          id: string
          order_id: string | null
          product_title: string
          revoked_at: string | null
          user_id: string
        }
        Insert: {
          access_state?: Database["public"]["Enums"]["access_state"]
          access_url?: string | null
          bundle_slug?: string | null
          created_at?: string
          entitlement_type?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          order_id?: string | null
          product_title: string
          revoked_at?: string | null
          user_id: string
        }
        Update: {
          access_state?: Database["public"]["Enums"]["access_state"]
          access_url?: string | null
          bundle_slug?: string | null
          created_at?: string
          entitlement_type?: string
          expires_at?: string | null
          granted_at?: string
          id?: string
          order_id?: string | null
          product_title?: string
          revoked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_entitlements_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_entitlements_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "v_customer_purchases"
            referencedColumns: ["order_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitor_journeys: {
        Row: {
          access_link_issued_at: string | null
          access_link_used_at: string | null
          created_at: string
          current_stage: Database["public"]["Enums"]["journey_stage"]
          email: string | null
          engagement_score: number
          id: string
          last_bundle_slug: string | null
          last_page: string | null
          last_quiz_slug: string | null
          nurture_sequence_step: number
          quiz_progress: Json | null
          updated_at: string
          user_id: string | null
          visitor_id: string
        }
        Insert: {
          access_link_issued_at?: string | null
          access_link_used_at?: string | null
          created_at?: string
          current_stage?: Database["public"]["Enums"]["journey_stage"]
          email?: string | null
          engagement_score?: number
          id?: string
          last_bundle_slug?: string | null
          last_page?: string | null
          last_quiz_slug?: string | null
          nurture_sequence_step?: number
          quiz_progress?: Json | null
          updated_at?: string
          user_id?: string | null
          visitor_id: string
        }
        Update: {
          access_link_issued_at?: string | null
          access_link_used_at?: string | null
          created_at?: string
          current_stage?: Database["public"]["Enums"]["journey_stage"]
          email?: string | null
          engagement_score?: number
          id?: string
          last_bundle_slug?: string | null
          last_page?: string | null
          last_quiz_slug?: string | null
          nurture_sequence_step?: number
          quiz_progress?: Json | null
          updated_at?: string
          user_id?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_customer_active_access: {
        Row: {
          access_state: Database["public"]["Enums"]["access_state"] | null
          access_url: string | null
          bundle_slug: string | null
          entitlement_id: string | null
          entitlement_type: string | null
          expires_at: string | null
          granted_at: string | null
          product_title: string | null
          user_id: string | null
        }
        Insert: {
          access_state?: Database["public"]["Enums"]["access_state"] | null
          access_url?: string | null
          bundle_slug?: string | null
          entitlement_id?: string | null
          entitlement_type?: string | null
          expires_at?: string | null
          granted_at?: string | null
          product_title?: string | null
          user_id?: string | null
        }
        Update: {
          access_state?: Database["public"]["Enums"]["access_state"] | null
          access_url?: string | null
          bundle_slug?: string | null
          entitlement_id?: string | null
          entitlement_type?: string | null
          expires_at?: string | null
          granted_at?: string | null
          product_title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      v_customer_invoices: {
        Row: {
          amount: number | null
          currency: string | null
          hosted_invoice_url: string | null
          invoice_date: string | null
          receipt_id: string | null
          status: string | null
          stripe_invoice_id: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          currency?: string | null
          hosted_invoice_url?: string | null
          invoice_date?: string | null
          receipt_id?: string | null
          status?: string | null
          stripe_invoice_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          currency?: string | null
          hosted_invoice_url?: string | null
          invoice_date?: string | null
          receipt_id?: string | null
          status?: string | null
          stripe_invoice_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      v_customer_next_best_offer: {
        Row: {
          bundle_slug: string | null
          description: string | null
          destination_url: string | null
          priority: number | null
          product_title: string | null
          recommendation_id: string | null
          recommendation_type: string | null
          user_id: string | null
        }
        Insert: {
          bundle_slug?: string | null
          description?: string | null
          destination_url?: string | null
          priority?: number | null
          product_title?: string | null
          recommendation_id?: string | null
          recommendation_type?: string | null
          user_id?: string | null
        }
        Update: {
          bundle_slug?: string | null
          description?: string | null
          destination_url?: string | null
          priority?: number | null
          product_title?: string | null
          recommendation_id?: string | null
          recommendation_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      v_customer_purchases: {
        Row: {
          amount: number | null
          bundle_slug: string | null
          currency: string | null
          delivery_status: Database["public"]["Enums"]["delivery_status"] | null
          order_date: string | null
          order_id: string | null
          post_purchase_destination: string | null
          product_family: Database["public"]["Enums"]["product_family"] | null
          product_title: string | null
          user_id: string | null
        }
        Relationships: []
      }
      v_customer_subscriptions: {
        Row: {
          access_state: Database["public"]["Enums"]["access_state"] | null
          amount: number | null
          cancel_at_period_end: boolean | null
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          failed_payment_count: number | null
          grace_until: string | null
          plan_name: string | null
          status: string | null
          subscription_id: string | null
          user_id: string | null
        }
        Insert: {
          access_state?: Database["public"]["Enums"]["access_state"] | null
          amount?: number | null
          cancel_at_period_end?: boolean | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          failed_payment_count?: number | null
          grace_until?: string | null
          plan_name?: string | null
          status?: string | null
          subscription_id?: string | null
          user_id?: string | null
        }
        Update: {
          access_state?: Database["public"]["Enums"]["access_state"] | null
          amount?: number | null
          cancel_at_period_end?: boolean | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          failed_payment_count?: number | null
          grace_until?: string | null
          plan_name?: string | null
          status?: string | null
          subscription_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      consume_access_token: {
        Args: { _token: string }
        Returns: {
          already_used: boolean
          bundle_slug: string
          email: string
          valid: boolean
          visitor_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      access_state:
        | "active"
        | "payment_issue"
        | "access_paused"
        | "canceled"
        | "expired"
      app_role: "admin" | "user"
      delivery_status: "pending" | "fulfilled" | "failed"
      journey_stage:
        | "awareness"
        | "quiz_started"
        | "quiz_completed"
        | "product_viewed"
        | "purchased"
        | "access_issued"
        | "access_used"
        | "ascension_ready"
      nurture_action:
        | "email_nudge"
        | "product_reminder"
        | "ascension_invite"
        | "quiz_resume"
        | "sequence_next"
      product_family:
        | "mini_bundle"
        | "career_path_quiz"
        | "library_membership"
        | "certification_track"
        | "cohort_replay"
        | "bonus_templates"
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
    Enums: {
      access_state: [
        "active",
        "payment_issue",
        "access_paused",
        "canceled",
        "expired",
      ],
      app_role: ["admin", "user"],
      delivery_status: ["pending", "fulfilled", "failed"],
      journey_stage: [
        "awareness",
        "quiz_started",
        "quiz_completed",
        "product_viewed",
        "purchased",
        "access_issued",
        "access_used",
        "ascension_ready",
      ],
      nurture_action: [
        "email_nudge",
        "product_reminder",
        "ascension_invite",
        "quiz_resume",
        "sequence_next",
      ],
      product_family: [
        "mini_bundle",
        "career_path_quiz",
        "library_membership",
        "certification_track",
        "cohort_replay",
        "bonus_templates",
      ],
    },
  },
} as const
