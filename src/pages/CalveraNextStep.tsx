import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, GraduationCap, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ascensionPaths } from "@/lib/mock-data";

const CalveraNextStep = () => {
  const paths = Object.entries(ascensionPaths);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-5 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-5">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-3">
            Your Next Level
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You've started with a $47 bundle. Now it's time to go deeper. 
            RBK Education pathways take you from self-study to mastery 
            with guided implementation and expert support.
          </p>
        </motion.div>

        {/* Pathway cards */}
        <div className="space-y-6 mb-16">
          {paths.map(([key, path], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-border bg-card p-8 sm:p-10"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-peach-soft flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary bg-sage-soft px-2.5 py-1 rounded-full mb-2">
                    {path.funnelLabel}
                  </span>
                  <h2 className="font-serif text-2xl text-foreground">{path.immediateNextStep}</h2>
                </div>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {path.nextStepDescription}
              </p>

              {/* Pathway steps */}
              <div className="rounded-2xl bg-muted/30 border border-border p-5 mb-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  RBK Education Pathway: {path.calveraPath}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {path.calveraPathSteps.map((step, si) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                        si === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      }`}>
                        {step}
                      </span>
                      {si < path.calveraPathSteps.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related bundles */}
              <div className="flex flex-wrap gap-2">
                {path.relatedBundleSlugs.slice(0, 3).map((slug) => (
                  <Link
                    key={slug}
                    to={`/bundles/${slug}`}
                    className="text-xs font-medium text-primary bg-sage-soft px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {slug.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center rounded-3xl bg-sage-soft/30 border border-primary/10 p-10"
        >
          <h2 className="font-serif text-3xl text-foreground mb-3">
            Not sure which pathway fits?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Take a 2-minute assessment and Lumi will match you to the right pathway based on your career goals and pain points.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/quiz/automation-readiness"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              Take the Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/bundles"
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground font-medium px-8 py-4 rounded-xl hover:bg-muted transition-colors"
            >
              Browse Bundles
            </Link>
          </div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CalveraNextStep;
