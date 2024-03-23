import { useEffect, useRef } from 'react'

import { handleMouseMove, KeyState, mouseMoveCleanup, mp } from '@manapotion/core'

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const MouseMoveListener = ({
  mouseMovementResetDelay = 30,
  onMouseMove,
}: MouseMoveListenerProps) => {
  const mouseMovementResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const highOrderHandleMouseMove = handleMouseMove({
      onMouseMove,
      mouseMoveResetDelay: mouseMovementResetDelay,
      mouseMoveResetTimeout: mouseMovementResetTimeoutRef.current,
    })

    window.addEventListener('mousemove', highOrderHandleMouseMove)

    return () => {
      mouseMoveCleanup(mouseMovementResetTimeoutRef.current)
      window.removeEventListener('mousemove', highOrderHandleMouseMove)
    }
  }, [onMouseMove, mouseMovementResetDelay])

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

export type PageFocusListenerProps = {
  clearInputsOnBlur?: boolean
  onPageBlur?: () => void
  onPageFocus?: () => void
}

export const PageFocusListener = ({
  onPageBlur,
  onPageFocus,
  clearInputsOnBlur = true,
}: PageFocusListenerProps) => {
  useEffect(() => {
    const handleBlur = () => {
      mp().setPageFocused(false)
      onPageBlur?.()
      if (clearInputsOnBlur) {
        mp().clearInputs()
      }
    }

    const handleFocus = () => {
      mp().setPageFocused(true)
      onPageFocus?.()
    }

    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [onPageFocus, onPageBlur])

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
  onResize?: (params: {
    width: number
    height: number
    isLandscape: boolean
    isPortrait: boolean
  }) => void
}

export const ResizeListener = ({ onResize }: ResizeListenerProps) => {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      mp().windowWidth = width
      mp().windowHeight = height
      const isPortrait = height >= width
      const isLandscape = width > height
      mp().isPortrait = isPortrait
      mp().isLandscape = isLandscape
      onResize?.({ width, height, isPortrait, isLandscape })
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [onResize])

  return null
}

export type DeviceTypeListenerProps = {
  onDeviceTypeChange?: ({ isDesktop, isMobile }: { isDesktop: boolean; isMobile: boolean }) => void
}

export const DeviceTypeListener = ({ onDeviceTypeChange }: DeviceTypeListenerProps) => {
  useEffect(() => {
    const desktopQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const mobileQuery = window.matchMedia('(hover: none) and (pointer: coarse)')

    const handleDeviceTypeChange = () => {
      const isDesktop = desktopQuery.matches
      const isMobile = mobileQuery.matches
      mp().setDeviceType({ isDesktop, isMobile })
      onDeviceTypeChange?.({ isDesktop, isMobile })
    }

    handleDeviceTypeChange()

    desktopQuery.addEventListener('change', handleDeviceTypeChange)

    return () => desktopQuery.removeEventListener('change', handleDeviceTypeChange)
  }, [onDeviceTypeChange])

  return null
}

export type ScreenOrientationListenerProps = {
  onScreenOrientationChange?: ({
    isLandscape,
    isPortrait,
  }: {
    isLandscape: boolean
    isPortrait: boolean
  }) => void
}

export const ScreenOrientationListener = ({
  onScreenOrientationChange,
}: ScreenOrientationListenerProps) => {
  useEffect(() => {
    const landscapeQuery = window.matchMedia('(orientation: landscape)')
    const portraitQuery = window.matchMedia('(orientation: portrait)')

    const handleScreenOrientationChange = () => {
      const isLandscape = landscapeQuery.matches
      const isPortrait = portraitQuery.matches
      mp().setScreenOrientation({ isLandscape, isPortrait })
      onScreenOrientationChange?.({ isLandscape, isPortrait })
    }

    handleScreenOrientationChange()

    landscapeQuery.addEventListener('change', handleScreenOrientationChange)

    return () => {
      landscapeQuery.removeEventListener('change', handleScreenOrientationChange)
    }
  }, [onScreenOrientationChange])

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

export type MouseScrollListenerProps = {
  onScroll?: (deltaY: number) => void
  mouseScrollResetDelay?: number
}

export const MouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay = 500,
}: MouseScrollListenerProps) => {
  const mouseWheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleMouseScroll = (e: WheelEvent) => {
      const deltaY = e.deltaY

      onScroll?.(deltaY)
      mp().mouseWheelDeltaY = deltaY

      if (mouseWheelResetTimeoutRef.current) {
        clearTimeout(mouseWheelResetTimeoutRef.current)
      }

      if (mouseScrollResetDelay) {
        mouseWheelResetTimeoutRef.current = setTimeout(() => {
          onScroll?.(0)
          mp().mouseWheelDeltaY = 0
        }, mouseScrollResetDelay)
      }
    }

    window.addEventListener('wheel', handleMouseScroll)

    return () => window.removeEventListener('wheel', handleMouseScroll)
  }, [onScroll])

  return null
}

export type ListenersProps = MouseMoveListenerProps &
  PageVisibilityListenerProps &
  PageFocusListenerProps &
  PointerLockListenerProps &
  FullscreenChangeListenerProps &
  ResizeListenerProps &
  DeviceTypeListenerProps &
  ScreenOrientationListenerProps &
  MouseDownListenerProps &
  KeyboardListenerProps &
  MouseScrollListenerProps

export const Listeners = ({
  mouseMovementResetDelay = 30,
  onMouseMove,
  onVisibilityChange,
  onPageBlur,
  onPageFocus,
  onPointerLockChange,
  onFullscreenChange,
  onResize,
  onDeviceTypeChange,
  onScreenOrientationChange,
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
  onScroll,
  mouseScrollResetDelay = 100,
  onKeydown,
  onKeyup,
}: ListenersProps) => (
  <>
    <MouseMoveListener
      mouseMovementResetDelay={mouseMovementResetDelay}
      onMouseMove={onMouseMove}
    />
    <PageVisibilityListener onVisibilityChange={onVisibilityChange} />
    <PageFocusListener onPageBlur={onPageBlur} onPageFocus={onPageFocus} />
    <PointerLockListener onPointerLockChange={onPointerLockChange} />
    <FullscreenChangeListener onFullscreenChange={onFullscreenChange} />
    <ResizeListener onResize={onResize} />
    <DeviceTypeListener onDeviceTypeChange={onDeviceTypeChange} />
    <ScreenOrientationListener onScreenOrientationChange={onScreenOrientationChange} />
    <MouseDownListener
      onLeftMouseDown={onLeftMouseDown}
      onMiddleMouseDown={onMiddleMouseDown}
      onRightMouseDown={onRightMouseDown}
      onLeftMouseUp={onLeftMouseUp}
      onMiddleMouseUp={onMiddleMouseUp}
      onRightMouseUp={onRightMouseUp}
    />
    <KeyboardListener onKeydown={onKeydown} onKeyup={onKeyup} />
    <MouseScrollListener onScroll={onScroll} mouseScrollResetDelay={mouseScrollResetDelay} />
  </>
)
