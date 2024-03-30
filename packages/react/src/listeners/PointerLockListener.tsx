import { useEffect } from 'react'

import { mountPointerLockListener, PointerLockListenerProps } from '@manapotion/core'

export const PointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountPointerLockListener({ onPointerLockChange }), [])

  return null
}
