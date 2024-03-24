import { useEffect } from 'react'

import { mountFullscreenListener } from '@manapotion/core'

export type FullscreenListenerProps = {
  onUpdate?: (isFullscreen: boolean) => void
}

export const FullscreenListener = ({ onUpdate }: FullscreenListenerProps) => {
  useEffect(() => mountFullscreenListener({ onUpdate }), [onUpdate])

  return null
}
