#!/usr/bin/env node

// Test the latest deployment directly
const LATEST_URL = 'https://news-webapp-4sspz8z2v-maishs-projects-bce501ab.vercel.app/api/test';

console.log('🔍 Testing LATEST deployment...\n');
console.log(`URL: ${LATEST_URL}\n`);

fetch(LATEST_URL)
  .then(async response => {
    console.log(`Status: ${response.status}`);
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      console.log('\n✅ Response:\n');
      console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.log('\n❌ Non-JSON response:');
      console.log(text.substring(0, 500));
    }
  })
  .catch(error => {
    console.error('❌ Error:', error.message);
  });
