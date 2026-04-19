// Generate or retrieve a persistent anonymous visitor ID
export function getVisitorId(): string {
  const key = 'calvera_visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID?.() ?? `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, id);
  }
  return id;
}
