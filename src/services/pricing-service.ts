import { apiClient } from "@/lib/api-client";
import { PricingPlan } from "@/types/pricing";

export const pricingService = {
  getPlans: async (): Promise<PricingPlan[]> => {
    const response = await apiClient.get<PricingPlan[]>("/subscriptions/plans");
    return response.data;
  },
};
