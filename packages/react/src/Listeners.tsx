import type {
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
  mouseMovementResetDelay,
  onMouseMove,
  onPageVisibilityChange,
  onPageFocusChange,
  onPointerLockChange,
  onFullscreenChange,
  onResize,
  onDeviceTypeChange,
  onScreenOrientationChange,
  onLeftMouseButtonDown,
  onMiddleMouseButtonDown,
  onRightMouseButtonDown,
  onLeftMouseButtonUp,
  onMiddleMouseButtonUp,
  onRightMouseButtonUp,
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
    <PageFocusListener onPageFocusChange={onPageFocusChange} />
    <PointerLockListener onPointerLockChange={onPointerLockChange} />
    <FullscreenListener onFullscreenChange={onFullscreenChange} />
    <ResizeListener onResize={onResize} />
    <DeviceTypeListener onDeviceTypeChange={onDeviceTypeChange} />
    <ScreenOrientationListener onScreenOrientationChange={onScreenOrientationChange} />
    <MouseButtonsListener
      onLeftMouseButtonDown={onLeftMouseButtonDown}
      onMiddleMouseButtonDown={onMiddleMouseButtonDown}
      onRightMouseButtonDown={onRightMouseButtonDown}
      onLeftMouseButtonUp={onLeftMouseButtonUp}
      onMiddleMouseButtonUp={onMiddleMouseButtonUp}
      onRightMouseButtonUp={onRightMouseButtonUp}
    />
    <KeyboardListener onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
    <MouseScrollListener onScroll={onScroll} mouseScrollResetDelay={mouseScrollResetDelay} />
  </>
)
