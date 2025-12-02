export const useMagneticEffect = () => {
  if (process.client) {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.magnetic-hover')

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        ;(card as HTMLElement).style.setProperty('--mouse-x', `${x}%`)
        ;(card as HTMLElement).style.setProperty('--mouse-y', `${y}%`)
      })
    }

    // Use passive listener for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove)
    })
  }
}
