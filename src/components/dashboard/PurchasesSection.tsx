import { ShoppingBag, ExternalLink, Package } from "lucide-react";
import { CustomerPurchase } from "@/hooks/useAccountData";

interface Props {
  purchases: CustomerPurchase[];
  isLoading?: boolean;
}

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

const deliveryBadge: Record<string, string> = {
  fulfilled: "bg-sage-soft text-primary",
  pending: "bg-secondary text-secondary-foreground",
  failed: "bg-destructive/10 text-destructive",
};

const PurchasesSection = ({ purchases, isLoading }: Props) => {
  if (isLoading) {
    return (
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-serif text-2xl text-foreground">My Purchases</h2>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">Loading…</div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="w-5 h-5 text-muted-foreground" />
        <h2 className="font-serif text-2xl text-foreground">My Purchases</h2>
      </div>
      {purchases.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No purchases yet. Explore our bundles to get started.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Bundle</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Delivery</th>
                  <th className="text-right p-4 font-medium text-muted-foreground hidden sm:table-cell">Access</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.order_id + p.bundle_slug} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <span className="font-medium text-foreground">{p.product_title}</span>
                      <span className="block sm:hidden text-xs text-muted-foreground mt-0.5">
                        {new Date(p.order_date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">
                      {new Date(p.order_date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right font-medium text-foreground">
                      {formatAmount(p.amount, p.currency)}
                    </td>
                    <td className="p-4 text-right">
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-full capitalize ${deliveryBadge[p.delivery_status] || deliveryBadge.pending}`}>
                        {p.delivery_status}
                      </span>
                    </td>
                    <td className="p-4 text-right hidden sm:table-cell">
                      {p.post_purchase_destination && (
                        <a
                          href={p.post_purchase_destination}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          Open <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default PurchasesSection;
