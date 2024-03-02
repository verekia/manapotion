import { useEffect, useRef } from 'react'

import { getBrowserState, liveBrowserState } from './stores/browser-store'
import { throttleDebounce } from './util'

export const MouseMoveEvents = ({
  mouseMovementResetDelay = 30,
  reactiveMouseMoveThrottleDelay = 100,
  onReactiveMouseMove,
  onLiveMouseMove,
}: {
  reactiveMouseMoveThrottleDelay?: number
  mouseMovementResetDelay?: number
  onReactiveMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
  onLiveMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
}) => {
  const mouseMovementResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
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

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (mouseMovementResetTimeoutRef.current) {
        clearTimeout(mouseMovementResetTimeoutRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [
    reactiveMouseMoveThrottleDelay,
    onReactiveMouseMove,
    onLiveMouseMove,
    mouseMovementResetDelay,
  ])

  return null
}

export const PageVisibilityEvents = ({
  onVisibilityChange,
}: {
  onVisibilityChange?: (isVisible: boolean) => void
}) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden
      getBrowserState().setPageVisible(isVisible)
      onVisibilityChange?.(isVisible)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [onVisibilityChange])

  return null
}

export const PointerLockEvents = ({
  onPointerLockChange,
}: {
  onPointerLockChange?: (isPointerLocked: boolean) => void
}) => {
  useEffect(() => {
    const handlePointerLockChange = () => {
      const isPointerLocked = Boolean(document.pointerLockElement)
      getBrowserState().setPointerLocked(isPointerLocked)
      onPointerLockChange?.(isPointerLocked)
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)

    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange)
  }, [onPointerLockChange])

  return null
}

export const FullscreenChangeEvents = ({
  onFullscreenChange,
}: {
  onFullscreenChange?: (isFullscreen: boolean) => void
}) => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement)
      getBrowserState().setFullscreen(isFullscreen)
      onFullscreenChange?.(isFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [onFullscreenChange])

  return null
}

export const ResizeEvents = ({
  reactiveResizeThrottleDelay = 100,
  onReactiveResize,
  onLiveResize,
}: {
  reactiveResizeThrottleDelay?: number
  onReactiveResize?: (width: number, height: number) => void
  onLiveResize?: (width: number, height: number) => void
}) => {
  useEffect(() => {
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

    const widthInit = window.innerWidth
    const heightInit = window.innerHeight
    getBrowserState().setSize(widthInit, heightInit)
    onReactiveResize?.(widthInit, heightInit)
    liveBrowserState.width = widthInit
    liveBrowserState.height = heightInit

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [reactiveResizeThrottleDelay, onReactiveResize, onLiveResize])

  return null
}

export const CanHoverEvents = ({
  canHoverIntervalDelay = 500,
  onCanHoverChange,
}: {
  canHoverIntervalDelay?: number
  onCanHoverChange?: (canHover: boolean) => void
}) => {
  const canHoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    canHoverIntervalRef.current = setInterval(() => {
      const canHover = window.matchMedia('(hover: hover)').matches
      getBrowserState().setCanHover(canHover)
      onCanHoverChange?.(canHover)
    }, canHoverIntervalDelay)

    const canHoverInit = window.matchMedia('(hover: hover)').matches
    getBrowserState().setCanHover(canHoverInit)
    onCanHoverChange?.(canHoverInit)

    return () => {
      if (canHoverIntervalRef.current) {
        clearInterval(canHoverIntervalRef.current)
      }
    }
  }, [canHoverIntervalDelay, onCanHoverChange])

  return null
}

export const MouseDownEvents = ({
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
}: {
  onLeftMouseDown?: () => void
  onMiddleMouseDown?: () => void
  onRightMouseDown?: () => void
  onLeftMouseUp?: () => void
  onMiddleMouseUp?: () => void
  onRightMouseUp?: () => void
}) => {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        getBrowserState().setLeftMouseDown(true)
        onLeftMouseDown?.()
      } else if (e.button === 1) {
        getBrowserState().setMiddleMouseDown(true)
        onMiddleMouseDown?.()
      } else if (e.button === 2) {
        getBrowserState().setRightMouseDown(true)
        onRightMouseDown?.()
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        getBrowserState().setLeftMouseDown(false)
        onLeftMouseUp?.()
      } else if (e.button === 1) {
        getBrowserState().setMiddleMouseDown(false)
        onMiddleMouseUp?.()
      } else if (e.button === 2) {
        getBrowserState().setRightMouseDown(false)
        onRightMouseUp?.()
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    onLeftMouseDown,
    onMiddleMouseDown,
    onRightMouseDown,
    onLeftMouseUp,
    onMiddleMouseUp,
    onRightMouseUp,
  ])

  return null
}

const AllBrowserEvents = ({
  mouseMoveEvents,
  pageVisibilityEvents,
  pointerLockEvents,
  fullscreenChangeEvents,
  resizeEvents,
  canHoverEvents,
  mouseDownEvents,
}: {
  mouseMoveEvents?: Parameters<typeof MouseMoveEvents>[0]
  pageVisibilityEvents?: Parameters<typeof PageVisibilityEvents>[0]
  pointerLockEvents?: Parameters<typeof PointerLockEvents>[0]
  fullscreenChangeEvents?: Parameters<typeof FullscreenChangeEvents>[0]
  resizeEvents?: Parameters<typeof ResizeEvents>[0]
  canHoverEvents?: Parameters<typeof CanHoverEvents>[0]
  mouseDownEvents?: Parameters<typeof MouseDownEvents>[0]
}) => (
  <>
    <MouseMoveEvents {...mouseMoveEvents} />
    <PageVisibilityEvents {...pageVisibilityEvents} />
    <PointerLockEvents {...pointerLockEvents} />
    <FullscreenChangeEvents {...fullscreenChangeEvents} />
    <ResizeEvents {...resizeEvents} />
    <CanHoverEvents {...canHoverEvents} />
    <MouseDownEvents {...mouseDownEvents} />
  </>
)

export default AllBrowserEvents
