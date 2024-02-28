import { create } from 'zustand'

type BrowserStore = {
  isPointerLocked: boolean
  isFullscreen: boolean
  isPageVisible: boolean
  setPointerLocked: (isPointerLocked: boolean) => void
  setFullscreen: (isFullscreen: boolean) => void
  setPageVisible: (isPageVisible: boolean) => void
}

const useBrowserStore = create<BrowserStore>(set => ({
  isPointerLocked: false,
  isFullscreen: false,
  isPageVisible: true,
  setPointerLocked: isPointerLocked => set(() => ({ isPointerLocked })),
  setFullscreen: isFullscreen => set(() => ({ isFullscreen })),
  setPageVisible: isPageVisible => set(() => ({ isPageVisible })),
}))

export default useBrowserStore
