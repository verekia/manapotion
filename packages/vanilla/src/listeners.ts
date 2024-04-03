import {
  DeviceTypeListenerProps,
  FullscreenListenerProps,
  KeyboardListenerProps,
  mountDeviceTypeListener,
  mountFullscreenListener,
  mountKeyboardListener,
  mountMouseButtonsListener,
  mountMouseMoveListener,
  mountMouseScrollListener,
  mountPageFocusListener,
  mountPageVisibilityListener,
  mountPointerLockListener,
  mountResizeListener,
  mountScreenOrientationListener,
  MouseButtonsListenerProps,
  MouseMoveListenerProps,
  MouseScrollListenerProps,
  PageFocusListenerProps,
  PageVisibilityListenerProps,
  PointerLockListenerProps,
  ResizeListenerProps,
  ScreenOrientationListenerProps,
} from '@manapotion/core'

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

export const listeners = ({
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
}: ListenersProps) => {
  const unsubDeviceType = mountDeviceTypeListener({ onDeviceTypeChange })
  const unsubPageFocus = mountPageFocusListener({ onPageFocusChange })
  const unsubFullscreen = mountFullscreenListener({ onFullscreenChange })
  const unsubMouseButtons = mountMouseButtonsListener({
    onLeftMouseButtonDown,
    onMiddleMouseButtonDown,
    onRightMouseButtonDown,
    onLeftMouseButtonUp,
    onMiddleMouseButtonUp,
    onRightMouseButtonUp,
  })
  const unsubMouseMove = mountMouseMoveListener({ onMouseMove, mouseMovementResetDelay })
  const unsubKeyboard = mountKeyboardListener({ onKeyDown, onKeyUp })
  const unsubScroll = mountMouseScrollListener({ onScroll, mouseScrollResetDelay })
  const unsubPointerLock = mountPointerLockListener({ onPointerLockChange })
  const unsubResize = mountResizeListener({ onResize })
  const unsubScreenOrientation = mountScreenOrientationListener({ onScreenOrientationChange })
  const unsubPageVisibility = mountPageVisibilityListener({ onPageVisibilityChange })

  return () => {
    unsubDeviceType()
    unsubPageFocus()
    unsubFullscreen()
    unsubMouseButtons()
    unsubMouseMove()
    unsubKeyboard()
    unsubScroll()
    unsubPointerLock()
    unsubResize()
    unsubScreenOrientation()
    unsubPageVisibility()
  }
}
