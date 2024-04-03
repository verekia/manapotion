import { useEffect } from 'react'

import { mountMouseMoveListener, MouseMoveListenerProps } from '@manapotion/core'

export const MouseMoveListener = ({
  mouseMovementResetDelay,
  onMouseMove,
}: MouseMoveListenerProps) => {
  useEffect(
    () => mountMouseMoveListener({ onMouseMove, mouseMovementResetDelay }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mouseMovementResetDelay],
  )

  return null
}
