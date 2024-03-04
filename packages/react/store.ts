import { create, StateCreator } from 'zustand'

interface BrowserSlice {
  isPointerLocked: boolean
  isFullscreen: boolean
  isPageVisible: boolean
  isPageFocused: boolean
  canHover?: boolean
  width: number
  height: number
  setPointerLocked: (isPointerLocked: boolean) => void
  setFullscreen: (isFullscreen: boolean) => void
  setPageVisible: (isPageVisible: boolean) => void
  setPageFocused: (isFocused: boolean) => void
  setSize: (width: number, height: number) => void
  setCanHover: (canHover: boolean) => void
}

const createBrowserSlice: StateCreator<BrowserSlice> = set => ({
  isPointerLocked: false,
  isFullscreen: false,
  isPageVisible: true,
  isPageFocused: true,
  width: 0,
  height: 0,
  canHover: undefined,
  setPointerLocked: isPointerLocked => set(() => ({ isPointerLocked })),
  setFullscreen: isFullscreen => set(() => ({ isFullscreen })),
  setPageVisible: isPageVisible => set(() => ({ isPageVisible })),
  setPageFocused: isPageFocused => set(() => ({ isPageFocused })),
  setSize: (width, height) => set(() => ({ width, height })),
  setCanHover: canHover => set(() => ({ canHover })),
})

export type KeyState = {
  code: string
  key: string
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
}

interface InputSlice {
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

const createInputSlice: StateCreator<InputSlice> = set => ({
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
})

export interface CustomSlice {
  setCustom: (key: string, value: any) => void
}

const createCustomSlice: StateCreator<CustomSlice> = set =>
  ({
    setCustom: (key, value) => set(() => ({ [key]: value })),
  }) as CustomSlice

export type ManaPotionState = BrowserSlice & InputSlice & CustomSlice

export const useMP = create<ManaPotionState>()((...a) => ({
  ...createBrowserSlice(...a),
  ...createInputSlice(...a),
  ...createCustomSlice(...a),
}))

export const mp = () => useMP.getState()
