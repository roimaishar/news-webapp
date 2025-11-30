<script setup lang="ts">
import type { BriefArticle } from '~/types/brief'

interface Props {
  article: BriefArticle | null
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const { locale } = useI18n()

const formattedDate = computed(() => {
  if (!props.article) return ''
  const date = new Date(props.article.publishedAt)
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const handleClose = () => {
  emit('close')
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleClose()
  }
}

// Handle keyboard events when drawer is open
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && article"
        class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:justify-end bg-ink-primary/40 backdrop-blur-sm"
        @click="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition-transform duration-300"
          enter-from-class="translate-y-full md:translate-y-0 md:translate-x-full"
          enter-to-class="translate-y-0 md:translate-x-0"
          leave-active-class="transition-transform duration-300"
          leave-from-class="translate-y-0 md:translate-x-0"
          leave-to-class="translate-y-full md:translate-y-0 md:translate-x-full"
        >
          <div
            v-if="isOpen"
            class="glass-card w-full md:w-[600px] md:h-full md:max-h-screen max-h-[90vh] rounded-t-3xl md:rounded-none overflow-y-auto"
            role="dialog"
            aria-modal="true"
            :aria-label="$t('article.fullArticle')"
          >
            <!-- Header -->
            <div class="sticky top-0 z-10 glass-card border-b border-glass-border px-6 py-4 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-ink-primary">
                {{ $t('article.fullArticle') }}
              </h2>
              <button
                class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-ink-primary/5 transition-colors"
                :aria-label="$t('article.close')"
                @click="handleClose"
              >
                <svg class="w-5 h-5 text-ink-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-6">
              <!-- Israel Relevance Badge -->
              <div
                v-if="article.israelRelevant"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                style="background: rgba(220, 38, 38, 0.1); color: #dc2626;"
              >
                <span class="w-2 h-2 rounded-full bg-accent-israel"></span>
                <span>{{ $t('article.israelRelevant') }}</span>
              </div>

              <!-- Title -->
              <h3 class="text-2xl md:text-3xl font-bold leading-tight text-ink-primary">
                {{ article.title }}
              </h3>

              <!-- Metadata -->
              <div class="flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
                <!-- Source -->
                <div class="flex items-center gap-2">
                  <span
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm"
                    style="background: rgba(37, 99, 235, 0.1); color: #2563eb;"
                  >
                    {{ article.sourceInitials }}
                  </span>
                  <span>{{ article.sourceName }}</span>
                </div>

                <!-- Divider -->
                <span class="w-1 h-1 rounded-full bg-ink-muted"></span>

                <!-- Timestamp -->
                <time :datetime="article.publishedAt" class="text-ink-muted">
                  {{ formattedDate }}
                </time>
              </div>

              <!-- Content -->
              <div class="prose prose-slate max-w-none">
                <p class="text-base md:text-lg leading-relaxed text-ink-secondary whitespace-pre-wrap">
                  {{ article.content }}
                </p>
              </div>

              <!-- Original Link -->
              <div class="pt-4 border-t border-glass-border">
                <a
                  :href="article.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
                >
                  <span>{{ $t('article.readOriginal') }}</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* RTL support for drawer animation */
[dir="rtl"] .md\:translate-x-full {
  transform: translateX(-100%);
}

[dir="rtl"] .md\:translate-x-0 {
  transform: translateX(0);
}
</style>
