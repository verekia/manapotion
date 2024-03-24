import { useEffect } from 'react'

import { mountPointerLockListener } from '@manapotion/core'

export type PointerLockListenerProps = {
  onUpdate?: (isPointerLocked: boolean) => void
}

export const PointerLockListener = ({ onUpdate }: PointerLockListenerProps) => {
  useEffect(() => mountPointerLockListener({ onUpdate }), [onUpdate])

  return null
}
