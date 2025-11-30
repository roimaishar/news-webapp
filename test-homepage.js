#!/usr/bin/env node

const URL = 'https://news-webapp-one.vercel.app/';

console.log('Testing homepage...\n');

fetch(URL)
  .then(async response => {
    console.log(`Status: ${response.status} ${response.statusText}\n`);

    const html = await response.text();

    if (response.ok) {
      console.log('✅ Homepage loaded successfully!\n');
      console.log(`HTML length: ${html.length} characters`);

      // Check for key elements
      if (html.includes('Daily News Brief')) {
        console.log('✅ Title found');
      }
      if (html.includes('Language')) {
        console.log('✅ Language toggle found');
      }
      if (html.includes('Israel')) {
        console.log('✅ Content structure found');
      }

      // Check for errors in HTML
      if (html.includes('500') || html.includes('Error')) {
        console.log('\n⚠️  Warning: HTML contains error text');
      }
    } else {
      console.log('❌ Failed to load homepage');
      console.log(html.substring(0, 500));
    }
  })
  .catch(error => {
    console.error('❌ Error:', error.message);
  });
