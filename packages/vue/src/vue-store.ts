import { ref } from 'vue'

import { manaPotionStore } from '@manapotion/core'

export const isFullscreen = ref(manaPotionStore.getState().isFullscreen)
export const isPointerLocked = ref(manaPotionStore.getState().isPointerLocked)
export const isPageVisible = ref(manaPotionStore.getState().isPageVisible)
export const isPageFocused = ref(manaPotionStore.getState().isPageFocused)

manaPotionStore.subscribe(() => {
  isFullscreen.value = manaPotionStore.getState().isFullscreen
  isPointerLocked.value = manaPotionStore.getState().isPointerLocked
  isPageVisible.value = manaPotionStore.getState().isPageVisible
  isPageFocused.value = manaPotionStore.getState().isPageFocused
})
