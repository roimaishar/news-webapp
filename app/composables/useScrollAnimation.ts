export const useScrollAnimation = () => {
  if (process.client) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Trigger 100px before element enters viewport
      }
    )

    onMounted(() => {
      const elements = document.querySelectorAll('.fade-in-scroll, .stagger-children')
      elements.forEach((el) => observer.observe(el))
    })

    onUnmounted(() => {
      observer.disconnect()
    })
  }
}
