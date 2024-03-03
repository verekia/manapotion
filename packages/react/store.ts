import { create, StateCreator } from 'zustand'

interface BrowserSlice {
  isPointerLocked: boolean
  isFullscreen: boolean
  isPageVisible: boolean
  canHover?: boolean
  width: number
  height: number
  setPointerLocked: (isPointerLocked: boolean) => void
  setFullscreen: (isFullscreen: boolean) => void
  setPageVisible: (isPageVisible: boolean) => void
  setSize: (width: number, height: number) => void
  setCanHover: (canHover: boolean) => void
}

const createBrowserSlice: StateCreator<BrowserSlice> = set => ({
  isPointerLocked: false,
  isFullscreen: false,
  isPageVisible: true,
  width: 0,
  height: 0,
  canHover: undefined,
  setPointerLocked: isPointerLocked => set(() => ({ isPointerLocked })),
  setFullscreen: isFullscreen => set(() => ({ isFullscreen })),
  setPageVisible: isPageVisible => set(() => ({ isPageVisible })),
  setSize: (width, height) => set(() => ({ width, height })),
  setCanHover: canHover => set(() => ({ canHover })),
})

interface InputSlice {
  isLeftMouseDown: boolean
  isMiddleMouseDown: boolean
  isRightMouseDown: boolean
  mouseX: number
  mouseY: number
  mouseMovementX: number
  mouseMovementY: number
  setMousePosition: (x: number, y: number) => void
  setMouseMovement: (x: number, y: number) => void
  setLeftMouseDown: (isLeftMouseDown: boolean) => void
  setMiddleMouseDown: (isMiddleMouseDown: boolean) => void
  setRightMouseDown: (isRightMouseDown: boolean) => void
}

const createInputSlice: StateCreator<InputSlice> = set => ({
  isLeftMouseDown: false,
  isMiddleMouseDown: false,
  isRightMouseDown: false,
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
  setMousePosition: (mouseX, mouseY) => set(() => ({ mouseX, mouseY })),
  setMouseMovement: (mouseMovementX, mouseMovementY) =>
    set(() => ({ mouseMovementX, mouseMovementY })),
  setLeftMouseDown: isLeftMouseDown => set(() => ({ isLeftMouseDown })),
  setMiddleMouseDown: isMiddleMouseDown => set(() => ({ isMiddleMouseDown })),
  setRightMouseDown: isRightMouseDown => set(() => ({ isRightMouseDown })),
})

export type ManaPotionState = BrowserSlice & InputSlice

export const useMP = create<ManaPotionState>()((...a) => ({
  ...createBrowserSlice(...a),
  ...createInputSlice(...a),
}))

export const mp = () => useMP.getState()
