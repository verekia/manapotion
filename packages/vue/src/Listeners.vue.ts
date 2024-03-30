import { defineComponent, h } from 'vue'

import {
  DeviceTypeChangePayload,
  FullscreenChangePayload,
  KeyDownPayload,
  KeyUpPayload,
  LeftMouseButtonDownPayload,
  LeftMouseButtonUpPayload,
  MiddleMouseButtonDownPayload,
  MiddleMouseButtonUpPayload,
  MouseMovePayload,
  MouseScrollPayload,
  PageFocusChangePayload,
  PageVisibilityPayload,
  PointerLockChangePayload,
  ResizePayload,
  RightMouseButtonDownPayload,
  RightMouseButtonUpPayload,
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
    leftMouseDown: (payload: LeftMouseButtonDownPayload) => payload,
    middleMouseDown: (payload: MiddleMouseButtonDownPayload) => payload,
    rightMouseDown: (payload: RightMouseButtonDownPayload) => payload,
    leftMouseUp: (payload: LeftMouseButtonUpPayload) => payload,
    middleMouseUp: (payload: MiddleMouseButtonUpPayload) => payload,
    rightMouseUp: (payload: RightMouseButtonUpPayload) => payload,
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

      h(PageFocusListener, { onPageFocusChange: payload => emit('pageFocusChange', payload) }),
      h(ResizeListener, { onResize: payload => emit('resize', payload) }),
      h(DeviceTypeListener, { onDeviceTypeChange: payload => emit('deviceTypeChange', payload) }),

      h(ScreenOrientationListener, {
        onScreenOrientationChange: payload => emit('screenOrientationChange', payload),
      }),

      h(MouseButtonsListener, {
        onLeftMouseButtonDown: payload => emit('leftMouseDown', payload),
        onMiddleMouseButtonDown: payload => emit('middleMouseDown', payload),
        onRightMouseButtonDown: payload => emit('rightMouseDown', payload),
        onLeftMouseButtonUp: payload => emit('leftMouseUp', payload),
        onMiddleMouseButtonUp: payload => emit('middleMouseUp', payload),
        onRightMouseButtonUp: payload => emit('rightMouseUp', payload),
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
