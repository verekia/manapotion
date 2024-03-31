import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type Keyboard = {
  readonly codes: Record<string, boolean>
  readonly keys: Record<string, boolean>
  readonly ctrl: boolean
  readonly shift: boolean
  readonly alt: boolean
  readonly meta: boolean
}

const defaultKeyboard: Keyboard = {
  codes: {},
  keys: {},
  ctrl: false,
  shift: false,
  alt: false,
  meta: false,
}

export const keyboardStore = createStore<Keyboard>()(
  devtools(() => structuredClone(defaultKeyboard), { name: 'keyboard' }),
)

export const getKeyboard = keyboardStore.getState

export const resetKeyboard = () => keyboardStore.setState(() => structuredClone(defaultKeyboard))
