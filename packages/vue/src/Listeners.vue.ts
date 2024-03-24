import { defineComponent, h } from 'vue'

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

import { DeviceTypeListener } from './listeners/DeviceTypeListener.vue'
import { FullscreenListener } from './listeners/FullscreenListener.vue'
import { KeyboardListener } from './listeners/KeyboardListener.vue'
import { MouseButtonsListener } from './listeners/MouseButtonsListener.vue'
import { MouseMoveListener } from './listeners/MouseMoveListener.vue'
import { MouseScrollListener } from './listeners/MouseScrollListener.vue'
import { PageFocusListener } from './listeners/PageFocusListener.vue'
import { PageVisibilityListener } from './listeners/PageVisibilityListener.vue'
import { PointerLockListener } from './listeners/PointerLockListener.vue'
import { ResizeListener } from './listeners/ResizeListener.vue'
import { ScreenOrientationListener } from './listeners/ScreenOrientationListener.vue'

export const Listeners = defineComponent({
  emits: [
    'fullscreenChange',
    'pointerLockChange',
    'mouseMove',
    'pageVisibilityChange',
    'pageFocusChange',
    'resize',
    'deviceTypeChange',
    'screenOrientationChange',
    'leftMouseDown',
    'middleMouseDown',
    'rightMouseDown',
    'leftMouseUp',
    'middleMouseUp',
    'rightMouseUp',
    'keyDown',
    'keyUp',
    'scroll',
  ],
  props: {
    mouseMovementResetDelay: {
      type: Number,
      default: 30,
    },
    clearInputsOnBlur: {
      type: Boolean,
      default: true,
    },
    mouseScrollResetDelay: {
      type: Number,
      default: 500,
    },
  },
  setup(props, { emit }) {
    return () => [
      h(FullscreenListener, {
        onFullscreenChange: isFullscreen => emit('fullscreenChange', isFullscreen),
      } satisfies FullscreenListenerProps),

      h(PointerLockListener, {
        onPointerLockChange: isPointerLocked => emit('pointerLockChange', isPointerLocked),
      } satisfies PointerLockListenerProps),

      h(MouseMoveListener, {
        onMouseMove: (x, y, movementX, movementY) => emit('mouseMove', x, y, movementX, movementY),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      } satisfies MouseMoveListenerProps),

      h(PageVisibilityListener, {
        onPageVisibilityChange: isVisible => emit('pageVisibilityChange', isVisible),
      } satisfies PageVisibilityListenerProps),

      h(PageFocusListener, {
        onPageFocusChange: isPageFocused => emit('pageFocusChange', isPageFocused),
        clearInputsOnBlur: props.clearInputsOnBlur,
      } satisfies PageFocusListenerProps),

      h(ResizeListener, {
        onResize: ({ width, height, isLandscape, isPortrait }) =>
          emit('resize', { width, height, isLandscape, isPortrait }),
      } satisfies ResizeListenerProps),

      h(DeviceTypeListener, {
        onDeviceTypeChange: ({ isDesktop, isMobile }) =>
          emit('deviceTypeChange', { isDesktop, isMobile }),
      } satisfies DeviceTypeListenerProps),

      h(ScreenOrientationListener, {
        onScreenOrientationChange: ({ isPortrait, isLandscape }) =>
          emit('screenOrientationChange', { isPortrait, isLandscape }),
      } satisfies ScreenOrientationListenerProps),

      h(MouseButtonsListener, {
        onLeftMouseDown: () => emit('leftMouseDown'),
        onMiddleMouseDown: () => emit('middleMouseDown'),
        onRightMouseDown: () => emit('rightMouseDown'),
        onLeftMouseUp: () => emit('leftMouseUp'),
        onMiddleMouseUp: () => emit('middleMouseUp'),
        onRightMouseUp: () => emit('rightMouseUp'),
      } satisfies MouseButtonsListenerProps),

      h(KeyboardListener, {
        onKeyDown: keyState => emit('keyDown', keyState),
        onKeyUp: (code, key) => emit('keyUp', code, key),
      } satisfies KeyboardListenerProps),

      h(MouseScrollListener, {
        onScroll: deltaY => emit('scroll', deltaY),
        mouseScrollResetDelay: props.mouseScrollResetDelay,
      } satisfies MouseScrollListenerProps),
    ]
  },
})
