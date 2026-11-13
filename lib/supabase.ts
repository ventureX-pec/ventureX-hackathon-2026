import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "your-supabase-project-url" &&
    supabaseUrl.startsWith("http")
  )
}

// Fallback dummy credentials for build/offline mode so createClient does not throw
const validUrl = isSupabaseConfigured()
  ? supabaseUrl
  : "https://placeholder-project.supabase.co"
const validKey = isSupabaseConfigured()
  ? supabaseAnonKey
  : "placeholder-anon-key"

export const supabase: SupabaseClient = createClient(validUrl, validKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
