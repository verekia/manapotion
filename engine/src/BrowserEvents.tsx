import { useEffect } from 'react'

import useBrowserStore from './stores/useBrowserStore'

const BrowserEvents = () => {
  useEffect(() => {
    const handleVisibilityChange = () => useBrowserStore.getState().setPageVisible(!document.hidden)

    const handleFullscreenChange = () =>
      useBrowserStore.getState().setFullscreen(Boolean(document.fullscreenElement))

    const handlePointerLockChange = () =>
      useBrowserStore.getState().setPointerLocked(Boolean(document.pointerLockElement))

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
