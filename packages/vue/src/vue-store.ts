import { reactive, ref } from 'vue'

import { manaPotionStore } from '@manapotion/core'

export const isFullscreen = ref(manaPotionStore.getState().isFullscreen)
export const isPointerLocked = ref(manaPotionStore.getState().mouse.isLocked)
export const isPageVisible = ref(manaPotionStore.getState().isPageVisible)
export const isPageFocused = ref(manaPotionStore.getState().isPageFocused)
export const isLandscape = ref(manaPotionStore.getState().isLandscape)
export const isPortrait = ref(manaPotionStore.getState().isPortrait)
export const isMobile = ref(manaPotionStore.getState().isMobile)
export const isDesktop = ref(manaPotionStore.getState().isDesktop)
export const isLeftMouseButtonDown = ref(manaPotionStore.getState().mouse.buttons.left)
export const isMiddleMouseButtonDown = ref(manaPotionStore.getState().mouse.buttons.middle)
export const isRightMouseButtonDown = ref(manaPotionStore.getState().mouse.buttons.right)
export const keyboard = ref(manaPotionStore.getState().keyboard)
export const mouse = ref(manaPotionStore.getState().mouse)

export const mpRefs = reactive({
  isFullscreen,
  isPointerLocked,
  isPageVisible,
  isPageFocused,
  isLandscape,
  isPortrait,
  isMobile,
  isDesktop,
  isLeftMouseButtonDown,
  isMiddleMouseButtonDown,
  isRightMouseButtonDown,
  keyboard,
  mouse,
})

manaPotionStore.subscribe(state => {
  isFullscreen.value = state.isFullscreen
  isPointerLocked.value = state.mouse.isLocked
  isPageVisible.value = state.isPageVisible
  isPageFocused.value = state.isPageFocused
  isLandscape.value = state.isLandscape
  isPortrait.value = state.isPortrait
  isMobile.value = state.isMobile
  isDesktop.value = state.isDesktop
  isLeftMouseButtonDown.value = state.mouse.buttons.left
  isMiddleMouseButtonDown.value = state.mouse.buttons.middle
  isRightMouseButtonDown.value = state.mouse.buttons.right
  keyboard.value = state.keyboard
  mouse.value = state.mouse
})
