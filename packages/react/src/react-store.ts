import { ManaPotionState, manaPotionStore } from '@manapotion/core'
import { useStore } from 'zustand'

export function useMP(): ManaPotionState
export function useMP<T>(selector: (state: ManaPotionState) => T): T
export function useMP<T>(selector?: (state: ManaPotionState) => T) {
  return useStore(manaPotionStore, selector!)
}

export const useIsFullscreen = () => useMP(s => s.isFullscreen)
export const useIsPointerLocked = () => useMP(s => s.isPointerLocked)
export const useIsPageVisible = () => useMP(s => s.isPageVisible)
export const useIsPageFocused = () => useMP(s => s.isPageFocused)
export const useIsLandscape = () => useMP(s => s.isLandscape)
export const useIsPortrait = () => useMP(s => s.isPortrait)
export const useIsMobile = () => useMP(s => s.isMobile)
export const useIsDesktop = () => useMP(s => s.isDesktop)
export const useIsLeftMouseDown = () => useMP(s => s.isLeftMouseDown)
export const useIsMiddleMouseDown = () => useMP(s => s.isMiddleMouseDown)
export const useIsRightMouseDown = () => useMP(s => s.isRightMouseDown)
export const useKeys = () => useMP(s => s.keys)
