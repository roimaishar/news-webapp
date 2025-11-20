// Database types matching the Supabase schema

export interface Article {
  id: number
  url: string
  title: string
  source: string
  language: string
  published_date: string
  scraped_at: string
}

export interface Translation {
  id: number
  article_id: number
  target_language: string
  translated_title: string
  translated_at: string
}

export interface CuratedArticle {
  id: number
  unified_title: string
  original_article_ids: number[]
  article_count: number
  rank_position: number
  israel_relevant: boolean
  target_language: string
  curated_at: string
  source?: string
  url?: string
}

// API response types

export interface BriefArticle {
  id: number
  title: string
  source: string
  sourceInitials: string
  url: string
  rankPosition: number
  articleCount: number
}

export interface BriefMetadata {
  totalArticles: number
  israelRelevantCount: number
  otherCoverageCount: number
  generatedAt: string
  language: string
}

export interface BriefResponse {
  israelRelevant: BriefArticle[]
  otherCoverage: BriefArticle[]
  metadata: BriefMetadata
}

// Supported languages
export type Language = 'he' | 'ar' | 'en'

// Source name to initials mapping (from original codebase)
export const SOURCE_INITIALS: Record<string, string> = {
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
