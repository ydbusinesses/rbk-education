// Calvera FastAPI client
// All business logic calls go through FastAPI, never directly to Supabase

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL || "http://localhost:8000";

async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${FASTAPI_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${body}`);
  }

  return res.json();
}

// ---- Public endpoints ----

export interface LeadCapturePayload {
  visitor_id: string;
  email: string;
  name?: string | null;
  funnel_slug: string;
  lead_magnet_type: string;
  quiz_slug?: string;
  matched_bundle_slug?: string;
}

export function captureLeadViaAPI(payload: LeadCapturePayload) {
  return apiFetch("/api/leads/capture", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface QuizSubmitPayload {
  visitor_id: string;
  answers: number[];
  question_index: number;
  answer_index: number;
}

export function submitQuizAnswer(funnelSlug: string, payload: QuizSubmitPayload) {
  return apiFetch(`/api/quizzes/${funnelSlug}/submit`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface OfferRecommendation {
  bundle_slug: string;
  bundle_title: string;
  severity: string;
  message: string;
}

export function getOfferRecommendation(funnelSlug: string, visitorId: string) {
  return apiFetch<OfferRecommendation>(
    `/api/offers/${funnelSlug}/recommendation?visitor_id=${encodeURIComponent(visitorId)}`
  );
}

export interface CheckoutSessionPayload {
  visitor_id: string;
  bundle_slug: string;
  email?: string;
}

export interface CheckoutSessionResponse {
  checkout_url: string;
  session_id: string;
}

export function createCheckoutSession(payload: CheckoutSessionPayload) {
  return apiFetch<CheckoutSessionResponse>("/api/checkout/session", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface LibraryAccessResponse {
  status: "valid" | "expired" | "revoked" | "invalid";
  bundle_slug?: string;
  email?: string;
  modules?: { id: number; title: string; duration: string }[];
  resources?: { name: string; type: string; url?: string }[];
}

export function validateLibraryAccess(token: string) {
  return apiFetch<LibraryAccessResponse>(`/api/library/access/${encodeURIComponent(token)}`);
}

export interface ContentEventPayload {
  visitor_id: string;
  event_type: string;
  event_data?: Record<string, unknown>;
  page_path?: string;
}

export function logContentEvent(payload: ContentEventPayload) {
  return apiFetch("/api/content-events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface ResumeResponse {
  action: string;
  headline: string;
  cta: string;
  destination: string;
  current_stage: string;
  meta?: Record<string, unknown>;
}

export function getResumeAction(visitorId: string) {
  return apiFetch<ResumeResponse>("/api/resume", {
    method: "POST",
    body: JSON.stringify({ visitor_id: visitorId }),
  });
}

export interface AscensionNextStep {
  path_key: string;
  immediate_next_step: string;
  description: string;
  calvera_path: string;
  steps: string[];
  related_bundles: { slug: string; title: string; price: string }[];
}

export function getAscensionNextStep(visitorId: string) {
  return apiFetch<AscensionNextStep>(
    `/api/ascension/next-step?visitor_id=${encodeURIComponent(visitorId)}`
  );
}

// ---- Billing ----

export interface PortalSessionResponse {
  portal_url: string;
}

export function createBillingPortalSession(userId: string) {
  return apiFetch<PortalSessionResponse>("/api/billing/customer-portal", {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}
