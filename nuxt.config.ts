// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  app: {
    head: {
      title: 'Daily News Brief',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AI-curated daily news briefs with Israel-relevant coverage from international sources' },
        { property: 'og:title', content: 'Daily News Brief' },
        { property: 'og:description', content: 'AI-curated news from 15 international sources' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  runtimeConfig: {
    // Server-only variables (never exposed to client)
    supabaseConnectionString: process.env.SUPABASE_CONNECTION_STRING || '',

    public: {
      // Client-exposed variables
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
    }
  },

  typescript: {
    strict: true,
    typeCheck: false // Can enable for stricter checking
  }
})
