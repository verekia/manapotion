import { useEffect } from 'react'

import { handlePointerLockChange } from '@manapotion/core'

export type PointerLockListenerProps = {
  onPointerLockChange?: (isPointerLocked: boolean) => void
}

export const PointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  useEffect(() => {
    const handler = handlePointerLockChange({ onChange: onPointerLockChange })

    document.addEventListener('pointerlockchange', handler)

    return () => document.removeEventListener('pointerlockchange', handler)
  }, [onPointerLockChange])

  return null
}
