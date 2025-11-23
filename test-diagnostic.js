#!/usr/bin/env node

const DIAGNOSTIC_URL = 'https://news-webapp-one.vercel.app/api/test';

console.log('🔍 Testing diagnostic endpoint...\n');

fetch(DIAGNOSTIC_URL)
  .then(async response => {
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error('❌ Error:', error.message);
  });
