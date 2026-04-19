import { X, ArrowRight, Sparkles, BookOpen, RotateCcw, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useLuauMini, LuauAction } from "@/hooks/useLuauMini";

const iconMap: Record<LuauAction["type"], React.ElementType> = {
  resume_quiz: RotateCcw,
  return_to_product: BookOpen,
  reopen_delivery: BookOpen,
  continue_sequence: CreditCard,
  ascension_offer: Sparkles,
  welcome: Sparkles,
  none: Sparkles,
};

const LuauMiniBanner = () => {
  const { action, loading, dismissed, dismiss } = useLuauMini();

  if (loading || dismissed || action.type === "none") return null;

  const Icon = iconMap[action.type];
  const isAscension = action.type === "ascension_offer";

  return (
    <div
      className={`relative overflow-hidden border-b transition-all ${
        isAscension
          ? "bg-gradient-to-r from-peach-soft to-sage-soft border-peach/30"
          : "bg-sage-soft/50 border-border"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isAscension ? "bg-primary text-primary-foreground" : "bg-primary/10"
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{action.headline}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to={action.destination}
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-colors ${
              isAscension
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {action.cta}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={dismiss}
            className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuauMiniBanner;
