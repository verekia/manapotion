import { useEffect } from 'react'

import { mountPointerLockListener, PointerLockListenerProps } from '@manapotion/core'

export const PointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  useEffect(() => mountPointerLockListener({ onPointerLockChange }), [])

  return null
}
