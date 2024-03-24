import { onMounted, onUnmounted } from 'vue'

import { startAnimationFrame } from '@manapotion/core'

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  let unsub = () => {}

  onMounted(() => {
    unsub = startAnimationFrame(callback)
  })

  onUnmounted(unsub)
}
