#!/usr/bin/env node

const URL = 'https://news-webapp-one.vercel.app/api/supabase-test';

console.log('Testing direct Supabase connection...\n');

setTimeout(() => {
  fetch(URL)
    .then(async response => {
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));

      if (data.success) {
        console.log('\n✅ SUCCESS! Supabase is working!');
      } else {
        console.log('\n❌ FAILED! Error:', data.error);
      }
    })
    .catch(error => {
      console.error('❌ Fetch error:', error.message);
    });
}, 5000);
