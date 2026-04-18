import { createClient } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;

export function createSupabaseServerClient(cookies: AstroCookies, request?: Request) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request?.headers.get('cookie') ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, options as Parameters<AstroCookies['set']>[2]);
        });
      },
    },
  });
}

export type BlogPost = {
  id: string;
  slug: string;
  status: 'draft' | 'published';
  title_hu: string;
  excerpt_hu: string | null;
  content_hu: string;
  title_en: string | null;
  excerpt_en: string | null;
  content_en: string | null;
  cover_url: string | null;
  tags: string[];
  reading_time_min: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  lang: 'hu' | 'en';
  is_read: boolean;
  created_at: string;
};
