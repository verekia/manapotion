import { getKeyboard, keyboardStore, KeyState } from '../stores/keyboardStore'

export type KeyDownPayload = KeyState
export type KeyUpPayload = { code: string; key: string }

export type KeyboardListenerProps = {
  onKeyDown?: (payload: KeyDownPayload) => void
  onKeyUp?: (payload: KeyUpPayload) => void
}

// https://w3c.github.io/uievents/tools/key-event-viewer.html

export const mountKeyboardListener = ({ onKeyUp, onKeyDown }: KeyboardListenerProps) => {
  const downHandler = (e: KeyboardEvent) => {
    const { key, code } = e
    const keyboard = getKeyboard()

    if (keyboard.byCode[code] || keyboard.byKey[key]) {
      return
    }

    const keyState = {
      key,
      code,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
      meta: e.metaKey,
    }

    onKeyDown?.(keyState)
    keyboardStore.setState(s => {
      const newKeyboard = structuredClone(s)
      newKeyboard.byCode[code] = keyState
      newKeyboard.byKey[key] = keyState
      return newKeyboard
    })
  }

  const upHandler = (e: KeyboardEvent) => {
    keyboardStore.setState(s => {
      const newKeyboard = structuredClone(s)
      delete newKeyboard.byCode[e.code]
      delete newKeyboard.byKey[e.key]
      return newKeyboard
    })
    onKeyUp?.({ code: e.code, key: e.key })
  }

  window.addEventListener('keydown', downHandler)
  window.addEventListener('keyup', upHandler)

  return () => {
    window.removeEventListener('keydown', downHandler)
    window.removeEventListener('keyup', upHandler)
  }
}
