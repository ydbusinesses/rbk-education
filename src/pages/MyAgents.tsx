import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, ShoppingBag } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/hooks/useAuth";
import { useAccountData } from "@/hooks/useAccountData";
import AuthGate from "@/components/dashboard/AuthGate";

const MyAgents = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { purchases, access } = useAccountData();

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
  const activeAccess = access.data?.filter((a) => a.access_state === "active") || [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-5 py-8 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground">My Account</h1>
            <button
              onClick={signOut}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </div>
          <p className="text-muted-foreground text-base mt-1">
            Your active bundles and learning progress — all in one place.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs font-medium bg-peach-soft text-foreground px-3 py-1 rounded-full">
              {purchaseCount} bundles purchased
            </span>
            <span className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
              {activeAccess.length} active access
            </span>
          </div>
        </motion.div>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-serif text-2xl text-foreground">Active Bundles</h2>
          </div>
          {activeAccess.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">No active bundles yet.</p>
              <Link
                to="/bundles"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                Browse Bundles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeAccess.map((item) => (
                <div
                  key={item.entitlement_id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{item.product_title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.entitlement_type.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-sage-soft text-primary">
                      Active
                    </span>
                    {item.access_url && (
                      <Link
                        to={item.access_url}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Open →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link to="/account" className="rounded-xl border border-border bg-card p-4 text-center hover:border-primary/30 transition-colors">
            <p className="text-sm font-medium text-foreground">Account & Billing</p>
            <p className="text-xs text-muted-foreground">Purchases, invoices, subscriptions</p>
          </Link>
          <Link to="/calvera-next-step" className="rounded-xl border border-border bg-card p-4 text-center hover:border-primary/30 transition-colors">
            <p className="text-sm font-medium text-foreground">Calvera Next Step</p>
            <p className="text-xs text-muted-foreground">Your ascension pathway</p>
          </Link>
          <Link to="/bundles" className="rounded-xl border border-border bg-card p-4 text-center hover:border-primary/30 transition-colors">
            <p className="text-sm font-medium text-foreground">Browse More Bundles</p>
            <p className="text-xs text-muted-foreground">50 bundles across 10 categories</p>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default MyAgents;
