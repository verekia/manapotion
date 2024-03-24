import { reactive, ref } from 'vue'

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

export const mpRefs = reactive({
  isFullscreen,
  isPointerLocked,
  isPageVisible,
  isPageFocused,
  isLandscape,
  isPortrait,
  isMobile,
  isDesktop,
  isLeftMouseDown,
  isMiddleMouseDown,
  isRightMouseDown,
  keys,
})

manaPotionStore.subscribe(state => {
  isFullscreen.value = state.isFullscreen
  isPointerLocked.value = state.isPointerLocked
  isPageVisible.value = state.isPageVisible
  isPageFocused.value = state.isPageFocused
  isLandscape.value = state.isLandscape
  isPortrait.value = state.isPortrait
  isMobile.value = state.isMobile
  isDesktop.value = state.isDesktop
  isLeftMouseDown.value = state.isLeftMouseDown
  isMiddleMouseDown.value = state.isMiddleMouseDown
  isRightMouseDown.value = state.isRightMouseDown
  keys.value = state.keys
})
