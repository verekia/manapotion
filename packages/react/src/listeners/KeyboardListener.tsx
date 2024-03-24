import { useEffect } from 'react'

import { KeyboardListenerProps, mountKeyboardListener } from '@manapotion/core'

export const KeyboardListener = ({ onKeyDown, onKeyUp }: KeyboardListenerProps) => {
  useEffect(() => mountKeyboardListener({ onKeyDown, onKeyUp }), [onKeyDown, onKeyUp])

  return null
}
