import { onMounted, onUnmounted } from 'vue'

import { FrameCallback, startAnimationFrame } from '@manapotion/core'

export const useAnimationFrame = (callback: FrameCallback) => {
  onMounted(() => {
    const unsub = startAnimationFrame(callback)
    onUnmounted(unsub)
  })
}
