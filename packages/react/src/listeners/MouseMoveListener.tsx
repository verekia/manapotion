import { useEffect } from 'react'

import { mountMouseMoveListener } from '@manapotion/core'

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const MouseMoveListener = ({
  mouseMovementResetDelay = 30,
  onMouseMove,
}: MouseMoveListenerProps) => {
  useEffect(
    () => mountMouseMoveListener({ onMove: onMouseMove, mouseMovementResetDelay }),
    [onMouseMove, mouseMovementResetDelay],
  )

  return null
}
