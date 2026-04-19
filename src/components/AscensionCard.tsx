import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ascensionPaths, bundleToAscension, catalog, type AscensionPath } from "@/lib/mock-data";

interface AscensionCardProps {
  bundleSlug: string;
}

const AscensionCard = ({ bundleSlug }: AscensionCardProps) => {
  const pathKey = bundleToAscension[bundleSlug];
  if (!pathKey) return null;

  const path = ascensionPaths[pathKey];
  if (!path) return null;

  // Find related bundles to suggest
  const relatedBundles = path.relatedBundleSlugs
    .filter((s) => s !== bundleSlug)
    .map((s) => catalog.find((b) => b.slug === s))
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-sage-soft/50 to-peach-soft/30 p-8 sm:p-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Your Next Level</p>
          <h3 className="font-serif text-xl text-foreground">{path.immediateNextStep}</h3>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {path.nextStepDescription}
      </p>

      {/* Calvera pathway */}
      <div className="rounded-2xl bg-card border border-border p-5 mb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          RBK Education Pathway
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {path.calveraPathSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}>
                {step}
              </span>
              {i < path.calveraPathSteps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related bundles */}
      {relatedBundles.length > 0 && (
        <div className="space-y-3 mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Continue building this skill stack
          </p>
          {relatedBundles.map((b) => b && (
            <Link
              key={b.slug}
              to={`/bundles/${b.slug}`}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">{b.title}</h4>
                <p className="text-xs text-muted-foreground">{b.price}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 ml-3" />
            </Link>
          ))}
        </div>
      )}

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Ready for guided implementation? The RBK Education pathway takes you from self-study to mastery.
        </p>
      </div>
    </div>
  );
};

export default AscensionCard;
