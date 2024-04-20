import { useEffect } from 'react'

import { mountPointerLockListener } from '@manapotion/core'

import type { PointerLockListenerProps } from '@manapotion/core'

export const PointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountPointerLockListener({ onPointerLockChange }), [])

  return null
}
