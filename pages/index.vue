<script setup lang="ts">
import type { BriefResponse, Language } from '~/types/brief'

// Page metadata
useHead({
  title: 'Daily News Brief - AI-Curated News',
  meta: [
    { name: 'description', content: 'Stay informed with AI-curated news from 15 international sources' }
  ]
})

// Reactive state
const selectedLanguage = ref<Language>('he')
const isLoading = ref(true)
const error = ref<string | null>(null)

// Fetch brief data
const { data: brief, refresh } = await useFetch<BriefResponse>('/api/brief/latest', {
  query: { language: selectedLanguage },
  watch: [selectedLanguage],
  onRequest: () => {
    isLoading.value = true
    error.value = null
  },
  onResponse: () => {
    isLoading.value = false
  },
  onResponseError: (ctx) => {
    isLoading.value = false
    error.value = 'Failed to load news brief. Please try again later.'
    console.error('Error fetching brief:', ctx.error)
  }
})

// Handle language change
const handleLanguageChange = (language: Language) => {
  selectedLanguage.value = language
}

// Detect RTL languages
const isRtl = computed(() => ['he', 'ar'].includes(selectedLanguage.value))

// Real-time updates
const { isListening } = useRealtimeBrief(selectedLanguage, () => {
  // Refresh brief when new data arrives
  refresh()
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Language Toggle and Status -->
      <div class="mb-6 flex flex-col items-center gap-3">
        <LanguageToggle
          :current-language="selectedLanguage"
          @change="handleLanguageChange"
        />

        <!-- Real-time Status Indicator -->
        <div
          v-if="isListening"
          class="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full"
        >
          <span class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Live updates active</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Loading news brief...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-700 text-lg mb-4">{{ error }}</p>
        <button
          @click="refresh"
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Brief Content -->
      <template v-else-if="brief">
        <!-- Header -->
        <BriefHeader :metadata="brief.metadata" />

        <!-- No Articles Message -->
        <div
          v-if="brief.metadata.totalArticles === 0"
          class="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center"
        >
          <p class="text-yellow-800 text-lg">
            No news brief available yet. Check back soon!
          </p>
        </div>

        <!-- Articles -->
        <div v-else class="space-y-8">
          <!-- Israel-Relevant News -->
          <ArticleList
            v-if="brief.israelRelevant.length > 0"
            :articles="brief.israelRelevant"
            section-title="Israel-Relevant News"
            section-icon="🔴"
            text-color-class="text-israel-relevant"
          />

          <!-- Other Coverage -->
          <ArticleList
            v-if="brief.otherCoverage.length > 0"
            :articles="brief.otherCoverage"
            section-title="Other Coverage"
            section-icon="⚪"
            text-color-class="text-other-coverage"
          />
        </div>

        <!-- Footer -->
        <footer class="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>
            Generated from 15 international news sources using AI-powered curation
          </p>
          <p class="mt-2">
            Data updates automatically 6 times daily
          </p>
        </footer>
      </template>
    </div>
  </div>
</template>
