import { useEffect, useRef } from 'react'

import { throttleDebounce } from '@manapotion/util'
import { engine } from './store'

export type MouseMoveEventProps = {
  mouseMovementResetDelay?: number
  reactiveMouseMoveThrottleDelay?: number
  onReactiveMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
  onLiveMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const MouseMoveEvents = ({
  mouseMovementResetDelay = 30,
  reactiveMouseMoveThrottleDelay = 100,
  onReactiveMouseMove,
  onLiveMouseMove,
}: MouseMoveEventProps) => {
  const mouseMovementResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const throttledMouseMove = throttleDebounce(
      (x: number, y: number, movementX: number, movementY: number) => {
        engine().setMousePosition(x, y)
        engine().setMouseMovement(movementX, movementY)
        onReactiveMouseMove?.(x, y, movementX, movementY)

        if (mouseMovementResetDelay) {
          mouseMovementResetTimeoutRef.current = setTimeout(() => {
            engine().setMouseMovement(0, 0)
            onReactiveMouseMove?.(x, y, 0, 0)
          }, mouseMovementResetDelay)
        }
      },
      reactiveMouseMoveThrottleDelay
    )

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = window.innerHeight - e.clientY
      const mouseMovementX = e.movementX
      const mouseMovementY = -e.movementY

      engine().mouseX = mouseX
      engine().mouseY = mouseY
      engine().mouseMovementX = mouseMovementX
      engine().mouseMovementY = mouseMovementY
      onLiveMouseMove?.(mouseX, mouseY, mouseMovementX, mouseMovementY)

      mouseMovementResetTimeoutRef.current && clearTimeout(mouseMovementResetTimeoutRef.current)

      if (mouseMovementResetDelay) {
        mouseMovementResetTimeoutRef.current = setTimeout(() => {
          engine().mouseMovementX = 0
          engine().mouseMovementY = 0
          onLiveMouseMove?.(mouseX, mouseY, 0, 0)
        }, mouseMovementResetDelay)
      }

      throttledMouseMove(mouseX, mouseY, mouseMovementX, mouseMovementY)
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

export type PageVisibilityEventProps = {
  onVisibilityChange?: (isVisible: boolean) => void
}

export const PageVisibilityEvents = ({ onVisibilityChange }: PageVisibilityEventProps) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden
      engine().setPageVisible(isVisible)
      onVisibilityChange?.(isVisible)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [onVisibilityChange])

  return null
}

export type PointerLockEventProps = {
  onPointerLockChange?: (isPointerLocked: boolean) => void
}

export const PointerLockEvents = ({ onPointerLockChange }: PointerLockEventProps) => {
  useEffect(() => {
    const handlePointerLockChange = () => {
      const isPointerLocked = Boolean(document.pointerLockElement)
      engine().setPointerLocked(isPointerLocked)
      onPointerLockChange?.(isPointerLocked)
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)

    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange)
  }, [onPointerLockChange])

  return null
}

export type FullscreenChangeEventProps = {
  onFullscreenChange?: (isFullscreen: boolean) => void
}

export const FullscreenChangeEvents = ({ onFullscreenChange }: FullscreenChangeEventProps) => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement)
      engine().setFullscreen(isFullscreen)
      onFullscreenChange?.(isFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [onFullscreenChange])

  return null
}

export type ResizeEventProps = {
  reactiveResizeThrottleDelay?: number
  onReactiveResize?: (width: number, height: number) => void
  onLiveResize?: (width: number, height: number) => void
}

export const ResizeEvents = ({
  reactiveResizeThrottleDelay = 100,
  onReactiveResize,
  onLiveResize,
}: ResizeEventProps) => {
  useEffect(() => {
    const throttledResize = throttleDebounce((width: number, height: number) => {
      engine().setSize(width, height)
      onReactiveResize?.(width, height)
    }, reactiveResizeThrottleDelay)

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      engine().width = width
      engine().height = height
      onLiveResize?.(width, height)

      throttledResize(width, height)
    }

    const widthInit = window.innerWidth
    const heightInit = window.innerHeight
    engine().setSize(widthInit, heightInit)
    onReactiveResize?.(widthInit, heightInit)
    engine().width = widthInit
    engine().height = heightInit

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [reactiveResizeThrottleDelay, onReactiveResize, onLiveResize])

  return null
}

export type CanHoverEventProps = {
  canHoverIntervalDelay?: number
  onCanHoverChange?: (canHover: boolean) => void
}

export const CanHoverEvents = ({
  canHoverIntervalDelay = 500,
  onCanHoverChange,
}: CanHoverEventProps) => {
  const canHoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    canHoverIntervalRef.current = setInterval(() => {
      const canHover = window.matchMedia('(hover: hover)').matches
      engine().setCanHover(canHover)
      onCanHoverChange?.(canHover)
    }, canHoverIntervalDelay)

    const canHoverInit = window.matchMedia('(hover: hover)').matches
    engine().setCanHover(canHoverInit)
    onCanHoverChange?.(canHoverInit)

    return () => {
      if (canHoverIntervalRef.current) {
        clearInterval(canHoverIntervalRef.current)
      }
    }
  }, [canHoverIntervalDelay, onCanHoverChange])

  return null
}

export type MouseDownEventProps = {
  onLeftMouseDown?: () => void
  onMiddleMouseDown?: () => void
  onRightMouseDown?: () => void
  onLeftMouseUp?: () => void
  onMiddleMouseUp?: () => void
  onRightMouseUp?: () => void
}

export const MouseDownEvents = ({
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
}: MouseDownEventProps) => {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        engine().setLeftMouseDown(true)
        onLeftMouseDown?.()
      } else if (e.button === 1) {
        engine().setMiddleMouseDown(true)
        onMiddleMouseDown?.()
      } else if (e.button === 2) {
        engine().setRightMouseDown(true)
        onRightMouseDown?.()
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        engine().setLeftMouseDown(false)
        onLeftMouseUp?.()
      } else if (e.button === 1) {
        engine().setMiddleMouseDown(false)
        onMiddleMouseUp?.()
      } else if (e.button === 2) {
        engine().setRightMouseDown(false)
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

export type UIEngineProps = MouseMoveEventProps &
  PageVisibilityEventProps &
  PointerLockEventProps &
  FullscreenChangeEventProps &
  ResizeEventProps &
  CanHoverEventProps &
  MouseDownEventProps

const UIEngine = ({
  mouseMovementResetDelay = 30,
  reactiveMouseMoveThrottleDelay = 100,
  onReactiveMouseMove,
  onLiveMouseMove,
  onVisibilityChange,
  onPointerLockChange,
  onFullscreenChange,
  reactiveResizeThrottleDelay = 100,
  onReactiveResize,
  onLiveResize,
  canHoverIntervalDelay = 500,
  onCanHoverChange,
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
}: UIEngineProps) => (
  <>
    <MouseMoveEvents
      mouseMovementResetDelay={mouseMovementResetDelay}
      reactiveMouseMoveThrottleDelay={reactiveMouseMoveThrottleDelay}
      onReactiveMouseMove={onReactiveMouseMove}
      onLiveMouseMove={onLiveMouseMove}
    />
    <PageVisibilityEvents onVisibilityChange={onVisibilityChange} />
    <PointerLockEvents onPointerLockChange={onPointerLockChange} />
    <FullscreenChangeEvents onFullscreenChange={onFullscreenChange} />
    <ResizeEvents
      reactiveResizeThrottleDelay={reactiveResizeThrottleDelay}
      onReactiveResize={onReactiveResize}
      onLiveResize={onLiveResize}
    />
    <CanHoverEvents
      canHoverIntervalDelay={canHoverIntervalDelay}
      onCanHoverChange={onCanHoverChange}
    />
    <MouseDownEvents
      onLeftMouseDown={onLeftMouseDown}
      onMiddleMouseDown={onMiddleMouseDown}
      onRightMouseDown={onRightMouseDown}
      onLeftMouseUp={onLeftMouseUp}
      onMiddleMouseUp={onMiddleMouseUp}
      onRightMouseUp={onRightMouseUp}
    />
  </>
)

export default UIEngine
