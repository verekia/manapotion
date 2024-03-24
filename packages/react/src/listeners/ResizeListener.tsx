import { useEffect } from 'react'

import { mountResizeListener } from '@manapotion/core'

export type ResizeListenerProps = {
  onUpdate?: ({
    width,
    height,
    isLandscape,
    isPortrait,
  }: {
    width: number
    height: number
    isLandscape: boolean
    isPortrait: boolean
  }) => void
}

export const ResizeListener = ({ onUpdate }: ResizeListenerProps) => {
  useEffect(() => mountResizeListener({ onUpdate }), [onUpdate])

  return null
}
