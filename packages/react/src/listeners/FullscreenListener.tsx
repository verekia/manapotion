import { useEffect } from 'react'

import { mountFullscreenListener } from '@manapotion/core'

export type FullscreenListenerProps = {
  onFullscreenChange?: (isFullscreen: boolean) => void
}

export const FullscreenListener = ({ onFullscreenChange }: FullscreenListenerProps) => {
  useEffect(() => mountFullscreenListener(onFullscreenChange), [onFullscreenChange])

  return null
}
