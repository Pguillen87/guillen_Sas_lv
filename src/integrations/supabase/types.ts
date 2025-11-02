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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agent_configurations: {
        Row: {
          agent_id: string
          created_at: string
          custom_prompt: string | null
          id: string
          max_tokens: number | null
          personality: Json | null
          settings: Json | null
          temperature: number | null
          updated_at: string
        }
        Insert: {
          agent_id: string
          created_at?: string
          custom_prompt?: string | null
          id?: string
          max_tokens?: number | null
          personality?: Json | null
          settings?: Json | null
          temperature?: number | null
          updated_at?: string
        }
        Update: {
          agent_id?: string
          created_at?: string
          custom_prompt?: string | null
          id?: string
          max_tokens?: number | null
          personality?: Json | null
          settings?: Json | null
          temperature?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_configurations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: true
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_connections: {
        Row: {
          agent_id: string
          connection_type: string
          created_at: string
          credentials_encrypted: string
          id: string
          is_active: boolean | null
          last_tested_at: string | null
          metadata: Json | null
          updated_at: string
        }
        Insert: {
          agent_id: string
          connection_type: string
          created_at?: string
          credentials_encrypted: string
          id?: string
          is_active?: boolean | null
          last_tested_at?: string | null
          metadata?: Json | null
          updated_at?: string
        }
        Update: {
          agent_id?: string
          connection_type?: string
          created_at?: string
          credentials_encrypted?: string
          id?: string
          is_active?: boolean | null
          last_tested_at?: string | null
          metadata?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_connections_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_supervisor: {
        Row: {
          created_at: string
          id: string
          intervention_threshold: number | null
          is_enabled: boolean | null
          organization_id: string
          rules: Json | null
          supervisor_agent_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          intervention_threshold?: number | null
          is_enabled?: boolean | null
          organization_id: string
          rules?: Json | null
          supervisor_agent_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          intervention_threshold?: number | null
          is_enabled?: boolean | null
          organization_id?: string
          rules?: Json | null
          supervisor_agent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_supervisor_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_supervisor_supervisor_agent_id_fkey"
            columns: ["supervisor_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_templates: {
        Row: {
          base_prompt: string
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_public: boolean | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          base_prompt: string
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          base_prompt?: string
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          avatar_url: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          openai_agent_id: string | null
          organization_id: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          openai_agent_id?: string | null
          organization_id: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          openai_agent_id?: string | null
          organization_id?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "agent_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          agent_id: string
          attendee_email: string | null
          attendee_name: string
          attendee_phone: string
          conversation_id: string | null
          created_at: string
          description: string | null
          end_time: string
          google_calendar_event_id: string | null
          id: string
          reminder_sent: boolean | null
          start_time: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          attendee_email?: string | null
          attendee_name: string
          attendee_phone: string
          conversation_id?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          google_calendar_event_id?: string | null
          id?: string
          reminder_sent?: boolean | null
          start_time: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          attendee_email?: string | null
          attendee_name?: string
          attendee_phone?: string
          conversation_id?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          google_calendar_event_id?: string | null
          id?: string
          reminder_sent?: boolean | null
          start_time?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          id: string
          ip_address: string | null
          organization_id: string | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          organization_id?: string | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          organization_id?: string | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_sync: {
        Row: {
          agent_id: string
          created_at: string
          google_calendar_id: string
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          metadata: Json | null
          sync_token: string | null
          updated_at: string
        }
        Insert: {
          agent_id: string
          created_at?: string
          google_calendar_id: string
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          metadata?: Json | null
          sync_token?: string | null
          updated_at?: string
        }
        Update: {
          agent_id?: string
          created_at?: string
          google_calendar_id?: string
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          metadata?: Json | null
          sync_token?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_sync_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          agent_id: string
          contact_name: string | null
          created_at: string
          id: string
          last_message_at: string | null
          metadata: Json | null
          status: string | null
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          agent_id: string
          contact_name?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          metadata?: Json | null
          status?: string | null
          updated_at?: string
          whatsapp_number: string
        }
        Update: {
          agent_id?: string
          contact_name?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          metadata?: Json | null
          status?: string | null
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_reports: {
        Row: {
          generated_at: string
          id: string
          metrics: Json
          organization_id: string
          report_date: string
          sent_at: string | null
        }
        Insert: {
          generated_at?: string
          id?: string
          metrics: Json
          organization_id: string
          report_date: string
          sent_at?: string | null
        }
        Update: {
          generated_at?: string
          id?: string
          metrics?: Json
          organization_id?: string
          report_date?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_reports_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          attempts: number | null
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          job_type: string
          max_attempts: number | null
          payload: Json | null
          result: Json | null
          scheduled_at: string | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_type: string
          max_attempts?: number | null
          payload?: Json | null
          result?: Json | null
          scheduled_at?: string | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_type?: string
          max_attempts?: number | null
          payload?: Json | null
          result?: Json | null
          scheduled_at?: string | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      message_analytics: {
        Row: {
          created_at: string
          entities: Json | null
          id: string
          intent: string | null
          message_id: string
          sentiment: string | null
          sentiment_score: number | null
        }
        Insert: {
          created_at?: string
          entities?: Json | null
          id?: string
          intent?: string | null
          message_id: string
          sentiment?: string | null
          sentiment_score?: number | null
        }
        Update: {
          created_at?: string
          entities?: Json | null
          id?: string
          intent?: string | null
          message_id?: string
          sentiment?: string | null
          sentiment_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "message_analytics_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          agent_id: string
          content: string
          conversation_id: string
          delivered_at: string | null
          direction: string
          id: string
          message_type: string | null
          metadata: Json | null
          read_at: string | null
          sent_at: string
          whatsapp_message_id: string | null
        }
        Insert: {
          agent_id: string
          content: string
          conversation_id: string
          delivered_at?: string | null
          direction: string
          id?: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          sent_at?: string
          whatsapp_message_id?: string | null
        }
        Update: {
          agent_id?: string
          content?: string
          conversation_id?: string
          delivered_at?: string | null
          direction?: string
          id?: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          sent_at?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_services: {
        Row: {
          agreed_price: number | null
          created_at: string
          custom_requirements: string | null
          delivered_at: string | null
          delivery_date: string | null
          id: string
          metadata: Json | null
          notes: string | null
          organization_id: string
          service_type_id: string
          start_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          agreed_price?: number | null
          created_at?: string
          custom_requirements?: string | null
          delivered_at?: string | null
          delivery_date?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          organization_id: string
          service_type_id: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          agreed_price?: number | null
          created_at?: string
          custom_requirements?: string | null
          delivered_at?: string | null
          delivery_date?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          organization_id?: string
          service_type_id?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_services_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_services_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          slug: string
          status: string | null
          subscription_plan_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          slug: string
          status?: string | null
          subscription_plan_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          slug?: string
          status?: string | null
          subscription_plan_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      report_recipients: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean | null
          organization_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean | null
          organization_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean | null
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_recipients_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      service_milestones: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          name: string
          order_index: number
          organization_service_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          order_index: number
          organization_service_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          order_index?: number
          organization_service_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_milestones_organization_service_id_fkey"
            columns: ["organization_service_id"]
            isOneToOne: false
            referencedRelation: "organization_services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types: {
        Row: {
          base_price: number
          category: string
          created_at: string
          description: string | null
          estimated_delivery_days: number | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          base_price: number
          category: string
          created_at?: string
          description?: string | null
          estimated_delivery_days?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          category?: string
          created_at?: string
          description?: string | null
          estimated_delivery_days?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          max_agents: number | null
          max_messages_per_month: number | null
          name: string
          price_monthly: number
          price_yearly: number | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_agents?: number | null
          max_messages_per_month?: number | null
          name: string
          price_monthly: number
          price_yearly?: number | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_agents?: number | null
          max_messages_per_month?: number | null
          name?: string
          price_monthly?: number
          price_yearly?: number | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          organization_id: string
          plan_id: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          organization_id: string
          plan_id: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          organization_id?: string
          plan_id?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          agent_id: string | null
          created_at: string
          event_type: string
          id: string
          is_active: boolean | null
          organization_id: string | null
          secret: string | null
          updated_at: string
          url: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          is_active?: boolean | null
          organization_id?: string | null
          secret?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          is_active?: boolean | null
          organization_id?: string | null
          secret?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "webhooks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
