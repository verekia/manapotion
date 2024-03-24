import { useEffect } from 'react'

import { mountFullscreenListener } from '@manapotion/core'

export type FullscreenChangeListenerProps = {
  onFullscreenChange?: (isFullscreen: boolean) => void
}

export const FullscreenChangeListener = ({ onFullscreenChange }: FullscreenChangeListenerProps) => {
  useEffect(() => mountFullscreenListener(onFullscreenChange), [onFullscreenChange])

  return null
}
