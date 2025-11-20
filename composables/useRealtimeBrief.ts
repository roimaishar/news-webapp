import { createClient } from '@supabase/supabase-js'
import type { Language } from '~/types/brief'

export const useRealtimeBrief = (language: Ref<Language>, onUpdate: () => void) => {
  const config = useRuntimeConfig()
  const isListening = ref(false)
  const lastUpdateTime = ref<string | null>(null)

  // Create Supabase client for real-time subscriptions
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )

  // Set up real-time subscription
  const channel = supabase
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

        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('New News Brief Available', {
            body: 'A fresh news brief has been published. Refreshing...',
            icon: '/favicon.ico'
          })
        }

        // Trigger update callback
        onUpdate()
      }
    )

  // Start listening
  const startListening = () => {
    if (!isListening.value) {
      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          isListening.value = true
          console.log('Subscribed to real-time updates')
        }
      })
    }
  }

  // Stop listening
  const stopListening = () => {
    if (isListening.value) {
      channel.unsubscribe()
      isListening.value = false
      console.log('Unsubscribed from real-time updates')
    }
  }

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  // Auto-start on mount
  onMounted(() => {
    startListening()
    requestNotificationPermission()
  })

  // Clean up on unmount
  onUnmounted(() => {
    stopListening()
  })

  // Watch for language changes
  watch(language, (newLang, oldLang) => {
    if (newLang !== oldLang) {
      // Resubscribe with new language filter
      stopListening()
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
