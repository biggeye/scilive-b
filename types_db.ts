export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  models: {
    Tables: {
      outputs_detail: {
        Row: {
          description: string | null
          id: number
          parent_model: number | null
          validation_rules: string | null
          variable: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          parent_model?: number | null
          validation_rules?: string | null
          variable?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          parent_model?: number | null
          validation_rules?: string | null
          variable?: string | null
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
  predictions: {
    Tables: {
      items: {
        Row: {
          content_id: string
          prediction_id: string
          url: string | null
        }
        Insert: {
          content_id?: string
          prediction_id: string
          url?: string | null
        }
        Update: {
          content_id?: string
          prediction_id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "predictions_prediction_items_prediction_id_fkey"
            columns: ["prediction_id"]
            isOneToOne: false
            referencedRelation: "master"
            referencedColumns: ["prediction_id"]
          },
        ]
      }
      master: {
        Row: {
          content_id: string
          content_type: string | null
          created_at: string | null
          created_by: string | null
          is_public: boolean | null
          model_id: string | null
          name: string | null
          prediction_id: string
          prompt: string | null
          title: string | null
        }
        Insert: {
          content_id?: string
          content_type?: string | null
          created_at?: string | null
          created_by?: string | null
          is_public?: boolean | null
          model_id?: string | null
          name?: string | null
          prediction_id: string
          prompt?: string | null
          title?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string | null
          created_at?: string | null
          created_by?: string | null
          is_public?: boolean | null
          model_id?: string | null
          name?: string | null
          prediction_id?: string
          prompt?: string | null
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
  public: {
    Tables: {
      avatars: {
        Row: {
          created_by: string | null
          id: string
          name: string | null
          url: string | null
        }
        Insert: {
          created_by?: string | null
          id?: string
          name?: string | null
          url?: string | null
        }
        Update: {
          created_by?: string | null
          id?: string
          name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      img2img: {
        Row: {
          example: string | null
          friendlyname: string | null
          id: string
          inputtype: string | null
          name: string
          outputindex: number | null
          shortdesc: string | null
        }
        Insert: {
          example?: string | null
          friendlyname?: string | null
          id: string
          inputtype?: string | null
          name: string
          outputindex?: number | null
          shortdesc?: string | null
        }
        Update: {
          example?: string | null
          friendlyname?: string | null
          id?: string
          inputtype?: string | null
          name?: string
          outputindex?: number | null
          shortdesc?: string | null
        }
        Relationships: []
      }
      img2txt: {
        Row: {
          additionalparameters: Json | null
          example: string | null
          friendlyname: string | null
          id: string
          inputtype: string | null
          name: string
          shortdesc: string | null
        }
        Insert: {
          additionalparameters?: Json | null
          example?: string | null
          friendlyname?: string | null
          id: string
          inputtype?: string | null
          name: string
          shortdesc?: string | null
        }
        Update: {
          additionalparameters?: Json | null
          example?: string | null
          friendlyname?: string | null
          id?: string
          inputtype?: string | null
          name?: string
          shortdesc?: string | null
        }
        Relationships: []
      }
      master_content: {
        Row: {
          avatar_id: string | null
          cancel_url: string | null
          content: string | null
          content_id: string
          content_type: string | null
          created_at: string | null
          created_by: string
          is_public: boolean | null
          model_id: string | null
          name: string | null
          prediction_id: string | null
          progress_status: string | null
          prompt: string | null
          status: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          avatar_id?: string | null
          cancel_url?: string | null
          content?: string | null
          content_id?: string
          content_type?: string | null
          created_at?: string | null
          created_by: string
          is_public?: boolean | null
          model_id?: string | null
          name?: string | null
          prediction_id?: string | null
          progress_status?: string | null
          prompt?: string | null
          status?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          avatar_id?: string | null
          cancel_url?: string | null
          content?: string | null
          content_id?: string
          content_type?: string | null
          created_at?: string | null
          created_by?: string
          is_public?: boolean | null
          model_id?: string | null
          name?: string | null
          prediction_id?: string | null
          progress_status?: string | null
          prompt?: string | null
          status?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "master_content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      models_inputs_detail: {
        Row: {
          created_at: string
          default_value: string | null
          description: string | null
          input_id: string
          is_required: boolean | null
          parent_model: string | null
          parent_model_id: string
          validation_rules: string | null
          variable: string | null
        }
        Insert: {
          created_at?: string
          default_value?: string | null
          description?: string | null
          input_id?: string
          is_required?: boolean | null
          parent_model?: string | null
          parent_model_id: string
          validation_rules?: string | null
          variable?: string | null
        }
        Update: {
          created_at?: string
          default_value?: string | null
          description?: string | null
          input_id?: string
          is_required?: boolean | null
          parent_model?: string | null
          parent_model_id?: string
          validation_rules?: string | null
          variable?: string | null
        }
        Relationships: []
      }
      models_master: {
        Row: {
          created_at: string
          description: string | null
          friendly_name: string | null
          id: string
          model_type: string | null
          name: string | null
          outputs: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          friendly_name?: string | null
          id: string
          model_type?: string | null
          name?: string | null
          outputs?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          friendly_name?: string | null
          id?: string
          model_type?: string | null
          name?: string | null
          outputs?: Json | null
        }
        Relationships: []
      }
      prediction_content: {
        Row: {
          content_id: string
          prediction_id: string
          prediction_key: string | null
          url: string
        }
        Insert: {
          content_id?: string
          prediction_id: string
          prediction_key?: string | null
          url: string
        }
        Update: {
          content_id?: string
          prediction_id?: string
          prediction_key?: string | null
          url?: string
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tikapi: {
        Row: {
          access_token: string
          created_at: string
          created_by: string
          id: number
          scope: Json | null
        }
        Insert: {
          access_token: string
          created_at?: string
          created_by?: string
          id?: number
          scope?: Json | null
        }
        Update: {
          access_token?: string
          created_at?: string
          created_by?: string
          id?: number
          scope?: Json | null
        }
        Relationships: []
      }
      trained_models: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          image_data: Json | null
          model_id: string | null
          model_name: string | null
          number_of_images: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          image_data?: Json | null
          model_id?: string | null
          model_name?: string | null
          number_of_images: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          image_data?: Json | null
          model_id?: string | null
          model_name?: string | null
          number_of_images?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_trained_models_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      trained_models_images: {
        Row: {
          created_at: string
          id: number
          model_id: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          model_id?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          model_id?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_trained_models_images_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "trained_models"
            referencedColumns: ["model_id"]
          },
        ]
      }
      txt2img: {
        Row: {
          example: string | null
          friendlyname: string | null
          id: string
          name: string
          shortdesc: string | null
        }
        Insert: {
          example?: string | null
          friendlyname?: string | null
          id: string
          name: string
          shortdesc?: string | null
        }
        Update: {
          example?: string | null
          friendlyname?: string | null
          id?: string
          name?: string
          shortdesc?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          email: string | null
          full_name: string | null
          id: string
          payment_method: Json | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          email?: string | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          email?: string | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
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
      clean_expired_tokens: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
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
