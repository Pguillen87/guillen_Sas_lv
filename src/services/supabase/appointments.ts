import { supabase } from "@/integrations/supabase/client";
import type {
  Appointment,
  AppointmentInsert,
  AppointmentUpdate,
  AppointmentFilters,
} from "@/types";

export const appointmentService = {
  /**
   * Get all appointments for organization with filters
   */
  async getAll(organizationId: string, filters?: AppointmentFilters) {
    let query = supabase
      .from("appointments")
      .select(`
        *,
        agent:agents(id, name),
        conversation:conversations(id)
      `)
      .eq("agent.organization_id", organizationId)
      .order("start_time", { ascending: true });

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    if (filters?.agentId) {
      query = query.eq("agent_id", filters.agentId);
    }

    if (filters?.startDate) {
      query = query.gte("start_time", filters.startDate.toISOString());
    }

    if (filters?.endDate) {
      query = query.lte("start_time", filters.endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  /**
   * Get appointments for a date range
   */
  async getByDateRange(organizationId: string, startDate: Date, endDate: Date) {
    // Get agents for organization first
    const { data: agents } = await supabase
      .from("agents")
      .select("id")
      .eq("organization_id", organizationId);

    if (!agents || agents.length === 0) return [];

    const agentIds = agents.map((a) => a.id);

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .in("agent_id", agentIds)
      .gte("start_time", startDate.toISOString())
      .lte("start_time", endDate.toISOString())
      .order("start_time", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get appointment by ID
   */
  async getById(appointmentId: string, organizationId: string) {
    // First verify the agent belongs to organization
    const { data: appointment, error } = await supabase
      .from("appointments")
      .select(`
        *,
        agent:agents!inner(id, organization_id)
      `)
      .eq("id", appointmentId)
      .eq("agent.organization_id", organizationId)
      .single();

    if (error) throw error;
    return appointment;
  },

  /**
   * Create appointment
   */
  async create(appointment: AppointmentInsert) {
    const { data, error } = await supabase
      .from("appointments")
      .insert(appointment)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update appointment
   */
  async update(
    appointmentId: string,
    updates: AppointmentUpdate,
    organizationId: string
  ) {
    // Verify organization ownership through agent
    const { data: existing } = await this.getById(appointmentId, organizationId);
    if (!existing) {
      throw new Error("Appointment not found or access denied");
    }

    const { data, error } = await supabase
      .from("appointments")
      .update(updates)
      .eq("id", appointmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete appointment
   */
  async delete(appointmentId: string, organizationId: string) {
    // Verify organization ownership
    const existing = await this.getById(appointmentId, organizationId);
    if (!existing) {
      throw new Error("Appointment not found or access denied");
    }

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", appointmentId);

    if (error) throw error;
  },
};

