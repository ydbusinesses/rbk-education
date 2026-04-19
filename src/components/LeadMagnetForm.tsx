import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Gift, Mail, CheckCircle2 } from "lucide-react";
import { captureLeadViaAPI } from "@/lib/api";
import { getVisitorId } from "@/lib/visitor";
import type { LeadMagnet } from "@/lib/mock-data";

interface LeadMagnetFormProps {
  magnet: LeadMagnet;
}

const LeadMagnetForm = ({ magnet }: LeadMagnetFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const visitorId = getVisitorId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await captureLeadViaAPI({
        visitor_id: visitorId,
        email,
        name: name || null,
        funnel_slug: magnet.funnelSlug,
        lead_magnet_type: magnet.magnetType,
        quiz_slug: magnet.quizSlug,
        matched_bundle_slug: magnet.matchedBundleSlug,
      });
    } catch (err) {
      console.error("Lead capture failed:", err);
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-serif text-2xl text-foreground mb-3">Check your inbox!</h2>
        <p className="text-muted-foreground mb-6">
          Your <strong>{magnet.magnetTitle}</strong> is on its way. While you wait, take the quick assessment to get personalized recommendations.
        </p>
        <button
          onClick={() => navigate(`/quiz/${magnet.quizSlug}`)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
        >
          Take the Assessment <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-peach-soft flex items-center justify-center flex-shrink-0">
          <Gift className="w-6 h-6 text-primary" />
        </div>
        <div>
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary bg-sage-soft px-2.5 py-1 rounded-full mb-2">
            Free {magnet.magnetType}
          </span>
          <h3 className="font-serif text-xl text-foreground leading-snug">
            {magnet.magnetTitle}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{magnet.magnetDescription}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            placeholder="Your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-base px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Sending..." : `Get Your Free ${magnet.magnetType}`}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
        <p className="text-xs text-muted-foreground text-center">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </form>
    </div>
  );
};

export default LeadMagnetForm;
