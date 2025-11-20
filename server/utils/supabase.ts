import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client using public URL and anon key
// (For production, you'd use service role key for server-side operations)
export const useSupabaseServer = () => {
  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided')
  }

  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )
}
