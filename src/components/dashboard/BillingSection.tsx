import { CreditCard, FileText, ExternalLink, AlertTriangle } from "lucide-react";
import { CustomerSubscription, CustomerInvoice, getGraceLabel } from "@/hooks/useAccountData";

interface Props {
  subscriptions: CustomerSubscription[];
  invoices: CustomerInvoice[];
  isLoading?: boolean;
  onManageBilling: () => void;
}

const accessStateBadge: Record<string, string> = {
  active: "bg-sage-soft text-primary",
  payment_issue: "bg-peach-soft text-accent-foreground",
  access_paused: "bg-secondary text-secondary-foreground",
  canceled: "bg-muted text-muted-foreground",
  expired: "bg-destructive/10 text-destructive",
};

const invoiceStatusStyles: Record<string, string> = {
  paid: "bg-sage-soft text-primary",
  failed: "bg-destructive/10 text-destructive",
  pending: "bg-secondary text-secondary-foreground",
};

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

const BillingSection = ({ subscriptions, invoices, isLoading, onManageBilling }: Props) => {
  if (isLoading) {
    return (
      <section>
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-serif text-2xl text-foreground">Billing</h2>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">Loading…</div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-serif text-2xl text-foreground">Billing</h2>
        </div>
        <button
          onClick={onManageBilling}
          className="text-sm font-medium text-primary bg-sage-soft hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-full transition-colors"
        >
          Manage Billing
        </button>
      </div>

      {/* Active subscriptions with grace-period awareness */}
      {subscriptions.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-4 mb-4 space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">My Subscriptions</h3>
          {subscriptions.map((sub) => {
            const graceLabel = getGraceLabel(sub);
            const isIssue = sub.access_state === "payment_issue" || sub.access_state === "access_paused";
            return (
              <div key={sub.subscription_id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{sub.plan_name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {sub.current_period_end && `Next billing: ${new Date(sub.current_period_end).toLocaleDateString()}`}
                    {sub.cancel_at_period_end && " · Cancels at period end"}
                  </p>
                  {isIssue && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-accent-foreground bg-peach-soft px-2.5 py-1 rounded-full w-fit">
                      <AlertTriangle className="w-3 h-3" />
                      {graceLabel}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary">
                    {formatAmount(sub.amount, sub.currency)}/mo
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${accessStateBadge[sub.access_state] || accessStateBadge.active}`}>
                    {sub.access_state === "active" ? "Active" : graceLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoices & Receipts */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-border bg-muted/50">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Invoices & Receipts</h3>
        </div>
        {invoices.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No invoices yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div key={inv.receipt_id} className="flex items-center justify-between p-4">
                <span className="text-sm text-muted-foreground">
                  {new Date(inv.invoice_date).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {formatAmount(inv.amount, inv.currency)}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full capitalize ${invoiceStatusStyles[inv.status] || invoiceStatusStyles.pending}`}>
                    {inv.status}
                  </span>
                  {inv.hosted_invoice_url && (
                    <a href={inv.hosted_invoice_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BillingSection;
