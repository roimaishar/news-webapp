// Ultra-simple endpoint to check environment variables

export default defineEventHandler(() => {
  return {
    timestamp: new Date().toISOString(),
    processEnvKeys: Object.keys(process.env).filter(key => key.includes('SUPABASE')),
    supabaseUrl: {
      exists: !!process.env.SUPABASE_URL,
      length: process.env.SUPABASE_URL?.length || 0,
      first20: process.env.SUPABASE_URL?.substring(0, 20) || 'NOT_SET'
    },
    supabaseAnonKey: {
      exists: !!process.env.SUPABASE_ANON_KEY,
      length: process.env.SUPABASE_ANON_KEY?.length || 0,
      first20: process.env.SUPABASE_ANON_KEY?.substring(0, 20) || 'NOT_SET'
    }
  }
})
