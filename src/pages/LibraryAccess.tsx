import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Lock, BookOpen, ArrowLeft, FileText, Download, Play, ShieldAlert, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AscensionCard from "@/components/AscensionCard";
import { catalog } from "@/lib/mock-data";
import { useLuauMini } from "@/hooks/useLuauMini";
import { logContentEvent } from "@/lib/api";
import { getVisitorId } from "@/lib/visitor";
import { supabase } from "@/integrations/supabase/client";

type AccessState = "loading" | "valid" | "expired" | "revoked" | "invalid";

const LibraryAccess = () => {
  const { token } = useParams<{ token: string }>();
  const { updateStage, journey } = useLuauMini();
  const visitorId = getVisitorId();
  const hasTracked = useRef(false);
  const [accessState, setAccessState] = useState<AccessState>("loading");
  const [bundleSlug, setBundleSlug] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // Validate access token via FastAPI
  useEffect(() => {
    if (!token) {
      setAccessState("invalid");
      return;
    }

    async function validate() {
      try {
        const { data, error } = await supabase.rpc("consume_access_token", { _token: token! });
        const row = Array.isArray(data) ? data[0] : data;

        if (error || !row || !row.valid) {
          // Fallback: treat token as bundle slug (demo mode)
          const fallbackBundle = catalog.find((b) => b.slug === token);
          if (fallbackBundle) {
            setBundleSlug(fallbackBundle.slug);
            setAccessState("valid");
          } else {
            setAccessState("invalid");
          }
          return;
        }

        setBundleSlug(row.bundle_slug);
        setEmail(row.email);
        setAccessState("valid");
      } catch {
        const fallbackBundle = catalog.find((b) => b.slug === token);
        if (fallbackBundle) {
          setBundleSlug(fallbackBundle.slug);
          setAccessState("valid");
        } else {
          setAccessState("invalid");
        }
      }
    }

    validate();
  }, [token]);

  // Track access_used on valid entry
  useEffect(() => {
    if (hasTracked.current || accessState !== "valid" || !bundleSlug) return;
    hasTracked.current = true;

    if (journey?.current_stage === "access_issued" || journey?.current_stage === "purchased") {
      updateStage("access_used", {
        access_link_used_at: new Date().toISOString(),
      });
    }

    logContentEvent({
      visitor_id: visitorId,
      event_type: "library_accessed",
      event_data: { bundle_slug: bundleSlug, token: token?.slice(0, 8) + "..." },
      page_path: `/library/access/${token}`,
    }).catch((err) => console.error("Event log failed:", err));
  }, [accessState, bundleSlug]);

  const bundle = bundleSlug ? catalog.find((b) => b.slug === bundleSlug) : null;

  // Track content consumption via FastAPI
  const handleModuleStart = async (moduleId: number, moduleTitle: string) => {
    try {
      await logContentEvent({
        visitor_id: visitorId,
        event_type: "module_started",
        event_data: { bundle_slug: bundleSlug, module_id: moduleId, module_title: moduleTitle },
        page_path: `/library/access/${token}`,
      });
    } catch (err) {
      console.error("Module start log failed:", err);
    }
  };

  const handleDownload = async (resourceName: string) => {
    try {
      await logContentEvent({
        visitor_id: visitorId,
        event_type: "resource_downloaded",
        event_data: { bundle_slug: bundleSlug, resource_name: resourceName },
        page_path: `/library/access/${token}`,
      });
    } catch (err) {
      console.error("Download log failed:", err);
    }
  };

  // Loading state
  if (accessState === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="max-w-2xl mx-auto px-5 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-sage-soft flex items-center justify-center mx-auto mb-5 animate-pulse">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl text-foreground mb-2">Validating access...</h1>
          <p className="text-muted-foreground">Checking your access token.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Error states
  if (accessState === "invalid" || accessState === "revoked" || accessState === "expired") {
    const messages = {
      invalid: {
        icon: Lock,
        title: "Access not found",
        desc: "This access link may be invalid. Check your email for the correct link, or contact support.",
      },
      revoked: {
        icon: ShieldAlert,
        title: "Access revoked",
        desc: "This access link has been revoked. If you believe this is an error, please contact support.",
      },
      expired: {
        icon: Clock,
        title: "Access expired",
        desc: "This access link has expired. Contact support to request a new access link.",
      },
    };

    const msg = messages[accessState];
    const MsgIcon = msg.icon;

    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="max-w-2xl mx-auto px-5 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-peach-soft flex items-center justify-center mx-auto mb-5">
            <MsgIcon className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="font-serif text-3xl text-foreground mb-3">{msg.title}</h1>
          <p className="text-muted-foreground mb-6">{msg.desc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/account" className="text-primary hover:underline text-sm font-medium">
              Go to My Account
            </Link>
            <a href="mailto:support@calvera.com" className="text-primary hover:underline text-sm font-medium">
              Contact Support
            </a>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="max-w-2xl mx-auto px-5 py-20 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Bundle not found</h1>
          <Link to="/account" className="text-primary hover:underline">Go to My Account</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const modules = [
    { id: 1, title: "Welcome & Getting Started", duration: "5 min" },
    { id: 2, title: "Core Framework Overview", duration: "15 min" },
    { id: 3, title: "Deep-Dive Module", duration: "25 min" },
    { id: 4, title: "Templates & Worksheets", duration: "10 min" },
    { id: 5, title: "Real-World Case Studies", duration: "20 min" },
    { id: 6, title: "Action Plan & Next Steps", duration: "10 min" },
  ];

  const resources = [
    { name: "Action Plan Template", type: "PDF" },
    { name: "Framework Worksheet", type: "PDF" },
    { name: "Career Impact Tracker", type: "Spreadsheet" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-5 py-10">
        <Link to="/account" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> My Account
        </Link>

        {/* Bundle header */}
        <div className="rounded-3xl border border-border bg-card p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-soft flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary bg-sage-soft px-2.5 py-1 rounded-full mb-2">
                Your Bundle
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug">
                {bundle.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {bundle.bestCareerUses.join(" · ")}
              </p>
              {email && (
                <p className="text-xs text-muted-foreground mt-2">
                  Access granted to {email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Module list */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden mb-8">
          <div className="p-5 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Bundle Contents · {modules.length} modules
            </h2>
          </div>
          <div className="divide-y divide-border">
            {modules.map((mod) => (
              <div key={mod.id} className="flex items-center justify-between p-5 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-sage-soft flex items-center justify-center text-xs font-semibold text-primary">
                    {mod.id}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground">{mod.title}</h3>
                    <p className="text-xs text-muted-foreground">{mod.duration}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleModuleStart(mod.id, mod.title)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary bg-sage-soft hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-full transition-colors"
                >
                  <Play className="w-3 h-3" /> Start
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <div className="rounded-2xl border border-border bg-card p-5 mb-8">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
            Downloadable Resources
          </h2>
          <div className="space-y-3">
            {resources.map((file) => (
              <div key={file.name} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{file.name}</span>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{file.type}</span>
                </div>
                <button
                  onClick={() => handleDownload(file.name)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ascension path */}
        <AscensionCard bundleSlug={bundle.slug} />
      </main>

      <SiteFooter />
    </div>
  );
};

export default LibraryAccess;
