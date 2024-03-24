import { useEffect } from 'react'

import { mountResizeListener } from '@manapotion/core'

export type ResizeListenerProps = {
  onResize?: (params: {
    width: number
    height: number
    isLandscape: boolean
    isPortrait: boolean
  }) => void
}

export const ResizeListener = ({ onResize }: ResizeListenerProps) => {
  useEffect(() => mountResizeListener(onResize), [onResize])

  return null
}
