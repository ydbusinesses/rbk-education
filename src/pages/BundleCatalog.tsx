import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  ArrowUpRight,
  Activity,
  Users,
  BarChart3,
  TrendingUp,
  Lock,
  Eye,
  Zap,
  ShieldCheck,
  BookOpen,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";

interface MetricData {
  label: string;
  description: string;
  numerator: number;
  denominator: number;
  rate: number;
}

interface DashboardData {
  metrics: Record<string, MetricData>;
  stageDistribution: Record<string, number>;
  totalVisitors: number;
  totalEvents: number;
  totalJourneys: number;
  recentEvents: {
    type: string;
    visitor: string;
    page: string;
    time: string;
    data: Record<string, unknown>;
  }[];
}

const metricIcons: Record<string, React.ElementType> = {
  funnelOptIn: Target,
  quizCompletion: BarChart3,
  offerConversion: TrendingUp,
  checkoutCompletion: ShieldCheck,
  deliveryFirstUse: Zap,
  contentCompletion: BookOpen,
  revisitRate: RefreshCw,
  ascensionCTR: Sparkles,
  ascensionPurchase: ArrowUpRight,
};

const metricOrder = [
  "funnelOptIn",
  "quizCompletion",
  "offerConversion",
  "checkoutCompletion",
  "deliveryFirstUse",
  "contentCompletion",
  "revisitRate",
  "ascensionCTR",
  "ascensionPurchase",
];

const stageLabels: Record<string, string> = {
  awareness: "Awareness",
  quiz_started: "Quiz Started",
  quiz_completed: "Quiz Completed",
  product_viewed: "Product Viewed",
  purchased: "Purchased",
  access_issued: "Access Issued",
  access_used: "Access Used",
  ascension_ready: "Ascension Ready",
};

const eventLabels: Record<string, string> = {
  page_view: "Page View",
  lead_captured: "Lead Captured",
  stage_quiz_started: "Quiz Started",
  quiz_answer: "Quiz Answer",
  stage_quiz_completed: "Quiz Completed",
  bundle_viewed: "Bundle Viewed",
  checkout_initiated: "Checkout",
  purchase_completed: "Purchase",
  library_accessed: "Library Access",
  module_started: "Module Start",
  resource_downloaded: "Download",
  stage_product_viewed: "Product Viewed",
  stage_purchased: "Purchased",
  stage_access_used: "Access Used",
};

const AdminDashboard = () => {
  const [authChecking, setAuthChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAdmin = async (userId: string) => {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return !!roleData;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          checkAdmin(session.user.id).then((admin) => {
            setIsAdmin(admin);
            setAuthChecking(false);
          });
        } else {
          setIsAdmin(false);
          setAuthChecking(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkAdmin(session.user.id).then((admin) => {
          setIsAdmin(admin);
          setAuthChecking(false);
        });
      } else {
        setAuthChecking(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setAuthError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      setAuthError(signInError.message);
    }
    setSigningIn(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const loadMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke(
        "admin-metrics"
      );
      if (fnError) throw fnError;
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to load metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadMetrics();
  }, [isAdmin]);

  if (authChecking) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="max-w-sm mx-auto px-5 py-20 text-center">
          <Activity className="w-8 h-8 text-primary mx-auto mb-3 animate-pulse" />
          <p className="text-muted-foreground">Checking access...</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="max-w-sm mx-auto px-5 py-20">
          <div className="rounded-3xl border border-border bg-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-5">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-serif text-2xl text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Sign in with an admin account to access analytics.
            </p>
            <form onSubmit={handleSignIn} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {authError && (
                <p className="text-xs text-destructive">{authError}</p>
              )}
              <button
                type="submit"
                disabled={signingIn}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {signingIn ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-foreground">Funnel Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Real-time conversion metrics across the Calvera customer journey.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadMetrics}
              disabled={loading}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-sage-soft hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-full transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-full transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 mb-6 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading && !data && (
          <div className="text-center py-20">
            <Activity className="w-8 h-8 text-primary mx-auto mb-3 animate-pulse" />
            <p className="text-muted-foreground">Loading metrics...</p>
          </div>
        )}

        {data && (
          <>
            {/* Summary strip */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Visitors", value: data.totalVisitors, icon: Users },
                { label: "Total Events", value: data.totalEvents, icon: Activity },
                { label: "Active Journeys", value: data.totalJourneys, icon: Eye },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{value.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {metricOrder.map((key) => {
                const metric = data.metrics[key];
                if (!metric) return null;
                const Icon = metricIcons[key] || BarChart3;
                const isGood = metric.rate >= 50;
                const isMid = metric.rate >= 20 && metric.rate < 50;

                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-border bg-card p-5 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-sage-soft flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{metric.label}</h3>
                      </div>
                    </div>

                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-bold text-foreground">
                        {metric.rate}%
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          isGood
                            ? "bg-sage-soft text-primary"
                            : isMid
                            ? "bg-peach-soft text-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {isGood ? "Strong" : isMid ? "Average" : "Low"}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">{metric.description}</p>

                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isGood ? "bg-primary" : isMid ? "bg-accent" : "bg-muted-foreground/40"
                        }`}
                        style={{ width: `${Math.min(metric.rate, 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{metric.numerator} converted</span>
                      <span>{metric.denominator} total</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stage distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  Journey Stage Distribution
                </h2>
                <div className="space-y-3">
                  {Object.entries(stageLabels).map(([key, label]) => {
                    const count = data.stageDistribution[key] || 0;
                    const max = Math.max(...Object.values(data.stageDistribution), 1);
                    const pct = (count / max) * 100;

                    return (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground font-medium">{label}</span>
                          <span className="text-muted-foreground">{count}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent activity */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {data.recentEvents.map((event, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-foreground">
                            {eventLabels[event.type] || event.type}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {event.page}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-mono">{event.visitor}</span>
                          <span>
                            {new Date(event.time).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {data.recentEvents.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No events recorded yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
};

export default AdminDashboard;
