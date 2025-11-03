import { Database } from "@/integrations/supabase/types";

export type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
export type AppointmentInsert = Database["public"]["Tables"]["appointments"]["Insert"];
export type AppointmentUpdate = Database["public"]["Tables"]["appointments"]["Update"];

export interface CreateAppointmentFormData {
  title: string;
  description?: string;
  attendeeName: string;
  attendeePhone: string;
  attendeeEmail?: string;
  startTime: Date;
  endTime: Date;
  agentId: string;
  conversationId?: string;
}

export interface AppointmentFilters {
  status?: "scheduled" | "confirmed" | "canceled" | "completed";
  agentId?: string;
  startDate?: Date;
  endDate?: Date;
}

