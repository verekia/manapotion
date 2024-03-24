import { useEffect, useRef } from 'react'

import { KeyState, mp } from '@manapotion/core'

import {
  FullscreenChangeListener,
  FullscreenChangeListenerProps,
} from './listeners/FullscreenChangeListener'
import { MouseMoveListener, MouseMoveListenerProps } from './listeners/MouseMoveListener'
import { PageFocusListener, PageFocusListenerProps } from './listeners/PageFocusListener'
import {
  PageVisibilityListener,
  PageVisibilityListenerProps,
} from './listeners/PageVisibilityListener'
import { PointerLockListener, PointerLockListenerProps } from './listeners/PointerLockListener'
import { ResizeListener, ResizeListenerProps } from './listeners/ResizeListener'

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
