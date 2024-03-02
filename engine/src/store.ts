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

const liveBrowser = {
  width: 0,
  height: 0,
}

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

const liveInputs = {
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
}

interface CanvasSlice {
  rendererName?: string
  setRendererName: (name: string) => void
}

const createCanvasSlice: StateCreator<CanvasSlice> = set => ({
  rendererName: undefined,
  setRendererName: name => set(() => ({ rendererName: name })),
})

export type EngineState = BrowserSlice & InputSlice & CanvasSlice

export const useEngine = create<EngineState>()((...a) => ({
  ...createBrowserSlice(...a),
  ...createInputSlice(...a),
  ...createCanvasSlice(...a),
}))

export const engine = () => useEngine.getState()

export const live = {
  ...liveInputs,
  ...liveBrowser,
}
