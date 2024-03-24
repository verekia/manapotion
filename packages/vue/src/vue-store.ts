import { ref } from 'vue'

import { manaPotionStore } from '@manapotion/core'

export const isFullscreen = ref(manaPotionStore.getState().isFullscreen)
export const isPointerLocked = ref(manaPotionStore.getState().isPointerLocked)
export const isPageVisible = ref(manaPotionStore.getState().isPageVisible)
export const isPageFocused = ref(manaPotionStore.getState().isPageFocused)
export const isLandscape = ref(manaPotionStore.getState().isLandscape)
export const isPortrait = ref(manaPotionStore.getState().isPortrait)
export const isMobile = ref(manaPotionStore.getState().isMobile)
export const isDesktop = ref(manaPotionStore.getState().isDesktop)
export const isLeftMouseDown = ref(manaPotionStore.getState().isLeftMouseDown)
export const isMiddleMouseDown = ref(manaPotionStore.getState().isMiddleMouseDown)
export const isRightMouseDown = ref(manaPotionStore.getState().isRightMouseDown)
export const keys = ref(manaPotionStore.getState().keys)

// TODO: Use reactive() to make a single object

manaPotionStore.subscribe(() => {
  isFullscreen.value = manaPotionStore.getState().isFullscreen
  isPointerLocked.value = manaPotionStore.getState().isPointerLocked
  isPageVisible.value = manaPotionStore.getState().isPageVisible
  isPageFocused.value = manaPotionStore.getState().isPageFocused
  isLandscape.value = manaPotionStore.getState().isLandscape
  isPortrait.value = manaPotionStore.getState().isPortrait
  isMobile.value = manaPotionStore.getState().isMobile
  isDesktop.value = manaPotionStore.getState().isDesktop
  isLeftMouseDown.value = manaPotionStore.getState().isLeftMouseDown
  isMiddleMouseDown.value = manaPotionStore.getState().isMiddleMouseDown
  isRightMouseDown.value = manaPotionStore.getState().isRightMouseDown
  keys.value = manaPotionStore.getState().keys
})
