import { useEffect } from 'react'

import { getBrowserState } from './stores/useBrowserStore'

const BrowserEvents = () => {
  useEffect(() => {
    const handleVisibilityChange = () => getBrowserState().setPageVisible(!document.hidden)

    const handleFullscreenChange = () =>
      getBrowserState().setFullscreen(Boolean(document.fullscreenElement))

    const handlePointerLockChange = () =>
      getBrowserState().setPointerLocked(Boolean(document.pointerLockElement))

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('pointerlockchange', handlePointerLockChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
    }
  }, [])

  return null
}

export default BrowserEvents
