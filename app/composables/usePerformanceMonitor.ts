export const usePerformanceMonitor = () => {
  if (process.client) {
    // Monitor Core Web Vitals - Navigation and custom measures
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`[Performance] ${entry.name}: ${entry.duration}ms`)
      }
    })

    observer.observe({ entryTypes: ['measure', 'navigation'] })

    // Monitor Cumulative Layout Shift (CLS) for visual stability
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Ignore layout shifts from user input
        if ((entry as any).hadRecentInput) continue
        console.log('[CLS] Layout shift detected:', {
          value: (entry as any).value,
          sources: (entry as any).sources
        })
      }
    })

    clsObserver.observe({ type: 'layout-shift', buffered: true })

    // Cleanup on unmount
    onUnmounted(() => {
      observer.disconnect()
      clsObserver.disconnect()
    })
  }
}
