import { useEffect, useRef } from 'react'

import { throttleDebounce } from './util'
import { KeyState, mp } from './store'

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  reactiveMouseMoveThrottleDelay?: number
  onReactiveMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
  onLiveMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const MouseMoveListener = ({
  mouseMovementResetDelay = 30,
  reactiveMouseMoveThrottleDelay = 100,
  onReactiveMouseMove,
  onLiveMouseMove,
}: MouseMoveListenerProps) => {
  const mouseMovementResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const throttledMouseMove = throttleDebounce(
      (x: number, y: number, movementX: number, movementY: number) => {
        mp().setMousePosition(x, y)
        mp().setMouseMovement(movementX, movementY)
        onReactiveMouseMove?.(x, y, movementX, movementY)

        if (mouseMovementResetDelay) {
          mouseMovementResetTimeoutRef.current = setTimeout(() => {
            mp().setMouseMovement(0, 0)
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

      mp().mouseX = mouseX
      mp().mouseY = mouseY
      mp().mouseMovementX = mouseMovementX
      mp().mouseMovementY = mouseMovementY
      onLiveMouseMove?.(mouseX, mouseY, mouseMovementX, mouseMovementY)

      mouseMovementResetTimeoutRef.current && clearTimeout(mouseMovementResetTimeoutRef.current)

      if (mouseMovementResetDelay) {
        mouseMovementResetTimeoutRef.current = setTimeout(() => {
          mp().mouseMovementX = 0
          mp().mouseMovementY = 0
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

export type PageVisibilityListenerProps = {
  onVisibilityChange?: (isVisible: boolean) => void
}

export const PageVisibilityListener = ({ onVisibilityChange }: PageVisibilityListenerProps) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden
      mp().setPageVisible(isVisible)
      onVisibilityChange?.(isVisible)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [onVisibilityChange])

  return null
}

export type PointerLockListenerProps = {
  onPointerLockChange?: (isPointerLocked: boolean) => void
}

export const PointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  useEffect(() => {
    const handlePointerLockChange = () => {
      const isPointerLocked = Boolean(document.pointerLockElement)
      mp().setPointerLocked(isPointerLocked)
      onPointerLockChange?.(isPointerLocked)
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)

    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange)
  }, [onPointerLockChange])

  return null
}

export type FullscreenChangeListenerProps = {
  onFullscreenChange?: (isFullscreen: boolean) => void
}

export const FullscreenChangeListener = ({ onFullscreenChange }: FullscreenChangeListenerProps) => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement)
      mp().setFullscreen(isFullscreen)
      onFullscreenChange?.(isFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [onFullscreenChange])

  return null
}

export type ResizeListenerProps = {
  reactiveResizeThrottleDelay?: number
  onReactiveResize?: (width: number, height: number) => void
  onLiveResize?: (width: number, height: number) => void
}

export const ResizeListener = ({
  reactiveResizeThrottleDelay = 100,
  onReactiveResize,
  onLiveResize,
}: ResizeListenerProps) => {
  useEffect(() => {
    const throttledResize = throttleDebounce((width: number, height: number) => {
      mp().setSize(width, height)
      onReactiveResize?.(width, height)
    }, reactiveResizeThrottleDelay)

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      mp().width = width
      mp().height = height
      onLiveResize?.(width, height)

      throttledResize(width, height)
    }

    const widthInit = window.innerWidth
    const heightInit = window.innerHeight
    mp().setSize(widthInit, heightInit)
    onReactiveResize?.(widthInit, heightInit)
    mp().width = widthInit
    mp().height = heightInit

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [reactiveResizeThrottleDelay, onReactiveResize, onLiveResize])

  return null
}

export type CanHoverListenerProps = {
  canHoverIntervalDelay?: number
  onCanHoverChange?: (canHover: boolean) => void
}

export const CanHoverListener = ({
  canHoverIntervalDelay = 500,
  onCanHoverChange,
}: CanHoverListenerProps) => {
  const canHoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    canHoverIntervalRef.current = setInterval(() => {
      const canHover = window.matchMedia('(hover: hover)').matches
      mp().setCanHover(canHover)
      onCanHoverChange?.(canHover)
    }, canHoverIntervalDelay)

    const canHoverInit = window.matchMedia('(hover: hover)').matches
    mp().setCanHover(canHoverInit)
    onCanHoverChange?.(canHoverInit)

    return () => {
      if (canHoverIntervalRef.current) {
        clearInterval(canHoverIntervalRef.current)
      }
    }
  }, [canHoverIntervalDelay, onCanHoverChange])

  return null
}

export type MouseDownListenerProps = {
  onLeftMouseDown?: () => void
  onMiddleMouseDown?: () => void
  onRightMouseDown?: () => void
  onLeftMouseUp?: () => void
  onMiddleMouseUp?: () => void
  onRightMouseUp?: () => void
}

export const MouseDownListener = ({
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
}: MouseDownListenerProps) => {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        mp().setLeftMouseDown(true)
        onLeftMouseDown?.()
      } else if (e.button === 1) {
        mp().setMiddleMouseDown(true)
        onMiddleMouseDown?.()
      } else if (e.button === 2) {
        mp().setRightMouseDown(true)
        onRightMouseDown?.()
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        mp().setLeftMouseDown(false)
        onLeftMouseUp?.()
      } else if (e.button === 1) {
        mp().setMiddleMouseDown(false)
        onMiddleMouseUp?.()
      } else if (e.button === 2) {
        mp().setRightMouseDown(false)
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

type KeyboardListenerProps = {
  onKeydown?: (keyState: KeyState) => void
  onKeyup?: (code: string, key: string) => void
}

// https://w3c.github.io/uievents/tools/key-event-viewer.html
export const KeyboardListener = ({ onKeydown, onKeyup }: KeyboardListenerProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, code } = e

      if (mp().keys.byCode[code] || mp().keys.byKey[key]) {
        return
      }

      const keyState = {
        key,
        code,
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey,
        meta: e.metaKey,
      }

      onKeydown?.(keyState)
      mp().setKeyDown(keyState)
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      mp().setKeyUp(e.code, e.key)
      onKeyup?.(e.code, e.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onKeydown, onKeyup])

  return null
}

export type ListenersProps = MouseMoveListenerProps &
  PageVisibilityListenerProps &
  PointerLockListenerProps &
  FullscreenChangeListenerProps &
  ResizeListenerProps &
  CanHoverListenerProps &
  MouseDownListenerProps &
  KeyboardListenerProps

export const Listeners = ({
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
  onKeydown,
  onKeyup,
}: ListenersProps) => (
  <>
    <MouseMoveListener
      mouseMovementResetDelay={mouseMovementResetDelay}
      reactiveMouseMoveThrottleDelay={reactiveMouseMoveThrottleDelay}
      onReactiveMouseMove={onReactiveMouseMove}
      onLiveMouseMove={onLiveMouseMove}
    />
    <PageVisibilityListener onVisibilityChange={onVisibilityChange} />
    <PointerLockListener onPointerLockChange={onPointerLockChange} />
    <FullscreenChangeListener onFullscreenChange={onFullscreenChange} />
    <ResizeListener
      reactiveResizeThrottleDelay={reactiveResizeThrottleDelay}
      onReactiveResize={onReactiveResize}
      onLiveResize={onLiveResize}
    />
    <CanHoverListener
      canHoverIntervalDelay={canHoverIntervalDelay}
      onCanHoverChange={onCanHoverChange}
    />
    <MouseDownListener
      onLeftMouseDown={onLeftMouseDown}
      onMiddleMouseDown={onMiddleMouseDown}
      onRightMouseDown={onRightMouseDown}
      onLeftMouseUp={onLeftMouseUp}
      onMiddleMouseUp={onMiddleMouseUp}
      onRightMouseUp={onRightMouseUp}
    />
    <KeyboardListener onKeydown={onKeydown} onKeyup={onKeyup} />
  </>
)
