import { useEffect } from 'react'

import { handleMouseMove, mouseMoveCleanup } from '@manapotion/core'

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const MouseMoveListener = ({
  mouseMovementResetDelay = 30,
  onMouseMove,
}: MouseMoveListenerProps) => {
  useEffect(() => {
    const handler = handleMouseMove({
      onMove: onMouseMove,
      mouseMoveResetDelay: mouseMovementResetDelay,
    })

    window.addEventListener('mousemove', handler)

    return () => {
      mouseMoveCleanup()
      window.removeEventListener('mousemove', handler)
    }
  }, [onMouseMove, mouseMovementResetDelay])

  return null
}
