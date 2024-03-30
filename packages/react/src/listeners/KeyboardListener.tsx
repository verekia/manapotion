import { useEffect } from 'react'

import { KeyboardListenerProps, mountKeyboardListener } from '@manapotion/core'

export const KeyboardListener = ({ onKeyDown, onKeyUp }: KeyboardListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountKeyboardListener({ onKeyDown, onKeyUp }), [])

  return null
}
