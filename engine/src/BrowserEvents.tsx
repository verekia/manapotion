import { useEffect, useRef } from 'react'

import { getBrowserState } from './stores/browser-store'
import { throttleDebounce } from './util'

const BrowserEvents = ({
  resizeThrottleDelay = 100,
  canHoverIntervalDelay = 500,
  onVisibilityChange,
  onFullscreenChange,
  onPointerLockChange,
  onResize,
  onCanHoverChange,
}: {
  resizeThrottleDelay?: number
  canHoverIntervalDelay?: number
  onVisibilityChange?: (isVisible: boolean) => void
  onFullscreenChange?: (isFullscreen: boolean) => void
  onPointerLockChange?: (isPointerLocked: boolean) => void
  onResize?: (width: number, height: number) => void
  onCanHoverChange?: (canHover: boolean) => void
}) => {
  const canHoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

    canHoverIntervalRef.current = setInterval(() => {
      const canHover = window.matchMedia('(hover: hover)').matches
      getBrowserState().setCanHover(canHover)
      onCanHoverChange?.(canHover)
    }, canHoverIntervalDelay)

    const widthInit = window.innerWidth
    const heightInit = window.innerHeight
    getBrowserState().setSize(widthInit, heightInit)
    onResize?.(widthInit, heightInit)

    const canHoverInit = window.matchMedia('(hover: hover)').matches
    getBrowserState().setCanHover(canHoverInit)
    onCanHoverChange?.(canHoverInit)

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    window.addEventListener('resize', throttleDebounce(handleResize, resizeThrottleDelay))

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      window.removeEventListener('resize', handleResize)

      if (canHoverIntervalRef.current) {
        clearInterval(canHoverIntervalRef.current)
      }
    }
  }, [])

  return null
}

export default BrowserEvents
