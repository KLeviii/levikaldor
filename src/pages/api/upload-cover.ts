import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '../../lib/supabase';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function getSecret(key: string): string {
  if (process.env[key]) return process.env[key]!;
  try {
    const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf-8');
    const m = raw.match(new RegExp(`^${key}=(.+)$`, 'm'));
    if (m) return m[1].trim();
  } catch {}
  return '';
}

export const prerender = false;

const json = (data: object, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const supabase = createSupabaseServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return json({ error: 'Unauthorized' }, 401);

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) return json({ error: 'No file' }, 400);

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    const ALLOWED_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED_TYPES.includes(file.type) || !ALLOWED_EXTS.includes(ext)) {
      return json({ error: 'Csak képfájl tölthető fel (JPEG, PNG, WebP, GIF, AVIF).' }, 400);
    }
    if (file.size > MAX_SIZE) {
      return json({ error: 'A fájl max. 5 MB lehet.' }, 400);
    }

    const serviceKey = getSecret('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    if (!serviceKey || !supabaseUrl) return json({ error: `Missing env vars: url=${!!supabaseUrl} key=${!!serviceKey}` }, 500);

    const admin = createClient(supabaseUrl, serviceKey);

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { data, error } = await admin.storage
      .from('blog-covers')
      .upload(fileName, arrayBuffer, { contentType: file.type, upsert: false });

    if (error) return json({ error: error.message }, 500);

    const { data: { publicUrl } } = admin.storage.from('blog-covers').getPublicUrl(data.path);

    return json({ url: publicUrl });
  } catch (err: any) {
    return json({ error: err?.message ?? 'Unknown error' }, 500);
  }
};
