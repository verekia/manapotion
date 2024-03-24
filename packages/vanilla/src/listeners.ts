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

export const listeners = ({
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
}: ListenersProps) => {
  const unsubDeviceType = mountDeviceTypeListener({ onUpdate: onDeviceTypeUpdate })
  const unsubBlur = mountBlurListener({ clearInputsOnBlur, onUpdate: onPageFocusUpdate })
  const unsubFocus = mountFocusListener({ onUpdate: onPageFocusUpdate })
  const unsubFullscreen = mountFullscreenListener({ onUpdate: onFullscreenUpdate })
  const unsubMouseButtons = mountMouseButtonsListener({
    onLeftMouseDown,
    onMiddleMouseDown,
    onRightMouseDown,
    onLeftMouseUp,
    onMiddleMouseUp,
    onRightMouseUp,
  })
  const unsubMouseMove = mountMouseMoveListener({
    onUpdate: onMouseMoveUpdate,
    mouseMovementResetDelay,
  })
  const unsubKeyboard = mountKeyboardListener({ onKeyDown, onKeyUp })
  const unsubScroll = mountMouseScrollListener({ onScroll, mouseScrollResetDelay })
  const unsubPointerLock = mountPointerLockListener({ onUpdate: onPointerLockUpdate })
  const unsubResize = mountResizeListener({ onUpdate: onResizeUpdate })
  const unsubScreenOrientation = mountScreenOrientationListener({
    onUpdate: onScreenOrientationUpdate,
  })
  const unsubPageVisibility = mountPageVisibilityListener({ onUpdate: onPageVisibilityUpdate })

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
