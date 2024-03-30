import { ManaPotionState, manaPotionStore } from '@manapotion/core'
import { useStore } from 'zustand'

export function useMP(): ManaPotionState
export function useMP<T>(selector: (state: ManaPotionState) => T): T
export function useMP<T>(selector?: (state: ManaPotionState) => T) {
  return useStore(manaPotionStore, selector!)
}

export const useIsFullscreen = () => useMP(s => s.isFullscreen)
export const useIsPointerLocked = () => useMP(s => s.mouse.isLocked)
export const useIsPageVisible = () => useMP(s => s.isPageVisible)
export const useIsPageFocused = () => useMP(s => s.isPageFocused)
export const useIsLandscape = () => useMP(s => s.isLandscape)
export const useIsPortrait = () => useMP(s => s.isPortrait)
export const useIsMobile = () => useMP(s => s.isMobile)
export const useIsDesktop = () => useMP(s => s.isDesktop)
export const useIsLeftMouseButtonDown = () => useMP(s => s.mouse.buttons.left)
export const useIsMiddleMouseButtonDown = () => useMP(s => s.mouse.buttons.middle)
export const useIsRightMouseButtonDown = () => useMP(s => s.mouse.buttons.right)
export const useKeyboard = () => useMP(s => s.keyboard)
export const useMouse = () => useMP(s => s.mouse)
