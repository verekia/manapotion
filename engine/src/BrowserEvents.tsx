import { useEffect } from 'react'

import { getBrowserState } from './stores/useBrowserStore'
import { throttleDebounce } from './util'

const BrowserEvents = ({
  resizeThrottleDelay,
  onVisibilityChange,
  onFullscreenChange,
  onPointerLockChange,
  onResize,
}: {
  resizeThrottleDelay?: number
  onVisibilityChange?: (event: Event) => void
  onFullscreenChange?: (event: Event) => void
  onPointerLockChange?: (event: Event) => void
  onResize?: (event: Event) => void
}) => {
  useEffect(() => {
    const handleVisibilityChange = (e: Event) => {
      getBrowserState().setPageVisible(!document.hidden)
      onVisibilityChange?.(e)
    }

    const handleFullscreenChange = (e: Event) => {
      getBrowserState().setFullscreen(Boolean(document.fullscreenElement))
      onFullscreenChange?.(e)
    }

    const handlePointerLockChange = (e: Event) => {
      getBrowserState().setPointerLocked(Boolean(document.pointerLockElement))
      onPointerLockChange?.(e)
    }

    const handleResize = (e: Event) => {
      getBrowserState().setSize(window.innerWidth, window.innerHeight)
      onResize?.(e)
    }

    getBrowserState().setSize(window.innerWidth, window.innerHeight)

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    window.addEventListener('resize', throttleDebounce(handleResize, resizeThrottleDelay))

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return null
}

export default BrowserEvents
