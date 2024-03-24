import { KeyState, mp } from '../store'

export const mountKeyboardListener = ({
  onKeyUp,
  onKeyDown,
}: {
  onKeyDown?: (keyState: KeyState) => void
  onKeyUp?: (code: string, key: string) => void
}) => {
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
    onKeyUp?.(e.code, e.key)
  }

  window.addEventListener('keydown', downHandler)
  window.addEventListener('keyup', upHandler)

  return () => {
    window.removeEventListener('keydown', downHandler)
    window.removeEventListener('keyup', upHandler)
  }
}
