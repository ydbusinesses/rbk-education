import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getResumeAction, logContentEvent } from "@/lib/api";
import { getVisitorId } from "@/lib/visitor";

export type JourneyStage =
  | "awareness"
  | "quiz_started"
  | "quiz_completed"
  | "product_viewed"
  | "purchased"
  | "access_issued"
  | "access_used"
  | "ascension_ready";

export interface LuauAction {
  type:
    | "resume_quiz"
    | "return_to_product"
    | "reopen_delivery"
    | "continue_sequence"
    | "ascension_offer"
    | "welcome"
    | "none";
  headline: string;
  cta: string;
  destination: string;
  meta?: Record<string, unknown>;
}

interface JourneyState {
  visitor_id: string;
  current_stage: JourneyStage;
  last_page: string | null;
  last_quiz_slug: string | null;
  last_bundle_slug: string | null;
  quiz_progress: Record<string, unknown>;
  engagement_score: number;
  access_link_issued_at: string | null;
  access_link_used_at: string | null;
  nurture_sequence_step: number;
}

// Local fallback when FastAPI is unreachable
function computeNextAction(state: JourneyState | null): LuauAction {
  if (!state) {
    return {
      type: "welcome",
      headline: "Pinky and Me",
      cta: "Explore Bundles",
      destination: "/bundles",
    };
  }

  const { current_stage, last_quiz_slug, last_bundle_slug, access_link_issued_at, access_link_used_at, engagement_score } = state;

  if (current_stage === "ascension_ready" || (engagement_score >= 50 && current_stage === "access_used")) {
    return {
      type: "ascension_offer",
      headline: "You're ready for the next level",
      cta: "Explore RBK Education Pathways",
      destination: "/bundles",
      meta: { tier: 2 },
    };
  }

  if (current_stage === "access_issued" && access_link_issued_at && !access_link_used_at && last_bundle_slug) {
    return {
      type: "reopen_delivery",
      headline: "Your bundle is waiting for you",
      cta: "Access Your Bundle",
      destination: `/library/access/${last_bundle_slug}`,
    };
  }

  if (current_stage === "quiz_started" && last_quiz_slug) {
    return {
      type: "resume_quiz",
      headline: "Pick up your assessment where you left off",
      cta: "Continue Assessment",
      destination: `/quiz/${last_quiz_slug}`,
    };
  }

  if (current_stage === "quiz_completed" && last_bundle_slug) {
    return {
      type: "return_to_product",
      headline: "Your matched bundle is ready",
      cta: "View Your Bundle",
      destination: `/bundles/${last_bundle_slug}`,
    };
  }

  if (current_stage === "product_viewed" && last_bundle_slug) {
    return {
      type: "return_to_product",
      headline: "Still thinking it over?",
      cta: `Continue to ${last_bundle_slug.replace(/-/g, " ")}`,
      destination: `/bundles/${last_bundle_slug}`,
    };
  }

  return { type: "none", headline: "", cta: "", destination: "" };
}

export function useLuauMini() {
  const [journey, setJourney] = useState<JourneyState | null>(null);
  const [action, setAction] = useState<LuauAction>({ type: "none", headline: "", cta: "", destination: "" });
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();
  const visitorId = getVisitorId();

  // Load journey state via FastAPI /api/resume
  useEffect(() => {
    async function loadJourney() {
      try {
        const resumeData = await getResumeAction(visitorId);
        // Map FastAPI response to local action
        const mappedAction: LuauAction = {
          type: (resumeData.action as LuauAction["type"]) || "none",
          headline: resumeData.headline,
          cta: resumeData.cta,
          destination: resumeData.destination,
          meta: resumeData.meta,
        };
        setAction(mappedAction);
        // Set minimal journey state from response
        setJourney({
          visitor_id: visitorId,
          current_stage: (resumeData.current_stage as JourneyStage) || "awareness",
          last_page: null,
          last_quiz_slug: null,
          last_bundle_slug: null,
          quiz_progress: {},
          engagement_score: 0,
          access_link_issued_at: null,
          access_link_used_at: null,
          nurture_sequence_step: 0,
        });
      } catch {
        // FastAPI unreachable — use local fallback
        setAction(computeNextAction(null));
      } finally {
        setLoading(false);
      }
    }
    loadJourney();
  }, [visitorId]);

  // Track page views via FastAPI
  useEffect(() => {
    if (loading) return;

    logContentEvent({
      visitor_id: visitorId,
      event_type: "page_view",
      page_path: location.pathname,
      event_data: {},
    }).catch(() => {});
  }, [location.pathname, loading]);

  // Mark stage transition via FastAPI
  const updateStage = useCallback(
    async (stage: JourneyStage, extras?: Record<string, unknown>) => {
      const newState = journey
        ? { ...journey, current_stage: stage, ...extras } as JourneyState
        : null;
      if (newState) {
        setJourney(newState);
        setAction(computeNextAction(newState));
      }

      // Log stage event via FastAPI
      try {
        await logContentEvent({
          visitor_id: visitorId,
          event_type: `stage_${stage}`,
          event_data: extras || {},
          page_path: location.pathname,
        });
      } catch {
        // silent — backend optional
      }
    },
    [visitorId, journey, location.pathname]
  );

  const dismiss = useCallback(() => setDismissed(true), []);

  return {
    action,
    journey,
    loading,
    dismissed,
    dismiss,
    updateStage,
    visitorId,
  };
}
