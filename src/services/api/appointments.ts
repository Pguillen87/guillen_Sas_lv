import { appointmentService } from "../supabase/appointments";
import { organizationService } from "../supabase/organizations";
import type {
  Appointment,
  AppointmentInsert,
  AppointmentUpdate,
  AppointmentFilters,
} from "@/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * API layer for appointments
 */
export const appointmentsApi = {
  /**
   * Get all appointments for current user's organization
   */
  async getAll(filters?: AppointmentFilters): Promise<Appointment[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return appointmentService.getAll(membership.organization_id, filters);
  },

  /**
   * Get appointments for a date range
   */
  async getByDateRange(startDate: Date, endDate: Date) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return appointmentService.getByDateRange(
      membership.organization_id,
      startDate,
      endDate
    );
  },

  /**
   * Get appointment by ID
   */
  async getById(appointmentId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return appointmentService.getById(appointmentId, membership.organization_id);
  },

  /**
   * Create appointment
   */
  async create(appointment: AppointmentInsert) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Verify agent belongs to user's organization
    const { agentsApi } = await import("./agents");
    await agentsApi.getById(appointment.agent_id);

    return appointmentService.create(appointment);
  },

  /**
   * Update appointment
   */
  async update(appointmentId: string, updates: AppointmentUpdate) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return appointmentService.update(
      appointmentId,
      updates,
      membership.organization_id
    );
  },

  /**
   * Delete appointment
   */
  async delete(appointmentId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return appointmentService.delete(appointmentId, membership.organization_id);
  },
};

