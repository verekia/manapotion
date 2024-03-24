import { defineComponent, h } from 'vue'

import { DeviceTypeListener } from './listeners/DeviceTypeListener.vue'
import { FullscreenListener } from './listeners/FullscreenListener.vue'
import { MouseMoveListener } from './listeners/MouseMoveListener.vue'
import { PageFocusListener } from './listeners/PageFocusListener.vue'
import { PageVisibilityListener } from './listeners/PageVisibilityListener.vue'
import { PointerLockListener } from './listeners/PointerLockListener.vue'
import { ResizeListener } from './listeners/ResizeListener.vue'

export const Listeners = defineComponent({
  emits: [
    'fullscreen-update',
    'pointer-lock-update',
    'mouse-move-update',
    'page-visibility-update',
    'page-focus-update',
    'resize-update',
    'device-type-update',
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
    ]
  },
})
