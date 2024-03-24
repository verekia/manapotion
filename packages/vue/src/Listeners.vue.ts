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
    'fullscreen-update',
    'pointer-lock-update',
    'mouse-move-update',
    'page-visibility-update',
    'page-focus-update',
    'resize-update',
    'device-type-update',
    'screen-orientation-update',
    'left-mouse-down',
    'middle-mouse-down',
    'right-mouse-down',
    'left-mouse-up',
    'middle-mouse-up',
    'right-mouse-up',
    'key-down',
    'key-up',
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
        onFullscreenChange: isFullscreen => emit('fullscreen-update', isFullscreen),
      } satisfies FullscreenListenerProps),

      h(PointerLockListener, {
        onPointerLockChange: isPointerLocked => emit('pointer-lock-update', isPointerLocked),
      } satisfies PointerLockListenerProps),

      h(MouseMoveListener, {
        onMouseMove: (x, y, movementX, movementY) =>
          emit('mouse-move-update', x, y, movementX, movementY),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      } satisfies MouseMoveListenerProps),

      h(PageVisibilityListener, {
        onPageVisibilityChange: isVisible => emit('page-visibility-update', isVisible),
      } satisfies PageVisibilityListenerProps),

      h(PageFocusListener, {
        onPageFocusChange: isPageFocused => emit('page-focus-update', isPageFocused),
        clearInputsOnBlur: props.clearInputsOnBlur,
      } satisfies PageFocusListenerProps),

      h(ResizeListener, {
        onResize: ({ width, height, isLandscape, isPortrait }) =>
          emit('resize-update', { width, height, isLandscape, isPortrait }),
      } satisfies ResizeListenerProps),

      h(DeviceTypeListener, {
        onDeviceTypeChange: ({ isDesktop, isMobile }) =>
          emit('device-type-update', { isDesktop, isMobile }),
      } satisfies DeviceTypeListenerProps),

      h(ScreenOrientationListener, {
        onScreenOrientationChange: ({ isPortrait, isLandscape }) =>
          emit('screen-orientation-update', { isPortrait, isLandscape }),
      } satisfies ScreenOrientationListenerProps),

      h(MouseButtonsListener, {
        onLeftMouseDown: () => emit('left-mouse-down'),
        onMiddleMouseDown: () => emit('middle-mouse-down'),
        onRightMouseDown: () => emit('right-mouse-down'),
        onLeftMouseUp: () => emit('left-mouse-up'),
        onMiddleMouseUp: () => emit('middle-mouse-up'),
        onRightMouseUp: () => emit('right-mouse-up'),
      } satisfies MouseButtonsListenerProps),

      h(KeyboardListener, {
        onKeyDown: keyState => emit('key-down', keyState),
        onKeyUp: (code, key) => emit('key-up', code, key),
      } satisfies KeyboardListenerProps),

      h(MouseScrollListener, {
        onScroll: deltaY => emit('scroll', deltaY),
        mouseScrollResetDelay: props.mouseScrollResetDelay,
      } satisfies MouseScrollListenerProps),
    ]
  },
})
