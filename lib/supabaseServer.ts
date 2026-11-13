import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for Next.js API Routes and Server Actions.
 * Uses SUPABASE_SERVICE_ROLE_KEY to bypass client RLS restrictions safely on the server.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
