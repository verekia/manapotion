import { useEffect, useRef } from 'react'

import { mp } from '@manapotion/core'

import { DeviceTypeListener, DeviceTypeListenerProps } from './listeners/DeviceTypeListener'
import { FullscreenListener, FullscreenListenerProps } from './listeners/FullscreenListener'
import { KeyboardListener, KeyboardListenerProps } from './listeners/KeyboardListener'
import { MouseButtonsListener, MouseButtonsListenerProps } from './listeners/MouseButtonsListener'
import { MouseMoveListener, MouseMoveListenerProps } from './listeners/MouseMoveListener'
import { PageFocusListener, PageFocusListenerProps } from './listeners/PageFocusListener'
import {
  PageVisibilityListener,
  PageVisibilityListenerProps,
} from './listeners/PageVisibilityListener'
import { PointerLockListener, PointerLockListenerProps } from './listeners/PointerLockListener'
import { ResizeListener, ResizeListenerProps } from './listeners/ResizeListener'
import {
  ScreenOrientationListener,
  ScreenOrientationListenerProps,
} from './listeners/ScreenOrientationListener'

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

type ListenersMouseMoveProps = Omit<MouseMoveListenerProps, 'onUpdate'> & {
  onMouseMoveUpdate?: MouseMoveListenerProps['onUpdate']
}

type ListenersPageVisibilityProps = Omit<PageVisibilityListenerProps, 'onUpdate'> & {
  onPageVisibilityUpdate?: PageVisibilityListenerProps['onUpdate']
}

type ListenersPageFocusProps = Omit<PageFocusListenerProps, 'onUpdate'> & {
  onPageFocusUpdate?: PageFocusListenerProps['onUpdate']
}

type ListenersPointerLockProps = Omit<PointerLockListenerProps, 'onUpdate'> & {
  onPointerLockUpdate?: PointerLockListenerProps['onUpdate']
}

type ListenersResizeProps = Omit<ResizeListenerProps, 'onUpdate'> & {
  onResizeUpdate?: ResizeListenerProps['onUpdate']
}

type ListenersFullscreenProps = Omit<FullscreenListenerProps, 'onUpdate'> & {
  onFullscreenUpdate?: FullscreenListenerProps['onUpdate']
}

type ListenersDeviceTypeProps = Omit<DeviceTypeListenerProps, 'onUpdate'> & {
  onDeviceTypeUpdate?: DeviceTypeListenerProps['onUpdate']
}

type ListenersScreenOrientationProps = Omit<ScreenOrientationListenerProps, 'onUpdate'> & {
  onScreenOrientationUpdate?: ScreenOrientationListenerProps['onUpdate']
}

export type ListenersProps = ListenersMouseMoveProps &
  ListenersPageVisibilityProps &
  ListenersPageFocusProps &
  ListenersPointerLockProps &
  ListenersFullscreenProps &
  ListenersResizeProps &
  ListenersDeviceTypeProps &
  ListenersScreenOrientationProps &
  MouseButtonsListenerProps &
  KeyboardListenerProps &
  MouseScrollListenerProps

export const Listeners = ({
  mouseMovementResetDelay = 30,
  onMouseMoveUpdate,
  onPageVisibilityUpdate,
  onPageFocusUpdate,
  onPointerLockUpdate,
  onFullscreenUpdate,
  onResizeUpdate,
  onDeviceTypeUpdate,
  onScreenOrientationUpdate,
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
  onScroll,
  mouseScrollResetDelay = 100,
  onKeyDown,
  onKeyUp,
}: ListenersProps) => (
  <>
    <MouseMoveListener
      mouseMovementResetDelay={mouseMovementResetDelay}
      onUpdate={onMouseMoveUpdate}
    />
    <PageVisibilityListener onUpdate={onPageVisibilityUpdate} />
    <PageFocusListener onUpdate={onPageFocusUpdate} />
    <PointerLockListener onUpdate={onPointerLockUpdate} />
    <FullscreenListener onUpdate={onFullscreenUpdate} />
    <ResizeListener onUpdate={onResizeUpdate} />
    <DeviceTypeListener onUpdate={onDeviceTypeUpdate} />
    <ScreenOrientationListener onUpdate={onScreenOrientationUpdate} />
    <MouseButtonsListener
      onLeftMouseDown={onLeftMouseDown}
      onMiddleMouseDown={onMiddleMouseDown}
      onRightMouseDown={onRightMouseDown}
      onLeftMouseUp={onLeftMouseUp}
      onMiddleMouseUp={onMiddleMouseUp}
      onRightMouseUp={onRightMouseUp}
    />
    <KeyboardListener onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
    <MouseScrollListener onScroll={onScroll} mouseScrollResetDelay={mouseScrollResetDelay} />
  </>
)
