import { ManaPotionState, manaPotionStore } from '@manapotion/core'
import { useStore } from 'zustand'

export function useMP(): ManaPotionState
export function useMP<T>(selector: (state: ManaPotionState) => T): T
export function useMP<T>(selector?: (state: ManaPotionState) => T) {
  return useStore(manaPotionStore, selector!)
}

export const useIsFullscreen = () => useMP(s => s.browser.isFullscreen)
export const useIsPointerLocked = () => useMP(s => s.mouse.locked)
export const useIsPageVisible = () => useMP(s => s.browser.isPageVisible)
export const useIsPageFocused = () => useMP(s => s.browser.isPageFocused)
export const useIsLandscape = () => useMP(s => s.browser.isLandscape)
export const useIsPortrait = () => useMP(s => s.browser.isPortrait)
export const useIsMobile = () => useMP(s => s.browser.isMobile)
export const useIsDesktop = () => useMP(s => s.browser.isDesktop)
export const useIsLeftMouseButtonDown = () => useMP(s => s.mouse.buttons.left)
export const useIsMiddleMouseButtonDown = () => useMP(s => s.mouse.buttons.middle)
export const useIsRightMouseButtonDown = () => useMP(s => s.mouse.buttons.right)
export const useKeyboard = () => useMP(s => s.keyboard)
export const useMouse = () => useMP(s => s.mouse)
