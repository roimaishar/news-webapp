<script setup lang="ts">
import type { BriefArticle } from '~/types/brief'

interface Props {
  article: BriefArticle
  variant?: 'feature' | 'compact'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'compact'
})

const emit = defineEmits<{
  click: [article: BriefArticle]
}>()

const { locale } = useI18n()

const formattedTime = computed(() => {
  const date = new Date(props.article.publishedAt)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)

  if (diffMins < 60) {
    return `${diffMins}m`
  } else if (diffHours < 24) {
    return `${diffHours}h`
  } else {
    return date.toLocaleDateString(locale.value, { month: 'short', day: 'numeric' })
  }
})

const handleClick = () => {
  emit('click', props.article)
}
</script>

<template>
  <article
    class="glass-card article-hover rounded-2xl cursor-pointer group overflow-hidden"
    :class="[
      variant === 'feature'
        ? 'p-6 md:p-8'
        : 'p-4 md:p-5'
    ]"
    @click="handleClick"
  >
    <!-- Decorative gradient overlay -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-israel/5"></div>
    </div>

    <!-- Content wrapper -->
    <div class="relative z-10">
      <!-- Israel Relevance Badge with icon -->
      <div
        v-if="article.israelRelevant"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium mb-3 badge-glow"
        :class="variant === 'feature' ? 'mb-4' : 'mb-3'"
        style="background: linear-gradient(135deg, rgba(220, 38, 38, 0.12), rgba(220, 38, 38, 0.08)); color: #dc2626; border: 1px solid rgba(220, 38, 38, 0.2);"
      >
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <span>{{ $t('article.israelRelevant') }}</span>
      </div>

      <!-- Article Title with underline effect -->
      <h3
        class="font-semibold leading-snug mb-3 text-ink-primary group-hover:text-accent-primary transition-colors duration-200"
        :class="[
          variant === 'feature'
            ? 'text-xl md:text-2xl mb-4'
            : 'text-base md:text-lg'
        ]"
      >
        {{ article.title }}
      </h3>

      <!-- Metadata Footer with enhanced visuals -->
      <div class="flex items-center justify-between gap-3 text-sm">
        <!-- Source with gradient background -->
        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs shadow-sm"
            style="background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(37, 99, 235, 0.08)); color: #2563eb; border: 1px solid rgba(37, 99, 235, 0.15);"
          >
            {{ article.sourceInitials }}
          </span>
          <span class="text-xs md:text-sm text-ink-secondary font-medium">{{ article.sourceName }}</span>
        </div>

        <!-- Timestamp with icon -->
        <div class="flex items-center gap-1.5 text-ink-muted">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <time :datetime="article.publishedAt" class="text-xs md:text-sm">
            {{ formattedTime }}
          </time>
        </div>
      </div>

      <!-- Read more indicator -->
      <div class="mt-3 flex items-center gap-1.5 text-accent-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span>{{ $t('article.readMore') }}</span>
        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Ensure proper stacking context */
article {
  position: relative;
}
</style>
