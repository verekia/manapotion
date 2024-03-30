import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

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

export const keyboardStore = createStore<Keyboard>()(
  devtools(() => structuredClone(defaultKeyboard), { name: 'keyboard' }),
)

export const getKeyboard = keyboardStore.getState

export const resetKeyboard = () => keyboardStore.setState(() => structuredClone(defaultKeyboard))
