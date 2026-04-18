import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect, request }) => {
  const supabase = createSupabaseServerClient(cookies, request);
  await supabase.auth.signOut();
  return redirect('/admin/login');
};
