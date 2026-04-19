import { ArrowRight } from "lucide-react";
import { ContinueItem } from "@/lib/mock-data";

interface Props {
  items: ContinueItem[];
}

const ContinueSection = ({ items }: Props) => {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="font-serif text-2xl text-foreground mb-4">Pick Up Where You Left Off</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.destination}
            className="group block rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary bg-sage-soft px-2.5 py-1 rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="font-semibold text-lg text-foreground leading-snug">{item.title}</h3>
              </div>
              <span className="mt-1 flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{item.subtitle}</p>
            {item.progress !== undefined && (
              <div className="w-full h-2 rounded-full bg-sand-dark overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};

export default ContinueSection;
