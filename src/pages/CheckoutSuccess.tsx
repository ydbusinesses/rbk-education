import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Mail, KeyRound, BookOpen } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { logContentEvent } from "@/lib/api";
import { getVisitorId } from "@/lib/visitor";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const tier = searchParams.get("tier");
  const bundleSlug = searchParams.get("bundle");
  const visitorId = getVisitorId();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    logContentEvent({
      visitor_id: visitorId,
      event_type: "checkout_completed",
      event_data: {
        stripe_session_id: sessionId || "demo",
        tier: tier || "starter",
        bundle_slug: bundleSlug || null,
      },
      page_path: "/checkout/success",
    }).catch((err) => console.error("Event log failed:", err));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-5 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <h1 className="font-serif text-4xl text-foreground mb-3">Welcome aboard!</h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
            Your purchase is confirmed. Your AI agents are ready to work for you.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 mb-10"
        >
          {[
            {
              icon: Mail,
              title: "Check your email",
              desc: "Your receipt and secure access link are on the way.",
            },
            {
              icon: KeyRound,
              title: "Secure access activated",
              desc: "Your bundle access is live. Click below to start immediately.",
            },
            {
              icon: BookOpen,
              title: "Your agents are working",
              desc: "Lumi is personalizing your learning path. Vault has secured your access. Aura is building your profile.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="w-10 h-10 rounded-full bg-sage-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
        >
          <Link
            to="/account"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            Go to My Account <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/bundles"
            className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground font-medium px-8 py-4 rounded-xl hover:bg-muted transition-colors"
          >
            Browse More Bundles
          </Link>
        </motion.div>

        {/* Ascension teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="rounded-2xl bg-peach-soft/30 border border-peach/20 p-6 text-center"
        >
          <p className="text-sm text-foreground mb-2">
            <strong>What's next?</strong> Your learning journey is just beginning.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            When you're ready, explore the RBK Education pathways for guided implementation and career acceleration.
          </p>
          <Link
            to="/calvera-next-step"
            className="text-sm font-medium text-primary hover:underline"
          >
            Explore Calvera Next Step →
          </Link>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CheckoutSuccess;
