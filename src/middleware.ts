import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;
  const pathname = url.pathname;

  const isAdminRoute = pathname.startsWith('/admin/') || pathname === '/admin';
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';

  if (isAdminRoute && !isLoginPage) {
    const supabase = createSupabaseServerClient(cookies);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return redirect('/admin/login');
    }
  }

  return next();
});
