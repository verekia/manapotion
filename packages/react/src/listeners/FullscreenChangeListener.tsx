import { useEffect } from 'react'

import { handlePointerLockChange } from '@manapotion/core'

export type FullscreenChangeListenerProps = {
  onFullscreenChange?: (isFullscreen: boolean) => void
}

export const FullscreenChangeListener = ({ onFullscreenChange }: FullscreenChangeListenerProps) => {
  useEffect(() => {
    const handler = handlePointerLockChange({ onChange: onFullscreenChange })

    document.addEventListener('fullscreenchange', handler)

    return () => document.removeEventListener('fullscreenchange', handler)
  }, [onFullscreenChange])

  return null
}
