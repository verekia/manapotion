import { useEffect } from 'react'

import { mountMouseScrollListener } from '@manapotion/core'

import type { MouseScrollListenerProps } from '@manapotion/core'

export const MouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay,
}: MouseScrollListenerProps) => {
  useEffect(
    () => mountMouseScrollListener({ onScroll, mouseScrollResetDelay }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mouseScrollResetDelay],
  )

  return null
}
