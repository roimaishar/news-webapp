import { createClient } from '@supabase/supabase-js'

type Language = 'he' | 'ar' | 'en'

export const useRealtimeBrief = (language: Ref<Language>, onUpdate: () => void) => {
  const isListening = ref(false)
  const lastUpdateTime = ref<string | null>(null)

  // Only run on client - WebSocket/realtime is client-only
  if (import.meta.server) {
    return {
      isListening,
      lastUpdateTime,
      startListening: () => {},
      stopListening: () => {}
    }
  }

  const config = useRuntimeConfig()

  // Check if Supabase credentials are available
  if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
    console.warn('Supabase credentials not available for real-time updates')
    return {
      isListening,
      lastUpdateTime,
      startListening: () => {},
      stopListening: () => {}
    }
  }

  let supabase: ReturnType<typeof createClient> | null = null
  let channel: ReturnType<ReturnType<typeof createClient>['channel']> | null = null

  const setupChannel = () => {
    if (!supabase) {
      supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
    }

    channel = supabase
      .channel('curated_articles_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'curated_articles',
          filter: `target_language=eq.${language.value}`
        },
        (payload) => {
          console.log('New curated article detected:', payload)
          lastUpdateTime.value = new Date().toISOString()

          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New News Brief Available', {
              body: 'A fresh news brief has been published. Refreshing...',
              icon: '/favicon.ico'
            })
          }

          onUpdate()
        }
      )
  }

  const startListening = () => {
    if (!isListening.value && channel) {
      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          isListening.value = true
          console.log('Subscribed to real-time updates')
        }
      })
    }
  }

  const stopListening = () => {
    if (channel) {
      channel.unsubscribe()
      isListening.value = false
      console.log('Unsubscribed from real-time updates')
    }
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  onMounted(() => {
    setupChannel()
    startListening()
    requestNotificationPermission()
  })

  onUnmounted(() => {
    stopListening()
  })

  watch(language, (newLang, oldLang) => {
    if (newLang !== oldLang) {
      stopListening()
      setupChannel()
      setTimeout(() => startListening(), 100)
    }
  })

  return {
    isListening,
    lastUpdateTime,
    startListening,
    stopListening
  }
}
