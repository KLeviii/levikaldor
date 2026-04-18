import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../lib/supabase';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../../lib/rateLimit';
import { verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;

// 5 requests per 10 minutes per IP
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

export const POST: APIRoute = async ({ request, cookies }) => {
  const ip = getClientIp(request);
  if (!checkRateLimit(`comments:${ip}`, LIMIT, WINDOW_MS)) {
    return rateLimitResponse();
  }
  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { post_slug, name, content, email, 'cf-turnstile-response': token } = body as Record<string, string>;

  if (!await verifyTurnstile(token)) {
    return json({ error: 'Robot ellenőrzés sikertelen. Próbáld újra.' }, 400);
  }

  if (!post_slug?.trim() || !name?.trim() || !content?.trim()) {
    return json({ error: 'Hiányzó kötelező mezők.' }, 400);
  }
  if (post_slug.trim().length > 200) return json({ error: 'Érvénytelen slug.' }, 400);
  if (name.trim().length > 100) return json({ error: 'A név max. 100 karakter.' }, 400);
  if (email && email.trim().length > 254) return json({ error: 'Érvénytelen email cím.' }, 400);
  if (content.trim().length > 2000) return json({ error: 'Az üzenet max. 2000 karakter.' }, 400);

  const supabase = createSupabaseServerClient(cookies, request);
  const { error } = await supabase.from('blog_comments').insert({
    post_slug: post_slug.trim(),
    name: name.trim(),
    email: email?.trim() || null,
    content: content.trim(),
  });

  if (error) return json({ error: error.message }, 500);
  return json({ ok: true }, 201);
};

function json(data: object, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
