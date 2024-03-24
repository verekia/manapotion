import { useEffect } from 'react'

import { mountPointerLockListener, PointerLockListenerProps } from '@manapotion/core'

export const PointerLockListener = ({ onUpdate }: PointerLockListenerProps) => {
  useEffect(() => mountPointerLockListener({ onUpdate }), [onUpdate])

  return null
}
