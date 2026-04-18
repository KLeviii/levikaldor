import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const body = await request.json();
    const { name, email, message, lang } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(JSON.stringify({ error: 'Hiányzó mezők.' }), { status: 400, headers });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Érvénytelen email cím.' }), { status: 400, headers });
    }

    if (message.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Az üzenet túl rövid.' }), { status: 400, headers });
    }

    const supabase = createSupabaseServerClient(cookies);
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
