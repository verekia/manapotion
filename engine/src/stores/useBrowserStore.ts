import { create } from 'zustand'

type BrowserStore = {
  isPointerLocked: boolean
  isFullscreen: boolean
  isPageVisible: boolean
  setPointerLocked: (isPointerLocked: boolean) => void
  setFullscreen: (isFullscreen: boolean) => void
  setPageVisible: (isPageVisible: boolean) => void
}

export const useBrowserStore = create<BrowserStore>(set => ({
  isPointerLocked: false,
  isFullscreen: false,
  isPageVisible: true,
  setPointerLocked: isPointerLocked => set(() => ({ isPointerLocked })),
  setFullscreen: isFullscreen => set(() => ({ isFullscreen })),
  setPageVisible: isPageVisible => set(() => ({ isPageVisible })),
}))

export const getBrowserState = () => useBrowserStore.getState()
