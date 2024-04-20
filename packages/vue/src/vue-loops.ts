import { onMounted, onUnmounted } from 'vue'

import { addMainLoopEffect } from '@manapotion/core'

import type { MainLoopEffectCallback, MainLoopEffectOptions } from '@manapotion/core'

export const useMainLoop = (callback: MainLoopEffectCallback, options?: MainLoopEffectOptions) => {
  onMounted(() => {
    const unsub = addMainLoopEffect(callback, options)
    onUnmounted(unsub)
  })
}
