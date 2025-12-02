<script setup lang="ts">
import type { BriefResponse, BriefArticle, Language } from '~/types/brief'

const { t, locale } = useI18n()

// Activate magnetic hover effect
useMagneticEffect()

// Page metadata
useHead({
  title: computed(() => t('meta.title')),
  meta: [
    { name: 'description', content: computed(() => t('meta.description')) }
  ]
})

// Reactive state
const selectedLanguage = ref<Language>('he')
const selectedArticle = ref<BriefArticle | null>(null)
const isDrawerOpen = ref(false)

// Fetch brief data
const { data: brief, error: fetchError, status, refresh } = await useFetch<BriefResponse>('/api/brief/latest', {
  query: { language: selectedLanguage },
  watch: [selectedLanguage]
})

// Computed states
const isLoading = computed(() => status.value === 'pending')
const error = computed(() => fetchError.value ? t('errors.loadFailed') : null)

// Handle language change
const handleLanguageChange = (language: Language) => {
  selectedLanguage.value = language
  locale.value = language
}

// Detect RTL languages
const isRtl = computed(() => ['he', 'ar'].includes(selectedLanguage.value))

// Handle article click
const handleArticleClick = (article: BriefArticle) => {
  selectedArticle.value = article
  isDrawerOpen.value = true
}

// Handle drawer close
const handleDrawerClose = () => {
  isDrawerOpen.value = false
  setTimeout(() => {
    selectedArticle.value = null
  }, 300)
}

// Real-time updates
const { isListening } = useRealtimeBrief(selectedLanguage, () => {
  refresh()
})

// Sync i18n locale with selected language
watch(selectedLanguage, (newLang) => {
  locale.value = newLang
}, { immediate: true })
</script>

<template>
  <div
    class="min-h-screen py-6 md:py-8 px-4"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <header class="mb-8 md:mb-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <!-- Title with gradient animation -->
          <div class="text-center md:text-start fade-in">
            <h1 class="text-3xl md:text-4xl font-bold mb-2">
              <span class="gradient-text">{{ t('app.title') }}</span>
            </h1>
            <p class="text-sm md:text-base text-ink-secondary flex items-center gap-2 justify-center md:justify-start">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{{ t('app.subtitle') }}</span>
            </p>
          </div>

          <!-- Language Toggle with delay -->
          <div class="fade-in-delay-1">
            <LanguageToggle
              :current-language="selectedLanguage"
              @change="handleLanguageChange"
            />
          </div>
        </div>

        <!-- Real-time Status Indicator with glow -->
        <div
          v-if="isListening"
          class="glass-card rounded-full px-4 py-2.5 flex items-center justify-center gap-2 text-xs md:text-sm text-accent-primary max-w-fit mx-auto md:mx-0 badge-glow fade-in-delay-2"
        >
          <span class="inline-block w-2 h-2 bg-accent-primary rounded-full pulse-slow"></span>
          <span class="font-medium">{{ t('status.liveUpdates') }}</span>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <ArticleSkeleton variant="feature" :count="1" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ArticleSkeleton variant="compact" :count="4" />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="glass-card rounded-2xl p-6 md:p-8 text-center">
        <div class="max-w-md mx-auto">
          <div class="w-16 h-16 rounded-full bg-accent-israel/10 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-israel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-ink-primary text-lg mb-6">{{ error }}</p>
          <button
            @click="refresh"
            class="px-6 py-3 bg-accent-primary text-white rounded-xl font-medium hover:bg-accent-primary/90 transition-colors"
          >
            {{ t('errors.tryAgain') }}
          </button>
        </div>
      </div>

      <!-- Brief Content -->
      <template v-else-if="brief && brief.metadata">
        <!-- Brief Metadata -->
        <div class="glass-card rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <div class="flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
            <div class="flex items-center gap-2 text-ink-secondary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time :datetime="brief.metadata.briefId">
                {{ new Date(brief.metadata.briefId).toLocaleDateString(locale, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) }}
              </time>
            </div>
            <div class="flex items-center gap-2 text-ink-muted">
              <span>{{ t('app.articlesCount', { count: brief.metadata.totalArticles }) }}</span>
            </div>
          </div>
        </div>

        <!-- No Articles Message -->
        <div
          v-if="brief.metadata.totalArticles === 0"
          class="glass-card rounded-2xl p-8 md:p-12 text-center"
        >
          <div class="w-16 h-16 rounded-full bg-ink-primary/5 flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p class="text-ink-secondary text-lg">
            {{ t('app.noArticles') }}
          </p>
        </div>

        <!-- Articles -->
        <div v-else class="space-y-6 md:space-y-8">
          <!-- Israel-Relevant News -->
          <section v-if="brief.israelRelevant.length > 0">
            <h2 class="text-xl md:text-2xl font-bold text-ink-primary mb-4 md:mb-6">
              {{ t('sections.israelRelevant') }}
            </h2>

            <!-- Feature Article (first one) -->
            <ArticleCard
              :article="brief.israelRelevant[0]"
              variant="feature"
              class="mb-4"
              @click="handleArticleClick"
            />

            <!-- Remaining Articles (grid) -->
            <div v-if="brief.israelRelevant.length > 1" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArticleCard
                v-for="article in brief.israelRelevant.slice(1)"
                :key="article.id"
                :article="article"
                variant="compact"
                @click="handleArticleClick"
              />
            </div>
          </section>

          <!-- Other Coverage -->
          <section v-if="brief.otherCoverage.length > 0">
            <h2 class="text-xl md:text-2xl font-bold text-ink-primary mb-4 md:mb-6">
              {{ t('sections.otherCoverage') }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArticleCard
                v-for="article in brief.otherCoverage"
                :key="article.id"
                :article="article"
                variant="compact"
                @click="handleArticleClick"
              />
            </div>
          </section>
        </div>

        <!-- Footer -->
        <footer class="mt-12 md:mt-16 pt-6 border-t border-glass-border text-center text-sm text-ink-muted space-y-2">
          <p>{{ t('footer.sources') }}</p>
          <p>{{ t('footer.updates') }}</p>
        </footer>
      </template>

      <!-- Fallback for unexpected states -->
      <div v-else class="glass-card rounded-2xl p-6 md:p-8 text-center">
        <div class="max-w-md mx-auto">
          <p class="text-ink-secondary text-lg mb-6">{{ t('errors.unableToLoad') }}</p>
          <button
            @click="refresh()"
            class="px-6 py-3 bg-accent-primary text-white rounded-xl font-medium hover:bg-accent-primary/90 transition-colors"
          >
            {{ t('errors.retry') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Article Drawer -->
    <ArticleDrawer
      :article="selectedArticle"
      :is-open="isDrawerOpen"
      @close="handleDrawerClose"
    />
  </div>
</template>
