import { defineComponent, h } from 'vue'

import { FullscreenListener } from './listeners/FullscreenListener.vue'
import { MouseMoveListener } from './listeners/MouseMoveListener.vue'
import { PageFocusListener } from './listeners/PageFocusListener.vue'
import { PageVisibilityListener } from './listeners/PageVisibilityListener.vue'
import { PointerLockListener } from './listeners/PointerLockListener.vue'
import { ResizeListener } from './listeners/ResizeListener.vue'

export const Listeners = defineComponent({
  emits: [
    'fullscreenchange',
    'pointerlockchange',
    'mousemove',
    'visibilitychange',
    'blur',
    'focus',
    'resize',
  ],
  props: {
    mouseMovementResetDelay: {
      type: Number,
      default: 30,
    },
  },
  setup(props, { emit }) {
    return () => [
      h(FullscreenListener, {
        onFullscreenchange: (isFullscreen: boolean) => emit('fullscreenchange', isFullscreen),
      }),
      h(PointerLockListener, {
        onPointerlockchange: (isPointerLocked: boolean) =>
          emit('pointerlockchange', isPointerLocked),
      }),
      h(MouseMoveListener, {
        onMousemove: (x: number, y: number, movementX: number, movementY: number) =>
          emit('mousemove', x, y, movementX, movementY),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      }),
      h(PageVisibilityListener, {
        onVisibilitychange: (isVisible: boolean) => emit('visibilitychange', isVisible),
      }),
      h(PageFocusListener, {
        onBlur: () => emit('blur'),
        onFocus: () => emit('focus'),
      }),
      h(ResizeListener, {
        onResize: (params: {
          width: number
          height: number
          isLandscape: boolean
          isPortrait: boolean
        }) => emit('resize', params),
      }),
    ]
  },
})
