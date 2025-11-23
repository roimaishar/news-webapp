// Define types inline to avoid build path issues
type Article = {
  id: number
  url: string
  title: string
  source: string
  language: string
  published_date: string
  scraped_at: string
}

type CuratedArticle = {
  id: number
  unified_title: string
  original_article_ids: number[]
  article_count: number
  rank_position: number
  israel_relevant: boolean
  target_language: string
  curated_at: string
}

type BriefArticle = {
  id: number
  title: string
  source: string
  sourceInitials: string
  url: string
  rankPosition: number
  articleCount: number
}

type BriefMetadata = {
  totalArticles: number
  israelRelevantCount: number
  otherCoverageCount: number
  generatedAt: string
  language: string
}

type BriefResponse = {
  israelRelevant: BriefArticle[]
  otherCoverage: BriefArticle[]
  metadata: BriefMetadata
}

// Source initials mapping
const SOURCE_INITIALS: Record<string, string> = {
  'Ynet': 'YN',
  'The Marker': 'TM',
  'Walla': 'WA',
  'Israel Hayom': 'IH',
  'Al Jazeera': 'AJ',
  'BBC Arabic': 'BBC-AR',
  'Sky News Arabia': 'SKY',
  'France 24 Arabic': 'F24',
  'Middle East Eye': 'MEE',
  'BBC News': 'BBC',
  'The Guardian': 'TG',
  'CNN': 'CNN',
  'Al Jazeera English': 'AJ-EN',
  'New York Times': 'NYT',
  'Times of Israel': 'TOI'
}

export default defineEventHandler(async (event): Promise<BriefResponse> => {
  const query = getQuery(event)
  const language = (query.language as string) || 'he'

  try {
    // Check environment variables first
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      throw createError({
        statusCode: 500,
        message: 'Server configuration error: Missing database credentials'
      })
    }

    const supabase = useSupabaseServer()

    // Fetch the most recent curated articles for the specified language
    const { data: curatedArticles, error: curatedError } = await supabase
      .from('curated_articles')
      .select('*')
      .eq('target_language', language)
      .order('curated_at', { ascending: false })
      .limit(100) // Get latest batch

    if (curatedError) {
      throw createError({
        statusCode: 500,
        message: `Failed to fetch curated articles: ${curatedError.message}`
      })
    }

    if (!curatedArticles || curatedArticles.length === 0) {
      // Return empty brief if no articles found
      return {
        israelRelevant: [],
        otherCoverage: [],
        metadata: {
          totalArticles: 0,
          israelRelevantCount: 0,
          otherCoverageCount: 0,
          generatedAt: new Date().toISOString(),
          language
        }
      }
    }

    // Get the latest curation timestamp
    const latestCurationTime = curatedArticles[0].curated_at

    // Filter only articles from the latest curation batch
    const latestBatch = curatedArticles.filter(
      (article: CuratedArticle) => article.curated_at === latestCurationTime
    )

    // Extract all original article IDs
    const allArticleIds = latestBatch.flatMap(
      (curated: CuratedArticle) => curated.original_article_ids
    )

    // Fetch original articles to get URLs and sources
    const { data: originalArticles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .in('id', allArticleIds)

    if (articlesError) {
      throw createError({
        statusCode: 500,
        message: `Failed to fetch original articles: ${articlesError.message}`
      })
    }

    // Create a map of article ID to article data
    const articleMap = new Map<number, Article>()
    originalArticles?.forEach((article: Article) => {
      articleMap.set(article.id, article)
    })

    // Transform curated articles into brief articles
    const briefArticles: BriefArticle[] = latestBatch.map((curated: CuratedArticle) => {
      // Get the first original article for URL and source
      const firstArticleId = curated.original_article_ids[0]
      const originalArticle = articleMap.get(firstArticleId)

      const source = originalArticle?.source || 'Unknown'
      const sourceInitials = SOURCE_INITIALS[source] || source.substring(0, 3).toUpperCase()

      return {
        id: curated.id,
        title: curated.unified_title,
        source,
        sourceInitials,
        url: originalArticle?.url || '#',
        rankPosition: curated.rank_position,
        articleCount: curated.article_count
      }
    })

    // Sort by rank position
    briefArticles.sort((a, b) => a.rankPosition - b.rankPosition)

    // Split into Israel-relevant and other coverage
    const israelRelevant: BriefArticle[] = []
    const otherCoverage: BriefArticle[] = []

    latestBatch.forEach((curated: CuratedArticle, index: number) => {
      const briefArticle = briefArticles[index]
      if (curated.israel_relevant) {
        israelRelevant.push(briefArticle)
      } else {
        otherCoverage.push(briefArticle)
      }
    })

    // Build response
    const response: BriefResponse = {
      israelRelevant,
      otherCoverage,
      metadata: {
        totalArticles: briefArticles.length,
        israelRelevantCount: israelRelevant.length,
        otherCoverageCount: otherCoverage.length,
        generatedAt: latestCurationTime,
        language
      }
    }

    // Set cache headers (10 minutes)
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=600, s-maxage=600',
      'Content-Type': 'application/json'
    })

    return response
  } catch (error: any) {
    console.error('Error fetching latest brief:', error)
    console.error('Error stack:', error.stack)
    console.error('Error details:', JSON.stringify(error, null, 2))

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch latest news brief',
      data: {
        errorType: error.constructor?.name,
        errorDetails: error.toString()
      }
    })
  }
})
