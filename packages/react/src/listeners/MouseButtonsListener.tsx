import { useEffect } from 'react'

import { mountMouseButtonsListener, MouseButtonsListenerProps } from '@manapotion/core'

export const MouseButtonsListener = ({
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
}: MouseButtonsListenerProps) => {
  useEffect(
    () =>
      mountMouseButtonsListener({
        onLeftMouseDown,
        onMiddleMouseDown,
        onRightMouseDown,
        onLeftMouseUp,
        onMiddleMouseUp,
        onRightMouseUp,
      }),
    [
      onLeftMouseDown,
      onMiddleMouseDown,
      onRightMouseDown,
      onLeftMouseUp,
      onMiddleMouseUp,
      onRightMouseUp,
    ],
  )

  return null
}
