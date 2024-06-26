import { useEffect } from 'react'

import { mountMouseButtonsListener } from '@manapotion/core'

import type { MouseButtonsListenerProps } from '@manapotion/core'

export const MouseButtonsListener = ({
  onLeftMouseButtonDown,
  onMiddleMouseButtonDown,
  onRightMouseButtonDown,
  onLeftMouseButtonUp,
  onMiddleMouseButtonUp,
  onRightMouseButtonUp,
}: MouseButtonsListenerProps) => {
  useEffect(
    () =>
      mountMouseButtonsListener({
        onLeftMouseButtonDown,
        onMiddleMouseButtonDown,
        onRightMouseButtonDown,
        onLeftMouseButtonUp,
        onMiddleMouseButtonUp,
        onRightMouseButtonUp,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return null
}
