#!/usr/bin/env node

// Quick diagnostic script to test the API endpoint

const API_URL = 'https://news-webapp-4fasoyk40-maishs-projects-bce501ab.vercel.app/api/brief/latest?language=he';

console.log('🔍 Testing API endpoint...\n');
console.log(`URL: ${API_URL}\n`);

fetch(API_URL)
  .then(async response => {
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()));
    console.log('\n');

    const text = await response.text();

    if (response.ok) {
      try {
        const data = JSON.parse(text);
        console.log('✅ API Response (parsed JSON):');
        console.log(JSON.stringify(data, null, 2));

        console.log('\n📊 Summary:');
        console.log(`- Total articles: ${data.metadata?.totalArticles || 0}`);
        console.log(`- Israel-relevant: ${data.metadata?.israelRelevantCount || 0}`);
        console.log(`- Other coverage: ${data.metadata?.otherCoverageCount || 0}`);
        console.log(`- Language: ${data.metadata?.language || 'unknown'}`);
        console.log(`- Generated: ${data.metadata?.generatedAt || 'unknown'}`);
      } catch (e) {
        console.log('⚠️  Response is not valid JSON:');
        console.log(text);
      }
    } else {
      console.log('❌ Error response:');
      console.log(text);
    }
  })
  .catch(error => {
    console.error('❌ Network error:', error.message);
  });
