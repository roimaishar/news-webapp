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

const { t } = useI18n()

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
  <div class="glass-card rounded-xl p-2 flex items-center gap-2">
    <span class="text-sm font-medium text-ink-secondary px-2">{{ t('language.label') }}</span>
    <div class="flex gap-1">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="handleLanguageChange(lang.code)"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        :class="
          currentLanguage === lang.code
            ? 'bg-accent-primary text-white shadow-sm'
            : 'bg-ink-primary/5 text-ink-primary hover:bg-ink-primary/10'
        "
        :aria-label="t('language.switchTo', { lang: lang.name })"
      >
        <span class="me-1">{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>
