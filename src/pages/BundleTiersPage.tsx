import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { bundleTiers } from "@/lib/agents-data";
import { catalog, categories } from "@/lib/mock-data";

const BundleTiersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-3">Choose Your Learning Path</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI Mini-Learner Bundles. Three ways to access them. Pick the path that fits your career goals.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-16">
          {bundleTiers.map((tier, i) => (
            <motion.div
              key={tier.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-3xl border bg-card p-8 flex flex-col ${tier.highlight ? "border-primary/40 shadow-md" : "border-border"}`}
            >
              <div className="mb-6">
                {tier.highlight && (
                  <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary bg-sage-soft px-2.5 py-1 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h2 className="font-serif text-2xl text-foreground mb-1">{tier.name}</h2>
                <p className="text-sm text-muted-foreground">{tier.subtitle}</p>
              </div>

              <div className="mb-6">
                <span className="font-serif text-4xl text-foreground">{tier.price}</span>
                <p className="text-xs text-muted-foreground mt-1">{tier.priceNote}</p>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {tier.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{feat}</p>
                  </div>
                ))}
              </div>

              <a
                href={
                  tier.slug === "starter"
                    ? "https://buy.stripe.com/8x23cx2Rb9Xg27O4a373G00"
                    : tier.slug === "growth"
                    ? "https://buy.stripe.com/00weVf2Rb8Tch2IdKD73G01"
                    : "https://buy.stripe.com/aFacN7dvP6L4cMseOH73G02"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {tier.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Category browse */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl text-foreground mb-2">Browse by Category</h2>
          <p className="text-muted-foreground text-sm mb-6">Every bundle is $47. Every one delivers $200+ in career value.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-10">
          {categories.map((cat) => {
            const count = catalog.filter((b) => b.category === cat.key).length;
            return (
              <Link
                key={cat.key}
                to={`/bundles/catalog?category=${cat.key}`}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-sm transition-all text-center"
              >
                <p className="text-sm font-medium text-foreground mb-0.5">{cat.label.split("&")[0].trim()}</p>
                <p className="text-xs text-muted-foreground">{count} bundles · {cat.demand}</p>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/bundles/catalog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            Browse all 50 bundles →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BundleTiersPage;
