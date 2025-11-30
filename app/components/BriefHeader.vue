<script setup lang="ts">
import type { BriefMetadata } from '~/types/brief'

interface Props {
  metadata: BriefMetadata
}

const props = defineProps<Props>()

// Format timestamp to readable date
const formattedDate = computed(() => {
  const date = new Date(props.metadata.generatedAt)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })
})

// Language display names
const languageNames: Record<string, string> = {
  he: 'עברית',
  ar: 'العربية',
  en: 'English'
}

const languageName = computed(() => languageNames[props.metadata.language] || props.metadata.language)
</script>

<template>
  <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg mb-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 flex items-center gap-3">
        <span>📰</span>
        <span>Daily News Brief</span>
      </h1>

      <div class="flex flex-wrap gap-4 text-sm opacity-90">
        <div class="flex items-center gap-2">
          <span class="font-semibold">📅</span>
          <span>{{ formattedDate }}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="font-semibold">📊</span>
          <span>{{ metadata.totalArticles }} articles</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="font-semibold">🔴</span>
          <span>{{ metadata.israelRelevantCount }} Israel-relevant</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="font-semibold">🌍</span>
          <span>{{ languageName }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
