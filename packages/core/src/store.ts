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

export type MousePosition = { readonly x: number; readonly y: number }
export type MouseMovement = { readonly x: number; readonly y: number }
export type MouseWheel = { readonly y: number }
export type MouseButtons = {
  readonly left: boolean
  readonly middle: boolean
  readonly right: boolean
}
export type Mouse = {
  readonly locked: boolean
  readonly position: MousePosition
  readonly movement: MouseMovement
  readonly wheel: MouseWheel
  readonly buttons: MouseButtons
}

const defaultMouse: Mouse = {
  locked: false,
  position: { x: 0, y: 0 },
  movement: { x: 0, y: 0 },
  wheel: { y: 0 },
  buttons: { left: false, middle: false, right: false },
}

export type KeyState = {
  readonly code: string
  readonly key: string
  readonly ctrl: boolean
  readonly shift: boolean
  readonly alt: boolean
  readonly meta: boolean
}

export type Keyboard = {
  readonly byCode: Record<string, KeyState>
  readonly byKey: Record<string, KeyState>
}

const defaultKeyboard: Keyboard = { byCode: {}, byKey: {} }

export interface ManaPotionState {
  readonly browser: Browser
  readonly mouse: Mouse
  readonly keyboard: Keyboard
}

export const manaPotionStore = createStore<ManaPotionState>()(
  devtools(() => ({
    browser: structuredClone(defaultBrowser),
    mouse: structuredClone(defaultMouse),
    keyboard: structuredClone(defaultKeyboard),
  })),
)

export const resetMouse = () =>
  manaPotionStore.setState(s => ({ ...s, mouse: structuredClone(defaultMouse) }))

export const resetKeyboard = () =>
  manaPotionStore.setState(s => ({ ...s, keyboard: structuredClone(defaultKeyboard) }))

export const setCustom = (property: string, value: unknown) => {
  manaPotionStore.setState(s => ({ ...s, [property]: value }))
}

export const mp = () => manaPotionStore.getState()
