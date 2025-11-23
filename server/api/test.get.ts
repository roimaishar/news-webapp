// Diagnostic endpoint to test environment variables and Supabase connection

export default defineEventHandler(async (event) => {
  try {
    // Check environment variables
    const envCheck = {
      supabaseUrl: process.env.SUPABASE_URL ? 'Set ✓' : 'Missing ✗',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY ? 'Set ✓' : 'Missing ✗',
      supabaseUrlValue: process.env.SUPABASE_URL?.substring(0, 30) + '...',
      supabaseAnonKeyLength: process.env.SUPABASE_ANON_KEY?.length || 0
    }

    // Try to create Supabase client
    let supabaseStatus = 'Not tested'
    let queryStatus = 'Not tested'
    let articleCount = 0

    try {
      const supabase = useSupabaseServer()
      supabaseStatus = 'Client created ✓'

      // Try a simple query
      const { data, error } = await supabase
        .from('curated_articles')
        .select('id')
        .limit(1)

      if (error) {
        queryStatus = `Query error: ${error.message}`
      } else {
        queryStatus = 'Query successful ✓'

        // Count articles
        const { count } = await supabase
          .from('curated_articles')
          .select('*', { count: 'exact', head: true })

        articleCount = count || 0
      }
    } catch (err: any) {
      supabaseStatus = `Client error: ${err.message}`
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: {
        ...envCheck
      },
      supabase: {
        clientStatus: supabaseStatus,
        queryStatus,
        articleCount
      }
    }
  } catch (error: any) {
    console.error('Test endpoint error:', error)
    return {
      status: 'error',
      message: error.message,
      stack: error.stack,
      errorType: error.constructor?.name,
      errorString: error.toString()
    }
  }
})
