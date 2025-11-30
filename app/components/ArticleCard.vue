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
    class="glass-card rounded-2xl cursor-pointer transition-all duration-200"
    :class="[
      variant === 'feature'
        ? 'p-6 md:p-8'
        : 'p-4 md:p-5'
    ]"
    @click="handleClick"
  >
    <!-- Israel Relevance Badge -->
    <div
      v-if="article.israelRelevant"
      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3"
      :class="variant === 'feature' ? 'mb-4' : 'mb-3'"
      style="background: rgba(220, 38, 38, 0.1); color: #dc2626;"
    >
      <span class="w-1.5 h-1.5 rounded-full bg-accent-israel"></span>
      <span>{{ $t('article.israelRelevant') }}</span>
    </div>

    <!-- Article Title -->
    <h3
      class="font-semibold leading-snug mb-3 text-ink-primary"
      :class="[
        variant === 'feature'
          ? 'text-xl md:text-2xl mb-4'
          : 'text-base md:text-lg'
      ]"
    >
      {{ article.title }}
    </h3>

    <!-- Metadata Footer -->
    <div class="flex items-center justify-between gap-3 text-sm text-ink-secondary">
      <!-- Source -->
      <div class="flex items-center gap-2">
        <span
          class="inline-flex items-center justify-center w-6 h-6 rounded-full font-semibold text-xs"
          style="background: rgba(37, 99, 235, 0.1); color: #2563eb;"
        >
          {{ article.sourceInitials }}
        </span>
        <span class="text-xs md:text-sm">{{ article.sourceName }}</span>
      </div>

      <!-- Timestamp -->
      <time :datetime="article.publishedAt" class="text-xs md:text-sm text-ink-muted">
        {{ formattedTime }}
      </time>
    </div>
  </article>
</template>

<style scoped>
/* Additional hover effects */
article:active {
  transform: scale(0.98);
}
</style>
