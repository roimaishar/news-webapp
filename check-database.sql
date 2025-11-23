-- Run this in Supabase SQL Editor to check if you have data

-- 1. Check if there are any curated articles
SELECT
    target_language,
    COUNT(*) as article_count,
    MAX(curated_at) as latest_curation,
    MIN(curated_at) as oldest_curation
FROM curated_articles
GROUP BY target_language
ORDER BY MAX(curated_at) DESC;

-- 2. Check the most recent curated articles (top 5)
SELECT
    id,
    unified_title,
    israel_relevant,
    rank_position,
    article_count,
    target_language,
    curated_at
FROM curated_articles
ORDER BY curated_at DESC
LIMIT 5;

-- 3. Check if there are articles in the articles table
SELECT
    source,
    language,
    COUNT(*) as count,
    MAX(scraped_at) as latest_scraped
FROM articles
GROUP BY source, language
ORDER BY MAX(scraped_at) DESC
LIMIT 10;

-- 4. Check if RLS policies are working (this should return rows if public access works)
SET ROLE anon;
SELECT COUNT(*) as public_accessible_count FROM curated_articles;
SELECT COUNT(*) as public_accessible_count FROM articles;
RESET ROLE;
