<script setup lang="ts">
interface Props {
  variant?: 'feature' | 'compact'
  count?: number
}

withDefaults(defineProps<Props>(), {
  variant: 'compact',
  count: 1
})
</script>

<template>
  <div
    v-for="i in count"
    :key="i"
    class="glass-card rounded-2xl relative overflow-hidden"
    :class="[
      variant === 'feature'
        ? 'p-6 md:p-8 h-48'
        : 'p-4 md:p-5 h-32'
    ]"
  >
    <!-- Animated shimmer overlay -->
    <div class="absolute inset-0 shimmer-effect"></div>

    <!-- Content placeholders -->
    <div class="relative z-10 space-y-3">
      <div class="skeleton-box h-6 w-3/4 rounded" />
      <div class="skeleton-box h-6 w-5/6 rounded" />
      <div class="skeleton-box h-4 w-1/2 rounded mt-4" />
    </div>
  </div>
</template>

<style scoped>
.shimmer-effect {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-box {
  background: linear-gradient(
    90deg,
    rgba(15, 23, 42, 0.08) 0%,
    rgba(15, 23, 42, 0.04) 50%,
    rgba(15, 23, 42, 0.08) 100%
  );
}
</style>
