import { useEffect } from 'react'

import { mountMouseButtonsListener } from '@manapotion/core'

export type MouseButtonsListenerProps = {
  onLeftMouseDown?: () => void
  onMiddleMouseDown?: () => void
  onRightMouseDown?: () => void
  onLeftMouseUp?: () => void
  onMiddleMouseUp?: () => void
  onRightMouseUp?: () => void
}

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
