import { manaPotionStore } from '@manapotion/core'
import { derived, readable } from 'svelte/store'

export const mpStore = readable(manaPotionStore.getState(), set => {
  manaPotionStore.subscribe(value => set(value))
})

export const isFullscreen = derived(mpStore, $mpStore => $mpStore.browser.isFullscreen)
export const isPointerLocked = derived(mpStore, $mpStore => $mpStore.mouse.locked)
export const isPageVisible = derived(mpStore, $mpStore => $mpStore.browser.isPageVisible)
export const isPageFocused = derived(mpStore, $mpStore => $mpStore.browser.isPageFocused)
export const isLandscape = derived(mpStore, $mpStore => $mpStore.browser.isLandscape)
export const isPortrait = derived(mpStore, $mpStore => $mpStore.browser.isPortrait)
export const isMobile = derived(mpStore, $mpStore => $mpStore.browser.isMobile)
export const isDesktop = derived(mpStore, $mpStore => $mpStore.browser.isDesktop)
export const isLeftMouseButtonDown = derived(mpStore, $mpStore => $mpStore.mouse.buttons.left)
export const isMiddleMouseButtonDown = derived(mpStore, $mpStore => $mpStore.mouse.buttons.middle)
export const isRightMouseButtonDown = derived(mpStore, $mpStore => $mpStore.mouse.buttons.right)
export const keyboard = derived(mpStore, $mpStore => $mpStore.keyboard)
export const mouse = derived(mpStore, $mpStore => $mpStore.mouse)
