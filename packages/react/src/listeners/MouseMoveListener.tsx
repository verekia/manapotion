import { useEffect } from 'react'

import { mountMouseMoveListener } from '@manapotion/core'

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onUpdate?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const MouseMoveListener = ({
  mouseMovementResetDelay = 30,
  onUpdate,
}: MouseMoveListenerProps) => {
  useEffect(
    () => mountMouseMoveListener({ onUpdate, mouseMovementResetDelay }),
    [onUpdate, mouseMovementResetDelay],
  )

  return null
}
