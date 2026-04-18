import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../lib/supabase';
import { checkRateLimit, getClientIp, rateLimitResponse } from '../../lib/rateLimit';
import { verifyTurnstile } from '../../lib/turnstile';

export const prerender = false;

// 3 requests per hour per IP
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

export const POST: APIRoute = async ({ request, cookies }) => {
  const ip = getClientIp(request);
  if (!checkRateLimit(`contact:${ip}`, LIMIT, WINDOW_MS)) {
    return rateLimitResponse();
  }
  const headers = { 'Content-Type': 'application/json' };

  try {
    const body = await request.json();
    const { name, email, message, lang, 'cf-turnstile-response': token } = body;

    if (!await verifyTurnstile(token)) {
      return new Response(JSON.stringify({ error: 'Robot ellenőrzés sikertelen. Próbáld újra.' }), { status: 400, headers });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(JSON.stringify({ error: 'Hiányzó mezők.' }), { status: 400, headers });
    }

    if (name.trim().length > 100) {
      return new Response(JSON.stringify({ error: 'A név max. 100 karakter.' }), { status: 400, headers });
    }

    if (email.trim().length > 254) {
      return new Response(JSON.stringify({ error: 'Érvénytelen email cím.' }), { status: 400, headers });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Érvénytelen email cím.' }), { status: 400, headers });
    }

    if (message.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Az üzenet túl rövid.' }), { status: 400, headers });
    }

    const supabase = createSupabaseServerClient(cookies, request);
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        lang: lang === 'en' ? 'en' : 'hu',
      });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Szerverhiba.' }), { status: 500, headers });
  }
};
