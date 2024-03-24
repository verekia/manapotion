import {
  DeviceTypeListenerProps,
  FullscreenListenerProps,
  KeyboardListenerProps,
  MouseButtonsListenerProps,
  MouseMoveListenerProps,
  MouseScrollListenerProps,
  PageFocusListenerProps,
  PageVisibilityListenerProps,
  PointerLockListenerProps,
  ResizeListenerProps,
  ScreenOrientationListenerProps,
} from '@manapotion/core'

import { DeviceTypeListener } from './listeners/DeviceTypeListener'
import { FullscreenListener } from './listeners/FullscreenListener'
import { KeyboardListener } from './listeners/KeyboardListener'
import { MouseButtonsListener } from './listeners/MouseButtonsListener'
import { MouseMoveListener } from './listeners/MouseMoveListener'
import { MouseScrollListener } from './listeners/MouseScrollListener'
import { PageFocusListener } from './listeners/PageFocusListener'
import { PageVisibilityListener } from './listeners/PageVisibilityListener'
import { PointerLockListener } from './listeners/PointerLockListener'
import { ResizeListener } from './listeners/ResizeListener'
import { ScreenOrientationListener } from './listeners/ScreenOrientationListener'

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
  clearInputsOnBlur,
  mouseMovementResetDelay,
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
  mouseScrollResetDelay,
  onKeyDown,
  onKeyUp,
}: ListenersProps) => (
  <>
    <MouseMoveListener
      mouseMovementResetDelay={mouseMovementResetDelay}
      onUpdate={onMouseMoveUpdate}
    />
    <PageVisibilityListener onUpdate={onPageVisibilityUpdate} />
    <PageFocusListener onUpdate={onPageFocusUpdate} clearInputsOnBlur={clearInputsOnBlur} />
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
