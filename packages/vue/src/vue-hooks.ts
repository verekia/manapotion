import { onMounted, onUnmounted, ref } from 'vue'

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = ref<number | undefined>()
  const previousTimeRef = ref<number | undefined>()

  const animate = (time: number) => {
    if (previousTimeRef.value !== undefined) {
      const deltaTime = time - previousTimeRef.value
      callback(deltaTime)
    }
    previousTimeRef.value = time
    requestRef.value = requestAnimationFrame(animate)
  }

  onMounted(() => {
    requestRef.value = requestAnimationFrame(animate)
  })

  onUnmounted(() => {
    if (requestRef.value !== undefined) {
      cancelAnimationFrame(requestRef.value)
    }
  })
}
