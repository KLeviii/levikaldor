interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now - entry.windowStart > 3_600_000) store.delete(key);
  }
}, 300_000);

export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Returns true if the request is allowed, false if rate limit exceeded.
 * @param key    Unique key (e.g. `contact:${ip}`)
 * @param limit  Max requests per window
 * @param windowMs  Window size in milliseconds
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart >= windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}

export function rateLimitResponse(): Response {
  return new Response(
    JSON.stringify({ error: 'Túl sok kérés. Próbáld újra később.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60',
      },
    }
  );
}
