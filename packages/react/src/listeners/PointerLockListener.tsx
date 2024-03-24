import { useEffect } from 'react'

import { mountPointerLockListener } from '@manapotion/core'

export type PointerLockListenerProps = {
  onPointerLockChange?: (isPointerLocked: boolean) => void
}

export const PointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  useEffect(() => mountPointerLockListener(onPointerLockChange), [onPointerLockChange])

  return null
}
