import { create } from 'zustand'

type CanvasStore = {
  rendererName?: string
  setRendererName: (name: string) => void
}

export const useCanvasStore = create<CanvasStore>(set => ({
  rendererName: undefined,
  setRendererName: name => set(() => ({ rendererName: name })),
}))

export const getCanvasState = () => useCanvasStore.getState()