#!/usr/bin/env node

const URL = 'https://news-webapp-one.vercel.app/api/env-check';

console.log('Checking environment variables on Vercel...\n');

setTimeout(() => {
  fetch(URL)
    .then(async response => {
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));

      if (!data.supabaseUrl?.exists) {
        console.log('\n❌ SUPABASE_URL is NOT set!');
      } else {
        console.log('\n✅ SUPABASE_URL is set');
      }

      if (!data.supabaseAnonKey?.exists) {
        console.log('❌ SUPABASE_ANON_KEY is NOT set!');
      } else {
        console.log('✅ SUPABASE_ANON_KEY is set');
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}, 5000);
