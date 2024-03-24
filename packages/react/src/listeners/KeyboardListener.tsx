import { useEffect } from 'react'

import { KeyState, mountKeyboardListener } from '@manapotion/core'

export type KeyboardListenerProps = {
  onKeyDown?: (keyState: KeyState) => void
  onKeyUp?: (code: string, key: string) => void
}

// https://w3c.github.io/uievents/tools/key-event-viewer.html
export const KeyboardListener = ({ onKeyDown, onKeyUp }: KeyboardListenerProps) => {
  useEffect(() => mountKeyboardListener({ onKeyDown, onKeyUp }), [onKeyDown, onKeyUp])

  return null
}
