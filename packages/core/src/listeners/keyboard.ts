import { getKeyboard, Keyboard, keyboardStore } from '../stores/keyboardStore'

type KeyState = {
  code: string
  key: string
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
}

export type KeyDownPayload = KeyState
export type KeyUpPayload = KeyState

export type KeyboardListenerProps = {
  onKeyDown?: (payload: KeyDownPayload) => void
  onKeyUp?: (payload: KeyUpPayload) => void
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

// https://w3c.github.io/uievents/tools/key-event-viewer.html

export const mountKeyboardListener = ({ onKeyUp, onKeyDown }: KeyboardListenerProps) => {
  const downHandler = (e: KeyboardEvent) => {
    const { key, code } = e
    const keyboard = getKeyboard()

    if (keyboard.codes[code] || keyboard.keys[key]) {
      return
    }

    keyboardStore.setState(s => ({
      ...s,
      codes: { ...s.codes, [code]: true },
      keys: { ...s.keys, [key]: true },
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
      meta: e.metaKey,
    }))
    onKeyDown?.({
      code,
      key,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
      meta: e.metaKey,
    })
  }

  const upHandler = (e: KeyboardEvent) => {
    keyboardStore.setState(s => {
      const newKeyboard: Mutable<Keyboard> = { ...s, codes: { ...s.codes }, keys: { ...s.keys } }
      delete newKeyboard.codes[e.code]
      delete newKeyboard.keys[e.key]
      delete newKeyboard.keys[e.key.toUpperCase()]
      delete newKeyboard.keys[e.key.toLowerCase()]
      delete newKeyboard.keys.Dead
      newKeyboard.ctrl = e.ctrlKey
      newKeyboard.shift = e.shiftKey
      newKeyboard.alt = e.altKey
      newKeyboard.meta = e.metaKey
      return newKeyboard
    })
    onKeyUp?.({
      code: e.code,
      key: e.key,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
      meta: e.metaKey,
    })
  }

  window.addEventListener('keydown', downHandler)
  window.addEventListener('keyup', upHandler)

  return () => {
    window.removeEventListener('keydown', downHandler)
    window.removeEventListener('keyup', upHandler)
  }
}
