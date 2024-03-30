import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

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

export const mouseStore = createStore<Mouse>()(
  devtools(() => structuredClone(defaultMouse), { name: 'mouse' }),
)

export const getMouse = mouseStore.getState

export const resetMouse = () => mouseStore.setState(() => structuredClone(defaultMouse))
