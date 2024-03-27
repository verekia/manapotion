import { manaPotionStore } from '@manapotion/core'
import { derived, readable } from 'svelte/store'

export const mpStore = readable(manaPotionStore.getState(), set => {
  manaPotionStore.subscribe(value => set(value))
})

export const isFullscreen = derived(mpStore, $mpStore => $mpStore.isFullscreen)
export const isPointerLocked = derived(mpStore, $mpStore => $mpStore.isPointerLocked)
export const isPageVisible = derived(mpStore, $mpStore => $mpStore.isPageVisible)
export const isPageFocused = derived(mpStore, $mpStore => $mpStore.isPageFocused)
export const isLandscape = derived(mpStore, $mpStore => $mpStore.isLandscape)
export const isPortrait = derived(mpStore, $mpStore => $mpStore.isPortrait)
export const isMobile = derived(mpStore, $mpStore => $mpStore.isMobile)
export const isDesktop = derived(mpStore, $mpStore => $mpStore.isDesktop)
export const isLeftMouseDown = derived(mpStore, $mpStore => $mpStore.isLeftMouseDown)
export const isMiddleMouseDown = derived(mpStore, $mpStore => $mpStore.isMiddleMouseDown)
export const isRightMouseDown = derived(mpStore, $mpStore => $mpStore.isRightMouseDown)
export const keys = derived(mpStore, $mpStore => $mpStore.keys)
