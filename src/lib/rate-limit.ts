/**
 * Limitador simples em memória (por instância).
 * Em ambientes serverless cada instância tem seu próprio contador — serve como camada básica.
 * Para proteção forte, use um serviço externo (Upstash Redis, Vercel WAF, Cloudflare Turnstile).
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return false;
}
