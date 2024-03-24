import { useEffect } from 'react'

import { mountMouseMoveListener, MouseMoveListenerProps } from '@manapotion/core'

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
