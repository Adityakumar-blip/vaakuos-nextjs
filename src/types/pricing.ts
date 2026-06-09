export interface PricingFeatureItem {
  code: string;
  label: string;
  description: string | null;
  value: boolean | number | string;
  display_value: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  /** Monthly amount in paise (e.g. 99900 = ₹999) */
  amount: number;
  currency: string;
  billing_interval: number;
  features: PricingFeatureItem[];
  isYearly: boolean;
  yearlyDiscount: number;
  /** 12 months with yearly discount applied, in paise */
  yearlyPrice: number;
  /** Per-month price with yearly discount applied, in paise */
  discountedMonthlyPrice: number;
}

export interface PricingAddon {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  currency: string;
  type: string;
  features: PricingFeatureItem[];
}

export interface PricingResponse {
  plans: {
    monthly: PricingPlan[];
    yearly: PricingPlan[];
  };
  addons: PricingAddon[];
  meta: {
    currency: string;
    fetched_at: string;
  };
}
