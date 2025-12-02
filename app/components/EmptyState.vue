<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="glass-card rounded-3xl p-12 md:p-16 text-center">
    <!-- Animated illustration -->
    <div class="mb-8 inline-flex">
      <svg width="200" height="200" viewBox="0 0 200 200" class="empty-state-illustration">
        <!-- Newspaper icon with animation -->
        <g class="animate-float">
          <rect x="40" y="60" width="120" height="80" rx="4" fill="url(#gradient1)" opacity="0.2"/>
          <rect x="50" y="70" width="100" height="4" rx="2" fill="currentColor" opacity="0.3"/>
          <rect x="50" y="82" width="80" height="3" rx="1.5" fill="currentColor" opacity="0.2"/>
          <rect x="50" y="92" width="90" height="3" rx="1.5" fill="currentColor" opacity="0.2"/>
          <circle cx="100" cy="120" r="8" fill="url(#gradient2)" opacity="0.3"/>
        </g>

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <h3 class="text-2xl font-bold text-ink-primary mb-3">
      {{ t('app.noArticles') }}
    </h3>
    <p class="text-ink-secondary max-w-md mx-auto">
      {{ t('app.noArticlesDescription') }}
    </p>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.empty-state-illustration {
  color: theme('colors.ink.muted');
}
</style>
