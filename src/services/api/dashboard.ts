import { dashboardService } from "../supabase/dashboard";
import { organizationService } from "../supabase/organizations";
import { supabase } from "@/integrations/supabase/client";
import type { DashboardStats, ChartDataPoint } from "../supabase/dashboard";

/**
 * API layer for dashboard
 */
export const dashboardApi = {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return dashboardService.getStats(membership.organization_id);
  },

  /**
   * Get chart data for last N days
   */
  async getChartData(days: number = 7): Promise<ChartDataPoint[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const membership = await organizationService.getMembership(user.id);
    if (!membership?.organization_id) {
      throw new Error("User has no organization");
    }

    return dashboardService.getChartData(membership.organization_id, days);
  },
};

