import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, TrendingUp, Briefcase, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { catalog, getCategoryLabel } from "@/lib/mock-data";
import { useLuauMini } from "@/hooks/useLuauMini";
import { createCheckoutSession, logContentEvent } from "@/lib/api";
import { getVisitorId } from "@/lib/visitor";

// Priority funnels mapped to quiz slugs
const quizMap: Record<string, string> = {
  "ai-automation-rescue": "automation-readiness",
  "agentic-ai-career-insurance": "ai-career-risk",
  "well-being-leadership": "team-burnout-risk",
  "negotiation-power": "pay-gap",
};

const BundleLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const bundle = catalog.find((b) => b.slug === slug);
  const { updateStage, journey } = useLuauMini();
  const visitorId = getVisitorId();

  // Track product_viewed event via FastAPI
  useEffect(() => {
    if (!bundle || !slug) return;
    const shouldUpdate = !journey || ["awareness", "quiz_started", "quiz_completed"].includes(journey.current_stage);
    if (shouldUpdate) {
      updateStage("product_viewed", { last_bundle_slug: slug });
    }

    logContentEvent({
      visitor_id: visitorId,
      event_type: "bundle_viewed",
      event_data: { bundle_slug: slug, bundle_id: bundle.id, bundle_title: bundle.title },
      page_path: `/bundles/${slug}`,
    }).catch((err) => console.error("Event log failed:", err));
  }, [slug]);

  if (!bundle) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="max-w-3xl mx-auto px-5 py-20 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Bundle not found</h1>
          <Link to="/bundles" className="text-primary hover:underline">← Browse all bundles</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const quizSlug = quizMap[bundle.slug];
  const hasFunnel = !!quizSlug;

  // Checkout via FastAPI → Stripe
  const handleCheckout = async () => {
    // Log checkout initiation via FastAPI
    logContentEvent({
      visitor_id: visitorId,
      event_type: "checkout_initiated",
      event_data: { bundle_slug: slug, bundle_title: bundle.title, price: "$47" },
      page_path: `/bundles/${slug}`,
    }).catch((err) => console.error("Event log failed:", err));

    try {
      const session = await createCheckoutSession({
        visitor_id: visitorId,
        bundle_slug: slug!,
      });
      window.location.href = session.checkout_url;
    } catch (err) {
      console.error("Checkout session failed, falling back to demo:", err);
      // Demo fallback
      window.location.href = `/thank-you/${slug}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-5 py-10">
        <Link to="/bundles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> All Bundles
        </Link>

        {/* Hero section */}
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-medium uppercase tracking-wider text-primary bg-sage-soft px-3 py-1 rounded-full">
              {getCategoryLabel(bundle.category).split("(")[0].trim()}
            </span>
            <span className="text-xs font-medium text-muted-foreground bg-peach-soft px-3 py-1 rounded-full">
              {bundle.perceivedValue} value
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
            {bundle.title}
          </h1>

          {/* Pain point callout */}
          <div className="rounded-2xl bg-peach-soft/50 border border-peach/30 p-5 mb-6">
            <p className="text-base text-foreground leading-relaxed italic">
              "{bundle.painPoint}"
            </p>
          </div>

          {/* Career impact */}
          <div className="flex items-start gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-1">Career Impact</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{bundle.careerImpact}</p>
            </div>
          </div>

          {/* Best career uses */}
          <div className="flex items-start gap-3 mb-8">
            <Briefcase className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-2">Best Career Uses</h3>
              <div className="flex flex-wrap gap-2">
                {bundle.bestCareerUses.map((role) => (
                  <span key={role} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {hasFunnel && (!journey || journey.current_stage === "awareness") ? (
              <Link
                to={`/quiz/${quizSlug}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-base px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
              >
                Take the free assessment first
              </Link>
            ) : (
              <button
                onClick={handleCheckout}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-base px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
              >
                Get Instant Access — {bundle.price}
              </button>
            )}
            <div className="text-left">
              <p className="text-2xl font-bold text-primary">{bundle.price}</p>
              <p className="text-xs text-muted-foreground">
                <span className="line-through">$200</span> · One-time payment · Instant access
              </p>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-8">
          <h2 className="font-serif text-2xl text-foreground mb-5">What You Get</h2>
          <div className="space-y-3">
            {[
              "Complete mini-learner bundle with step-by-step modules",
              "Actionable templates, frameworks, and worksheets",
              "Real-world examples and case studies",
              "Self-paced format — learn on your schedule",
              "Lifetime access to all bundle materials",
              "Career impact roadmap tailored to your goals",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 bg-card border border-border px-4 py-2 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Secure Stripe checkout
          </span>
          <span className="flex items-center gap-1.5 bg-card border border-border px-4 py-2 rounded-full">
            Instant digital delivery
          </span>
          <span className="flex items-center gap-1.5 bg-card border border-border px-4 py-2 rounded-full">
            Built for professionals 40+
          </span>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BundleLanding;
