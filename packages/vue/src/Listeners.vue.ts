import { defineComponent, h } from 'vue'

import {
  DeviceTypeChangePayload,
  FullscreenChangePayload,
  KeyDownPayload,
  KeyUpPayload,
  LeftMouseDownPayload,
  LeftMouseUpPayload,
  MiddleMouseDownPayload,
  MiddleMouseUpPayload,
  MouseMovePayload,
  MouseScrollPayload,
  PageFocusChangePayload,
  PageVisibilityPayload,
  PointerLockChangePayload,
  ResizePayload,
  RightMouseDownPayload,
  RightMouseUpPayload,
  ScreenOrientationChangePayload,
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
  props: {
    mouseMovementResetDelay: { type: Number, default: 30 },
    clearInputsOnBlur: { type: Boolean, default: true },
    mouseScrollResetDelay: { type: Number, default: 100 },
  },
  emits: {
    mouseMove: (payload: MouseMovePayload) => payload,
    pointerLockChange: (payload: PointerLockChangePayload) => payload,
    pageVisibilityChange: (payload: PageVisibilityPayload) => payload,
    fullscreenChange: (payload: FullscreenChangePayload) => payload,
    deviceTypeChange: (payload: DeviceTypeChangePayload) => payload,
    resize: (payload: ResizePayload) => payload,
    screenOrientationChange: (payload: ScreenOrientationChangePayload) => payload,
    pageFocusChange: (payload: PageFocusChangePayload) => payload,
    scroll: (payload: MouseScrollPayload) => payload,
    keyDown: (payload: KeyDownPayload) => payload,
    keyUp: (payload: KeyUpPayload) => payload,
    leftMouseDown: (payload: LeftMouseDownPayload) => payload,
    middleMouseDown: (payload: MiddleMouseDownPayload) => payload,
    rightMouseDown: (payload: RightMouseDownPayload) => payload,
    leftMouseUp: (payload: LeftMouseUpPayload) => payload,
    middleMouseUp: (payload: MiddleMouseUpPayload) => payload,
    rightMouseUp: (payload: RightMouseUpPayload) => payload,
  },
  setup:
    (props, { emit }) =>
    () => [
      h(FullscreenListener, { onFullscreenChange: payload => emit('fullscreenChange', payload) }),

      h(PointerLockListener, {
        onPointerLockChange: payload => emit('pointerLockChange', payload),
      }),

      h(MouseMoveListener, {
        onMouseMove: payload => emit('mouseMove', payload),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      }),

      h(PageVisibilityListener, {
        onPageVisibilityChange: payload => emit('pageVisibilityChange', payload),
      }),

      h(PageFocusListener, {
        onPageFocusChange: payload => emit('pageFocusChange', payload),
        clearInputsOnBlur: props.clearInputsOnBlur,
      }),

      h(ResizeListener, { onResize: payload => emit('resize', payload) }),
      h(DeviceTypeListener, { onDeviceTypeChange: payload => emit('deviceTypeChange', payload) }),

      h(ScreenOrientationListener, {
        onScreenOrientationChange: payload => emit('screenOrientationChange', payload),
      }),

      h(MouseButtonsListener, {
        onLeftMouseDown: payload => emit('leftMouseDown', payload),
        onMiddleMouseDown: payload => emit('middleMouseDown', payload),
        onRightMouseDown: payload => emit('rightMouseDown', payload),
        onLeftMouseUp: payload => emit('leftMouseUp', payload),
        onMiddleMouseUp: payload => emit('middleMouseUp', payload),
        onRightMouseUp: payload => emit('rightMouseUp', payload),
      }),

      h(KeyboardListener, {
        onKeyDown: payload => emit('keyDown', payload),
        onKeyUp: payload => emit('keyUp', payload),
      }),

      h(MouseScrollListener, {
        onScroll: payload => emit('scroll', payload),
        mouseScrollResetDelay: props.mouseScrollResetDelay,
      }),
    ],
})
