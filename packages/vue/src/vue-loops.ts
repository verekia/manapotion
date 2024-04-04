import { onMounted, onUnmounted } from 'vue'

import {
  AnimationFrameCallback,
  AnimationFrameOptions,
  startAnimationFrame,
} from '@manapotion/core'

export const useAnimationFrame = (
  callback: AnimationFrameCallback,
  options?: AnimationFrameOptions,
) => {
  onMounted(() => {
    const unsub = startAnimationFrame(callback, options)
    onUnmounted(unsub)
  })
}
