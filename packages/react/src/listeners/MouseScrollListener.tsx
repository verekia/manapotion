import { useEffect } from 'react'

import { mountMouseScrollListener } from '@manapotion/core'

export type MouseScrollListenerProps = {
  onScroll?: (deltaY: number) => void
  mouseScrollResetDelay?: number
}

export const MouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay = 100,
}: MouseScrollListenerProps) => {
  useEffect(() => mountMouseScrollListener({ onScroll, mouseScrollResetDelay }), [onScroll])

  return null
}
