import { KeyRound, ExternalLink } from "lucide-react";
import { CustomerAccess } from "@/hooks/useAccountData";

interface Props {
  items: CustomerAccess[];
  isLoading?: boolean;
}

const stateColors: Record<string, string> = {
  active: "bg-sage-soft text-primary",
  payment_issue: "bg-peach-soft text-accent-foreground",
  access_paused: "bg-secondary text-secondary-foreground",
  canceled: "bg-muted text-muted-foreground",
  expired: "bg-destructive/10 text-destructive",
};

const stateLabels: Record<string, string> = {
  active: "Active",
  payment_issue: "Payment issue — update billing",
  access_paused: "Access paused",
  canceled: "Canceled",
  expired: "Expired",
};

const ActiveAccessSection = ({ items, isLoading }: Props) => {
  if (isLoading) {
    return (
      <section>
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-serif text-2xl text-foreground">My Access</h2>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">Loading…</div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <KeyRound className="w-5 h-5 text-muted-foreground" />
        <h2 className="font-serif text-2xl text-foreground">My Access</h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.entitlement_id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{item.product_title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.entitlement_type.replace(/_/g, " ")}
                {item.expires_at && ` · Renews ${new Date(item.expires_at).toLocaleDateString()}`}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className={`text-xs px-2.5 py-1 rounded-full ${stateColors[item.access_state] || stateColors.active}`}>
                {stateLabels[item.access_state] || item.access_state}
              </span>
              {item.access_url && item.access_state === "active" && (
                <a
                  href={item.access_url}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Open <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActiveAccessSection;
