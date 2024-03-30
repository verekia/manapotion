import { KeyState, manaPotionStore } from '../store'

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

    const keyState = {
      key,
      code,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
      meta: e.metaKey,
    }

    onKeyDown?.(keyState)
    manaPotionStore.setState(s => ({
      ...s,
      keyboard: {
        ...s.keyboard,
        byCode: { ...s.keyboard.byCode, [code]: keyState },
        byKey: { ...s.keyboard.byKey, [key]: keyState },
      },
    }))
  }

  const upHandler = (e: KeyboardEvent) => {
    manaPotionStore.setState(s => {
      const newKeyboard = { ...s.keyboard }
      delete newKeyboard.byCode[e.code]
      delete newKeyboard.byKey[e.key]
      return { ...s, keyboard: newKeyboard }
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
