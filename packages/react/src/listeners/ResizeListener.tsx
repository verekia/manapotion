import { useEffect } from 'react'

import { handleResize } from '@manapotion/core'

export type ResizeListenerProps = {
  onResize?: (params: {
    width: number
    height: number
    isLandscape: boolean
    isPortrait: boolean
  }) => void
}

export const ResizeListener = ({ onResize }: ResizeListenerProps) => {
  useEffect(() => {
    const handler = handleResize({ onResize })

    handler()

    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [onResize])

  return null
}
