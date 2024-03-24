import { onMounted, onUnmounted } from 'vue'

import { FrameCallback, startAnimationFrame } from '@manapotion/core'

export const useAnimationFrame = (callback: FrameCallback) => {
  let unsub = () => {}

  onMounted(() => {
    unsub = startAnimationFrame(callback)
  })

  onUnmounted(unsub)
}
