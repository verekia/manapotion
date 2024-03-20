import { useEffect, useRef } from 'react'

import { throttleDebounce } from './react-util'
import { KeyState, mp } from './store'

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  reactiveMouseMoveThrottleDelay?: number
  onMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const MouseMoveListener = ({
  mouseMovementResetDelay = 30,
  reactiveMouseMoveThrottleDelay = 100,
  onMouseMove,
}: MouseMoveListenerProps) => {
  const mouseMovementResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const throttledMouseMove = throttleDebounce(
      (x: number, y: number, movementX: number, movementY: number) => {
        mp().setMousePosition(x, y)
        mp().setMouseMovement(movementX, movementY)

        if (mouseMovementResetDelay) {
          mouseMovementResetTimeoutRef.current = setTimeout(() => {
            mp().setMouseMovement(0, 0)
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
      onMouseMove?.(mouseX, mouseY, mouseMovementX, mouseMovementY)

      mouseMovementResetTimeoutRef.current && clearTimeout(mouseMovementResetTimeoutRef.current)

      if (mouseMovementResetDelay) {
        mouseMovementResetTimeoutRef.current = setTimeout(() => {
          mp().mouseMovementX = 0
          mp().mouseMovementY = 0
          onMouseMove?.(mouseX, mouseY, 0, 0)
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
  }, [reactiveMouseMoveThrottleDelay, onMouseMove, mouseMovementResetDelay])

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
  reactiveResizeThrottleDelay?: number
  onResize?: (params: {
    width: number
    height: number
    isLandscape: boolean
    isPortrait: boolean
  }) => void
}

export const ResizeListener = ({
  reactiveResizeThrottleDelay = 100,
  onResize,
}: ResizeListenerProps) => {
  useEffect(() => {
    const throttledResize = throttleDebounce(
      ({
        width,
        height,
        isLandscape,
        isPortrait,
      }: {
        width: number
        height: number
        isLandscape: boolean
        isPortrait: boolean
      }) => {
        mp().setSize({ windowWidth: width, windowHeight: height, isLandscape, isPortrait })
      },
      reactiveResizeThrottleDelay
    )

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
      throttledResize({ width, height, isPortrait, isLandscape })
    }

    const widthInit = window.innerWidth
    const heightInit = window.innerHeight
    // In the CSS spec, portrait is greater or equal
    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation
    const isPortraitInit = heightInit >= widthInit
    const isLandscapeInit = widthInit > heightInit
    mp().setSize({
      windowWidth: widthInit,
      windowHeight: heightInit,
      isPortrait: isPortraitInit,
      isLandscape: isLandscapeInit,
    })

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [reactiveResizeThrottleDelay, onResize])

  return null
}

export type DeviceTypeListenerProps = {
  deviceTypeIntervalDelay?: number
  onDeviceTypeChange?: ({ isDesktop, isMobile }: { isDesktop: boolean; isMobile: boolean }) => void
}

export const DeviceTypeListener = ({
  deviceTypeIntervalDelay = 500,
  onDeviceTypeChange,
}: DeviceTypeListenerProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
      mp().setDeviceType(isDesktop, isMobile)
      onDeviceTypeChange?.({ isDesktop, isMobile })
    }, deviceTypeIntervalDelay)

    const isDesktopInit = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const isMobileInit = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    mp().setDeviceType(isDesktopInit, isMobileInit)
    onDeviceTypeChange?.({ isDesktop: isDesktopInit, isMobile: isMobileInit })

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [deviceTypeIntervalDelay, onDeviceTypeChange])

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
  reactiveScrollThrottleDelay?: number
}

export const MouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay = 500,
  reactiveScrollThrottleDelay = 100,
}: MouseScrollListenerProps) => {
  const mouseWheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const throttledReactiveScroll = throttleDebounce((deltaY: number) => {
      mp().setMouseWheelDeltaY(deltaY)

      if (mouseWheelResetTimeoutRef.current) {
        clearTimeout(mouseWheelResetTimeoutRef.current)
      }

      if (mouseScrollResetDelay) {
        mouseWheelResetTimeoutRef.current = setTimeout(() => {
          mp().setMouseWheelDeltaY(0)
        }, mouseScrollResetDelay)
      }
    }, reactiveScrollThrottleDelay)

    const handleMouseScroll = (e: WheelEvent) => {
      const deltaY = e.deltaY

      onScroll?.(deltaY)
      mp().mouseWheelDeltaY = deltaY
      throttledReactiveScroll(deltaY)

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
  }, [onScroll, reactiveScrollThrottleDelay])

  return null
}

export type ListenersProps = MouseMoveListenerProps &
  PageVisibilityListenerProps &
  PageFocusListenerProps &
  PointerLockListenerProps &
  FullscreenChangeListenerProps &
  ResizeListenerProps &
  DeviceTypeListenerProps &
  MouseDownListenerProps &
  KeyboardListenerProps &
  MouseScrollListenerProps

export const Listeners = ({
  mouseMovementResetDelay = 30,
  reactiveMouseMoveThrottleDelay = 100,
  onMouseMove,
  onVisibilityChange,
  onPageBlur,
  onPageFocus,
  onPointerLockChange,
  onFullscreenChange,
  reactiveResizeThrottleDelay = 100,
  onResize,
  deviceTypeIntervalDelay = 500,
  onDeviceTypeChange,
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
  onScroll,
  mouseScrollResetDelay = 100,
  reactiveScrollThrottleDelay = 100,
  onKeydown,
  onKeyup,
}: ListenersProps) => (
  <>
    <MouseMoveListener
      mouseMovementResetDelay={mouseMovementResetDelay}
      reactiveMouseMoveThrottleDelay={reactiveMouseMoveThrottleDelay}
      onMouseMove={onMouseMove}
    />
    <PageVisibilityListener onVisibilityChange={onVisibilityChange} />
    <PageFocusListener onPageBlur={onPageBlur} onPageFocus={onPageFocus} />
    <PointerLockListener onPointerLockChange={onPointerLockChange} />
    <FullscreenChangeListener onFullscreenChange={onFullscreenChange} />
    <ResizeListener reactiveResizeThrottleDelay={reactiveResizeThrottleDelay} onResize={onResize} />
    <DeviceTypeListener
      deviceTypeIntervalDelay={deviceTypeIntervalDelay}
      onDeviceTypeChange={onDeviceTypeChange}
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
    <MouseScrollListener
      onScroll={onScroll}
      mouseScrollResetDelay={mouseScrollResetDelay}
      reactiveScrollThrottleDelay={reactiveScrollThrottleDelay}
    />
  </>
)
