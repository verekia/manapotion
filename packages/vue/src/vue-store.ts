import { reactive, ref } from 'vue'

import { manaPotionStore } from '@manapotion/core'

export const isFullscreen = ref(manaPotionStore.getState().browser.isFullscreen)
export const isPointerLocked = ref(manaPotionStore.getState().mouse.locked)
export const isPageVisible = ref(manaPotionStore.getState().browser.isPageVisible)
export const isPageFocused = ref(manaPotionStore.getState().browser.isPageFocused)
export const isLandscape = ref(manaPotionStore.getState().browser.isLandscape)
export const isPortrait = ref(manaPotionStore.getState().browser.isPortrait)
export const isMobile = ref(manaPotionStore.getState().browser.isMobile)
export const isDesktop = ref(manaPotionStore.getState().browser.isDesktop)
export const isLeftMouseButtonDown = ref(manaPotionStore.getState().mouse.buttons.left)
export const isMiddleMouseButtonDown = ref(manaPotionStore.getState().mouse.buttons.middle)
export const isRightMouseButtonDown = ref(manaPotionStore.getState().mouse.buttons.right)
export const keyboard = ref(manaPotionStore.getState().keyboard)
export const mouse = ref(manaPotionStore.getState().mouse)
export const mouseButtons = ref(manaPotionStore.getState().mouse.buttons)

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
  mouseButtons,
})

manaPotionStore.subscribe(state => {
  isFullscreen.value = state.browser.isFullscreen
  isPointerLocked.value = state.mouse.locked
  isPageVisible.value = state.browser.isPageVisible
  isPageFocused.value = state.browser.isPageFocused
  isLandscape.value = state.browser.isLandscape
  isPortrait.value = state.browser.isPortrait
  isMobile.value = state.browser.isMobile
  isDesktop.value = state.browser.isDesktop
  isLeftMouseButtonDown.value = state.mouse.buttons.left
  isMiddleMouseButtonDown.value = state.mouse.buttons.middle
  isRightMouseButtonDown.value = state.mouse.buttons.right
  keyboard.value = state.keyboard
  mouse.value = state.mouse
  mouseButtons.value = state.mouse.buttons
})
