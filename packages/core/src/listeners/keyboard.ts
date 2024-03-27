import { KeyState, mp } from '../store'

export type KeyDownPayload = KeyState
export type KeyUpPayload = { code: string; key: string }

export type KeyboardListenerProps = {
  onKeyDown?: (keyState: KeyDownPayload) => void
  onKeyUp?: ({ code, key }: KeyUpPayload) => void
}

// https://w3c.github.io/uievents/tools/key-event-viewer.html

export const mountKeyboardListener = ({ onKeyUp, onKeyDown }: KeyboardListenerProps) => {
  const downHandler = (e: KeyboardEvent) => {
    const { key, code } = e

    if (mp().keys.byCode[code] || mp().keys.byKey[key]) {
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
    mp().setKeyDown(keyState)
  }

  const upHandler = (e: KeyboardEvent) => {
    mp().setKeyUp(e.code, e.key)
    onKeyUp?.({ code: e.code, key: e.key })
  }

  window.addEventListener('keydown', downHandler)
  window.addEventListener('keyup', upHandler)

  return () => {
    window.removeEventListener('keydown', downHandler)
    window.removeEventListener('keyup', upHandler)
  }
}
