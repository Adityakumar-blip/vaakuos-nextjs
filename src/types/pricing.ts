export interface PricingFeatureItem {
  code: string;
  label: string;
  description: string;
  value: boolean | number | string;
  display_value: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  billing_cycle: "monthly" | "yearly";
  features: PricingFeatureItem[];
  razorpay_plan_id?: string;
  is_published?: boolean;
  subtitle?: string;
  isYearly?: boolean;
  yearlyDiscount?: number;
  yearlyPrice?: number;
  discountedMonthlyPrice?: number;
}
