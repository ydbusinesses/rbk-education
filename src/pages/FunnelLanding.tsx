import { useParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { leadMagnets } from "@/lib/mock-data";
import { ArrowLeft, TrendingUp, Shield, Zap } from "lucide-react";

const funnelIcons: Record<string, React.ElementType> = {
  "automation-rescue": Zap,
  "career-insurance": Shield,
  "burnout-leadership": TrendingUp,
  "negotiation-power": TrendingUp,
};

const FunnelLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const magnet = leadMagnets.find((m) => m.funnelSlug === slug);

  if (!magnet) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="max-w-3xl mx-auto px-5 py-20 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Funnel not found</h1>
          <Link to="/bundles" className="text-primary hover:underline">← Browse all bundles</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const Icon = funnelIcons[slug || ""] || Zap;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-5 py-10">
        <Link to="/bundles" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> All Bundles
        </Link>

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-peach-soft flex items-center justify-center mx-auto mb-5">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-3">
            {magnet.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {magnet.subtitle}
          </p>
        </div>

        {/* Lead magnet form */}
        <LeadMagnetForm magnet={magnet} />

        {/* Social proof */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Join 2,400+ professionals 40+ who are future-proofing their careers with RBK Education.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default FunnelLanding;
