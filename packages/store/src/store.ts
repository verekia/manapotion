import { createStore } from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'

export type KeyState = {
  code: string
  key: string
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
}

export interface ManaPotionState {
  // Browser
  isPointerLocked: boolean
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
  isLeftMouseDown: boolean
  isMiddleMouseDown: boolean
  isRightMouseDown: boolean
  mouseX: number
  mouseY: number
  mouseMovementX: number
  mouseMovementY: number
  mouseWheelDeltaY: number
  keys: {
    byCode: Record<string, KeyState>
    byKey: Record<string, KeyState>
  }
  clearInputs: () => void
  setMousePosition: (x: number, y: number) => void
  setMouseMovement: (x: number, y: number) => void
  setLeftMouseDown: (isLeftMouseDown: boolean) => void
  setMiddleMouseDown: (isMiddleMouseDown: boolean) => void
  setRightMouseDown: (isRightMouseDown: boolean) => void
  setMouseWheelDeltaY: (deltaY: number) => void
  setKeyDown: (keyState: KeyState) => void
  setKeyUp: (key: string, code: string) => void

  // Custom
  setCustom: (key: string, value: any) => void
}

const defaultInputState = {
  isLeftMouseDown: false,
  isMiddleMouseDown: false,
  isRightMouseDown: false,
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
  mouseWheelDeltaY: 0,
  keys: {
    byCode: {},
    byKey: {},
  },
}

export const manaPotionStore = createStore<ManaPotionState>()(
  devtools(set => ({
    // Browser
    isPointerLocked: false,
    isFullscreen: false,
    isPageVisible: true,
    isPageFocused: true,
    windowWidth: 0,
    windowHeight: 0,
    isDesktop: false,
    isMobile: false,
    isPortrait: false,
    isLandscape: false,
    setPointerLocked: isPointerLocked => set(() => ({ isPointerLocked })),
    setFullscreen: isFullscreen => set(() => ({ isFullscreen })),
    setPageVisible: isPageVisible => set(() => ({ isPageVisible })),
    setPageFocused: isPageFocused => set(() => ({ isPageFocused })),
    setSize: ({ windowWidth, windowHeight }) => set(() => ({ windowWidth, windowHeight })),
    setDeviceType: ({ isDesktop, isMobile }) => set(() => ({ isDesktop, isMobile })),
    setScreenOrientation: ({ isPortrait, isLandscape }) => set(() => ({ isPortrait, isLandscape })),

    // Inputs
    ...defaultInputState,
    clearInputs: () => set(() => defaultInputState),
    clearMouseButtons: () =>
      set(() => ({ isLeftMouseDown: false, isMiddleMouseDown: false, isRightMouseDown: false })),
    setMousePosition: (mouseX, mouseY) => set(() => ({ mouseX, mouseY })),
    setMouseMovement: (mouseMovementX, mouseMovementY) =>
      set(() => ({ mouseMovementX, mouseMovementY })),
    setLeftMouseDown: isLeftMouseDown => set(() => ({ isLeftMouseDown })),
    setMiddleMouseDown: isMiddleMouseDown => set(() => ({ isMiddleMouseDown })),
    setRightMouseDown: isRightMouseDown => set(() => ({ isRightMouseDown })),
    setMouseWheelDeltaY: mouseWheelDeltaY => set(() => ({ mouseWheelDeltaY })),
    setKeyDown: (keyState: KeyState) =>
      set(state => ({
        keys: {
          byCode: { ...state.keys.byCode, [keyState.code]: keyState },
          byKey: { ...state.keys.byKey, [keyState.key]: keyState },
        },
      })),
    setKeyUp: (code, key) =>
      set(state => {
        const { [code]: __, ...byCode } = state.keys.byCode
        const { [key]: _, ...byKey } = state.keys.byKey
        return { keys: { byCode, byKey } }
      }),

    // Custom
    setCustom: (key, value) => set(() => ({ [key]: value })),
  }))
)

export const mp = () => manaPotionStore.getState()
