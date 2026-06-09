import { apiClient } from "@/lib/api-client";
import { PricingResponse } from "@/types/pricing";

export const pricingService = {
  getPricing: async (): Promise<PricingResponse> => {
    const response = await apiClient.get<PricingResponse>("/public/pricing");
    return response.data;
  },
};
