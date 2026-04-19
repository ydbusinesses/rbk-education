import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CustomerPurchase {
  order_id: string;
  bundle_slug: string;
  product_title: string;
  amount: number;
  currency: string;
  product_family: string;
  delivery_status: string;
  post_purchase_destination: string | null;
  order_date: string;
}

export interface CustomerAccess {
  entitlement_id: string;
  entitlement_type: string;
  bundle_slug: string | null;
  product_title: string;
  access_url: string | null;
  access_state: string;
  granted_at: string;
  expires_at: string | null;
}

export interface CustomerSubscription {
  subscription_id: string;
  plan_name: string;
  status: string;
  access_state: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  grace_until: string | null;
  failed_payment_count: number;
  amount: number;
  currency: string;
}

export interface CustomerInvoice {
  receipt_id: string;
  stripe_invoice_id: string | null;
  hosted_invoice_url: string | null;
  amount: number;
  currency: string;
  status: string;
  invoice_date: string;
}

export interface CustomerRecommendation {
  recommendation_id: string;
  recommendation_type: string;
  product_title: string;
  description: string | null;
  destination_url: string;
  bundle_slug: string | null;
  priority: number;
}

// Grace state display logic per spec
export function getGraceLabel(sub: CustomerSubscription): string {
  if (sub.access_state === "active") return "Active";
  if (sub.access_state === "payment_issue" && sub.grace_until) {
    const d = new Date(sub.grace_until).toLocaleDateString();
    return `Payment issue — access still active until ${d}`;
  }
  if (sub.access_state === "access_paused") return "Access paused — update billing to restore";
  if (sub.access_state === "canceled" && sub.current_period_end) {
    const d = new Date(sub.current_period_end).toLocaleDateString();
    return `Canceled — access remains until ${d}`;
  }
  if (sub.access_state === "expired") return "Expired";
  return sub.status;
}

export function useAccountData() {
  const purchases = useQuery({
    queryKey: ["customer-purchases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_customer_purchases" as any)
        .select("*")
        .order("order_date", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as CustomerPurchase[];
    },
  });

  const access = useQuery({
    queryKey: ["customer-access"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_customer_active_access" as any)
        .select("*")
        .order("granted_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as CustomerAccess[];
    },
  });

  const subscriptions = useQuery({
    queryKey: ["customer-subscriptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_customer_subscriptions" as any)
        .select("*");
      if (error) throw error;
      return (data || []) as unknown as CustomerSubscription[];
    },
  });

  const invoices = useQuery({
    queryKey: ["customer-invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_customer_invoices" as any)
        .select("*")
        .order("invoice_date", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as CustomerInvoice[];
    },
  });

  const recommendations = useQuery({
    queryKey: ["customer-recommendations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_customer_next_best_offer" as any)
        .select("*");
      if (error) throw error;
      return (data || []) as unknown as CustomerRecommendation[];
    },
  });

  return { purchases, access, subscriptions, invoices, recommendations };
}
