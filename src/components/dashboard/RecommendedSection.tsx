import { Sparkles } from "lucide-react";
import { CustomerRecommendation } from "@/hooks/useAccountData";

interface Props {
  items: CustomerRecommendation[];
  isLoading?: boolean;
}

const RecommendedSection = ({ items, isLoading }: Props) => {
  if (isLoading) return null;
  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary opacity-70" />
        <h2 className="font-serif text-2xl text-foreground">Recommended Next Step</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.recommendation_id}
            className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-muted-foreground bg-peach-soft px-2.5 py-1 rounded-full mb-2">
                {item.recommendation_type.replace(/_/g, " ")}
              </span>
              <h3 className="font-semibold text-base text-foreground mb-1 leading-snug">{item.product_title}</h3>
              {item.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <a
                href={item.destination_url}
                className="text-sm font-medium text-primary hover:underline"
              >
                Learn more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
