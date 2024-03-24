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

export type ListenersProps = MouseMoveListenerProps &
  PageVisibilityListenerProps &
  PageFocusListenerProps &
  PointerLockListenerProps &
  FullscreenListenerProps &
  ResizeListenerProps &
  DeviceTypeListenerProps &
  ScreenOrientationListenerProps &
  MouseButtonsListenerProps &
  KeyboardListenerProps &
  MouseScrollListenerProps

export const Listeners = ({
  clearInputsOnBlur,
  mouseMovementResetDelay,
  onMouseMove,
  onPageVisibilityChange,
  onPageFocusChange,
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
  mouseScrollResetDelay,
  onKeyDown,
  onKeyUp,
}: ListenersProps) => (
  <>
    <MouseMoveListener
      mouseMovementResetDelay={mouseMovementResetDelay}
      onMouseMove={onMouseMove}
    />
    <PageVisibilityListener onPageVisibilityChange={onPageVisibilityChange} />
    <PageFocusListener
      onPageFocusChange={onPageFocusChange}
      clearInputsOnBlur={clearInputsOnBlur}
    />
    <PointerLockListener onPointerLockChange={onPointerLockChange} />
    <FullscreenListener onFullscreenChange={onFullscreenChange} />
    <ResizeListener onResize={onResize} />
    <DeviceTypeListener onDeviceTypeChange={onDeviceTypeChange} />
    <ScreenOrientationListener onScreenOrientationChange={onScreenOrientationChange} />
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
