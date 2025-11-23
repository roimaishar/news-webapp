import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client using public URL and anon key
export const useSupabaseServer = () => {
  const supabaseUrl = process.env.SUPABASE_URL || ''
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided in environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}
