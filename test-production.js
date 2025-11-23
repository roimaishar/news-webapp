#!/usr/bin/env node

// Test the actual production URL

const PRODUCTION_URL = 'https://news-webapp-one.vercel.app/api/brief/latest?language=he';

console.log('🔍 Testing PRODUCTION URL...\n');
console.log(`URL: ${PRODUCTION_URL}\n`);

fetch(PRODUCTION_URL)
  .then(async response => {
    console.log(`Status: ${response.status} ${response.statusText}`);

    const text = await response.text();

    if (response.ok) {
      try {
        const data = JSON.parse(text);
        console.log('✅ SUCCESS! API is working!\n');

        console.log('📊 Brief Summary:');
        console.log(`- Total articles: ${data.metadata?.totalArticles || 0}`);
        console.log(`- Israel-relevant: ${data.metadata?.israelRelevantCount || 0}`);
        console.log(`- Other coverage: ${data.metadata?.otherCoverageCount || 0}`);
        console.log(`- Language: ${data.metadata?.language || 'unknown'}`);
        console.log(`- Generated: ${data.metadata?.generatedAt || 'unknown'}\n`);

        if (data.israelRelevant.length > 0) {
          console.log('🔴 Top Israel-Relevant Headlines:');
          data.israelRelevant.slice(0, 3).forEach((article, i) => {
            console.log(`${i + 1}. [${article.sourceInitials}] ${article.title}`);
          });
        }

        console.log('\n✅ Your webapp is LIVE and working!');
        console.log('🌐 Visit: https://news-webapp-one.vercel.app');
      } catch (e) {
        console.log('⚠️  Response is not valid JSON:');
        console.log(text.substring(0, 500));
      }
    } else {
      console.log('❌ Error response:');
      console.log(text.substring(0, 500));
    }
  })
  .catch(error => {
    console.error('❌ Network error:', error.message);
  });
