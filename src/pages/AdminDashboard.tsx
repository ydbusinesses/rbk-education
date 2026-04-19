import { useAuth } from "@/hooks/useAuth";
import { useAccountData } from "@/hooks/useAccountData";
import { createBillingPortalSession } from "@/lib/api";
import ContinueSection from "@/components/dashboard/ContinueSection";
import RecommendedSection from "@/components/dashboard/RecommendedSection";
import PurchasesSection from "@/components/dashboard/PurchasesSection";
import ActiveAccessSection from "@/components/dashboard/ActiveAccessSection";
import BillingSection from "@/components/dashboard/BillingSection";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AuthGate from "@/components/dashboard/AuthGate";
import { mockContinueItems } from "@/lib/mock-data";

const AccountDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { purchases, access, subscriptions, invoices, recommendations } = useAccountData();

  const handleManageBilling = async () => {
    if (!user) return;
    try {
      const { portal_url } = await createBillingPortalSession(user.id);
      window.location.href = portal_url;
    } catch (err) {
      console.error("Billing portal failed:", err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="max-w-md mx-auto px-5 py-16">
          <AuthGate />
        </main>
        <SiteFooter />
      </div>
    );
  }

  const purchaseCount = purchases.data?.length || 0;
  const activeCount = access.data?.filter((a) => a.access_state === "active").length || 0;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-5 py-8 space-y-10">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-1">Your Account</h2>
            <button
              onClick={signOut}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </div>
          <p className="text-muted-foreground text-base">
            Your AI Mini-Learner Bundles, active access, and billing — all in one calm place.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs font-medium bg-peach-soft text-foreground px-3 py-1 rounded-full">
              {purchaseCount} bundles purchased
            </span>
            <span className="text-xs font-medium bg-sage-soft text-primary px-3 py-1 rounded-full">
              {activeCount} active access
            </span>
            <span className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
              All bundles $47 · $200+ value each
            </span>
          </div>
        </div>

        <ContinueSection items={mockContinueItems} />
        <RecommendedSection
          items={recommendations.data || []}
          isLoading={recommendations.isLoading}
        />
        <ActiveAccessSection
          items={access.data || []}
          isLoading={access.isLoading}
        />
        <PurchasesSection
          purchases={purchases.data || []}
          isLoading={purchases.isLoading}
        />
        <BillingSection
          subscriptions={subscriptions.data || []}
          invoices={invoices.data || []}
          isLoading={subscriptions.isLoading || invoices.isLoading}
          onManageBilling={handleManageBilling}
        />
      </main>

      <SiteFooter />
    </div>
  );
};

export default AccountDashboard;
