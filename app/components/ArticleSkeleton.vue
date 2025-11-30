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
    class="glass-card rounded-2xl animate-pulse"
    :class="[
      variant === 'feature'
        ? 'p-6 md:p-8'
        : 'p-4 md:p-5'
    ]"
  >
    <!-- Badge Placeholder (sometimes visible) -->
    <div
      v-if="Math.random() > 0.5"
      class="w-32 h-6 rounded-full mb-3"
      :class="variant === 'feature' ? 'mb-4' : 'mb-3'"
      style="background: rgba(100, 116, 139, 0.1);"
    ></div>

    <!-- Title Placeholder -->
    <div class="space-y-2 mb-3" :class="{ 'mb-4': variant === 'feature' }">
      <div
        class="h-5 rounded"
        :class="[
          variant === 'feature'
            ? 'h-6 md:h-7'
            : 'h-4 md:h-5'
        ]"
        style="background: rgba(100, 116, 139, 0.15); width: 90%;"
      ></div>
      <div
        v-if="variant === 'feature' || Math.random() > 0.3"
        class="h-5 rounded"
        :class="[
          variant === 'feature'
            ? 'h-6 md:h-7'
            : 'h-4 md:h-5'
        ]"
        style="background: rgba(100, 116, 139, 0.15); width: 75%;"
      ></div>
    </div>

    <!-- Metadata Footer Placeholder -->
    <div class="flex items-center justify-between gap-3">
      <!-- Source -->
      <div class="flex items-center gap-2">
        <div
          class="w-6 h-6 rounded-full"
          style="background: rgba(100, 116, 139, 0.1);"
        ></div>
        <div
          class="h-3 rounded"
          style="background: rgba(100, 116, 139, 0.1); width: 80px;"
        ></div>
      </div>

      <!-- Timestamp -->
      <div
        class="h-3 rounded"
        style="background: rgba(100, 116, 139, 0.1); width: 40px;"
      ></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
