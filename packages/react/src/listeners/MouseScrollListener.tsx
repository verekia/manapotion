import { useEffect } from 'react'

import { mountMouseScrollListener, MouseScrollListenerProps } from '@manapotion/core'

export const MouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay = 100,
}: MouseScrollListenerProps) => {
  useEffect(() => mountMouseScrollListener({ onScroll, mouseScrollResetDelay }), [onScroll])

  return null
}
