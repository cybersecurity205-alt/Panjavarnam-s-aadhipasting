import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client provider for Aadhi Pasting.
 *
 * Privileged database operations (bypassing RLS) must use SUPABASE_SERVICE_ROLE_KEY.
 * Public or client-scoped queries can use NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * 
 * NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser or client-side components.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Checks whether Supabase is configured in the current environment.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseUrl.startsWith("http") &&
    (supabaseServiceRoleKey || supabaseAnonKey)
  );
}

let cachedAdminClient: SupabaseClient | null = null;
let cachedAnonClient: SupabaseClient | null = null;

/**
 * Returns a Supabase client with administrative privileges (service role).
 * Falls back to anon key if service role is not provided.
 * Returns null if Supabase is not configured.
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (cachedAdminClient) {
    return cachedAdminClient;
  }

  const key = supabaseServiceRoleKey || supabaseAnonKey;
  if (!key || !supabaseUrl) {
    return null;
  }

  cachedAdminClient = createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedAdminClient;
}

/**
 * Returns a standard Supabase client using the public anonymous key.
 * Respects Row Level Security (RLS) policies.
 * Returns null if Supabase is not configured.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (cachedAnonClient) {
    return cachedAnonClient;
  }

  cachedAnonClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedAnonClient;
}
