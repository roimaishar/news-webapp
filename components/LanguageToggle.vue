<script setup lang="ts">
import type { Language } from '~/types/brief'

interface Props {
  currentLanguage: Language
}

interface Emits {
  (e: 'change', language: Language): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const languages: Array<{ code: Language; name: string; flag: string }> = [
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'ar', name: 'العربية', flag: '🌍' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

const handleLanguageChange = (language: Language) => {
  if (language !== props.currentLanguage) {
    emit('change', language)
  }
}
</script>

<template>
  <div class="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
    <span class="text-sm font-semibold text-gray-600 px-2">Language:</span>
    <div class="flex gap-1">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="handleLanguageChange(lang.code)"
        class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
        :class="
          currentLanguage === lang.code
            ? 'bg-blue-600 text-white shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        "
      >
        <span class="mr-1">{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>
