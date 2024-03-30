import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type MousePosition = { x: number; y: number }
export type MouseMovement = { x: number; y: number }
export type MouseWheel = { y: number }

export type MouseButtons = { left: boolean; middle: boolean; right: boolean }

export type Mouse = {
  isLocked: boolean
  position: MousePosition
  movement: MouseMovement
  wheel: MouseWheel
  buttons: MouseButtons
}

export type KeyState = {
  code: string
  key: string
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
}

export type Keyboard = { byCode: Record<string, KeyState>; byKey: Record<string, KeyState> }

export interface ManaPotionState {
  // Browser
  isFullscreen: boolean
  isPageVisible: boolean
  isPageFocused: boolean
  isDesktop: boolean
  isMobile: boolean
  isPortrait: boolean
  isLandscape: boolean
  windowWidth: number
  windowHeight: number
  setPointerLocked: (isPointerLocked: boolean) => void
  setFullscreen: (isFullscreen: boolean) => void
  setPageVisible: (isPageVisible: boolean) => void
  setPageFocused: (isFocused: boolean) => void
  setSize: (params: { windowWidth: number; windowHeight: number }) => void
  setDeviceType: (params: { isDesktop: boolean; isMobile: boolean }) => void
  setScreenOrientation: (params: { isPortrait: boolean; isLandscape: boolean }) => void

  // Inputs
  mouse: Mouse
  keyboard: Keyboard
  clearInputs: () => void
  setMouseButtons: (buttons: MouseButtons) => void
  setKeyDown: (keyState: KeyState) => void
  setKeyUp: (key: string, code: string) => void

  // Custom
  setCustom: (key: string, value: unknown) => void
}

const defaultInputState = {
  keyboard: { byCode: {}, byKey: {} },
  mouse: {
    isLocked: false,
    position: { x: 0, y: 0 },
    movement: { x: 0, y: 0 },
    wheel: { y: 0 },
    buttons: { left: false, middle: false, right: false },
  },
}

export const manaPotionStore = createStore<ManaPotionState>()(
  devtools(set => ({
    // Browser
    isFullscreen: false,
    isPageVisible: true,
    isPageFocused: true,
    windowWidth: 0,
    windowHeight: 0,
    isDesktop: false,
    isMobile: false,
    isPortrait: false,
    isLandscape: false,
    setPointerLocked: isLocked => set(s => ({ ...s, mouse: { ...s.mouse, isLocked } })),
    setFullscreen: isFullscreen => set(() => ({ isFullscreen })),
    setPageVisible: isPageVisible => set(() => ({ isPageVisible })),
    setPageFocused: isPageFocused => set(() => ({ isPageFocused })),
    setSize: ({ windowWidth, windowHeight }) => set(() => ({ windowWidth, windowHeight })),
    setDeviceType: ({ isDesktop, isMobile }) => set(() => ({ isDesktop, isMobile })),
    setScreenOrientation: ({ isPortrait, isLandscape }) => set(() => ({ isPortrait, isLandscape })),

    // Inputs
    ...defaultInputState,
    clearInputs: () => set(() => defaultInputState),
    setMouseButtons: (buttons: MouseButtons) =>
      set(state => ({ mouse: { ...state.mouse, buttons } })),
    clearMouseButtons: () =>
      set(state => ({
        mouse: { ...state.mouse, buttons: { left: false, middle: false, right: false } },
      })),
    setKeyDown: (keyState: KeyState) =>
      set(state => ({
        keyboard: {
          byCode: { ...state.keyboard.byCode, [keyState.code]: keyState },
          byKey: { ...state.keyboard.byKey, [keyState.key]: keyState },
        },
      })),
    setKeyUp: (code, key) =>
      set(state => {
        const byCode = { ...state.keyboard.byCode }
        delete byCode[code]

        const byKey = { ...state.keyboard.byKey }
        delete byKey[key]

        return { keyboard: { byCode, byKey } }
      }),

    // Custom
    setCustom: (key, value) => set(() => ({ [key]: value })),
  })),
)

export const mp = () => manaPotionStore.getState()
