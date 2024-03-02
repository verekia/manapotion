import { useEffect, useRef } from 'react'

import { getBrowserState, liveBrowserState } from './stores/browser-store'
import { throttleDebounce } from './util'

const BrowserEvents = ({
  reactiveResizeThrottleDelay = 100,
  reactiveMouseMoveThrottleDelay = 100,
  canHoverIntervalDelay = 500,
  mouseMovementResetDelay = 30,
  onVisibilityChange,
  onFullscreenChange,
  onPointerLockChange,
  onReactiveResize,
  onReactiveMouseMove,
  onLiveResize,
  onLiveMouseMove,
  onCanHoverChange,
}: {
  reactiveResizeThrottleDelay?: number
  reactiveMouseMoveThrottleDelay?: number
  canHoverIntervalDelay?: number
  mouseMovementResetDelay?: number
  onVisibilityChange?: (isVisible: boolean) => void
  onFullscreenChange?: (isFullscreen: boolean) => void
  onPointerLockChange?: (isPointerLocked: boolean) => void
  onReactiveResize?: (width: number, height: number) => void
  onReactiveMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
  onLiveResize?: (width: number, height: number) => void
  onLiveMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
  onCanHoverChange?: (canHover: boolean) => void
}) => {
  const canHoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const mouseMovementResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

    const throttledResize = throttleDebounce((width: number, height: number) => {
      getBrowserState().setSize(width, height)
      onReactiveResize?.(width, height)
    }, reactiveResizeThrottleDelay)

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      liveBrowserState.width = width
      liveBrowserState.height = height
      onLiveResize?.(width, height)

      throttledResize(width, height)
    }

    const throttledMouseMove = throttleDebounce(
      (x: number, y: number, movementX: number, movementY: number) => {
        getBrowserState().setMousePosition(x, y)
        getBrowserState().setMouseMovement(movementX, movementY)
        onReactiveMouseMove?.(x, y, movementX, movementY)

        if (mouseMovementResetDelay) {
          mouseMovementResetTimeoutRef.current = setTimeout(() => {
            getBrowserState().setMouseMovement(0, 0)
            onReactiveMouseMove?.(x, y, 0, 0)
          }, mouseMovementResetDelay)
        }
      },
      reactiveMouseMoveThrottleDelay
    )

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      const mouseMovementX = e.movementX
      const mouseMovementY = e.movementY

      liveBrowserState.mouseX = mouseX
      liveBrowserState.mouseY = mouseY
      liveBrowserState.mouseMovementX = mouseMovementX
      liveBrowserState.mouseMovementY = mouseMovementY
      onLiveMouseMove?.(mouseX, mouseY, e.movementX, e.movementY)

      mouseMovementResetTimeoutRef.current && clearTimeout(mouseMovementResetTimeoutRef.current)

      if (mouseMovementResetDelay) {
        mouseMovementResetTimeoutRef.current = setTimeout(() => {
          liveBrowserState.mouseMovementX = 0
          liveBrowserState.mouseMovementY = 0
          onLiveMouseMove?.(mouseX, mouseY, 0, 0)
        }, mouseMovementResetDelay)
      }

      throttledMouseMove(mouseX, mouseY, e.movementX, e.movementY)
    }

    canHoverIntervalRef.current = setInterval(() => {
      const canHover = window.matchMedia('(hover: hover)').matches
      getBrowserState().setCanHover(canHover)
      onCanHoverChange?.(canHover)
    }, canHoverIntervalDelay)

    const widthInit = window.innerWidth
    const heightInit = window.innerHeight
    getBrowserState().setSize(widthInit, heightInit)
    onReactiveResize?.(widthInit, heightInit)
    liveBrowserState.width = widthInit
    liveBrowserState.height = heightInit

    const canHoverInit = window.matchMedia('(hover: hover)').matches
    getBrowserState().setCanHover(canHoverInit)
    onCanHoverChange?.(canHoverInit)

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)

      if (canHoverIntervalRef.current) {
        clearInterval(canHoverIntervalRef.current)
      }
      if (mouseMovementResetTimeoutRef.current) {
        clearTimeout(mouseMovementResetTimeoutRef.current)
      }
    }
  }, [
    reactiveResizeThrottleDelay,
    reactiveMouseMoveThrottleDelay,
    canHoverIntervalDelay,
    onVisibilityChange,
    onFullscreenChange,
    onPointerLockChange,
    onReactiveResize,
    onReactiveMouseMove,
    onLiveResize,
    onLiveMouseMove,
    onCanHoverChange,
  ])

  return null
}

export default BrowserEvents
