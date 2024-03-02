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
  onVisibilityChange?: (isVisible: boolean) => void
  onFullscreenChange?: (isFullscreen: boolean) => void
  onPointerLockChange?: (isPointerLocked: boolean) => void
  onResize?: (width: number, height: number) => void
}) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden
      getBrowserState().setPageVisible(isVisible)
      onVisibilityChange?.(isVisible)
    }

    const handleFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement)
      getBrowserState().setFullscreen(isFullscreen)
      onFullscreenChange?.(isFullscreen)
    }

    const handlePointerLockChange = () => {
      const isPointerLocked = Boolean(document.pointerLockElement)
      getBrowserState().setPointerLocked(isPointerLocked)
      onPointerLockChange?.(isPointerLocked)
    }

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      getBrowserState().setSize(width, height)
      onResize?.(width, height)
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
