import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type Browser = {
  readonly isFullscreen: boolean
  readonly isPageVisible: boolean
  readonly isPageFocused: boolean
  readonly isDesktop: boolean
  readonly isMobile: boolean
  readonly isPortrait: boolean
  readonly isLandscape: boolean
  readonly width: number
  readonly height: number
  readonly pointerLockSupported: boolean
}

const defaultBrowser: Browser = {
  pointerLockSupported: false,
  isFullscreen: false,
  isPageVisible: true,
  isPageFocused: true,
  width: 0,
  height: 0,
  isDesktop: false,
  isMobile: false,
  isPortrait: false,
  isLandscape: false,
}

export const browserStore = createStore<Browser>()(
  devtools(() => structuredClone(defaultBrowser), { name: 'browser' }),
)

export const getBrowser = browserStore.getState
