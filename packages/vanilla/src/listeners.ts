import {
  DeviceTypeListenerProps,
  FullscreenListenerProps,
  KeyboardListenerProps,
  mountBlurListener,
  mountDeviceTypeListener,
  mountFocusListener,
  mountFullscreenListener,
  mountKeyboardListener,
  mountMouseButtonsListener,
  mountMouseMoveListener,
  mountMouseScrollListener,
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
}: ListenersProps) => {
  const unsubDeviceType = mountDeviceTypeListener({ onDeviceTypeChange })
  const unsubBlur = mountBlurListener({ clearInputsOnBlur, onPageFocusChange })
  const unsubFocus = mountFocusListener({ onPageFocusChange })
  const unsubFullscreen = mountFullscreenListener({ onFullscreenChange })
  const unsubMouseButtons = mountMouseButtonsListener({
    onLeftMouseDown,
    onMiddleMouseDown,
    onRightMouseDown,
    onLeftMouseUp,
    onMiddleMouseUp,
    onRightMouseUp,
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
    unsubBlur()
    unsubFocus()
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
