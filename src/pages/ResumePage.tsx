import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getResumeAction } from "@/lib/api";
import { getVisitorId } from "@/lib/visitor";

const ResumePage = () => {
  const navigate = useNavigate();
  const visitorId = getVisitorId();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function resolve() {
      try {
        const result = await getResumeAction(visitorId);
        if (result.destination) {
          navigate(result.destination, { replace: true });
          return;
        }
      } catch {
        // FastAPI unreachable
      }
      // Fallback: go to bundles
      setError(true);
      setTimeout(() => navigate("/bundles", { replace: true }), 2000);
    }
    resolve();
  }, [visitorId, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-md mx-auto px-5 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-5">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <h1 className="font-serif text-2xl text-foreground mb-2">
          {error ? "Redirecting to bundles…" : "Finding where you left off…"}
        </h1>
        <p className="text-muted-foreground">
          {error
            ? "We couldn't find your previous session."
            : "Luau Mini is checking your journey state."}
        </p>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ResumePage;
