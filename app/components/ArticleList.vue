<script setup lang="ts">
import type { BriefArticle } from '~/types/brief'

interface Props {
  articles: BriefArticle[]
  sectionTitle: string
  sectionIcon: string
  emptyMessage?: string
  textColorClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  emptyMessage: 'No articles in this section',
  textColorClass: 'text-gray-700'
})
</script>

<template>
  <section class="mb-8">
    <h2 class="text-2xl font-bold mb-4 flex items-center gap-2" :class="textColorClass">
      <span>{{ sectionIcon }}</span>
      <span>{{ sectionTitle }}</span>
    </h2>

    <div v-if="articles.length === 0" class="text-gray-500 italic p-4 bg-gray-50 rounded-lg">
      {{ emptyMessage }}
    </div>

    <ol v-else class="space-y-3">
      <li
        v-for="article in articles"
        :key="article.id"
        class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border-l-4"
        :class="textColorClass === 'text-israel-relevant' ? 'border-israel-relevant' : 'border-other-coverage'"
      >
        <a
          :href="article.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block group"
        >
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 font-bold text-lg" :class="textColorClass">
              {{ article.rankPosition }}.
            </span>

            <div class="flex-grow">
              <div class="flex items-baseline gap-2 mb-1">
                <span
                  class="inline-block px-2 py-0.5 text-xs font-semibold rounded"
                  :class="textColorClass === 'text-israel-relevant' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'"
                >
                  {{ article.sourceInitials }}
                </span>

                <span v-if="article.articleCount > 1" class="text-xs text-gray-500">
                  ({{ article.articleCount }} sources)
                </span>
              </div>

              <p class="text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-relaxed">
                {{ article.title }}
              </p>
            </div>

            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </a>
      </li>
    </ol>
  </section>
</template>
