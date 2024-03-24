import { defineComponent, h } from 'vue'

import { KeyState } from '@manapotion/core'

import { DeviceTypeListener } from './listeners/DeviceTypeListener.vue'
import { FullscreenListener } from './listeners/FullscreenListener.vue'
import { KeyboardListener } from './listeners/KeyboardListener.vue'
import { MouseButtonsListener } from './listeners/MouseButtonsListener.vue'
import { MouseMoveListener } from './listeners/MouseMoveListener.vue'
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
  },
  setup(props, { emit }) {
    return () => [
      h(FullscreenListener, {
        onUpdate: (isFullscreen: boolean) => emit('fullscreen-update', isFullscreen),
      }),
      h(PointerLockListener, {
        onUpdate: (isPointerLocked: boolean) => emit('pointer-lock-update', isPointerLocked),
      }),
      h(MouseMoveListener, {
        onUpdate: (x: number, y: number, movementX: number, movementY: number) =>
          emit('mouse-move-update', x, y, movementX, movementY),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      }),
      h(PageVisibilityListener, {
        onUpdate: (isVisible: boolean) => emit('page-visibility-update', isVisible),
      }),
      h(PageFocusListener, {
        onUpdate: (isPageFocused: boolean) => emit('page-focus-update', isPageFocused),
        clearInputsOnBlur: props.clearInputsOnBlur,
      }),
      h(ResizeListener, {
        onUpdate: ({
          width,
          height,
          isLandscape,
          isPortrait,
        }: {
          width: number
          height: number
          isLandscape: boolean
          isPortrait: boolean
        }) => emit('resize-update', { width, height, isLandscape, isPortrait }),
      }),
      h(DeviceTypeListener, {
        onUpdate: ({ isDesktop, isMobile }: { isDesktop: boolean; isMobile: boolean }) =>
          emit('device-type-update', { isDesktop, isMobile }),
      }),
      h(ScreenOrientationListener, {
        onUpdate: ({ isPortrait, isLandscape }: { isPortrait: boolean; isLandscape: boolean }) =>
          emit('screen-orientation-update', { isPortrait, isLandscape }),
      }),
      h(MouseButtonsListener, {
        onLeftMouseDown: () => emit('left-mouse-down'),
        onMiddleMouseDown: () => emit('middle-mouse-down'),
        onRightMouseDown: () => emit('right-mouse-down'),
        onLeftMouseUp: () => emit('left-mouse-up'),
        onMiddleMouseUp: () => emit('middle-mouse-up'),
        onRightMouseUp: () => emit('right-mouse-up'),
      }),
      h(KeyboardListener, {
        onKeyDown: (keyState: KeyState) => emit('key-down', keyState),
        onKeyUp: (code: string, key: string) => emit('key-up', code, key),
      }),
    ]
  },
})
