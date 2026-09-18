import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Creates a Supabase client for use on the client-side (in browsers).
 * Uses the public anonymous key.
 */
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

/**
 * Creates a Supabase client for use on the server-side (in API routes, Server Components).
 * Also uses the public anonymous key for read operations, which is fine and safe with RLS.
 */
export function createServerClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

/**
 * Creates a Supabase admin client with the service role key.
 * This client bypasses Row Level Security and should only be used in secure
 * server-side environments for administrative tasks.
 */
export const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

/**
 * Default Supabase client instance for general use.
 * This is the missing named export that was causing the deployment error.
 */
export const supabase = createClient()
