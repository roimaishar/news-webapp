// Direct Supabase connection test
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  try {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_ANON_KEY

    if (!url || !key) {
      return {
        success: false,
        error: 'Missing credentials',
        urlExists: !!url,
        keyExists: !!key
      }
    }

    // Create client
    const supabase = createClient(url, key)

    // Simple query
    const { data, error } = await supabase
      .from('curated_articles')
      .select('id')
      .limit(1)

    if (error) {
      return {
        success: false,
        error: 'Query failed',
        errorMessage: error.message,
        errorDetails: JSON.stringify(error)
      }
    }

    return {
      success: true,
      message: 'Supabase connection works!',
      hasData: !!data && data.length > 0,
      dataCount: data?.length || 0
    }
  } catch (err: any) {
    return {
      success: false,
      error: 'Exception thrown',
      errorMessage: err.message,
      errorStack: err.stack,
      errorType: err.constructor?.name
    }
  }
})
